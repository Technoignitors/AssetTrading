const express = require('express')
const session = require('express-session');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const posts = require('../routes/api/posts');
const login = require('../routes/api/login');
const errorHandler = require('errorhandler');
const isProduction = process.env.NODE_ENV === 'production';
const app = express();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
if(!isProduction) {
  app.use(errorHandler());
}

var mongoose = require('mongoose');
mongoose.connect('mongodb://ignitors:lhussain12@ds137003.mlab.com:37003/hackathon');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});



//Models & routes
require('../models/Users');
require('../config/passport');
app.use(require('../routes'));

//Error handlers & middlewares
if(!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});


app.listen(process.env.PORT || 8081)