const HTTPS_PORT = 8443;

const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;

// Yes, TLS is required
const serverConfig = {
   key: fs.readFileSync('ssl/key.pem'),
   cert: fs.readFileSync('ssl/cert.pem'),
};

//all connected to the server users 
var users = {};
var allUsers = [];
// ----------------------------------------------------------------------------------------

// Create a server for the client html page
const handleRequest = function(request, response) {
  // Render the single client html file for any request the HTTP server receives
   console.log('request received: ' + request.url);

   if(request.url === '/') {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(fs.readFileSync('client/index.html'));
  } else if(request.url === '/webrtc.js') {
      response.writeHead(200, {'Content-Type': 'application/javascript'});
      response.end(fs.readFileSync('client/webrtc.js'));
  }
};

const httpsServer = https.createServer(serverConfig, handleRequest);
httpsServer.listen(HTTPS_PORT, '0.0.0.0');

// ----------------------------------------------------------------------------------------

// Create a server for handling websocket calls
const wss = new WebSocketServer({server: httpsServer});



wss.on('connection', function(ws) {
   ws.on('message', function(message) {

      var data;
		
    //accepting only JSON messages 
      try { 
         data = JSON.parse(message); 
      } catch (e) { 
         console.log("Invalid JSON"); 
         data = {}; 
      }
    
      console.log('received data:', data);
     //switching type of the user message 
      switch (data.type) { 
      //when a user tries to login 
         case "login": 
            console.log("User logged", data.name); 
     
            console.log('if anyone is logged in with this username then refuse') 
            if(users[data.name]) { 
               sendTo(ws, { 
                  type: "login", 
                  success: false 
               }); 
            } else { 
               console.log('save user connection on the server') 
               users[data.name] = ws; 
               allUsers.indexOf(data.name) === -1 ? allUsers.push(data.name) : console.log("This item already exists");
               
               //console.log('all available users',JSON.stringify(users))
               ws.name = data.name;
       
               sendTo(ws, { 
                  type: "login", 
                  success: true, 
                  allUsers:allUsers
               }); 
            } 
     
         break;
         
         default: 
            sendTo(ws, { 
               type: "error", 
               message: "Command not found: " + data.type 
            });
      
         break; 
      }  
    //wss.broadcast(message);
   });

   ws.on("close", function() { 
      if(ws.name) { 
         delete users[ws.name]; 
      } 
   });  

   //ws.send("Hello world"); 
});

function sendTo(connection, message) { 
  connection.send(JSON.stringify(message)); 
}

console.log('Server running. Visit https://localhost:' + HTTPS_PORT + ' in Firefox/Chrome.\n\n\
Some important notes:\n\
  * Note the HTTPS; there is no HTTP -> HTTPS redirect.\n\
  * You\'ll also need to accept the invalid TLS certificate.\n\
  * Some browsers or OSs may not allow the webcam to be used by multiple pages at once. You may need to use two different browsers or machines.\n'
);
