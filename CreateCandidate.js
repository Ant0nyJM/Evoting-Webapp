
//HERE CONSTITUENCY LIST SPELLING
//CONSTITUENCY ARRAY
//INTEGER VOTECOUNT

module.exports={

    createCandidate:async function(candidateJson)
    {
    
        var out="Error";
        var doubt=false;
        const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
        var cardName = "admin@realvoting";
        const bnConnection = new BusinessNetworkConnection();
    
        console.log("candidate-->"+JSON.stringify(candidateJson));
        await bnConnection.connect(cardName).then(async function()
        
        
        
            {
                await heart();
                if (doubt)
                {
                    out="Candidate Successfully Created"

                }
                else
                {
                    out="Sorry,your request cannot be processed"
                }
                bnConnection.disconnect();
    
    
            }
        
        
        ).catch((error)=>{
            
            //out=error;
            console.log(error);
            out="Sorry,your request cannot be processed";    
            bnConnection.disconnect();
    
    
            }
                
    
    
    
        );
    
        return out;    
        
        
        async function heart()
        {
            
            var election;
            var getJSON=require('get-json');
            

            await getJSON('http://localhost:3000/api/org.example.realvoting.Election/'+candidateJson.electionId, function(error, response){
            election=response;
            });
            console.log("election id"+election.electionId);
            //onsole.log("election id"+election.electionId);
            if(election.electionId==candidateJson.electionId && election.status=="initiated")
            {
                
               // await console.log("first");
                var tempConstituency;
                await getJSON('http://localhost:3000/api/org.example.realvoting.ConstituencyList/'+election.constituencyListId, function(error, response){
                tempConstituency=response;
                });                
                
                //await console.log("second");
                

                if(tempConstituency.constitiuencyListId==election.constituencyListId)
                {
                    var temp=tempConstituency.constituencies.split(",");
                    if(temp.includes(candidateJson.constituency))
                    {
                        doubt=true;
                        var factory=await bnConnection.getBusinessNetwork().getFactory();
                        id=candidateJson.electionId+'-'+candidateJson.constituency+'-'+candidateJson.idProof;
                        
                        var k=0;

                        var candidate=await factory.newResource('org.example.realvoting','Candidate',id);
                        
                        candidate.idProof=candidateJson.idProof;
                        candidate.name=candidateJson.name;
                        candidate.phoneNumber=candidateJson.phoneNumber;
                        candidate.email=candidateJson.email;
                        candidate.address=candidateJson.address;
                        candidate.constituency=candidateJson.constituency;
                        candidate.voteCount=k.toString();
                        candidate.electionId=candidateJson.electionId;

                        return bnConnection.getParticipantRegistry('org.example.realvoting.Candidate').then(function(participantRegistry)
                        {
    
                            return participantRegistry.add(candidate);
    
                        });
                        


                    }


                }

               


            }


    
       
    
        }    
    
    
    
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    }