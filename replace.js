const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Replace names
  content = content.replace(/Habibulhujaj Umrah & Travels/g, 'Habib Ul Hujjaj');
  content = content.replace(/Habibulhujaj Travels/g, 'Habib Ul Hujjaj');
  content = content.replace(/Habibulhujaj/g, 'Habib Ul Hujjaj');
  content = content.replace(/Habib Ul Hujjaj Travel Logo/g, 'Habib Ul Hujjaj Logo');
  content = content.replace(/Habibulhujaj Travel Logo/g, 'Habib Ul Hujjaj Logo');
  
  // Replace Gold with Green (Primary)
  content = content.replace(/#CD9933/g, '#013334');
  
  // Specific fix for dark backgrounds in Home.jsx if needed
  // However, I'll try to stick to the system variables where possible

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'public' || file === 'assets' || file === 'replace.js') continue;
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
walk('./api');
walk('./server');
replaceInFile('./package.json');
replaceInFile('./client/package.json');
replaceInFile('./client/index.html');
replaceInFile('./client/tailwind.config.js');
