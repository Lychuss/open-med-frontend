"use client";

import { socket } from "@/src/lib/socket";
import { useEffect } from "react";

let localStream: MediaStream;

const rtcConfig: RTCConfiguration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
}

const peer = new Map<string, RTCPeerConnection>();

export default function Room(){

    useEffect(() => {
        const fetchMedia = async () => {
            await startMedia()
        }

        fetchMedia();
    }, [])

    return (
        <div>
            <video id="my-video" autoPlay playsInline className="w-full min-h-screen -scale-x-100"/>
        </div>
    );
}

async function startMedia(){
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })

    const myVideo = document.getElementById("my-video") as HTMLVideoElement;
    myVideo.muted = true;
    myVideo.srcObject = localStream;
    await myVideo.play();
}

function createPeer(remoteId: string): RTCPeerConnection{
    const pc = new RTCPeerConnection(rtcConfig);

    localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
    })

    pc.onicecandidate = (e) => {
        if(e.candidate){
            socket.emit("webrtc:ice-candidate", {to: remoteId, candidate: e.candidate})
        }
    }

    

    return pc;
}