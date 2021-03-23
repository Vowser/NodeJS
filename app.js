const express = require("express");

const app = new express();

app.route("/")
.get(function(req, res){
  console.log("--Route GET /");
  res.send("Hello World");
});
app.listen(3000, function(){
  console.log("Server running on port 3000.");
});
