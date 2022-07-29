# A very simple p2p video call app demo

This example shows how to build a very simple p2p video call app for learning purposes only. Keep in mind that it is not a suitable video app for production usage.

Go through the signalling server and media stream acquisition examples before trying to run this example as it builds upon both of these examples.
In this example after the peer discovery is done, user B calls user A and they both see the video of each other.

This is what happens under the hood.

1.Peer B first creates a new PeerConnection object while passing the avialble ICE servers as a parameter, which help in sending and receiving the media streams.

2.As soon as peer connection is created, it starts generating icecanidates( in simple terms, the current network configurations of user B) and sends it to user A to check if the network parameters are acceptable to his / her device to receive media streams.

3.Then it acquires the local camera and mic, adds those camera and mic tracks to the PeerConnection. This will make the PeerConnection ready to send the media feeds as soon as the connection is eshtablished, i.e. when both the user agree to use a common network configuration acceptable to both)

4.Then it creates offer to generate a offer sdp(session description protocol) which contains a lrge number of information (approx. 80 -100 lines of information) in plain text format. It contains information like network settings, available media stream(audio/video/screenshare/anythingelse), codecs currently available to encode decode media data packets and many other things.

5.Once sdp is generated, the localdescription of PeerConnection is set using the offer. In simple terms, the as kthe browser about the final confirmation about the validity of all the options available in sdp. Once the local description is set, the sdp aka settings can't be changed any more and the sdp the is then sent to the remote user A to let it's browser do all the things that user B's browser just did.

6.Once the sdp is received by user A's browser sent via the signalling server, user A first creates a PeerConnection object while passing the ICE servers as an parameter for the same purpose. As soon as the PeerConnecion is created, it uses the offer sdp provided by user A to set it's remote description. This is needed to be done to let the browser know of the other user's details o that the browser can create an answer sdp as an answer to the offer at a later stage.

7.Step 2 is repeated by user A's browser for the exact same purpose. After this, both of them have knowledge of each others network configuration. After this they both agree to use one network configuration among all the possble network configuration options given by both of their browsers. The mutually selected network configuration aka icecandidate is then used for the actual media transport between both of the users.

8. It is a repeat of step 3 at for user A where it acquires his / her own media streams and adds them to the Peerconnection to be ready to send once the connection is established.

9.The it creates an answer by calling the createAnswer api on the PeerConnection object and generates the answer sdp. Once the answer sdp is generated, the localdescription is set on the user A side to ask the browser for one final confirmation. Once confirmed, the answer is then sent to user B via the signalling channel for user B's browser's acceptance of this answer.

10. Once answer sdp is received on user B side, it calls the setremotedescription api to ask the browser for acceptance of the other user's sdp. Once the browser confirms, the connection is media transport is now established.

11. Once the connection is established, each of the PeerConnection object start sending their respective media streams to the remote user.
    As son as the media reaches the other side, an event named ontrack is triggered on the PeerConnection object to let the browser know that other peer's media has reached and ready to be consumed. The local browser then extracts the media from it's PeerConnection object and displays it in a video element.

12. Now the call is successfully established where both the user A and user B can communicate with each other in real time with their respective camera and mic.

## Steps to run the app

Same as of the signalling server. Refer to the steps mentioned in the signalling server example to run this app.
