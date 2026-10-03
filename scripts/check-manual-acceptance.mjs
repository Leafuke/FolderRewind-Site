import fs from 'node:fs';
import {checkManualAcceptance} from './check-release-readiness.mjs';

const evidence = JSON.parse(fs.readFileSync('audit/acceptance.json', 'utf8'));
const failures = checkManualAcceptance(evidence);
fs.mkdirSync('artifacts', {recursive: true});
fs.writeFileSync('artifacts/manual-acceptance.json', JSON.stringify({ready: failures.length === 0, failures,
  manualScenarios: evidence.manualScenarios, finalScreenshotsVerified: evidence.finalScreenshotsVerified}, null, 2) + '\n');
if (failures.length) {
  console.error('Desktop/game acceptance incomplete:\n' + failures.map(f => ` - ${f}`).join('\n'));
  process.exitCode = 1;
} else console.log('Desktop/game acceptance complete.');
