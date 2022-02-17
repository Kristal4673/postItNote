const { v4: uuidv4 } = require("uuid");
//this calls in express.js
const router = require("express").Router();
const fs = require("fs");
const path = require("path");

//sends info to get route
router.get("/notes", (req, res) => {
  let notes = fs.readFileSync(path.resolve(__dirname, "../db/db.json"));
  res.json(JSON.parse(notes));
});

router.post("/notes", function (req, res) {
  const { title, text } = req.body;
  let newEntry = {
    id: uuidv4(),
    title: title,
    text: text,
  };
  fs.readFile(path.resolve(__dirname, "../db/db.json"), function (err, data) {
    var json = JSON.parse(data);
    json.push(newEntry);

    fs.writeFileSync(
      path.resolve(__dirname, "../db/db.json"),
      JSON.stringify(json)
    );
  });
  if(!newEntry) console.log("Entry NOT found! ") 
  res.status(200).json(newEntry)
});

router.delete("/notes/:id", (req, res) => {
  const id = req.params.id;
  fs.readFile(path.resolve(__dirname, "../db/db.json"), function (err, data) {
    var json = JSON.parse(data);
    json = json.filter((item) => item.id != id);
    fs.writeFileSync(
      path.resolve(__dirname, "../db/db.json"),
      JSON.stringify(json)
    );
  });
});

module.exports = router;
