import { build } from 'esbuild';
await build({entryPoints:['src/app.mjs'], bundle:true, format:'esm', platform:'browser', target:'es2022', outfile:'dist/worker.mjs', loader:{'.html':'text'}, metafile:true}).then(result => {
  for (const output of Object.values(result.metafile.outputs)) {
    if (output.imports.some(i => i.external)) throw new Error('External runtime dependency found');
  }
  console.log('Hono Worker bundled successfully.');
});
