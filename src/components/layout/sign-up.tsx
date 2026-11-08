"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Input from "../ui/input";
import Label from "../ui/label";
import Button from "../ui/button";
import CitySelector from "../ui/city-selector";

import { FaGoogle} from "react-icons/fa";

//API CALLS
import SignUpEmailApi from "@/api/auth/signup.api";

export default function SignUp() {

    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [error, setError] = useState<boolean | null>(false);
    const [passwordNotMatch, setPasswordNotMatch] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Email:", email);

        if(password !== confirmPassword){
            password !== confirmPassword && setPasswordNotMatch(true);
            return;
        }

        const data = await SignUpEmailApi({
            name: fullName,
            email: email,
            password: password,
            age: 0, 
            city: city,
            sex: "MALE", 
        });

        console.log("Sign Up Response:", data);

        if(!data){
            return router.push("/");
        }

        setErrorMsg(data);
        setError(true);
    }

    return (
        <div className="flex flex-col w-full items-center justify-center min-h-screen px-[2rem] py-[3rem] space-y-3">
            <h1 className="text-3xl font-bold text-green-500">Sign Up</h1>

            <Button type="button" className="flex w-full items-center justify-center gap-6 mt-[1rem] bg-gray-200 px-[1rem] py-[0.5rem] rounded-lg 
                active:scale-105 transition-transform hover:bg-gray-300">
                <FaGoogle className="text-gray-500 cursor-pointer hover:text-gray-700" />
                <span className="text-black">Sign up with Google</span>
            </Button>

            <div className="flex items-center justify-center gap-2 mt-[1rem] w-full max-w-md">
                <div className="w-full h-px bg-gray-300 my-4" />
                <span className="text-gray-500">OR</span>
                <div className="w-full h-px bg-gray-300 my-4" />
            </div>

            { error && (
                <div className="flex items-center justify-center gap-2 mt-[1rem] w-full max-w-md border-red-500 border bg-red-100 rounded-lg p-[0.5rem]">
                    <p className="text-red-500 text-sm">{errorMsg}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-4">
                <div className="flex w-full max-w-md gap-4 ">
                    <div className="flex flex-col w-full gap-2">
                        <Label children="Name" />
                        <Input id="full-name" placeholder="Your name" name="full-name" type="text" onChange={(e) => setFullName(e.target.value)}
                            className="border border-gray-300 bg-gray-300 rounded-xl text-black px-2 w-full"/>
                    </div>
                    
                    <div className="flex flex-col w-full gap-2">
                        <Label children="City" />
                        <CitySelector onCityChange={setCity} />
                    </div>
                </div>

                <div className="flex flex-col w-full max-w-md gap-2">
                    <Label children="Email" />
                    <Input id="email" placeholder="example@gmail.com" name="email" type="email" onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 bg-gray-300 rounded-xl text-black px-2 w-full"/>

                    <Label children="Password" /> 
                    <Input id="password" placeholder="••••••••" name="password" type="password" onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 bg-gray-300 rounded-xl text-black px-2 w-full"/>

                    <Label children="Confirm Password" />
                    <Input id="confirm-password" placeholder="••••••••" name="confirm-password" type="password" onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border border-gray-300 bg-gray-300 rounded-xl text-black px-2 w-full"/>
                    {passwordNotMatch && (
                        <p className="text-red-500 text-xs mt-1">Passwords do not match.</p>
                    )}
                </div>

                <Button
                    type="submit"
                    className="bg-green-700 text-white py-2 px-4 rounded hover:bg-blue-800 mt-[2rem] flex items-center justify-center gap-2 
                        active:scale-105 transition-transform"
                    disabled={loading}
                    aria-busy={loading}
                    children={
                        <>
                            {loading && (
                                <span
                                    aria-hidden="true"
                                    className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"
                                />
                            )}
                            {loading ? "Creating account..." : "Create Account"}
                        </>
                    }
                />
                
                <p className="text-sm text-gray-500 mt-[1rem] self-center">Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => router.push("/login")}>Log in</span></p>
            </form>
        </div>
    )
}