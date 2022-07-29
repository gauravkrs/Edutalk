import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

const Video = styled.video`
  width: 100%;
  height: 500px;
  margin: 20px auto;
`;

function Call() {
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState([]);
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);

  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io.connect("http://localhost:8000");
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });

    socket.current.on("yourID", (id) => {
      setYourID(id);
    });
    socket.current.on("allUsers", (users) => {
      setUsers(users);
    });

    socket.current.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });
  }, []);

  function callPeer(id) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: "stun:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
          {
            urls: "turn:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
        ],
      },
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: yourID,
      });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.current.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("acceptCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = <Video playsInline muted ref={userVideo} autoPlay />;
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = <Video playsInline ref={partnerVideo} autoPlay />;
  }

  let incomingCall;
  if (receivingCall) {
    incomingCall = (
      <div>
        <h1>{caller} is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    );
  }
  return (
    <div>
      <div>
        {UserVideo}
        {PartnerVideo}
      </div>

      <div style={{ textAlign: "center" }}>
        {users.map((key) => {
          const user = JSON.parse(localStorage.getItem("user")) || "";
          if (key != user)
            return (
              <button
                style={{
                  width: "200px",
                  color: "white",
                  background: "royalblue",
                  borderRadius: "15px",
                  padding: "5px",
                }}
                key={key}
                onClick={() => callPeer(key)}
              >
                Start Video
              </button>
            );
        })}
        <br />
        <br />
        <button
          style={{
            width: "200px",
            color: "white",
            background: "black",
            padding: "5px",
          }}
          onClick={() => {
            socket.emit("")
          }}
        >
          End Call
        </button>
      </div>
    </div>
  );
}

export default Call;
