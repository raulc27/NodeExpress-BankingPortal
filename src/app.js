const fs = require('fs');
const path = require('path');
const express = require('express');
const {accounts, users, writeJSON} = require('./data');

const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');



const app = express();

var router = express.Router();
var http = require('http');

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({extended:false}))

// reading accounts.json, creating accountData and accounts... (raul)



//reading users.json, creating userData and users (raul)


app.use('/',router.get('/', function(req,res,next){
    res.render('index',{
        title:'Account Summary',
        accounts:accounts
    })
}))

app.use('/',router.get('/profile', function(req,res,next){
    res.render('profile',{
        
        user:users[0]
    })
}))

app.use('/account',accountRoutes);
app.use('/services',servicesRoutes);

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

// creating function for error...
function onError(err){
    if(err.syscall !== 'listen'){
        throw err;
    }

    var bind = typeof port === 'string' ? 'Pipe' + port : 'Port' + port;

    // cool msg errors... (raul)
    switch(err.code){
        case 'EACCESS':
            console.error(bind + 'requires privileges you dont have')
            process.exit(1);
            break;

        case 'EADDRINUSE':
            console.error(bind  + 'port busy, out!');
            process.exit(1)
            break;
        
        default:
            throw err;
    }
}


//var port = normalizePort(process.env.PORT || '3000');

let port = process.env.PORT || 3000;

//listening...
app.listen(port,()=>{console.log('PS Project Running on port 3000!')});

//server.on('err',onError);



