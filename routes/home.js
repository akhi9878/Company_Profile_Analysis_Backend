var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();
const app = express();
const mongoose = require("mongoose");

var bodyParser=require("body-parser");

const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
var path = require('path');

const UserSchemaa = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },

});

const Userm=new mongoose.model("Userm", UserSchemaa);


//Connecting MongoDB Atlas
const uri="mongodb+srv://akhi9878:Akhilesh@123456@cluster0.mnn6c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to Mongodb Atlas cloud! :)");
  })
  .catch((err) => {
    console.log(err);
  });

router.get("/", (req, res) => {
    res.redirect("copr.html");
  });
 
 
// route for handling post requests
router
  .post("/log", async(req, res) => {
    const { email1, password1 } = req.body;
    const doesUserExits = await Userm.findOne({ 'email':email1 });

    //If Email doesn't exist in DB ,we return False
    if (!doesUserExits) {                 
      res.send(false);    
      return;
    }

    const doesPasswordMatch = await bcrypt.compare(
      password1,
      doesUserExits.password
    );
    
    //If Password Doesn't Match,we return False
    if (!doesPasswordMatch) {
      res.send(false);
      return;
    }
   res.send(true)
   
  })

  
  .post("/reg", async(req, res) => {
    const { email, password, cpassword } = req.body;
    const doesUserExitsAlready = await Userm.findOne({'email':email });
    if (doesUserExitsAlready)
    {
      res.send(true);
     
    }
    else{
      const hashedPassword = await bcrypt.hash(password, 12);
      const latestUser = new Userm({ email, password:hashedPassword});
      latestUser.save()
      .then(() => {
        res.send(false);
        return;
      })
      .catch((err) => console.log(err));

    }
  })

module.exports = router;
  

  
