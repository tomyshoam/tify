const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./index.js');

// Database
const DB = process.env.DATABASE.replace('<password>', process.env.DBPASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection succesful');
  });

// Server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});
