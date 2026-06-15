// test/javascript/helpers/load_source.js
import { readFileSync } from 'fs';
import { runInThisContext } from 'vm';

export const loadSourceFile = (filename) => {
  const code = readFileSync(
    `${import.meta.dirname}/../../../app/assets/javascripts/inklewriter-source/${filename}.js`,
    'utf8'
  );
  runInThisContext(code);
}

// Stub globals the source files depend on
global.tr = (s) => s;
global.$ = { trim: (s) => s.trim() };