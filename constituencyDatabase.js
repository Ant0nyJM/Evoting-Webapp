var exports = module.exports;
const mysql = require('mysql');

const constituency_db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "admin",
    database : "constituencies",
});

constituency_db.connect();

function execQuery(querystr){
    return new Promise(function(resolve,reject){
        constituency_db.query(querystr,function(error,result,fields){
            if(error) 
            {
                reject(error);
            }
            else{
                console.log("resolved")
                resolve(result);
            }
        });
    });
}

function getConstituencyTables(){
    return new Promise(function(resolve,reject){
    var querystr = "SHOW TABLES";
    var query_pr = execQuery(querystr);
    query_pr.then(
        function(result){
            console.log("Return form query resol");
            resolve(result);
        },
        function(error){
            reject(error);
        }
    );
    });
}

function getConstituencyList(constituency){
    return new Promise(function(resolve,reject){
        var querystr = `SELECT * from ${constituency};`;
        console.log("COnstituency query --->"+querystr);
        var query_pr = execQuery(querystr);
        query_pr.then(
            function(result){
                console.log("Return form query resol");
                resolve(result);
            },
            function(error){
                reject(error);
            }
        );
        });

}

exports.getConstituencyTables = getConstituencyTables;
exports.getConstituencyList = getConstituencyList;