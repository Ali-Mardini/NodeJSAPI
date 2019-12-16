const express = require('express');
const app = express();
const morgan  = require('morgan');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');



//import routes
 const dataRoutes = require('./api/routes/data');


// use morgan to tack logs
app.use(morgan('dev'));


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.use('/data?:eventType',dataRoutes);

app.use('/data?:repoId',dataRoutes);

app.use('/data?:actor',dataRoutes);

app.use('/data',dataRoutes);

app.use('/data?:actorLogin',dataRoutes);



// Handling the errors
app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((req,res,next)=>{
    res.status(err.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
});

//export the app
module.exports = app;