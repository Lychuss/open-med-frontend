"use client";

import { socket } from "@/src/lib/socket";
import { useEffect } from "react";
import Button from "@/src/components/button";
import { username } from "../page";

let localStream: MediaStream;

interface User {
    id: string,
    username: string
}

interface Ack {
    users: User[]
}

const rtcConfig: RTCConfiguration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
}

const peer = new Map<string, RTCPeerConnection>();

export default function Room(){

    useEffect(() => {
        
        socket.connect();
        
            socket.on("connect", () => {
              console.log("connected as", username)
            })
        
            socket.on("disconnect", () => {
              console.log("disconnected as", username)
            })
    
    }, [])

    const fetchMedia = async () => {
    try {
        console.log("starting media");
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        await startMedia();
        console.log("media ready, emitting");

        socket.emit("room:join", { roomId: '123', user: username }, async (res: Ack) => {
            console.log("ack:", res.users);
            for(const user of res.users){
                await callUser(user.id);
                }
            });
        } catch (err) {
            console.error("fetchMedia failed", err);
        }
    };

    const chat = () => {
        fetchMedia();
    }

    return (
    
        <div className="flex flex-col gap-10">
            <div className="flex w-[500px] min-h-screen gap-10" id="videochat">
                <video id="my-video" autoPlay playsInline className="min-h-screen -scale-x-100 ml-[50%]"/>
            </div>

            <Button onCLick={chat}/>
        </div>
        
    );
}

async function startMedia(){
    const myVideo = document.getElementById("my-video") as HTMLVideoElement;
    myVideo.muted = true;
    myVideo.srcObject = localStream;
    await myVideo.play();
}

async function callUser(remoteId: string){
    const peer = createPeer(remoteId);
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    socket.emit("webrtc:offer", { to: remoteId, offer });
}

socket.on("webrtc:offer", async ({from, offer}) => {
    const peer = createPeer(from);
    await peer.setRemoteDescription(offer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    socket.emit("webrtc:answer", { to: from, answer })
})

socket.on("webrtc:answer", async ({from, answer}) => {
    await peer.get(from)?.setRemoteDescription(answer)
})

socket.on("webrtc:ice-candidate", async ({from, candidate}) => {
    try {
        await peer.get(from)?.addIceCandidate(candidate);   
    } catch(err){
        console.error(err);
    }
})

function createPeer(remoteId: string): RTCPeerConnection{
    const pc = new RTCPeerConnection(rtcConfig);
    console.log(localStream);
    localStream.getTracks().forEach((track) => {
        pc.addTrack(track, localStream);
    })

    pc.onicecandidate = (e) => {
        if(e.candidate){
            socket.emit("webrtc:ice-candidate", {to: remoteId, candidate: e.candidate})
        }
    }

    pc.ontrack = (e) => {
        showRemoteVideo(remoteId, e.streams);
    }

    pc.onconnectionstatechange = () => {{
        if(pc.connectionState === "failed" || pc.connectionState === "closed"){
            closePeer(remoteId)
        }
    }}

    peer.set(remoteId, pc);

    return pc;
}

function showRemoteVideo(id: string, stream: readonly MediaStream[]){
    let element = document.getElementById(`remote-${id}`) as HTMLVideoElement | null;

    if(!element){
        element = document.createElement("video");
        element.id = `remote-${id}`;
        element.autoplay = true;
        element.playsInline = true;
        element.muted = true;
        element.className = "-scale-x-100"
        document.getElementById("videochat")?.appendChild(element);
    }

    console.log("HELLO YOU CREATED ANOTHER VIDEO");

    const [streams] = stream
    if(element.srcObject !== streams){
        element.srcObject = streams;
    }

}

function closePeer(remoteId: string){
    peer.get(remoteId)?.close();
    peer.delete(remoteId);
    removeVideoRemote(remoteId);
}

function removeVideoRemote(id: string){
    document.getElementById(`remote-${id}`)?.remove();
}
