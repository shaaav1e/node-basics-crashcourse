//Global object - don't need to import it - process.env (used before)

// console.log(process);

// console.log(process.argv); // useful for command line interface
// console.log(process.argv[2]);



// process.env

console.log(process.env.COMPUTERNAME);


// pid
console.log(process.pid);

// cwd() - current working directory
console.log(process.cwd());

// title
console.log(process.title);

// memoryUsage()
console.log(process.memoryUsage());

// update()
console.log(process.uptime());

process.on('exit', (code) =>
{
    console.log(`About to exit with code: ${code}`);
})

// exit()
process.exit(0); //0 is for success
console.log("Wont show because process is exited");



// Debugger modules, streams & tests - More to do