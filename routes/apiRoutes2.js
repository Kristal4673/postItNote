const express = require('express');
const router = express.Router();
const db = require('../db/db.json');
router.use(express.json());
router.get('/notes', (req, res) => { res.json(db); });
router.post('/notes', (req, res) => { db.push(req.body)  
    res.json(db);
})

module.exports = router;