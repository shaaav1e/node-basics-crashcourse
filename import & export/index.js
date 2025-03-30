//ES6 Modules (ECMAScript 6) -> NEW WAY
//import  getPosts, {getPostsLength} from "./postcontroller.js";
import {grades} from './random.js';
const output=grades();
console.log(output);

//_______________________________________________

// import vowels from "./postcontroller.js";
// console.log(getPosts());
// console.log(getPostsLength());
// console.log(`Vowel Count: ${vowels()}`); //executes function
// console.log('Starting of Node');
// console.log(global);

//___________________________________________________________________

// Old way of importing modules

// const {generaterandomnumber,celciustofahrenheit} = require('./utils');
// console.log(`Random Number: ${generaterandomnumber()}`);
// console.log(`Celcius to Fahrenheit: ${celciustofahrenheit(5)}`);


