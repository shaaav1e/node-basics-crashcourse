import url from 'url';
const urlString = 'https://www.google.com/search?q=mental1ty';

// URL Object
const urlObj= new URL(urlString);

console.log(urlObj);

// Output of Above:

// URL {
//     href: 'https://www.google.com/search?q=mental1ty',
//     origin: 'https://www.google.com',
//     protocol: 'https:',
//     username: '',
//     password: '',
//     host: 'www.google.com',
//     hostname: 'www.google.com',
//     port: '',
//     pathname: '/search',
//     search: '?q=mental1ty',
//     searchParams: URLSearchParams { 'q' => 'mental1ty' },
//     hash: ''
//   }


//_____________________________________________________________________________________


// format()

console.log(url.format(urlObj)); //https://www.google.com/search?q=mental1ty

// import.meta.url - gives file URL

console.log(import.meta.url); 

// fileURLtoPath() - converts URL to a file path

console.log(url.fileURLToPath(import.meta.url));

// Getting search parameter

console.log(urlObj.search); //gives whole search query

const params= new URLSearchParams(urlObj.search);

// console.log(params); // 'q' => 'mental1ty' 

console.log(params.get('q')); //mental1ty

params.append('limit','5');

console.log(params); // { 'q' => 'mental1ty', 'limit' => '5' }

params.delete('limit');