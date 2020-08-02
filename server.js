const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Uncaught exception handler
process.on('uncaughtException', (err) => {
  console.log('\x1b[91m❌ | UNCAUGHT EXCEPTION : Shutting down...\x1b[39m');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./index.js');

// Database
const DB = process.env.DATABASE.replace('<password>', process.env.DBPASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('\x1b[34m✅ | DB Connection Succesful...\x1b[89m');
  });

// Server
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(
    `\x1b[34m✅ | App running on port: \x1b[1m\x1b[4m${port}\x1b[24m\x1b[22m...\x1b[89m`
  );
});

process.on('unhandledRejection', (err) => {
  console.log('\x1b[91m❌ | UNHANDLED REJECTION : Shutting down...\x1b[39m');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
