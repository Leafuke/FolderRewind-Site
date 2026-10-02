import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';

const name = process.argv[2];
if (!['MinimalPlugin', 'GameRewind'].includes(name)) throw new Error('Choose MinimalPlugin or GameRewind');
const project = path.resolve('examples/plugins', name, `${name}.csproj`);
const output = path.resolve('artifacts/examples', name);
const build = spawnSync('dotnet', ['build', project, '-c', 'Release', '-o', output], {stdio: 'inherit'});
if (build.status !== 0) process.exit(build.status ?? 1);
const destination = path.resolve('artifacts/examples', `${name}-1.0.0.frplugin`);
// Use the standard-library packer. Python 3.10+ is needed for this cross-platform script.
const pack = spawnSync(process.env.PYTHON ?? 'python', ['scripts/pack-plugin.py', output, destination], {stdio: 'inherit'});
process.exitCode = pack.status ?? 1;
