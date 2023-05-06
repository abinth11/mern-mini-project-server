const express = require("express");
const cors = require("cors");
const app = express();
const db = require('./config/mongoose')
const morgan = require('morgan')
const user = require('./routes/user')
const admin = require('./routes/admin')
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/',user)
app.use('/admin',admin)
app.use(morgan('dev'));
db.connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error(err);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
 