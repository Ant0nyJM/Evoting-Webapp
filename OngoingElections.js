module.exports={

    ongoingElections:async function()
    {
    
        var temp;

        var getJSON=require('get-json');

        await getJSON('http://localhost:3000/api/org.example.realvoting.Election', function(error, response){
        temp=response;
        });
        
        var out={};
        out.initiated=[];
        out.started=[];

        for(var i=0;i<temp.length;i++)
        {
            if (temp[i].status=="initiated")
            {
                out.initiated.push({electionId:temp[i].electionId,details:temp[i].details})
            }

            if (temp[i].status=="started")
            {
                out.finished.push({electionId:temp[i].electionId,details:temp[i].details})
            }

        }    
        
        return out;
    
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    }