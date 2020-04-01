const express = require("express");
const burger = require("../models/burger.js");

const router = express.Router();

// Service the GET request (pageLoad), Call the model's selectAll function to display all the burgers
router.get("/", function(req, res){
    burger.selectAll(function(data){
        //let objToHandlebar = {burgers : data};

        res.render("index", {burgers : data});
    });
});

// Service the POST request, to receive and insert a new burger that the user has entered.
// Call the model's insertOne funcion to save it into database. 
router.post("/api/burgers", function(req, res){
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(data){

        res.json({id: data.insertId});
    });
});

// Service the PUT request to update the devoured state of the burger.
// Call the model's updateOne function to Update the 'devoured' column of that particular burger in the database.

router.put("/api/burgers/:id", function(req, res){
    let condition = "id = " + req.params.id;

    let objColVals = {devoured : req.body.devoured};

    burger.updateOne(objColVals, condition, function(data){

        if(data.changedRows === 0){
            res.status(404).end();
        }
        res.status(200).end();
    });
});

router.delete("/api/burgers/:id", function(req, res){
    let condition = "id = " + req.params.id;

    burger.deleteOne(condition, function(data){

        if(data.affectedRows === 0){
            res.status(404).end();
        }
        res.status(200).end();
    });
});

module.exports = router;