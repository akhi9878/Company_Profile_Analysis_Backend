var express=require("express"); 
var bodyParser=require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
var path = require('path');
const routes=require("./routes/index");
const homes=require("./routes/home");
const app = express();
var request = require('request');
var cheerio = require('cheerio');
var cors = require('cors');
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ 
	extended: true
})); 

app.use(
  cookieSession({
    keys: ["randomStringASyoulikehjudfsajk"],
  })
);

app.use('/',homes);
app.use('/homes.html',routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started listening on port: ${PORT}`);
});

