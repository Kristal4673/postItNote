const express = require('express')
const cors = require('cors')
const apiRoutes = require('./routes/apiRoutes')

//working off of port 3004
const app = express()
const PORT = 3004;

app.use(cors());


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
//use js api routes 
app.use('/api/notes', apiRoutes); 

//app starts listening and its consoled logged 
app.listen(PORT, ()=> console.log('app is listening'))