"""Create reviewable WebP assets from real 1.9.6 captures (Python + Pillow).

Usage: python scripts/prepare-screenshots.py --input artifacts/refresh-196/captures
Raw captures are kept in the input directory; no source image is overwritten.
"""
import argparse, hashlib, json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SCENES = ['merge', 'map']
DOC_SCENES = ['home', 'history', 'restore', 'manager', 'backup-settings', 'filters', 'automation', 'retention',
              'cleanup', 'cloud', 'migration', 'plugins', 'plugin-settings',
              'creation-entry', 'creation', 'creation-review']
DETAILS = {
    'retention-detail': ('retention', (250, 230, 1555, 600)),
    'restore-detail': ('restore', (460, 190, 1170, 940)),
    'migration-detail': ('migration', (270, 390, 1580, 625)),
}

def digest(p): return hashlib.sha256(p.read_bytes()).hexdigest()

def build(input_dir):
    variants = [(locale, theme) for locale in ['zh', 'en'] for theme in ['light', 'dark']]
    def capture(scene, locale, theme):
        return input_dir/f'{"map-real" if scene == "map" else scene}-{locale}-{theme}.png'
    home=ROOT/'static/img/homepage/manifest.json'
    old=json.loads(home.read_text(encoding='utf-8'))
    retained=[r for r in old['screenshots'] if r['scene'] in ['home', 'history', 'restore']]
    if len(retained) != 12 or any(r['applicationVersion'] != '1.9.4' for r in retained):
        raise ValueError('Restore the 12 original user-provided homepage variants before preparing additions.')
    required = [capture(scene,locale,theme)
                for scene in SCENES + DOC_SCENES for locale,theme in variants]
    missing = [str(p) for p in required if not p.is_file()]
    if missing: raise SystemExit('Missing captures:\n'+'\n'.join(missing))
    records=[]; gallery=[]
    for scene in SCENES + DOC_SCENES + list(DETAILS):
        for locale,theme in variants:
            source_scene, detail = DETAILS.get(scene, (scene, None))
            source=capture(source_scene,locale,theme)
            with Image.open(source) as original:
                if original.size != (1625,1125): raise ValueError(f'Unexpected capture size: {source}: {original.size}')
                image=original.crop(detail if detail else (10,2,1614,1114)).convert('RGB')
            destination=ROOT/'static/img'/('homepage' if scene in SCENES else 'docs/v1-9-6')
            destination.mkdir(parents=True,exist_ok=True)
            width,height=image.size; small_width=800 if width>800 else 400
            name=f'{scene}-{locale}-{theme}'
            full=destination/f'{name}-{width}.webp'
            small=destination/f'{name}-{small_width}.webp'
            image.save(full,format='WEBP',lossless=True,method=6)
            quality=None
            if scene == 'map' and full.stat().st_size > 512*1024:
                quality=94
                image.save(full,format='WEBP',quality=quality,method=6)
            image.resize((small_width,round(height*small_width/width)),Image.Resampling.LANCZOS).save(small,format='WEBP',quality=94,method=6)
            if full.stat().st_size>512*1024 or small.stat().st_size>512*1024:
                raise ValueError(f'Image exceeds the website budget: {name}')
            item={'name':name,'scene':scene,'locale':locale,'theme':theme,
                  'applicationVersion':'1.9.6','width':width,'height':height,
                  'full':full.relative_to(ROOT/'static').as_posix(),
                  'small':small.relative_to(ROOT/'static').as_posix(),'smallWidth':small_width,
                  'source':source.name,'sourceSha256':digest(source),'sha256':digest(full),
                  'smallSha256':digest(small),'smallHeight':round(height*small_width/width),
                  'fullEncoding':'lossless' if quality is None else f'WebP quality {quality}',
                  'crop':list(detail) if detail else [10,2,1614,1114],
                  'bytes':full.stat().st_size}
            records.append(item)
            if scene in SCENES: gallery.append(item)
    notes=['Actual local FolderRewind 1.9.6.0 window captures; About and bundled MineRewind 1.9.8 verified.',
           'Map uses the real user-provided Minecraft Java world 26_1极限生存. The application reads its existing terrain without modifying the save.',
           'Restore captures show backup before restore enabled.',
           'Cloud form uses example.com/demo-user placeholders, blank password, and has not saved or verified a live account.',
           'Automation captures show unsaved enabled settings; the draft was discarded after capture.',
           'Only crop, resampling and WebP encoding were applied; raw captures remain unchanged in local audit artifacts.',
           'Original 1.9.4 homepage home/history/restore assets remain unchanged; current 1.9.6 document captures are stored separately.']
    common={'capturedOn':'2026-10-06','applicationVersion':'1.9.6','bundledPluginVersion':'1.9.8',
            'captureTool':'winapp ui 0.7.0, local target','sourceWindowSize':[1625,1125],
            'windowDpi':120,'notes':notes}
    home.write_text(json.dumps({**common,'applicationVersion':'mixed','applicationVersions':['1.9.4','1.9.6'],
                              'retainedScenes':['home','history','restore'],'screenshots':retained+gallery},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    (ROOT/'static/img/docs/v1-9-6/manifest.json').write_text(json.dumps({**common,'screenshots':[r for r in records if r['scene'] not in SCENES]},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    sizes={r['full']:{'width':r['width'],'height':r['height'],'small':r['small'],'smallWidth':r['smallWidth']} for r in retained+records}
    (ROOT/'static/img/docs/v1-9-6/sizes.json').write_text(json.dumps(sizes,indent=2)+'\n',encoding='utf-8')
    print(f'Prepared {len(records)} captures, responsive WebP pairs and provenance manifests. Largest full image: {max(r["bytes"] for r in records):,} bytes.')

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--input',type=Path,required=True)
    build(parser.parse_args().input.resolve())
