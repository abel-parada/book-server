'use strict';

const http = require('http');
const path = require('path');

const express = require('express');
const app = express();

const {port,host,storage} = require('./serverConfig.json'); //This is from our config file so we can parametrize later

const Datastorage = require (path.join(__dirname, storage.storageFolder, storage.dataLayer)); //we import the class Datastorage we created in dataStorageLayer

const dataStorage = new Datastorage();

const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'pageViews'));

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

const menuPath = path.join(__dirname,'menu.html');

app.get('/',(req,res) => {
    res.sendFile(menuPath)
});

app.get('/all', (req,res) => dataStorage.getAll()
    .then(data => res.render('getAll', {result:data})));

app.get('/getBook', (req,res) => res.render('getOne', {
    title: 'Get book',
    header: 'Get book',
    action:'getBook'
}));

app.post('/getBook', (req,res) => {
    if(!req.body) res.sendStatus(500);

    const searchedID = req.body.bookID;//bookID has to match the same id as in the ejs input id.
    dataStorage.getOne(searchedID)
        .then(book => res.render('bookPage',{result:book}))
        .catch(error => sendErrorPage(res,error));
})

app.get('/removeBook', (req,res) => res.render('getOne',{
    title: 'Remove',
    header: 'Remove a book from stock',
    action: '/removeBook'
}));

app.get('/inputform', (req,res) => res.render('form',{
    title: 'Add a book',
    header: 'Add new book',
    action: '/insert',
    bookID: {value:'',readonly:''},
    name: {value:'',readonly:''},
    author: {value:'', readonly:''},
    numberOfBooks: {value:'',readonly:''},
    pages:{value:'',readonly:''}
}))

app.post('/insert', (req,res) => {
    if(!req.body) res.sendStatus(500);
    dataStorage.insert(req.body)
        .then(status => sendStatusPage(res,status))
        .catch(error => sendErrorPage(res,error));
})

app.get('/updateform', (req,res) => res.render('form',{
    title: 'Book data update',
    header: 'Update info on a book',
    action: '/update-book-data',
    bookID: {value:'',readonly:''},
    name: {value:'',readonly:'readonly'},
    author: {value:'', readonly:'readonly'},
    numberOfBooks: {value:'',readonly:'readonly'},
    pages:{value:'',readonly:'readonly'}
}));

app.post('/update-book-data', (req,res) => {
    if(!req.body) res.sendStatus(500);
    dataStorage.getOne(req.body.bookID)
    .then( book => res.render('form',{
        title: 'Book data update',
    header: 'Update info on a book',
    action: '/update',
    bookID: {value: book.bookID,readonly:'readonly'},
    name: {value: book.name,readonly:''},
    author: {value: book.author, readonly:''},
    numberOfBooks: {value: book.numberOfBooks,readonly:''},
    pages:{value: book.pages,readonly:''}
    }))
    .catch(error=>sendErrorPage(res,error));
});

app.post('/update',(req,res)=> {
    if(!req.body) res.sendStatus(500);
    dataStorage.update(req.body)
        .then(status=>sendStatusPage(res,status))
        .catch(error=>sendErrorPage(res,error))
});

app.post('/removeBook', (req,res)=>{
    if(!req.body) res.sendStatus(500);

    const desiredBookId = req.body.bookID;
    dataStorage.remove(desiredBookId)
        .then(status=>sendStatusPage(res,status))
        .catch(error=>sendErrorPage(res,error))
});

server.listen(port, host, () => console.log(`Server ${host}:${port} up, running, listening and serving`)); 

function sendErrorPage(res,error, title='Error', header='Error'){
    sendStatusPage(res,error, title, header);
}

function sendStatusPage(res,status,title='Status',header='Status'){
    return res.render('statusPage', {title,header,status});
}