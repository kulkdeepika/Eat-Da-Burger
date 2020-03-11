const connection = require("./connection.js");

//This function returns a comma seperated string of (?) the number of which is determined by the length passed in
const printQuestionMarks = function(len) {
    var arr = [];
    for (var i = 0; i < len; i++) {
      arr.push("?");
    }
    return arr.toString();
  }

//This function takes in an object and returns a string which is ready to be used inline in a sql query staring
// In our burger example, it converts {devoured : 1} to 'devoured = 1'
const objToSql = function(obj){
    const arr = [];
    for(let key in obj){
        let value = obj[key];

        if (Object.hasOwnProperty.call(obj, key)) {
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

// This object contains functions, for select, insert and Update operations which will be called from the model. 
// These functions directly interact with the database
// and call the callback function (cb) with the results from the database passed in.

const orm = {

    selectAll: function(tableInput, cb){
        let queryString = "SELECT * from " + tableInput + ";";

        //console.log(queryString);
        connection.query(queryString, function(err, result){
            if(err){
                throw err;
            }
            cb(result);
        });
    },

    insertOne: function(tableInput, cols, vals, cb){
        let queryString = "INSERT into " + tableInput;

        queryString += "(";
        queryString += cols.toString();
        queryString += ") values (";
        queryString += printQuestionMarks(vals.length);
        queryString += ")";

        //console.log(queryString);

        connection.query(queryString, vals, function(err, result){
            if(err){
                throw err;
            }

            cb(result);
        });
    },

    updateOne: function(tableInput, objColVals, condition, cb){
        let queryString = "UPDATE " + tableInput + " SET ";

        queryString += objToSql(objColVals);
        queryString += " where ";
        queryString += condition;

        //console.log(queryString);

        connection.query(queryString, function(err, result){
            if(err){
                throw err;
            }

            cb(result);
        });
    }
};

module.exports = orm;