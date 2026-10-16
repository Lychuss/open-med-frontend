import Image from "next/image";
import Button from "../ui/button";

export default function Landing(){
    return (
        <section className="relative w-full min-h-screen bg-black" id="home">

            <Image src={"/images/landing-six.jpg"} alt="landing-one" width={1000} height={1000} className="min-h-screen opacity-55"/>

            <div className="absolute flex flex-col justify-center inset-0 w-full text-start h-full px-[1rem] space-y-4  ">
                <div className="flex flex-col items-center space-y-4">
                    <h1 className="text-[1.7em] font-semibold">We want to heal the patient with services.</h1>
                    <p className="text-xs">We offer personalized services design to support and enhance your path to optimal wellness.</p>
                </div>

                <div className="flex items-start gap-3">
                    <Button className="bg-blue-600 rounded-lg px-[1.2rem] py-[0.7rem] text-[0.8em] font-semibold" children="Learn More ↗"/>
                    <Button className="border rounded-lg px-[0.9rem] py-[0.6rem] text-[0.8em] font-semibold" children="Contact Us"/>
                </div>
            </div>

        </section>        
    );
}