/**
 * This endpoint give the users and their scores
 * @author Tano Iannetta
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Event = mongoose.model('Event');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/scoreboard', (req, res, next) => {

  // send user's names and score of the users
  User.find({}, 'username score -_id', (err, usersDb) => {
  if (err) return next(err);

    // looks events collection to get player that score recently
    Event.aggregate([
      {
        $match: {
          createdAt: {$gte: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)}
        }
      },
      {
        $group: {
          _id: '$username',
          recentScore: {$sum: "$score"}
        }
      }
    ], function (err, result) {
      if (err) {
        next(err);
      } else {

        // convert in map
        let resultmap = new Map(result.map((user) => {
          return [user._id  , user];
        }));

        let completeUsers = usersDb.map((user) => {
            let completeUser = {
            username: user.username,
            score: user.score
          };

          // if user did not score recently
          if(resultmap.get(user.username) === undefined)
          {
            completeUser.recentScore = 0;
            return completeUser;
          }
          completeUser.recentScore = resultmap.get(user.username).recentScore;
          return completeUser;
        });

        res.json(completeUsers);
      }
    });
  });
});
