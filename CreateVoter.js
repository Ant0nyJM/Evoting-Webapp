module.exports={

    createVoter:async function(voterJson)
    {
        console.log("crete VOter -->"+JSON.stringify(voterJson));
        var out="Error";
    
        const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
        var cardName = "admin@realvoting";
        const bnConnection = new BusinessNetworkConnection();
    
    
        await bnConnection.connect(cardName).then(async function()
        
        
        
            {
                await heart();
                out="Voter successfully created";
                bnConnection.disconnect();
    
    
            }
        
        
        ).catch((error)=>{
            console.log(error);
            //out=error;
            out="Sorry,your request cannot be processed";    
            bnConnection.disconnect();
    
    
            }
                
    
    
    
        );
    
        return out;    
        
        
        async function heart()
        {
    
            var factory=await bnConnection.getBusinessNetwork().getFactory();
            var voter=await factory.newResource('org.example.realvoting','Voter',voterJson.voterId);
    
            voter.voterId=voterJson.voterId;
            voter.username=voterJson.username;
            voter.password=voterJson.password;
            voter.constituencies=voterJson.constituencies;
            voter.name=voterJson.name;
            voter.phoneNumber=voterJson.phoneNumber;
            voter.email=voterJson.email;
            voter.address=voterJson.address;      
            
            return bnConnection.getParticipantRegistry('org.example.realvoting.Voter').then(function(participantRegistry)
                    {
    
                        return participantRegistry.add(voter);
    
                    }
            
            
            
            
            
            
            )
    
        }    
    
    
    
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    }