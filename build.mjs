import { access } from 'node:fs/promises';
for (const file of ['index.html','styles.css','app.js','core.js']) await access(`dist/${file}`);
console.log('Static site ready in dist/ — no dependency installation required.');
