const express = require("express");
const ejs = require("ejs");

const app = new express();
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

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
app.listen(3000, function(){
  console.log("Server running on port 3000.");
});
