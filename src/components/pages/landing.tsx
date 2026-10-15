import Image from "next/image";

export default function Landing(){
    return (
        <section className="relative w-full min-h-screen bg-black" id="home">

            <Image src={"/images/landing-six.jpg"} alt="landing-one" width={1000} height={1000} className="min-h-screen opacity-60"/>

            <div className="">
                <div className="absolute flex items-center justify-center inset-0 w-full text-start font-semibold h-full">
                    <h1 className="text-[1.7em]">We want to heal the patient with servces.</h1>
                </div>
            </div>
        </section>        
    );
}