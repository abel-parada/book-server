// This adapter will ensure that bookID, numberOfBooks and pages will be numbers instead of strings.

'use strict';

const adapt = (item) => {
    return{
        bookID: +item.bookID,
        name: item.name,
        author:item.author,
        numberOfBooks: +item.numberOfBooks,
        pages: +item.pages
    }
}

module.exports = {adapt};