const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = new express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/userDB");
const userSchema =  new mongoose.Schema({
  email: String,
  password: String
});
const User = new mongoose.model("User", userSchema);

app.route("/")
.get(function(req, res){
  console.log("--Route GET /");
  let date = new Date().toLocaleDateString('en-US');

  res.render("home", {date : date});
})
.post(function(req, res){
  console.log("--Route POST /");

  res.send("Hi " + req.body.username);
});

app.route("/register")
.get(function(req, res){
  console.log("--Route GET /register");
  res.render("register");
})
.post(function(req, res){
  console.log("--Route POST /register");
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({email:email})
  .then(function(foundUser){
    if (foundUser){
      console.log("User already registered.");
      res.send("User already registered.");
    }
    else{
      let newUser = new User({
        email : email,
        password : password
      });
      newUser.save()
      .then(function(){
        console.log("User registered");
        res.send("User registered");
      })
      .catch(function(err){
        console.log("Error found during save on POST/register: " + err);
      });

    }
  })
  .catch(function(err){
    console.log(err);
    res.send("Error found during findOne on POST/register: " + err);
  });
});

app.route("/login")
.get(function(req, res){
  console.log("--Route GET /login");
  res.render("login");
})
.post(function(req, res){
  console.log("--Route POST /login");
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({email:email})
  .then(function(foundUser){
    if(foundUser){
      console.log("User found");
      if(password === foundUser.password){
      res.send("Hi " + foundUser.email);
      }
      else{
        res.send("Wrong password");
      }
    }
    else{
      console.log("User not found");
      res.send("User not found");
    }
  })
  .catch(function(err){
    console.log(err);
    res.send("Error found during findOne on POST/login: " + err);
  });
});

app.listen(3000, function(){
  console.log("Server running on port 3000.");
});
