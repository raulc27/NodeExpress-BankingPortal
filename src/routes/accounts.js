const express = require('express');
const router = express.Router();

const {accounts} = require('../data');


router.get('/savings', function(req,res,next){
    res.render('account',{
        
        account:accounts.savings
    })
})

router.get('/credit', function(req,res,next){
    res.render('account',{
        
        account:accounts.credit
    })
})

router.get('/checking', function(req,res,next){
    res.render('account',{
        
        account:accounts.checking
    })
})


module.exports = {router}

