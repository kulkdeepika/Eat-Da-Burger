const connection = require("./connection.js");

const printQuestionMarks = function(len) {
    var arr = [];
    for (var i = 0; i < len; i++) {
      arr.push("?");
    }
    return arr.toString();
  }

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