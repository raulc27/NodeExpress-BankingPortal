const fs = require('fs');
const path = require('path');
const express = require('express');


const app = express();

var router = express.Router();
var http = require('http');

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));




app.use('/',router.get('/', function(req,res,next){
    res.render('index',{title:'Olá'})
}))

// setting up port and server...

function normalizePort(val){
    var port = parseInt(val,10);
    if(isNaN(port)){
        return val;
    }

    if(port>=0){
        return port;
    }

    return false;
}


var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// creating http server... 
var server = http.createServer(app);

//listening...
server.listen(port);


console.log('PS Project Running on port 3000!');

