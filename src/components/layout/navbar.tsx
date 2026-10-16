"use client";

import { useState } from "react";

import Image from "next/image";

export default function Navbar(){

    const [open, setOpen] = useState<boolean>();
    return (
        <section className="w-full h-[50px] flex items-center justify-between p-[0.6em] bg-[rgb(246,245,242)] fixed z-10" id="navbar">
            <div className="">
                <Image alt="logo" src={"/icon/logo-v7.png"} width={1000} height={1000} className="w-[120px] h-full"/>
            </div>

            <div className="">
                <button className="text-[rgb(13,83,14)]" onClick={() => setOpen(!open)}>{open ? "X" : "☰"}</button>
            </div>
        </section>
    );
}