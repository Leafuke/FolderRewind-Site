using System.IO.Compression;
using System.Text.Json;
using System.Text.Json.Nodes;
using FolderRewind.Plugin.Abstractions;
using FolderRewind.Plugin.Runtime.Activation;
using FolderRewind.Plugin.Runtime.Loading;
using FolderRewind.Plugin.Runtime.Packaging;
using FolderRewind.Plugin.Runtime.Settings;

var output = Path.GetFullPath(args[0]);
var passed = new List<string>();
foreach (var name in new[] { "MinimalPlugin", "GameRewind" })
{
    var package = await PluginPackageValidator.ValidateAsync(Path.Combine(output, name + "-1.0.0.frplugin"));
    var staging = Path.Combine(output, "validation-" + name + "-" + Guid.NewGuid().ToString("N"));
    await PluginPackageValidator.ExtractAsync(package, staging);
    var facts = PluginPackageInstallValidationFacts.Empty(package.Manifest.Contract.PluginId);
    var settings = PluginStaticCandidateValidator.Validate(staging, package.Manifest, facts);
    var manifest = package.Manifest.Contract;
    using var loaded = PluginAssemblyLoader.Load(new(manifest.PluginId, staging,
        manifest.EntryAssembly, manifest.EntryType, manifest.RequiredApi));
    var host = new Host();
    var manager = new PluginRuntimeManager();
    if (manager.GetSnapshot(manifest.PluginId).State != PluginRuntimeState.Inactive)
        throw new Exception("Static installation must not activate.");
    var result = await manager.ActivateAsync(new(manifest.PluginId, () => loaded.Instance,
        settings, [], host, new Store(), manifest));
    if (!result.Success) throw new Exception("Activation failed: " + JsonSerializer.Serialize(result.Diagnostics));
    passed.Add(name + ": package/schema/PE/load/activation agreement");

    if (name == "GameRewind")
    {
        using (var lease = manager.TryAcquire<IDiscoveryCapability>(manifest.PluginId)
            ?? throw new Exception("Discovery missing"))
        {
            var root = Path.Combine(output, "test-world");
            Directory.CreateDirectory(root);
            await File.WriteAllTextAsync(Path.Combine(root, "save.dat"), "fixture");
            var discovery = await lease.Capability.DiscoverAsync(new([root]), lease.Context);
            if (discovery.Candidates.Count != 1 || discovery.Candidates[0].ConfigDrafts.Count != 1)
                throw new Exception("Discovery did not produce a reviewed draft");
        }
        using (var lease = manager.TryAcquire<IKnotLinkIntegrationCapability>(manifest.PluginId)
            ?? throw new Exception("KnotLink missing"))
        {
            var echo = await lease.Capability.ExecuteAsync("EXAMPLE_ECHO",
                new Dictionary<string, string> { ["text"] = "a;b=测试" }, lease.Context);
            if (echo.Values["data"].GetString() != "a;b=测试") throw new Exception("Echo lost structured values");
        }
        using (var lease = manager.TryAcquire<IPluginCommandCapability>(manifest.PluginId)
            ?? throw new Exception("Command missing"))
        {
            var response = await lease.Capability.ExecuteAsync(new(lease.Capability.Commands[0].Id,
                new Dictionary<string, JsonElement> { ["configId"] = JsonSerializer.SerializeToElement("fixture") }), lease.Context);
            if (response.Outcome != OperationOutcome.Success || host.BackupCalls != 1)
                throw new Exception("Command must request Host backup exactly once");
        }
        passed.Add("GameRewind: discovery/ECHO/Host request");
    }
    if (!(await manager.DeactivateAsync(manifest.PluginId)).Success
        || manager.TryAcquire<IDiscoveryCapability>(manifest.PluginId) is not null)
        throw new Exception("Disable retained routing");
    passed.Add(name + ": disable removes routing");

    var incompatible = manifest with { RequiredApi = new(4, 0) };
    ExpectReject(() => PluginManifestContractValidator.ValidateStatic(incompatible, manifest.PluginId));
    var json = JsonNode.Parse(await File.ReadAllTextAsync(Path.Combine(staging, "manifest.json")))!.AsObject();
    json["capabilities"] = JsonSerializer.SerializeToNode(new[] { "pluginCommand" });
    var wrong = PluginPackageManifestReader.Parse(JsonSerializer.SerializeToUtf8Bytes(json));
    var mismatch = await new PluginRuntimeManager().ActivateAsync(new(manifest.PluginId,
        () => loaded.Instance, settings, [], host, new Store(), wrong.Contract));
    if (mismatch.Success) throw new Exception("Mismatched capabilities accepted");
    passed.Add(name + ": API and capability mismatch rejected");
}

var badSchema = System.Text.Encoding.UTF8.GetBytes("""
{"schemaVersion":1,"settings":[{"key":"flag","type":"boolean","default":"true"}]}
""");
ExpectReject(() => PluginSettingsSchema.Parse(badSchema));
var denied = new DeclaredPluginHostServices(new Host(), []);
try { await denied.Backups.RequestAsync("fixture", null, CancellationToken.None); throw new Exception("Undeclared service accepted"); }
catch (PluginHostServiceAccessException error) when (error.Service == HostServiceKind.BackupRequest) { }
var invalidPackage = Path.Combine(output, "nested-invalid-" + Guid.NewGuid().ToString("N") + ".frplugin");
using (var zip = ZipFile.Open(invalidPackage, ZipArchiveMode.Create))
    using (var writer = new StreamWriter(zip.CreateEntry("Nested/manifest.json").Open()))
        writer.Write("{}");
try { await PluginPackageValidator.ValidateAsync(invalidPackage); throw new Exception("Nested manifest accepted"); }
catch (InvalidDataException) { }
passed.Add("Wrong settings type, undeclared service and nested package rejected");
await File.WriteAllTextAsync(Path.Combine(output, "validation-results.json"),
    JsonSerializer.Serialize(new { passed, manualDesktopAcceptance = "pending", realGameLoading = "pending" }, new JsonSerializerOptions { WriteIndented = true }));
foreach (var item in passed) Console.WriteLine("PASS " + item);

static void ExpectReject(Action action)
{
    try { action(); } catch (InvalidDataException) { return; }
    throw new Exception("Invalid declaration was accepted");
}

sealed class Store : IPluginActivationStore
{
    public ValueTask CommitAsync(PluginActivationCommit commit, CancellationToken cancellationToken) => ValueTask.CompletedTask;
}

sealed class Host : IPluginHostServices, IBackupRequestService, IPluginLogger
{
    public int BackupCalls { get; private set; }
    public IBackupRequestService Backups => this;
    public IPluginLogger Logger => this;
    public IReadOnlyConfigQueryService Configs => null!;
    public IRestoreRequestService Restores => null!;
    public IHistoryQueryService History => null!;
    public IPluginNotificationService Notifications => null!;
    public IKnotLinkHostService KnotLink => null!;
    public IPluginDataStore DataStore => null!;
    public IPluginTemporaryStorage TemporaryStorage => null!;
    public ValueTask<OperationOutcome> RequestAsync(string id, Guid? folder, CancellationToken token)
    { token.ThrowIfCancellationRequested(); BackupCalls++; return ValueTask.FromResult(OperationOutcome.Success); }
    public void Log(DiagnosticSeverity severity, string message, Exception? error = null) { }
}
