const express = require('express');
const mysql = require('mysql2');
const path = require('path');
require('ejs');
const fs = require('fs');
const fileUpload = require('express-fileupload')

const home = require('./model/home');
const designer = require('./model/designer');

/********** VARIABLES **********/
let port = process.env.PORT || 3055;
let nodeEnv = process.env.NODE_ENV.toLowerCase();
global.hostingDir = nodeEnv==='development' ? '' : '/yahav/fragrance_yummy/'

/*********** DB CONNECTION **********/
const db = mysql.createConnection({
    host: 'localhost', // or '127.0.0.1'
    port: 3306,
    database: process.env.DB_NAME,
    user: process.env.DB_USER, 
    password: process.env.DB_PASS
})

db.connect(err=>{
    if (err) {
        throw(err)
    }
    console.log('I fill lucky today. I\'ve connected to DB!!!');
})

global.db=db;
/***** CREATE THE SERVER ******/
const app = express();

/***** VARIABLES OF EXPRESS ******/
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))

/******* MIDDLEWARE *********/
app.use(hostingDir,express.static(path.join(__dirname,'static')));
app.use(express.static(path.join(__dirname,'static')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());//לא חייב(להפוך לאובייקט)
app.use(fileUpload());
/******* ROUTING *********/
// app.get('/',home.getHomePage);
// app.get('/add',designer.getAddPage);
// app.post('/add',designer.addFragrance);
// app.get('/edit/:id',designer.getEditPage);
// app.post('/edit/:id',designer.editFragrance);
// app.get('/delete/:id',designer.deleteFragrance);
app.get(`${hostingDir}/`,home.getHomePage);
app.get(`${hostingDir}/add`,designer.getAddPage);
app.post(`${hostingDir}/add`,designer.addFragrance);
app.get(`${hostingDir}/edit/:id`,designer.getEditPage);
app.post(`${hostingDir}/edit/:id`,designer.editFragrance);
app.get(`${hostingDir}/delete/:id`,designer.deleteFragrance);
/*********LISTENER *********/
app.listen(port, () => {

    console.log(`Listening on the port ${port}`)

})