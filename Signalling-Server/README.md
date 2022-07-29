# A very simple signalling server

Signalling servers are the lifeline of WebRTC as it helps with peer discovery. When 2 peers wish to connect with each other, the signalling server plays an important role in helping them discover each other through a process of simple message exchange. When user A connects to a signalling server, it's browser sends a message to the signalling server to let it know that it is now ready for a call as soon as any other user is available. When browser B connects to the signalling server with his/ her browser, signalling server can let user B know that user A is already available and ready for call. This way user B comes to know that another user is already available and starts a call with user A. User / Peer discovery using signalling server is outside the defined scope of WebRTC and every application has there own freedom to implement their own signalling server mechanism for user discovery.
In this example, websocket has been used as connectivity mechanism to connect to the signalling server. As websocket is a stateful protocol, it helps the signalling server maintain the connection for the lifetime of the call.

## Steps to run this example

Go to the server folder and run the below command to run the application.

`node server.js`

Note: The backend server is built using nodejs. Therefore it isnecessary to install nodejs before running this application. You download and install nodejs from the official webside for your OS before running this application.

In order to check if nodejs is installed in your system or not, run the below command.
`node -v`

if the output of the above command shows you a number like 12.14.20 or 16.15.1 which is the current nodejs version installed in your system, then you know that node js is already availabe in your system.
