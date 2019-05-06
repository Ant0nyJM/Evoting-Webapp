var exports = module.exports;
const mysql = require('mysql');
const bcrypt = require('bcrypt');

//create connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user : "root",
    password : "admin",
    database : "evoting",
});


connection.connect();




//checks if voter is unique
async function uniqueVoter(data){
    var returnval;
    console.log('voter id --> '+data['voter_id']);
    var voterid = data['voter_id'];
    var querystr = `SELECT * FROM users WHERE VOTERID='${data["voter_id"]}';`;
    var query = await connection.query(querystr,function(error,result,fields){
        if (error) throw error;
        if (result.length == 0){
            returnval = true;
        }
        else{
            returnval = false;
        }
        console.log('eval over');
    });
    return returnval;
}

exports.registerVoter = async function(data){
    console.log("Exports --> "+JSON.stringify(exports));
    console.log('data in database')
    console.log(data);
    if(uniqueVoter(data)){
        console.log("new voter");
        var passhash = bcrypt.hashSync(data['password'],10);
        var query = await connection.query("INSERT INTO users VALUES(?,?,?,?,?,?)",
                                    [data['voter_id'],data['name'],data['email'],data['mobile_no'],data['aadhar_id'],passhash],
                                    (error,result,fields)=>{ 
                                        if(error) throw error;
                                        console.log('data inserted');
                                    });
    }
    else{
        console.log('voter exists');
    }
}


function execQuery(querystr){
    return new Promise(function(resolve,reject){
        connection.query(querystr,function(error,result,fields){
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

function verifyVoter(data){
    return new Promise(function(resolve,reject){
        var password = "",msg = "h";
        console.log("data ->"+data["voter_id"]);  
        var querystr = `SELECT * FROM users WHERE VOTERID="${data['voter_id']}"`;
        var query_pr = execQuery(querystr);
        console.log("query_pr"+query_pr);
        query_pr.then(function(result){
            console.log("Promise return-->"+result);
            resolve(result);
        },
        function(error){
            console.log("Promise error-->"+error);
            reject(error);
        });

    });
    

 }

 function verifySuperAdmin(data){

    return new Promise(function(resolve,reject){
        var password = "";
        console.log("adminusername ->"+data["username"]);  
        var querystr = `SELECT * FROM admin WHERE USERNAME="${data['username']}"`;
        var query_pr = execQuery(querystr);
        console.log("query_pr"+query_pr);
        query_pr.then(function(result){
            console.log("Promise return-->"+result);
            resolve(result);
        },
        function(error){
            console.log("Promise error-->"+error);
            reject(error);
        });

    });
 }



exports.verifyVoter = verifyVoter;
exports.verifySuperAdmin = verifySuperAdmin;
