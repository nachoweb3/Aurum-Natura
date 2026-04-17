import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const workflow = await readFile(
  new URL('../.github/workflows/deploy-github-pages.yml', import.meta.url),
  'utf8'
);

test('github pages workflow deploys the static site folder from master', () => {
  assert.match(workflow, /on:\s*[\s\S]*push:\s*[\s\S]*branches:\s*[\s\S]*-\s*master/);
  assert.match(workflow, /workflow_dispatch:/);
  assert.match(workflow, /uses:\s*actions\/upload-pages-artifact@/);
  assert.match(workflow, /path:\s*\.\/site/);
  assert.match(workflow, /uses:\s*actions\/deploy-pages@/);
});
