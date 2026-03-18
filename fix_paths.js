const fs = require('fs');
const files = fs.readdirSync('views').filter(f => f.endsWith('.html'));
for(let file of files) {
  let path = 'views/' + file;
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/"\/css\/style\.css"/g, '"../public/css/style.css"');
  content = content.replace(/"\/js\/cart\.js"/g, '"../public/js/cart.js"');
  content = content.replace(/"\/js\/products\.js"/g, '"../public/js/products.js"');
  fs.writeFileSync(path, content);
}
let jsPath = 'public/js/products.js';
let jsContent = fs.readFileSync(jsPath, 'utf8');
jsContent = jsContent.replace(/<img src="\/images\//g, '<img src="../public/images/');
fs.writeFileSync(jsPath, jsContent);
console.log('Fixed paths manually!');
