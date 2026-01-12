/**
 * Learn and use Node for console based 
 * File System operations
 * 
 * READ and WRITE only.
 */

const fs = require('node:fs');

console.log("--File System Operations in Node.js--");
console.log("\n");
console.log("Read note.txt");
const note = fs.readFileSync('./note.txt', 'utf-8');
console.log("Content: \n");
console.log(note);
console.log("\n");
