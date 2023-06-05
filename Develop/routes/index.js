const db = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../helpers/fsUtils');
  

db.get('/api/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

db.get('/:db_id', (req, res) => {
    const dbId = req.params.db_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((db) => db.db_id === dbId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
  });

db.post('/api/notes', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newdb = {
        title,
        text,
        tip_id: uuidv4(),
      };
  
      readAndAppend(newdb, './db/tips.json');
      res.json(`Added successfully`);
    } else {
      res.error('Error in adding');
    }
});

module.exports = db;
