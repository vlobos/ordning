const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const server = express();

server.use(express.static(path.join(__dirname,'../build')));

const port = 3002;

server.listen(port, ()=>{
    console.log('listening to port: ', port)
})