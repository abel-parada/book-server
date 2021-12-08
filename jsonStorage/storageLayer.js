// second program layer. User does NOT see this.

'use strict';

const path = require('path');

// we import our functions from the first program layer: readerWriter.js
const {readStorage, writeStorage} = require('./readerWriter.js');

// we import the following from storageConfig with the aim of parametrization
const {storageFile, adapterFile} = require('./storageConfig.json');

const storageFilePath = path.join(__dirname, storageFile);

const {adapt} = require(path.join(__dirname,adapterFile));

async function getAllFromStorage(){
    return readStorage(storageFilePath);
};

async function getOneFromStorage(bookID){
    const storage = await readStorage(storageFilePath);
    return storage.find(item => item.bookID == bookID) || null;
};