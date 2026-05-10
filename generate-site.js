const fs = require('fs');
const path = require('path');
const talks = require('./talks'); // Our dummy talk data

const templatePath = path.join(__dirname, 'template.html');
const cssPath = path.join(__dirname, 'style.css');
const jsPath = path.join(__dirname, 'script.js');
const outputPath = path.join(__dirname, 'index.html');

// Read all necessary files
const htmlTemplate = fs.readFileSync(templatePath, 'utf8');
const cssContent = fs.readFileSync(cssPath, 'utf8');
const jsContent = fs.readFileSync(jsPath, 'utf8');
const talksDataJson = JSON.stringify(talks, null, 2); // Pretty print for readability

// Embed content into the HTML template
let finalHtml = htmlTemplate.replace('/* EMBED_CSS_HERE */', cssContent);
finalHtml = finalHtml.replace('// EMBED_TALKS_DATA_HERE', `window.TALKS_DATA = ${talksDataJson};`);
finalHtml = finalHtml.replace('// EMBED_JS_HERE', jsContent);

// Write the final index.html file
fs.writeFileSync(outputPath, finalHtml, 'utf8');

console.log('Successfully generated index.html');
