const fs = require('fs');
const path = require('path');
const express = require('express');


const app = express();

var router = express.Router();
var http = require('http');

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({extended:true}))

// reading accounts.json, creating accountData and accounts... (raul)
const accountData = fs.readFileSync(__dirname+'/json/accounts.json',{
    encoding:'utf8',
    flag:'r'
 
});

const accounts = JSON.parse(accountData);

//reading users.json, creating userData and users (raul)
const userData = fs.readFileSync(__dirname+'/json/users.json',{
    encoding:'utf8',
    flag:'r'
});

const users = JSON.parse(userData);


app.use('/',router.get('/', function(req,res,next){
    res.render('index',{
        title:'Account Summary',
        accounts:accounts
    })
}))


app.use('/',router.get('/savings', function(req,res,next){
    res.render('account',{
        
        account:accounts.savings
    })
}))

app.use('/',router.get('/credit', function(req,res,next){
    res.render('account',{
        
        account:accounts.credit
    })
}))

app.use('/',router.get('/checking', function(req,res,next){
    res.render('account',{
        
        account:accounts.checking
    })
}))

app.use('/',router.get('/profile', function(req,res,next){
    res.render('profile',{
        
        user:users[0]
    })
}))

app.use('/',router.get('/transfer', function(req,res,next){
    res.render('transfer',{
        
        
    })
}))


app.post('/transfer',(req,res)=>{
    accounts[req.body.from].balance = accounts[req.body.from].balance-req.body.amount;
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance)+parseInt(req.body.amount,10);

    const accountsJSON = JSON.stringify(accounts,null,4);

    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');
    res.render('transfer',{message:'Transfer Completed'})
});

app.post('/payment',(req,res)=>{
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount,10);
    const accountsJSON = JSON.stringify(accounts, null, 4);

    fs.writeFileSync(path.join(__dirname,'json','accounts.json'), accountsJSON, 'utf8');

    res.render('payment',{message:'Payment Sucessfull', account:accounts.credit});

})

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



