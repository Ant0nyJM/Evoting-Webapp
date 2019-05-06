module.exports={

    createNormalAdmin:async function(username,password)
    {
    
        var out="Error";
    
        const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
        var cardName = "admin@realvoting";
        const bnConnection = new BusinessNetworkConnection();
    
    
        await bnConnection.connect(cardName).then(async function()
        
        
        
            {
                console.log("bfore+");
                await heart();
                console.log("after");
                console.log("out1 -->"+out);
                out="Success";
                bnConnection.disconnect();
    
    
            }
        
        
        ).catch((error)=>{
    
            out="Error";    
            bnConnection.disconnect();
    
    
            }
                
    
    
    
        );
        console.log("out4 -->"+out);
        return out;    
        
        
        async function heart()
        {
            
            var factory=bnConnection.getBusinessNetwork().getFactory();
            var virtualAdmin=factory.newResource('org.example.realvoting','VirtualAdmin',username);
    
            virtualAdmin.password=password;
    
            return bnConnection.getParticipantRegistry('org.example.realvoting.VirtualAdmin').then(function(participantRegistry)
                    {
    
                        return participantRegistry.add(virtualAdmin);
    
                    }

            )
    
        }    
  
    }
    
    }