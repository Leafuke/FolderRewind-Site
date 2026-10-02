from pathlib import Path
import sys, zipfile, hashlib, json

root = Path(sys.argv[1]).resolve()
destination = Path(sys.argv[2]).resolve()
manifest = json.loads((root / "manifest.json").read_text(encoding="utf-8"))
if manifest["manifestVersion"] != 3:
    raise ValueError("manifestVersion must be 3")
files = [p for p in root.rglob("*") if p.is_file() and p.suffix in {".dll", ".json"}
         and p.name != "FolderRewind.Plugin.Abstractions.dll"]
for p in files:
    if p.name.startswith("FolderRewind.Plugin.Runtime") or p.name == "FolderRewind.dll":
        raise ValueError("The package must not bundle SDK/Host/Runtime assemblies")
with zipfile.ZipFile(destination, "w", zipfile.ZIP_DEFLATED) as archive:
    for p in sorted(files):
        # Stable timestamps make the same payload pack identically.
        info = zipfile.ZipInfo(p.relative_to(root).as_posix(), (2026, 10, 2, 0, 0, 0))
        info.compress_type = zipfile.ZIP_DEFLATED
        info.external_attr = 0o100644 << 16
        archive.writestr(info, p.read_bytes())
digest = hashlib.sha256(destination.read_bytes()).hexdigest()
destination.with_name(destination.name + ".sha256").write_text(digest + "  " + destination.name + "\n", encoding="utf-8")
print(destination.name + " SHA-256 " + digest)
