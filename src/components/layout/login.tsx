import Button from "../ui/button";
import Input from "../ui/input";
import Label from "../ui/label";

import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

type MyProps = {
    className?: string;
    onClose: () => void;
}

export default function Login(props: MyProps){
    const handleSubmit = async () => {
        
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className={`${props.className} max-w-md shadow-xl flex items-center justify-center`}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full p-7 bg-white rounded-lg">

                    <button
                        type="button"
                        aria-label="Close login"
                        onClick={props.onClose}
                        className="text-2xl font-bold text-black text-end cursor-pointer hover:scale-110"
                    >
                        x
                    </button>

                    <Label children="Email" />
                    <Input id="email" placeholder="example@gmail.com" name="email" type="email" 
                        className="border border-gray-300 text-black py-1 px-2"/>
                    
                    <Label children="Password" />
                    <Input id="password" placeholder="password" name="password" type="password"
                        className="border border-gray-300 text-black py-1 px-2"/>

                    <Button type="submit" className="bg-green-700 text-white py-2 px-4 rounded hover:bg-blue-800 mt-[2rem]" children="Sign in" />  

                    <div className="flex items-center justify-center gap-2 mt-[1rem]">
                        <div className="w-full h-px bg-gray-300 my-4" />
                        <span className="text-gray-500">OR</span>
                        <div className="w-full h-px bg-gray-300 my-4" />
                    </div>

                    <div className="flex items-center justify-center gap-6 mt-[1rem]">
                        <FaGoogle className="text-gray-500 text-2xl cursor-pointer hover:text-gray-700" />
                        <FaFacebook className="text-gray-500 text-2xl cursor-pointer hover:text-gray-700" />
                    </div>

                    <p className="text-center text-gray-500 mt-[1rem]">
                        Or <span className="cursor-pointer border-b border-gray-500 hover:border-blue-700">sign up with email</span>
                    </p>

                </form>
            </div>
        </div>
    );
}