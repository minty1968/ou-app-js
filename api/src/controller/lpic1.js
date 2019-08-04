import mongoose from 'mongoose';
import { Router } from 'express';
import LPIC1 from '../model/lpic1';
import bodyParser from 'body-parser';

export default({ config, db }) => {
  let api = Router();

  // '/api/lpic1' - GET all questions
  api.get('/', (req, res) => {
    LPIC1.find({}, (err, lpic1s) => {
      if (err) {
        res.send(err);
      }
      res.json(lpic1s);
    });
  });

  // '/api/lpic1/:id' - GET a specific question
  api.get('/:id', (req, res) => {
    LPIC1.findById(req.params.id, (err, lpic1) => {
      if (err) {
        res.send(err);
      }
      res.json(lpic1);
    });
  });

  // '/api/lpic1/QuestionType/:qType' - GET a question  by type
  api.get('/QuestionType/:qType', (req, res) => {
    LPIC1.find({ qType: req.params.qType }, (err, lpic1) => {
    if (err) {
      res.send(err);
    }
    res.json(lpic1);
  });
});

  // '/api/lpic1/TopicName/:name' - GET question by topic sub name
  api.get('/TopicName/:name', (req, res) => {
    LPIC1.find({ qType: req.params.qType }, (err, lpic1) => {
    if (err) {
      res.send(err);
    }
    res.json(lpic1);
  });
});

  // '/api/lpic1/add' - POST - add a question
  api.post('/add', (req, res) => {
    let newLPIC1 = new LPIC1();

    newLPIC1.name = req.body.name;
    newLPIC1.qNum = req.body.qNum;
    newLPIC1.weight = req.body.weight;
    newLPIC1.qType = req.body.qType;
    newLPIC1.question = req.body.question;
    newLPIC1.message = req.body.message;
    newLPIC1.imageFile = req.body.imageFile;
    newLPIC1.imgLocation = req.body.imgLocation;
    newLPIC1.answer1 = req.body.answer1;
    newLPIC1.answer2 = req.body.answer2;
    newLPIC1.answer3 = req.body.answer3;
    newLPIC1.answer4 = req.body.answer4;
    newLPIC1.answer5 = req.body.answer5;
    newLPIC1.correct = req.body.correct;

    newLPIC1.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Question saved successfully' });
    });
  });

  // '/api/lpic1/:id' - DELETE - remove a question
  api.delete('/:id', (req, res) => {
    LPIC1.findById(req.params.id, (err, lpic1) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
      if (lpic1 === null) {
        res.status(404).send("LPIC1 Not Found")
        return;
      }
      LPIC1.remove({
        _id: req.params.id
      }, (err, lpic1) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
	   });    
	  res.json({message: "Question Successfully Removed"}); 
	});
  });

    // '/v1/lpic1/:id' - PUT - update an existing record
  api.put('/:id', (req, res) => {
    let newLPIC1 = new LPIC1();

    LPIC1.findById(req.params.id, (err, lpic1) => {
      if (err) {
        res.send(err);
      }

      newLPIC1.name = req.body.name;
      newLPIC1.qNum = req.body.qNum;
      newLPIC1.weight = req.body.weight;
      newLPIC1.qType = req.body.qType;
      newLPIC1.question = req.body.question;
      newLPIC1.message = req.body.message;
      newLPIC1.imageFile = req.body.imageFile;
      newLPIC1.imgLocation = req.body.imgLocation;
      newLPIC1.answer1 = req.body.answer1;
      newLPIC1.answer2 = req.body.answer2;
      newLPIC1.answer3 = req.body.answer3;
      newLPIC1.answer4 = req.body.answer4;
      newLPIC1.answer5 = req.body.answer5;
      newLPIC1.correct = req.body.correct;

      lpic1.save(function(err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: 'Question info updated' });
      });
    });
  });
  
  return api;
}
