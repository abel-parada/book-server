# API: Book data storage

## book.json

The id is unique. This is the format of the storage.

```json
[
  {
    "bookID": 1,
    "name": "Rebellion of Sophie Q. Lister",
    "author": "Jesse River",
    "numberOfBooks": 25,
    "pages": 500
  },
  {
    "bookID": 3,
    "name": "Databases - The rise and fall",
    "author": "Isla Shore",
    "numberOfBooks": 30,
    "pages": 250
  },
  {
    "bookID": 6,
    "name": "NoSql - New Hope",
    "author": "Antony Lee",
    "numberOfBooks": 1,
    "pages": 30
  }
]
```

### Public API (methods of Datastorage)

#### dataStorageLayer.js

These are the functions available to API users

- getAll()

  - returns an array of all books / []

- getOne(bookID)

  - returns a book object / NOT_FOUND

- insert(newBook)

  - returns INSERT_OK / NOT_INSERTED / ALREADY_IN_USE

- update(updatedBook)

  - returns UPDATE_OK / NOT_UPDATED

- remove(bookID)

  - returns REMOVE_OK / NOT_FOUND / NOT_REMOVED

- getter for status codes
  - returns an object of status codes

### Private API

#### readerWriter.js

- readStorage(storageFile)

  - returns an array of books / []

- writeStorage(storageFile, data)
  - returns true / false

#### storageLayer.js

- getAllFromStorage()

  - returns an array of books / []

- getOneFromStorage(id)

  - returns a book object / null

- addToStorage(newEmployee)

  - returns true/false

- updateStorage (updatedBook)

  - returns true/false

- removeFromStorage (id)
  - returns true/false

### status codes and messages

```js
const CODES = {
    PROGRAM_ERROR:0,
    NOT_FOUND:1,
    INSERT_OK:2,
    ....
}
```

The format of an status message is:

(status types are `error` or `info`)

```js
const MESSAGES = {
  PROGRAM_ERROR: () => ({
    message: "Sorry! Error in the program",
    code: CODES.PROGRAM_EROR,
    type: "error",
  }),
  NOT_FOUND: id =>({
    message: `No employee found with id ${id}`,
    code:CODES.NOT_FOUND,
    type:'error'
  }),
  INSERT_OK: id=>({
    message: `Employee ${id} was inserted`,
    code:CODES.INSERT_OK,
    type:'info'
  }),
  ....
};
```

#### storageConfig.json

We will use this to parametrize the path names for the book.json and the adapters.

```json
{
  "storageFile": "book.json",
  "adapterFile": "bookAdapter.js"
}
```

#### bookAdapter.js

This adapter will ensure that bookID, numberOfBooks and pages will be numbers instead of strings.
