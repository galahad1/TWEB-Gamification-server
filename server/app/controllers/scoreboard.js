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

  //todo tester sur 2-3 jours
  //get user last 30 days points

  /*
  Event.find({createdAt: {$gt: Date.now()*1000-30*24*60*60}}, (err, events) =>{
      if(err) return next(err);

      console.log(events);
    });
  */


    let users = usersDb;

    Event.aggregate([
      {
        $match: {
          createdAt: {$gte: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000)}
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
       // console.log(result + " assa");
        //res.json(result);

        //console.log(users);


/*
        // merge arrays of on usernames
        var tab = users
          .concat(result)
          .groupBy('username')
          .map(_.spread(_.curry(_.merge, {})))
          .value();


        console.log(tab);*/

/*
        let tab = users.map((user) => {
          console.log(result);
          for(let obj of result){
            console.log(obj._id);
            if(user.username === obj._id) Object.assign(user, result);
          }
          return user;
        });*/

        let usersmap = new Map(users.map((user) => {
          return [user.username, user];
        }));

        let resultmap = new Map(result.map((user) => {
          return [user._id  , user];
        }));

        console.log(usersmap);
        console.log(resultmap);

        //      console.log(users);

        let completeUsers = users.map((user) => {


          let completeUser = user;

          if(resultmap.get(user.username) === undefined)
          {
            completeUser.recentScore = 0;
            return completeUser;
          }

          let toto = {};
          toto.titi = "tutu";
          console.log(toto);

          console.log(Object.isSealed(user));
          console.log(Object.isFrozen(user));
          console.log(Object.isExtensible(user));


          completeUser.recentScore = resultmap.get(user.username).recentScore;
          completeUser.toto = "titi";

          console.log(user);
          console.log("user result: " + completeUser);
          console.log(resultmap.get(user.username).recentScore);
          //completeUser.recentScore = userResult.recentScore;
//            console.log(user);
            return completeUser;
        });

        // check if all users have recentscore

        res.json(completeUsers);


        //console.log(completeUsers);
      }
    });


// todo tester si 0 personnes dans le recent score







  });
});
