'use strict';

const {readStorage, writeStorage} = require('./../jsonStorage/readerWriter.js');

readStorage('./../jsonStorage/Parada_Millan_books.json').then(console.log).catch(console.log);

// writeStorage('./test.json', {bookID: 79, name:'Adventures of Abel', author:"Nunnes Peltoniemi", numberOfBooks: 688, pages: 100020});

//testing gitignore