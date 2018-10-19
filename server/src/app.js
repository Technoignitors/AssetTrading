const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const posts = require('../api/posts');
const app = express();

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors(corsOptions))

var mongoose = require('mongoose');
mongoose.connect('mongodb://ignitors:lhussain12@ds137003.mlab.com:37003/hackathon');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

// POSTS ROUTES ( INCLUDE ALL ROUTES HERE)
posts.routes(app);


app.listen(process.env.PORT || 8081)