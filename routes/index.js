const router = require('express').Router();
const db = require('../db');
const { Word, DataType } = db.models;

module.exports = router; 

router.get('/words', (req, res, next)=> {
  Word.findAll()
    .then( words => {
      res.status(201).send(words);
    });
});

router.get('/words/:id', (req, res, next)=> {
  Word.findById(req.params.id, {
    include: [{
    model: DataType,
    as: 'wordType'
    }]
  })
    .then( word => {
      if(!word){
        return res.status(404).send({ foo: 'bar' });
      }
      res.send({ theWord: word })
    })
    .catch(next);
});

router.get('/numberOfThes', (req, res, next)=> {
  Word.getTheCount()
    .then( count => res.send( { count }))
    .catch(next);
});
