const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  content = content.replace(/Royal Umrah & Travels/g, 'Habibulhujaj Umrah & Travels');
  content = content.replace(/Royal Travels/g, 'Habibulhujaj Travels');
  content = content.replace(/Royal/g, 'Habibulhujaj');
  content = content.replace(/royalumrahandtravel/g, 'habibulhujaj');
  content = content.replace(/Rehman Travel/g, 'Habibulhujaj Travel');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'public' || file === 'assets') continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath);
    } else if (filePath.endsWith('.js') || filePath.endsWith('.jsx') || filePath.endsWith('.json') || filePath.endsWith('.html') || filePath.endsWith('.md')) {
      replaceInFile(filePath);
    }
  }
}

walk('./client/src');
walk('./server');
replaceInFile('./package.json');
replaceInFile('./client/package.json');
replaceInFile('./client/index.html');
