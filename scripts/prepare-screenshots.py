"""Prepare document WebP pairs from real release captures.

Usage: python scripts/prepare-screenshots.py --input artifacts/refresh-110/captures
Original PNGs remain in the input directory. Homepage assets are managed separately.
"""
import argparse
import hashlib
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SCENES = ['merge', 'map-compare', 'cloud-recovery', 'notifications', 'filters']


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def build(input_dir):
    baseline = json.loads((ROOT / 'audit/baseline.json').read_text(encoding='utf-8'))
    version = '.'.join(baseline['hostProjectVersion'].split('.')[:3])
    destination = ROOT / 'static/img/docs' / ('v' + version.replace('.', '-'))
    destination.mkdir(parents=True, exist_ok=True)
    records = []
    for scene in SCENES:
        for locale in ['zh', 'en']:
            for theme in ['light', 'dark']:
                source = input_dir / f'{scene}-{locale}-{theme}.png'
                with Image.open(source) as original:
                    if original.size == (1625, 1125):
                        crop = (8, 0, 1617, 1117)
                    elif original.size == (1609, 1117):
                        crop = (0, 0, 1609, 1117)
                    else:
                        raise ValueError(f'Review crop for capture size: {source}: {original.size}')
                    frame = original.crop(crop).convert('RGB')
                    width = 1604
                    height = round(frame.height * width / frame.width)
                    frame = frame.resize((width, height), Image.Resampling.LANCZOS)
                name = f'{scene}-110-{locale}-{theme}'
                full = destination / f'{name}-{width}.webp'
                small = destination / f'{name}-800.webp'
                frame.save(full, format='WEBP', lossless=True, method=6)
                frame.resize((800, round(height * 800 / width)), Image.Resampling.LANCZOS).save(
                    small, format='WEBP', quality=94, method=6)
                if max(full.stat().st_size, small.stat().st_size) > 512 * 1024:
                    raise ValueError(f'Capture exceeds image budget: {name}')
                records.append({
                    'scene': scene, 'locale': locale, 'theme': theme,
                    'applicationVersion': version, 'width': width, 'height': height,
                    'smallWidth': 800, 'smallHeight': round(height * 800 / width),
                    'full': full.relative_to(ROOT / 'static').as_posix(),
                    'small': small.relative_to(ROOT / 'static').as_posix(),
                    'source': source.name, 'sourceSha256': digest(source), 'crop': list(crop),
                    'sha256': digest(full), 'smallSha256': digest(small),
                    'bytes': full.stat().st_size, 'fullEncoding': 'lossless WebP after resize',
                })
    manifest = {
        'capturedOn': '2026-10-31', 'applicationVersion': version,
        'hostRef': baseline['hostRef'], 'bundledPluginVersion': baseline['bundledPlugin'],
        'bundledPluginSha256': baseline['bundledPluginSha256'],
        'captureTool': 'winapp ui, local target',
        'notes': [
            'Official Setup and bundled plugin verified against their release hashes.',
            'Cloud recovery captures show connection-method selection.',
            'Merge captures show a real three-way text conflict and a saved choice before apply.',
            'Map comparison uses two historical versions of a real Java world.',
            'Notification records come from real completed or unchanged backups.',
            'Only window cropping, resizing and WebP encoding were applied.',
        ],
        'screenshots': records,
    }
    (destination / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    sizes = {r['full']: {key: r[key] for key in ['width', 'height', 'small', 'smallWidth']} for r in records}
    (destination / 'sizes.json').write_text(json.dumps(sizes, indent=2) + '\n', encoding='utf-8')
    print(f'Prepared {len(records)} document screenshots and responsive pairs in {destination}.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--input', type=Path, required=True)
    build(parser.parse_args().input.resolve())
