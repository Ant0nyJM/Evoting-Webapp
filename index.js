var express = require('express');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var database = require('./database')
const normaladmin = require('./CreateNormalAdmin')
const normaladminlogin = require('./NormalAdminLogin')
const constituency_db = require("./constituencyDatabase");
const create_election = require('./CreateElection');
const ongoing_elections = require("./OngoingElections");
const create_voter = require("./CreateVoter");
const create_candidate = require('./CreateCandidate');

//parse html data
app.use(bodyParser.urlencoded({extended:true}));
// parse json data
app.use(bodyParser.json());

//return all static files in front end
app.use('/frontend',express.static('frontend'));

//return static files in dashboard
app.use('/dashboard',express.static('admin/dashboard'));

//page for voter registration
app.get('/voterRegistration',(req,res)=>{
    res.sendFile(__dirname+"/admin/voterreg.html")
});

//handler for voter data submission
app.post('/submitVoterReg',async (req,res)=>{
    var resp = await create_voter.createVoter(req.body);
    res.send({response:resp});
});

app.get('/candidateRegistration',(req,res)=>{
    res.sendFile(__dirname+"/admin/candidreg.html")
});

app.post('/candidateRegistration',async (req,res)=>{
    var resp = await create_candidate.createCandidate(req.body);
    res.send({response:resp});
});

//superadmin login page
app.get('/superadminLogin',(req,res)=>{
    console.log("inside super admin login");
    res.sendFile(__dirname+"/admin/superlogin.html");
});



function verifyVoterPr(req_body){
    return new Promise(function(resolve,reject){
        var db_result = database.verifyVoter(req_body);
        resolve(db_result);
    })
}

//handler for voter verification
app.post("/voterVerify",(req,res)=>{
    var db_pr = database.verifyVoter(req.body);
    db_pr.then(function(result){
        console.log("Database response -->"+result);
        res.send({resp:result});
    });
    
   
});

//handler for superadmin verifications
app.post('/superadminVerify',(req,res)=>{
    var ad_pr = database.verifySuperAdmin(req.body);
    ad_pr.then(function(result){
        console.log("Database response -->"+result);
        res.send({response:result});
    });
});

//admin login page
app.get('/adminLogin',(req,res)=>{
    console.log("inside admin login");
    res.sendFile(__dirname+"/admin/adminlogin.html");
});

app.post('/adminLogin',async (req,res)=>{
    var resp = await normaladminlogin.normalAdminLogin(req.body.username,req.body.password);
    res.send({response:resp});
});

//admin creation
app.get('/adminCreate',(req,res)=>{
    console.log("inside admin create");
    res.sendFile(__dirname+"/admin/admincreate.html");
});
//handler for admin verification
app.post('/adminCreate',async (req,res)=>{
    console.log('body userame'+req.body.username);
    console.log('body password'+req.body.password);
    var resp = await normaladmin.createNormalAdmin(req.body.username,req.body.password);
    console.log("blockchain resp-->"+resp);
    res.send({response:resp});
});

app.get('/initiateElection',(req,res)=>{
    console.log("election initiated");
    res.sendFile(__dirname+"/admin/initiation.html")
})

app.post('/initiateElection',async (req,res)=>{
    console.log("inside init aelec");
    var resp = await create_election.createElection(req.body.table_name,req.body.constituencies,req.body.details);
    console.log("blockchain create elec resp-->"+resp);
    res.send({response:resp});
})

app.post('/getConstituencyList',(req,res)=>{
    var const_db_query = constituency_db.getConstituencyList(req.body.constituency);
    const_db_query.then(function(result){
        console.log("Constituency List Database response -->"+result);
        res.send({response:result});
    });
});
app.get("/getConstituencyTables",(req,res)=>{
    var const_db_query = constituency_db.getConstituencyTables();
    const_db_query.then(function(result){
        console.log("Constituency Database response -->"+result);
        res.send({response:result});
    });
    
});

app.get('/onGoingElections',(req,res)=>{
    res.sendFile(__dirname+"/admin/ongoing.html");
});
app.get('/onGoingElectionsList',async(req,res)=>{
    console.log("ok");
    var resp = await ongoing_elections.ongoingElections();
    console.log("blockchain elec list resp-->"+resp);
    res.send({response:resp});
});

console.log('App Started');
app.listen(10000);