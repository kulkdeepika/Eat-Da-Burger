const express = require("express");
const burger = require("../models/burger.js");

const router = express.Router();

router.get("/", function(req, res){
    burger.selectAll(function(data){
        //let objToHandlebar = {burgers : data};

        res.render("index", {burgers : data});
    });
});

router.post("/api/burgers", function(req, res){
    burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(data){

        res.json({id: data.insertId});
    });
});

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

module.exports = router;