const express = require('express')
const session = require('express-session');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const errorHandler = require('errorhandler');
const isProduction = process.env.NODE_ENV === 'production';
const app = express();
const web3Connector = require('../config/web3Connector.js');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

console.log(web3Connector)

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(errorHandler());
app.use('/uploads',express.static('uploads'))

var mongoose = require('mongoose');
mongoose.connect('mongodb://ignitors:lhussain12@ds137003.mlab.com:37003/hackathon', { useNewUrlParser: true });
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



app.listen(process.env.PORT || 8081)