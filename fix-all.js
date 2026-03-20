import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function walkSync(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === 'ENOTDIR' || err.code === 'EBADF') filelist.push(dirFile);
    }
  });
  return filelist;
}

const srcDir = path.join(__dirname, 'src');
const allFiles = walkSync(srcDir).filter(f => f.endsWith('.js') || f.endsWith('.jsx') || f.endsWith('.css'));

let fixedCount = 0;

for (const filePath of allFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('<<<<<<< HEAD')) {
    const originalContent = content;
    
    // Some markers might not have the hash, so we match both cases:
    // With hash: >>>>>>> f4bf0bf0dc89ea6ef78b3b4a28f2cf67f261a610
    // Without hash: >>>>>>> 
    
    content = content.replace(/<<<<<<< HEAD[\s\S]*?=======\r?\n([\s\S]*?)>>>>>>> [a-f0-9]{40}\r?\n?/g, '$1');
    content = content.replace(/<<<<<<< HEAD[\s\S]*?=======\r?\n([\s\S]*?)>>>>>>> [^\r\n]*\r?\n?/g, '$1');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed conflict in: ' + filePath);
      fixedCount++;
    }
  }
}

console.log('Total files fixed: ' + fixedCount);
