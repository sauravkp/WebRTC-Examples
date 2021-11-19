var localVideo;
var localStream;
var myName;
var uuid;
var name; 
var connectedUser;


serverConnection = new WebSocket('wss://' + window.location.hostname + ':8443');

serverConnection.onopen = function () { 
  console.log("Connected to the signaling server"); 
};

serverConnection.onmessage = gotMessageFromServer;

document.getElementById('otherElements').hidden = true;
var usernameInput = document.querySelector('#usernameInput'); 
var usernameShow = document.querySelector('#showLocalUserName'); 
var showAllUsers = document.querySelector('#allUsers');

var loginBtn = document.querySelector('#loginBtn');

// Login when the user clicks the button 
loginBtn.addEventListener("click", function (event) { 
  name = usernameInput.value; 
  usernameShow.innerHTML = "Hello, "+name;
  if (name.length > 0) { 
     send({ 
        type: "login", 
        name: name 
     }); 
  } 
 
});


/* START: Register user for first time i.e. Prepare ground for webrtc call to happen */
function handleLogin(success,allUsers) { 
  if (success === false) { 
    alert("Ooops...try a different username"); 
  } 
  else { 
    
    var allAvailableUsers = allUsers.join();
    console.log('All available users',allAvailableUsers)
    showAllUsers.innerHTML = 'Available users: '+allAvailableUsers;
    localVideo = document.getElementById('localVideo');
    document.getElementById('myName').hidden = true;
    document.getElementById('otherElements').hidden = false;

  

  var constraints = {
    video: true,
    audio: true
  };

  /* START:The camera stream acquisition */
  if(navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(constraints).then(getUserMediaSuccess).catch(errorHandler);
  } else {
    alert('Your browser does not support getUserMedia API');
  }
  /* END:The camera stream acquisition */
  }
}
/* END: Register user for first time i.e. Prepare ground for webrtc call to happen */


function getUserMediaSuccess(stream) {
  localStream = stream;
  localVideo.srcObject = stream;
}

/* START: Recieved call from server i.e. recieve messages from server  */
function gotMessageFromServer(message) {
  console.log("Got message", message.data); 
  var data = JSON.parse(message.data); 
 
  switch(data.type) { 
    case "login": 
      handleLogin(data.success,data.allUsers); 
    break; 
     //when somebody wants to call us 
   
    default: 
      break; 
  } 

  serverConnection.onerror = function (err) { 
    console.log("Got error", err); 
  };

}

function send(msg) { 
  //attach the other peer username to our messages 
  if (connectedUser) { 
    msg.name = connectedUser; 
  } 
  console.log('msg before sending to server',msg)
  serverConnection.send(JSON.stringify(msg)); 
};










