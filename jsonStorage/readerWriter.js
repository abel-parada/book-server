//First program layer. User does NOT see this.
//This access the Storage (book.json) and either reads it or writes it

'use strict';

const fs = require('fs').promises;

async function readStorage(storageFilePath){
    try{
        const data = await fs.readFile(storageFilePath, 'utf8');
        return JSON.parse(data);
    }
    catch(error){
        console.log(error.message);
        return [];
    };
};

async function writeStorage(storageFilePath, data){
    try{
        await fs.writeFile(storageFilePath,JSON.stringify(data,null,4),{
            encoding:'utf8',
            flag:'w'
        });
        return true;
    }
    catch{
        console.log(error.message);
        return false;
    }
};

module.exports={readStorage,writeStorage};