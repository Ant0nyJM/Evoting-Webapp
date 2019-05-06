module.exports={

    normalAdminLogin:async function(username,password)
    {
    
        var temp;

        var getJSON=require('get-json');

        await getJSON('http://localhost:3000/api/org.example.realvoting.VirtualAdmin', function(error, response){
        temp=response;
        });
        
        var found=false;

        for(var i=0;i<temp.length;i++)
        {
            if (temp[i].virtualAdminId==username && temp[i].password==password)
            {
                found=true;
                break;
            }

        }    
        
        return found;
    
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    }