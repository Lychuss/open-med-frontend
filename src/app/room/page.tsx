"use client";

import { useEffect } from "react";

let localStream: MediaStream

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