// Third program layer. User DOES see this

'use strict';

// const {resolveInclude} = require ('ejs');
const {CODES, MESSAGES} = require('./statusCodes.js');

const {getAllFromStorage, getOneFromStorage, addToStorage, updateStorage, removeFromStorage} = require('./storageLayer');


// Datastorage class. We define it and export it right away
module.exports = class Datastorage{

    getAll(){
        return getAllFromStorage();
    }

    getOne(bookID){
        return new Promise(async (resolve,reject) => {
            if (!bookID){
                reject(MESSAGES.NOT_FOUND('--empty--'));
            }
            else {
                 const result = await getOneFromStorage(bookID);
                 if (result){
                     resolve(result);
                 }
                 reject(MESSAGES.NOT_FOUND(bookID));
            };
        });
    };

    insert(book){
        return new Promise (async (resolve,reject) =>{
            if(book){
                if(!book.bookID)
                    reject(MESSAGES.NOT_INSERTED);
                else if (await getOneFromStorage(book.bookID)){
                    reject(MESSAGES.ALREADY_IN_USE(book.bookID));
                }
                else if (await addToStorage(book)){
                    resolve(MESSAGES.INSERT_OK(book.bookID));
                }
                else{
                    reject(MESSAGES.NOT_INSERTED());
                }
            }
            reject(MESSAGES.NOT_INSERTED());
        })
    }

    update(book){
        return new Promise (async(resolve, reject) => {
            if(book){
                if(await updateStorage(book)){
                    resolve(MESSAGES.UPDATE_OK(book.bookID))
                }
                reject(MESSAGES.NOT_UPDATED());
            }
            reject(MESSAGES.NOT_UPDATED());
        });
    };

    remove(bookID){
        return new Promise (async (resolve,reject) => {
            if(!bookID){
                reject(MESSAGES.NOT_FOUND('--empty--'));
            }
            else if (await removeFromStorage(bookID)) {
                resolve(MESSAGES.REMOVE_OK(bookID));
            }
            else {
                reject(MESSAGES.NOT_REMOVED(bookID));
            }
        });
    };
};

// function getCODES() {
//     return CODES;
// }

// console.log(getCODES());

// function getAll(){
//     return getAllFromStorage();
// }
// console.log(getAll());

// function getOne(bookID){
//     return new Promise(async (resolve,reject) => {
//         if (!bookID){
//             reject(MESSAGES.NOT_FOUND('--empty--'));
//         }
//         else {
//              const result = await getOneFromStorage(bookID);
//              if (result){
//                  resolve(result);
//              }
//              reject(MESSAGES.NOT_FOUND(bookID));
//         };
//     });
// };

