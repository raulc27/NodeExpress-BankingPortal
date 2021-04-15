const express = require('express');
const router = express.Router();

const {writeJSON, accounts} = require('../data');


router.get('/transfer', function(req,res,next){
    res.render('transfer',{
        
        
    })
})

router.get('/transfer',(req,res)=>res.render('transfer'));

router.post('/transfer',(req,res)=>{
    accounts[req.body.from].balance = accounts[req.body.from].balance-req.body.amount;
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance)+parseInt(req.body.amount,10);

    writeJSON(accounts,null,4)

    res.render('transfer',{message:'Transfer Completed'})
});

router.get('/payment',(req,res)=>res.render('payment',{account:accounts.credit}));


router.post('/payment',(req,res)=>{
    accounts.credit.balance -= req.body.amount;
    accounts.credit.available += parseInt(req.body.amount,10);
   
    writeJSON(accounts,null,4);
    
    res.render('payment',{message:'Payment Sucessfull', account:accounts.credit});

})

module.exports = {router};