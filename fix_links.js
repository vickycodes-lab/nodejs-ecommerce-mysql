const fs = require('fs');
const path = require('path');
const viewsDir = 'views';
const files = fs.readdirSync(viewsDir).filter(f => f.endsWith('.html'));
for(let file of files) {
  let filePath = path.join(viewsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/href="\/(.*?\.html)"/g, 'href="$1"');
  content = content.replace(/href="\/"/g, 'href="index.html"');
  fs.writeFileSync(filePath, content);
  console.log('Fixed links in', file);
}
