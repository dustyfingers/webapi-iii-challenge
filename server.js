const express = require('express');
const userRoutes = require('./users/userRouter');

const server = express();

server.get('/', logger, (req, res) => {
  res.send(`INDEX ROUTE IS WORKING`);
});

server.use('/users', logger, userRoutes);

//custom middleware
function logger(req, res, next) { 
  console.log(`\n${new Date().toISOString()} ${req.method} ${req.url}\n`);
  next();
};

module.exports = server;
