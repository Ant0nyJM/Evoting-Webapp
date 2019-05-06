module.exports={

createElection:async function(tableName,constituencies,details)
{

    var out="Error13";
    var problem="No Problem";

    const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
    var cardName = "admin@realvoting";
    const bnConnection = new BusinessNetworkConnection();


    await bnConnection.connect(cardName).then(async function()
    
    
    
        {
            await heart();
            
            if (problem=="No Problem")
            {
                out="Election succesfully initiated";

            }
            else
            {
                out=problem;
            }
            bnConnection.disconnect();


        }
    
    
    ).catch((error)=>{

        out="Internal Error";    
        bnConnection.disconnect();


        }
            



    );

    return out;    
    
    
    async function heart()
    {

        var getJSON = require('get-json');
        var found=false

        var constituency;
        await getJSON('http://localhost:3000/api/org.example.realvoting.ConstituencyList', function(error, response){
        constituency=response;
        });
        //console.log(constituency[0].constituencyListId);
        for(var i=0;i<constituency.length;i++)
        {
            if(constituency[i].constitiuencyListId==tableName) //spelling mistake constituencylistid
            {
                found=true;
                //console.log("sdasda");
            }


        }
        if (!found)
        {
            await addConstituency();

        }

        var electionObjects;

        await getJSON('http://localhost:3000/api/org.example.realvoting.Election', function(error, response){
        electionObjects=response;
        });

        found=false;
        for(var i=0;i<electionObjects.length;i++)
        {

            
            if(electionObjects[i].status!="finished")
            {

                if(electionObjects[i].constituencyListId==tableName)
                {
                  //  await console.log("Already election on that constituency");
                    problem="Election Running in that constituency"
                    return;
                }
                else
                {
                    var tempString='http://localhost:3000/api/org.example.realvoting.ConstituencyList/'
                    tempString+=electionObjects[i].constituencyListId;

                    var tempConstituency;

                    await getJSON(tempString,function(error, response){
                    tempConstituency=response;
                    });

                    var tempList=await tempConstituency.constituencies.split(",");

                    for(var j=0;j<constituencies.length;j++)
                    {
                        if(await tempList.includes(constituencies[i]))
                        {

                            found=true;
                          //  await console.log("Already el in some of the constituencies");
                            problem="Election running in some of the constituencies"
                            return;
                        }
                    }

                    
                    

                }



            }

        }
        if(!found)
        {

            var factory=await bnConnection.getBusinessNetwork().getFactory();
            var d = new Date();
            var n = await d.getTime();

            var id="election-"+n.toString();

            var election=await factory.newResource('org.example.realvoting','Election',id);

            election.details=details;

            election.constituencyListId=tableName;
            election.status="initiated"

            return bnConnection.getAssetRegistry('org.example.realvoting.Election').then(

                function(assetRegistry)
                {
                    return assetRegistry.add(election)

                }



            )



        }
       

    }
    
    async function addConstituency()
    {

        var factory=await bnConnection.getBusinessNetwork().getFactory();
        var constituencyList=await factory.newResource('org.example.realvoting','ConstituencyList',tableName);

        constituencyList.constituencies=await constituencies.toString();

        return bnConnection.getAssetRegistry('org.example.realvoting.ConstituencyList').then(

            function(assetRegistry)
            {
                return assetRegistry.add(constituencyList);
            }


        )



    }



}






















}
