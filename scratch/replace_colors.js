const fs = require('fs');
const path = require('path');

const filePaths = [
  path.join(__dirname, '../client/src/pages/Flights.jsx'),
  path.join(__dirname, '../client/src/pages/TaxiServices.jsx'),
  path.join(__dirname, '../client/src/pages/Admin/Dashboard.jsx'),
  path.join(__dirname, '../client/src/pages/Admin/Login.jsx'),
  path.join(__dirname, '../client/src/pages/Packages.jsx'),
  path.join(__dirname, '../client/src/pages/PackageDetail.jsx'),
  path.join(__dirname, '../client/src/pages/BlogPost.jsx')
];

const replacements = [
  { from: /#001c1d/gi, to: '#0B1B3D' },
  { from: /#001b1c/gi, to: '#0B1B3D' },
  { from: /#002f30/gi, to: '#182d56' },
  { from: /#002526/gi, to: '#12244a' },
  { from: /#ffc65c/gi, to: '#FFC55B' },
  { from: /#013334/gi, to: '#0B1B3D' }
];

filePaths.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    replacements.forEach(rep => {
      content = content.replace(rep.from, rep.to);
    });
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Successfully updated colors in: ${filePath}`);
    } else {
      console.log(`No changes made to: ${filePath}`);
    }
  } else {
    console.log(`File not found: ${filePath}`);
  }
});
