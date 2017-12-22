/**
 * This endpoint is used to update the score of an user
 * with a POST method
 * @author Tano Iannetta
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const ScoreProcessor = require('../services/scoreProcessor');

module.exports = (app) => {
  app.use('/', router);
};

// POST method
router.post('/event', (req, res) => {

  const payload = req.body;
  let scoreProcessor = new ScoreProcessor();

  let incrementScore = 0;

  if(payload.type === "login")
  {
    incrementScore = scoreProcessor.processStrengthScore(payload.properties.strength)
  }

  // update user's score
  User.findOneAndUpdate({username: payload.properties.username},{$inc: {score:incrementScore}}, function (err, user) {
  if (err) {
    res.send("Error occurs") //todo
  }
  else if(user){
    res.send("Score update successfully");
    }
  else {
      res.send("User does not exists");
    }
  });
});
