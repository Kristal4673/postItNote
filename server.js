const express = require('express');
const cors = require('cors');
const fs = require("fs"); 
const path = require("path");
const database = require("./db/db");
const apiRoutes = require('./routes/apiRoutes');

//working off of port 3000
const app = express();
const PORT = process.env.PORT || 3000;

//import custom middleware 
//forces the origin to accept request 
app.use(
  cors({
    origin: "https://postit-note.herokuapp.com/",
  })
);

//deploying at local host 
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//use js api routes 
app.use('/api', apiRoutes); 

//app starts listening and its consoled logged 
app.listen(PORT, function () {
    console.log('app is listening on PORT ' + PORT)
});