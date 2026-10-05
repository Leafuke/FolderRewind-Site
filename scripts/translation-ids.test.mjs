import {test} from 'node:test';
import assert from 'node:assert/strict';
import {extractTranslationIds, missingTranslationIds} from './translation-ids.mjs';

test('ignores DOM anchors, unrelated objects, strings and comments', () => {
  const source = `import Translate, {translate} from '@docusaurus/Translate';
    const data = {id: 'unrelated'};
    // translate({id: 'comment'});
    const example = "translate({id: 'string'})";
    const view = <section id="preview"><h2 id="preview-heading" /><Translate id="real">Text</Translate></section>;`;
  assert.deepEqual(extractTranslationIds(source), ['real']);
});
test('finds translate calls and JSX, including imported aliases and expression ids', () => {
  const source = `import T, {translate as tr} from '@docusaurus/Translate';
    const title = tr({id: 'title', message: 'Title'});
    const view = <><T id={'label'}>Label</T><T id="self" /></>;`;
  assert.deepEqual(extractTranslationIds(source), ['label', 'self', 'title']);
});
test('reports a missing real English translation but never asks for anchor translations', () => {
  const source = `import T from '@docusaurus/Translate'; const v = <section id="features"><T id="missing">Missing</T><T id="present">Present</T></section>;`;
  assert.deepEqual(
    missingTranslationIds(extractTranslationIds(source), {present: {message: 'Present'}}),
    ['missing'],
  );
});
test('deduplicates ids and ignores similarly named components from other modules', () => {
  assert.deepEqual(
    extractTranslationIds(
      `import Translate from './custom'; const x = <Translate id="not-a-translation" />;`,
    ),
    [],
  );
  assert.deepEqual(
    extractTranslationIds(
      `import {translate} from '@docusaurus/Translate'; translate({id: 'same'}); translate({id: 'same'});`,
    ),
    ['same'],
  );
});
