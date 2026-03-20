import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'src/components/LandingPage/Navbar.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const importIndex = content.indexOf('import React, { useState, useEffect, useRef } from "react";');
if (importIndex !== -1 && importIndex > 10) {
  content = content.substring(importIndex);
}

content = content.replace(/<<<<<<< HEAD[\s\S]*?=======\r?\n([\s\S]*?)>>>>>>> [a-f0-9]{40}/g, '$1');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed Navbar.jsx');
