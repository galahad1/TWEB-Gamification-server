const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';


const config = {
  development: {
    root: rootPath,
    app: {
      name: 'server'
    },
    port: process.env.PORT || 3000,
    //db: 'mongodb://heroku_sqzx4m44:tv1ja10io6kqj8iou6ls6cu5gb@ds259117.mlab.com:59117/heroku_sqzx4m44'
    db: 'mongodb://localhost/server-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'server'
    },
    port: process.env.PORT || 3000,
    db: 'mongodb://localhost/server-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'server'
    },
    port: process.env.PORT || 3000,
    //db: 'mongodb://localhost/server-production'
    db: 'mongodb://heroku_sqzx4m44:tv1ja10io6kqj8iou6ls6cu5gb@ds259117.mlab.com:59117/heroku_sqzx4m44'
  }
};

module.exports = config[env];
