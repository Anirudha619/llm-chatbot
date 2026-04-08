const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs');

const outfile = path.join(__dirname, '../public/chat-widget.js');

esbuild.build({
  entryPoints: [path.join(__dirname, '../src/components/standalone/index.tsx')],
  bundle: true,
  minify: true,
  sourcemap: true,
  format: 'iife',
  globalName: 'ChatWidget',
  outfile: outfile,
  loader: {
    '.tsx': 'tsx',
    '.ts': 'ts',
  },
  define: {
    'process.env.NODE_ENV': '"production"',
    'React': 'React',
    'ReactDOM': 'ReactDOM',
  },
  external: [],
  jsx: 'automatic',
}).then(() => {
  console.log('✅ Built: public/chat-widget.js');
  console.log('');
  console.log('Usage:');
  console.log('  <script src="/chat-widget.js" data-bot-name="My Bot"></script>');
}).catch((err) => {
  console.error('❌ Build failed:', err.message);
  process.exit(1);
});
