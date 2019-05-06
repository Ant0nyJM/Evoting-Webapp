module.exports={

    startElection:async function(electionId)
    {
    
        var out=false;
        
        var globalStore;
    
        const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
        var cardName = "admin@realvoting";
        const bnConnection = new BusinessNetworkConnection();
        
    
        await bnConnection.connect(cardName).then(async function()
        
        
        
            {
                await heart();
                
                out=true;
                bnConnection.disconnect();
    
    
            }
        
        
        ).catch((error)=>{
    
            out=error;            
            bnConnection.disconnect();
    
    
            }
                
    
    
    
        );
    
        return out;    
        
        
        async function heart()
        {
            var getJSON = require('get-json');
            var election;
            await getJSON('http://localhost:3000/api/org.example.realvoting.Election/'+electionId, function(error, response){
            election=response;
            });

           // console.log("sdd");

            if(election.status=="finished")
                return;

            var constituency;

            await getJSON('http://localhost:3000/api/org.example.realvoting.ConstituencyList/'+election.constituencyListId, function(error, response){
            constituency=response;
            });

            //console.log("sadsa")

            var list=await constituency.constituencies.split(",");
            
            for(var i=0;i<list.length;i++)
            {
                await addNota(list[i],i);
            }

            await updateElection(electionId);
        
            


            

    
        }
        
        async function addNota(constituency,i)
        {

                        var factory=await bnConnection.getBusinessNetwork().getFactory();

                        var d = new Date();
                        var n = await d.getTime();


                        var id=electionId+'-'+constituency+'-'+n.toString()+i.toString();
                        
                        var k=0;

                        var candidate=await factory.newResource('org.example.realvoting','Candidate',id);
                        
                        candidate.idProof=n.toString()+i.toString();
                        candidate.name="NOTA";
                        candidate.phoneNumber="NOTA";
                        candidate.email="NOTA";
                        candidate.address="NOTA";
                        candidate.constituency=constituency;
                        candidate.voteCount=k.toString();
                        candidate.electionId=electionId;

                        return bnConnection.getParticipantRegistry('org.example.realvoting.Candidate').then(function(participantRegistry)
                        {
    
                            return participantRegistry.add(candidate);
    
                        });

        }
        
        async function updateElection()
        {
            statement='SELECT org.example.realvoting.Election WHERE (electionId==_$id)';
            var qry= await bnConnection.buildQuery(statement);
            
            return bnConnection.query(qry,{id:electionId}).then(function(result){

                //console.log("result")
                //console.log(result[0].status);
                result[0].status="started"    
                //result[0].resources[0].status="started";

                return bnConnection.getAssetRegistry('org.example.realvoting.Election').then(function(assetRegistry)
                {
                       return assetRegistry.update(result[0]);
                                        
                });
            }
            );



        }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    }
}
    