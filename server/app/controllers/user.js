const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (app) => {
  app.use('/', router);
};

  // POST method
  router.post('/user', (req, res) => {

    const payload = req.body;

  var score = 0;

  //insert in db
  var user = new User({
    username: payload.properties.username,
    score: 0
  });

  user.save(function (err, user) {
    if(err) {
      res.send("User already exist");
    }
    else
    {
      res.send("User created successfully");
    }
  });
});
