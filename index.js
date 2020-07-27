const express = require('express');
const morgan = require('morgan');

const app = express();
const linkRouter = require('./routes/linkRoutes');
const userRouter = require('./routes/userRoutes');

//Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Routers
app.use('/api/v1/users', userRouter);
app.use('/api/v1/links', linkRouter);

module.exports = app;
