const express = require("express");
const routes = require("./controllers/burgers_controller.js");
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({extend : true}));
app.use(express.json());

app.engine("handlebars", exphbs({defaultLayout : "main"}));
app.set("view engine", "handlebars");

app.use(routes);

app.listen(PORT, function(){
    console.log("Listening on port: " + PORT);
});

