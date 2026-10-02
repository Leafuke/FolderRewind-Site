using FolderRewind.Plugin.Abstractions;

namespace MinimalPlugin;

public sealed class Plugin : IFolderRewindPlugin
{
    public ValueTask<PluginActivationResult> ActivateAsync(
        IPluginActivationContext context, CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();
        return ValueTask.FromResult(PluginActivationResult.Empty);
    }

    public ValueTask DeactivateAsync(CancellationToken cancellationToken)
        => ValueTask.CompletedTask;
}
