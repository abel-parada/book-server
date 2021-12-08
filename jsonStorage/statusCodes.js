'use strict';

const CODES = {
    PROGRAM_ERROR:0,
    NOT_FOUND:1,
    INSERT_OK:2,
    NOT_INSERTED:3,
    ALREADY_IN_USE:4,
    REMOVE_OK:5,
    NOT_REMOVED:6,
    UPDATE_OK:7,
    NOT_UPDATED:8
}

const MESSAGES = {
    PROGRAM_ERROR: () => ({
      message: "Sorry! Error in the program",
      code: CODES.PROGRAM_EROR,
      type: "error",
    }),
    NOT_FOUND: bookID =>({
      message: `No book found with ID ${bookID}`,
      code:CODES.NOT_FOUND,
      type:'error'
    }),
    INSERT_OK: bookID=>({
      message: `Book ${bookID} was inserted`,
      code:CODES.INSERT_OK,
      type:'info'
    }),
    NOT_INSERTED: ()=>({
        message: `Book was not inserted`,
        code: CODES.NOT_INSERTED,
        type: 'error'
    }),
    ALREADY_IN_USE:bookID=>({
        message: `ID ${bookID} is already in use`,
        code: CODES.ALREADY_IN_USE,
        type: 'error'
    }),
    REMOVE_OK: bookID => ({
        message: `Book ${bookID} is removed`,
        code:CODES.REMOVE_OK,
        type:'info'
    }),
    NOT_REMOVED: bookID => ({
        message: `No book found with ${bookID}. Nothing removed`,
        code: CODES.NOT_REMOVED,
        type: 'error'
    }),
    UPDATE_OK: bookID=>({
        message: `Book with ID ${bookID} is updated`,
        code: CODES.UPDATE_OK,
        type: 'info'
    }),
    NOT_UPDATED: ()=>({
        message: `Data was not updated`,
        code: CODES.NOT_UPDATED,
        type:'error'
    })
};

module.exports={CODES, MESSAGES};