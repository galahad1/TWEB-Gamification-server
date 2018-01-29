/**
 * This endpoint is used to update the score of an user
 * with a POST method
 * @author Tano Iannetta
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Event = mongoose.model('Event');
const ScoreProcessor = require('../services/scoreProcessor');

module.exports = (app) => {
  app.use('/', router);
};

// POST method
router.post('/event', (req, res) => {

  const payload = req.body;
  let scoreProcessor = new ScoreProcessor();

  let incrementScore = 0;

  console.log("/event payload received: " + JSON.stringify(payload)); // in heroku logs


  if(payload.type === "login")
  {
    incrementScore = scoreProcessor.processStrengthScore(payload.properties.strength)
  }

  // update user's score
  User.findOneAndUpdate({username: payload.properties.username},{$inc: {score:incrementScore}}, {upsert:true, new :true}, function (err, user) {
  if (err) {
    console.log(err);
    res.send(err);
  }
  else if(user){

    const event = new Event({username: user.username, score: incrementScore})
    event.save();

    res.send("Score updated  successfully");
    }
  else {
      res.send("Error occurred");
    }
  });
});
