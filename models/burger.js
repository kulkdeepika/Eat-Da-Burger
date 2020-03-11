const orm = require("../config/orm");

// This object contains functions which are called from the controller file.
// These functions inturn call the orm's correspoonding functions.

const burger = {
    selectAll: function(cb){
        orm.selectAll("burgers", function(result){
            cb(result);
        });
    },

    insertOne: function(cols, vals, cb){
        orm.insertOne("burgers", cols, vals, function(result){
            cb(result);
        });
    },

    updateOne: function(objColsVals, condition, cb){
        orm.updateOne("burgers", objColsVals, condition, function(result){
            cb(result);
        });
    }
}

module.exports = burger;