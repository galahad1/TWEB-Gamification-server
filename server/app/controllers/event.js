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
  // update user score
  User.update({username: payload.properties.username},{$inc: {score:incrementScore}}, function (err) {

  if (err) {
    return handleError(err);
  }
  else {
    res.send("Score update successfully");
    }
  })

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


//todo endpoint create user
/*
//insert in db
var user = new User({
  username: payload.properties.username,
  score: score
});

user.save(function (err, user) {
  if(err) {
    //http error
    console.log(err);
  }
});
*/
