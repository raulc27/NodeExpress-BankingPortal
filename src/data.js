const fs = require('fs');
const path = require('path');


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

writeJSON = () => {
    
    const accountsJSON = JSON.stringify(accounts,null,4);

    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');
}


module.exports = { accounts, accountData, writeJSON}