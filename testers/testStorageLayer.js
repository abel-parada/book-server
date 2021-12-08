'use strict';

const {getAllFromStorage, getOneFromStorage, addToStorage, updateStorage, removeFromStorage} = require('./../jsonStorage/storageLayer.js');

// getAllFromStorage().then(console.log).catch(console.log);

// getOneFromStorage(2).then(console.log).catch(console.log);

// const newBook = {
//     "bookID": "79",
//     "name": "A Muchi in Paradise",
//     "author": "Parada Peltoniemi",
//     "numberOfBooks": "45",
//     "pages": "7000"
//   }

// addToStorage(newBook).then(console.log).catch(console.log);

// const newBookUpdated = {
//     "bookID": "79",
//     "name": "A Muchi in Paradise",
//     "author": "Parada Peltoniemi",
//     "numberOfBooks": "5",
//     "pages": "7000"
//   }

// updateStorage(newBookUpdated).then(console.log).catch(console.log);

removeFromStorage(79).then(console.log).catch(console.log);
