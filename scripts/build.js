const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const outPath = path.join(rootDir, 'SmartNotes.html');

const html = fs.readFileSync(path.join(srcDir, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(srcDir, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(srcDir, 'app.js'), 'utf8');

// Reemplazar link de estilos por <style> inline
let standalone = html.replace(
  '<link rel="stylesheet" href="styles.css">',
  `<style>\n${css}\n</style>`
);

// Reemplazar script externo por <script> inline
standalone = standalone.replace(
  '<script src="app.js"></script>',
  `<script>\n${js}\n</script>`
);

fs.writeFileSync(outPath, standalone, 'utf8');
const rootIndexPath = path.join(rootDir, 'index.html');
fs.writeFileSync(rootIndexPath, standalone, 'utf8');
const sizeKb = (Buffer.byteLength(standalone, 'utf8') / 1024).toFixed(1);
console.log(`[BUILD] SmartNotes.html e index.html generados con éxito (${sizeKb} KB) en raíz`);
