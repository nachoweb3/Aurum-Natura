import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../site/css/style.css', import.meta.url), 'utf8');

test('mobile breakpoint keeps the header compact and the cart on the first row', () => {
  assert.match(
    css,
    /@media \(max-width: 640px\)[\s\S]*?\.header-shell\s*\{[\s\S]*?grid-template-columns:\s*minmax\(0,\s*1fr\)\s*auto\s*auto;[\s\S]*?\}/
  );
  assert.match(
    css,
    /@media \(max-width: 640px\)[\s\S]*?\.header-actions\s*\{[\s\S]*?grid-column:\s*auto;[\s\S]*?justify-content:\s*flex-end;[\s\S]*?\}/
  );
});

test('mobile breakpoint reduces hero density and oversized heading scale', () => {
  assert.match(
    css,
    /@media \(max-width: 640px\)[\s\S]*?\.hero-block\s*\{[\s\S]*?min-height:\s*auto;[\s\S]*?padding:\s*24px 0 16px;[\s\S]*?\}/
  );
  assert.match(
    css,
    /@media \(max-width: 640px\)[\s\S]*?\.hero-copy h1,\s*[\s\S]*?font-size:\s*clamp\(2rem,\s*10\.8vw,\s*3\.25rem\);/
  );
});
