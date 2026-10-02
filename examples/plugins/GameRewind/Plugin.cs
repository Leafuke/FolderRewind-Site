using System.Text.Json;
using FolderRewind.Plugin.Abstractions;

namespace GameRewind;

public sealed class Plugin : IFolderRewindPlugin, IDiscoveryCapability,
    IDiscoveryDefinitionCatalog, IFilePolicyCapability, IPluginCommandCapability,
    IKnotLinkIntegrationCapability
{
    private static readonly PluginId Id = new("com.example.gamerewind");
    public ConfigKindRef Kind { get; } = new(new OwnerId(Id.Value), "game-saves");
    public DiscoveryProviderId ProviderId { get; } = new("com.example.gamerewind.discovery");
    private bool _discover;

    public ValueTask<PluginActivationResult> ActivateAsync(
        IPluginActivationContext context, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();
        _discover = context.Settings.Values.TryGetValue("DiscoverSaves", out var value)
            && value.GetBoolean();
        context.RegisterCapability<IDiscoveryCapability>(this);
        context.RegisterCapability<IFilePolicyCapability>(this);
        context.RegisterCapability<IPluginCommandCapability>(this);
        context.RegisterCapability<IKnotLinkIntegrationCapability>(this);
        return ValueTask.FromResult(PluginActivationResult.Empty);
    }

    public ValueTask DeactivateAsync(CancellationToken cancellationToken)
    {
        _discover = false;
        return ValueTask.CompletedTask;
    }

    public IReadOnlyList<DiscoveryDefinitionDescriptor> Definitions { get; } =
        [new("example-game", "Example game", [], new Dictionary<string, string>())];
    public string? ResolveDefinitionId(DiscoveryCandidate candidate)
        => candidate.ConfigDrafts.Any(draft => draft.Kind == Kind) ? "example-game" : null;

    public ValueTask<DiscoveryResult> DiscoverAsync(
        DiscoveryRequest request, PluginInvocationContext context)
    {
        var candidates = new List<DiscoveryCandidate>();
        var diagnostics = new List<PluginDiagnostic>();
        if (!_discover) return ValueTask.FromResult(new DiscoveryResult(candidates, diagnostics));
        foreach (var suppliedRoot in request.UserRoots)
        {
            context.OperationCancellation.ThrowIfCancellationRequested();
            context.PluginLifetime.ThrowIfCancellationRequested();
            try
            {
                var root = Path.GetFullPath(suppliedRoot);
                if (!File.Exists(Path.Combine(root, "save.dat"))) continue;
                var folder = new FolderDraft(root, Path.GetFileName(root),
                    new Dictionary<StateOwnerId, ProviderStateDraft>());
                var draft = new ConfigDraft(Kind, "Example game", [folder],
                    new Dictionary<StateOwnerId, ProviderStateDraft>());
                candidates.Add(new DiscoveryCandidate(root, folder.DisplayName, [draft]));
            }
            catch (Exception error) when (error is IOException or UnauthorizedAccessException or ArgumentException)
            {
                diagnostics.Add(new("example.discovery_root_failed", DiagnosticSeverity.Warning,
                    "Discovery", Id.Value, new Dictionary<string, string> { ["message"] = error.Message }));
            }
        }
        return ValueTask.FromResult(new DiscoveryResult(candidates, diagnostics));
    }

    public ValueTask<FilePolicyResult> ResolveAsync(
        FilePolicyRequest request, PluginInvocationContext context)
    {
        context.OperationCancellation.ThrowIfCancellationRequested();
        return ValueTask.FromResult(new FilePolicyResult(["*.tmp", "cache/**"], [], []));
    }

    public IReadOnlyList<PluginCommandDescriptor> Commands { get; } =
        [new(new PluginCommandId(Id, "backup"), "Back up a reviewed example config",
            JsonSerializer.SerializeToElement(new {
                type = "object", properties = new { configId = new { type = "string" } },
                required = new[] { "configId" }, additionalProperties = false }))];

    public async ValueTask<PluginCommandResult> ExecuteAsync(
        PluginCommandRequest request, PluginInvocationContext context)
    {
        if (request.Id != Commands[0].Id || !request.Arguments.TryGetValue("configId", out var id)
            || id.ValueKind != JsonValueKind.String || string.IsNullOrWhiteSpace(id.GetString()))
            return Result(OperationOutcome.Blocked);
        context.HostServices.Logger.Log(DiagnosticSeverity.Information, "Example backup requested.");
        var outcome = await context.HostServices.Backups.RequestAsync(id.GetString()!, null,
            new BackupRequestOptions { Comment = "GameRewind example" }, context.OperationCancellation);
        return Result(outcome);
    }

    IReadOnlyList<KnotLinkCommandDescriptor> IKnotLinkIntegrationCapability.Commands { get; } =
        [new("EXAMPLE_ECHO", "Echo text without changing data") {
            Arguments = [new("text", "Text to return")], Returns = ["data"] }];

    public ValueTask<PluginCommandResult> ExecuteAsync(string command,
        IReadOnlyDictionary<string, string> arguments, PluginInvocationContext context)
    {
        context.OperationCancellation.ThrowIfCancellationRequested();
        return ValueTask.FromResult(command == "EXAMPLE_ECHO"
            ? new PluginCommandResult(OperationOutcome.Success,
                new Dictionary<string, JsonElement> {
                    ["data"] = JsonSerializer.SerializeToElement(arguments.GetValueOrDefault("text", "")) }, [])
            : Result(OperationOutcome.Blocked));
    }

    private static PluginCommandResult Result(OperationOutcome outcome)
        => new(outcome, new Dictionary<string, JsonElement>(), []);
}
