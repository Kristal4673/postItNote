//this calls in express.js
const express = require('express')
//automaticly does a random string 
// import { v4 as uuidv4 } from "uuid";

const db = require('../db/db.json')

const router = express.Router()

//sends info to get route
router.get('/', (req, res) => {
    res.json(db)
})

router.post('/create', function(req, res) {
    const { title, text } = req.body
    console.log(req.body)

    res.send(req.body)
})
module.exports = router