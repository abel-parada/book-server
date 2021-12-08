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