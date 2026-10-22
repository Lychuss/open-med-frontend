"use client";
import { useTokenContext } from "@/src/context/tokenContext";
import Carousel from "../layout/carousel";

export default function Services(){

    const { data } = useTokenContext();

    return (
        <section className="flex flex-col w-full min-h-screen px-[1rem] py-[3rem] space-y-3">
            <div className="flex items-center gap-1">
                <div className="w-[2px] h-[20px] bg-blue-700"> 

                </div>
                
                <h1 className="text-black font-semibold text-xs">HEALTH SOLUTIONS</h1>
            </div>

            <h1 className="font-bold text-black text-lg mb-[2rem]">Healthcare services for your well-being</h1>

            <Carousel />
        </section>
    );
}