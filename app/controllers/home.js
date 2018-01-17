const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = mongoose.model('Article');

/**
 * This endpoint is the default page of the API
 * used to test if the server is up
 * @author Tano Iannetta
 */
module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res, next) => {
  Article.find((err, articles) => {
  if (err) return next(err);
res.render('index', {
  title: 'Home page',
  articles: articles
    });
  });
});
