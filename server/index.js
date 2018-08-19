const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const server = express();

const { router } = require('./router')

server.use(express.static(path.join(__dirname,'../build')));

server.use('/', router)

const port = 3002;

server.listen(port, ()=>{
    console.log('listening to port: ', port)
})