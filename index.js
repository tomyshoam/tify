const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanatize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();
const linkRouter = require('./routes/linkRoutes');
const userRouter = require('./routes/userRoutes');
const visitRouter = require('./routes/visitRoutes');
const slugRouter = require('./routes/slugRoutes');

//Middleware
//Set security http headers
app.use(helmet());

//Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit request from the same ip
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour',
});
app.use('/api', limiter);

//Body parser, reading data from the body intro req.body
app.use(express.json({ limit: '10kb' }));

//Data sanatization against NoSQL query injection
app.use(mongoSanatize());

//Data sanatization against XSS
app.use(xss());

//Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['duration'],
  })
);

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//Routers
app.use('/api/v1/users', userRouter);
app.use('/api/v1/links', linkRouter);
app.use('/api/v1/visits', visitRouter);
app.use('/', slugRouter);

// 404
app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
});

//Error middleware
app.use(globalErrorHandler);

module.exports = app;
