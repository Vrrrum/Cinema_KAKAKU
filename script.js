const express = require("express"); 
const app = express();
app.set("view engine", "ejs");
// app.set("views","./views");
app.get('/',function(req,res){
    res.send("<h1>siema</h1>");
});

app.listen(3000);
