# Evoting-Webapp
Final Year Project - Evoting using Blockchain

A basic outline of blockchian based evoting web application can be made using these codes. 

### Setting up development environment:<br />
   Fabric is executed using the following commands: <br /><br />
 	  `$  cd ~/fabric-dev-servers`<br />
	  `export FABRIC_VERSION=hlfv12`<br />
	  `./startFabric.sh`<br />
	  `./createPeerAdminCard.sh`<br /><br />
  Single peer or multiple peers can be created in a single system or multiple system
  
 ### Installing and deploying the network:<br />
	 $ mkdir dist && cd dist
	 $ composer archive create -t dir -n ..
	 $ composer network install -a realvoting@0.0.1.bna -c PeerAdmin@hlfv1
	 $ composer network install -a realvoting@0.0.1.bna -c PeerAdmin@hlfv1
	 $ composer network install -a realvoting@0.0.1.bna -c PeerAdmin@hlfv1
   <br />
   
   For more info on how to setup the enviornment and deploying the network check https://hyperledger.github.io/composer/v0.19/introduction/introduction.html


## Tools Used

 - Hyperledger Composer 
 - Docker Enginer
 - Express Framework of NodeJS
 - VScode
