const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db/config.js')

const server = express();

const { router } = require('./router')

server.use(express.static(path.join(__dirname,'../build')));

server.use('/api', router)

const port = 3002;

server.listen(port, ()=>{
    console.log('listening to port: ', port)
})