/**
 * This endpoint is used to update the score of an user
 * with a POST method
 * @author Tano Iannetta
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (app) => {
  app.use('/', router);
};

// POST method
router.post('/event', (req, res) => {

  const payload = req.body;

  var incrementScore = 0;

  if(payload.type === "login")
  {
    incrementScore = processStrengthScore(payload.properties.strength)
  }

  //todo if user not exsiste controler et si marche pas demander
  // update user's score
  User.update({username: payload.properties.username},{$inc: {score:incrementScore}}, function (err) {

  if (err) {
    res.send("Error occurs")
  }
  else {
    res.send("Score update successfully");
    }
  });
});


//todo mettre dans la class processor
/**
 * Calculus the score from the strength of a password
 * @param strength of the password
 * @returns score calculated
 */
function processStrengthScore(strength) {

  var score = strength * 100;
  return score;
}
