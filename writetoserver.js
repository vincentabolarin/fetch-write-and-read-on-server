const http = require('http');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const resultFolder = 'result';
if (!fs.existsSync(resultFolder)) {
    fs.mkdirSync(resultFolder);
    console.log(`The directory ${resultFolder} has been successfully created.`);
}

const jsonData = fetch('http://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(jsonData => {
    stringedData = JSON.stringify(jsonData, null, 2);
    fs.writeFile('./result/posts.json', stringedData, (err) => {
        if (err) throw err;
    });
})

const fileDirectory = path.join(__dirname,'result', 'posts.json');
const port = 5454;

http.createServer((req, res) => {
    fs.readFile(fileDirectory, 'utf-8', (err, data) => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
    })
}).listen(port);
console.log(`The server is running on port ${port}, and the file has been rendered successfully.`)