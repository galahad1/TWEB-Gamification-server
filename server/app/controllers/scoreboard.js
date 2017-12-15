const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = mongoose.model('Article');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/scoreboard', (req, res, next) => {
  Article.find((err, articles) => {
  if (err) return next(err);
res.render('index', {
  title: 'Scoreboard',
  articles: articles
   });
  });
});
