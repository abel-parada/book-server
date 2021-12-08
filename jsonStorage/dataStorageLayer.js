// Third program layer. User DOES see this

'use strict';

const {resolveInclude} = require ('ejs');
const {CODES,MESSAGES} = require('./statusCodes.js');

const {getAllFromStorage, getOneFromStorage, addToStorage, updateStorage, removeFromStorage} = require('./storageLayer');


// Datastorage class. We define it and export it right away
module.exports = class Datastorage{
    getCODES(){
        return CODES;
    };
}

function getCODES() {
    return CODES;
}

console.log(getCODES());