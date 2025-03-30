import path from 'path';
import url from 'url';

const filePath= './dir1/dir2/file.txt';

// basename()

console.log(path.basename(filePath)); //gives file name

// dirname()
console.log(path.dirname(filePath)); //gives directory name

// extname()
console.log(path.extname(filePath)); //gives extension of file

// parse()
console.log(path.parse(filePath)); //gives object of file path

// {
//     root: '',
//     dir: './dir1/dir2',
//     base: 'file.txt',
//     ext: '.txt',
//     name: 'file'
//   }


// Can access these directly if using common js , for es6 use url module
const __filename = url.fileURLToPath(import.meta.url);
const __dirname =  path.dirname(__filename);
console.log(__filename, __dirname);

// Join() - will put the correct path separator for windows or linux
const filePath2 = path.join(__dirname, 'dir1', 'dir2', 'file.txt'); //basically connected dir1,dir2, and file.txt with __dirname
console.log(filePath2);


// C:\Users\Your_Name\Desktop\Main Folder(if any) \Sub Folder(if any) \dir1\dir2\file.txt


// resolve() - basically joins the path and gives the absolute path - same thing as join() but gives absolute path
const filePath3 = path.resolve(__dirname, 'dir1', 'dir2', 'file.txt'); 
console.log(filePath3);