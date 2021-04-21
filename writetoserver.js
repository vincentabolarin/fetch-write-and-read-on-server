// Importing the required modules
const http = require('http');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Checking if the folder exists and creating it if it does not.
const resultFolder = 'result';
if (!fs.existsSync(resultFolder)) {
    fs.mkdirSync(resultFolder);
    console.log(`The directory ${resultFolder} has been successfully created.`);
}

// Fetching the data from JSON Placeholder, stringifying it, and writing it to posts.json in the created folder.
const jsonData = fetch('http://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(jsonData => {
    stringedData = JSON.stringify(jsonData, null, 2);
    fs.writeFile('./result/posts.json', stringedData, (err) => {
        if (err) throw err;
    });
})

// Checking the path of the posts.json file.
const fileDirectory = path.join(__dirname,'result', 'posts.json');
const port = 5454;

// Creating a server, reading the data on the checked path and rendering it on the server.
http.createServer((req, res) => {
    fs.readFile(fileDirectory, 'utf-8', (err, data) => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
    })
}).listen(port);
console.log(`The server is running on port ${port}, and the file has been rendered successfully.`)
