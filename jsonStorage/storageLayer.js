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
    return storage.find(searchedBook => searchedBook.bookID == bookID) || null;
};

async function addToStorage(newBook){
   const storage = await readStorage(storageFilePath);
   storage.push(adapt(newBook));
   return await writeStorage(storageFilePath,storage);
}

async function updateStorage(updatedBook){
    const storage = await readStorage(storageFilePath);
    const oldBook = storage.find(book => book.bookID == updatedBook.bookID);
    if (oldBook){
        Object.assign(oldBook, adapt(updatedBook)); // we use the Object constructor and we use assign method
        return await writeStorage(storageFilePath,storage);
    }
    return false;
}

async function removeFromStorage(bookID){
    const storage = await readStorage(storageFilePath);
    const bookIndex = storage.findIndex( book => book.bookID == bookID);
    if(bookIndex < 0) return false;
    storage.splice(bookIndex,1);
    return await writeStorage(storageFilePath,storage);
}

module.exports = { getAllFromStorage , getOneFromStorage , addToStorage, updateStorage, removeFromStorage};