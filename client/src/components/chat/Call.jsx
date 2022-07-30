import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import {useNavigate} from "react-router-dom"
const Video = styled.video`
  width: 100%;
  height: 500px;
  margin: 20px auto;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
`;

function Call() {
  const navigate= useNavigate()
  const [yourID, setYourID] = useState("");
  const [users, setUsers] = useState([]);
  const [mute, setMute] = useState(true)
  const [stream, setStream] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [loading, setLoading] = useState(true)
  const userVideo = useRef();
  const partnerVideo = useRef();
  const socket = useRef();
  useEffect(() => {
    const type = JSON.parse(localStorage.getItem("designation")) || "";
    if (type == "") navigate("/");
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
  }, [callAccepted,loading]);
  useEffect(() => {
    socket.current.on("videoClosed", () => navigate("/account"));
  }, [socket,loading]);
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
  const startVideo = () => {
    setLoading(false);
  }
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || "";
    users.map((key) => {
      if (key != user) {
        callPeer(key);
      }
    });
  },[socket,loading])
  let UserVideo;
  if (stream) {
    UserVideo = <Video playsInline muted={mute} ref={userVideo} autoPlay />;
  }

  let PartnerVideo;
  if (callAccepted) {
    PartnerVideo = (
      <Video playsInline ref={partnerVideo} autoPlay />
    );
  }
  return (
    <div style={{ textAlign: "center" }}>
      {loading && (
        <button
          style={{
            width: "200px",
            color: "white",
            background: "green",
            borderRadius: "10px",
            padding: "5px 10px",
            textAlign: "center",
          }}
          onClick={() => startVideo()}
        >
          Start Video
        </button>
      )}
      <div>
        {UserVideo}
        {PartnerVideo}
      </div>
      <button
        style={{
          width: "100px",
          color: "white",
          background: "red",
          borderRadius: "10px",
          padding: "5px 10px",
          textAlign: "center",
        }}
        onClick={() => setMute(!mute)}
      >
        {mute ? "Unmute" : "Mute"}
      </button>
      <br />
      <br />
      <div style={{ textAlign: "center" }}>
        <button
          style={{
            width: "200px",
            color: "white",
            background: "black",
            padding: "5px",
          }}
          onClick={() => {
            socket.current.emit("close_chat");
            navigate("/account");
          }}
        >
          End Call
        </button>
      </div>
    </div>
  );
}

export default Call;
