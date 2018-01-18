const express = require('express');
const router = express.Router();

/**
 * This endpoint is the default page of the API
 * used to test if the server is up
 * @author Tano Iannetta
 */
module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {

  res.render('index', {
    title: 'Gamification server'
  });
});
