//fs - File System Module
// import fs from 'fs'; Simple Version
import fs from 'fs/promises'; // Promise Version

// readfile() - callback
// fs.readFile('./file.txt','utf8', (err, data) =>
// {
//  if(err) throw err;
//   console.log(data);
// })


// readFileSync() - Synchronous version - Blocking (Stops rest of code) - Async is better

// const data = fs.readFileSync('./file.txt','utf8');
// console.log(data);

// readFile() - Promise Version .then() & async/await - 2 versions

// .then version:

// fs.readFile('./file.txt','utf8')
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => console.log(err));

// async/await version:

const readline= async () =>
{
    try
    {
        const data = await fs.readFile('./file.txt','utf8');
        console.log(data);
    } catch (error) 
    {
        console.log(error);
    }
};


// WriteFile - 3 versions - callback, promise, async/await

// async/await version

const writeFile = async() =>
{
    try
    {
        await fs.writeFile('./file.txt','I am writing to this file');
        console.log('File written');
    } catch (error) 
    {
        console.log(error);
    }
};

// appendFile()
const appendFile = async() => 
{
    try
    {
        await fs.appendFile('./file.txt','\n & I am appending to this file--');
        console.log('File appended');
    } catch (error)
    {
        console.log(error);
    }
}


writeFile();
appendFile();
readline();