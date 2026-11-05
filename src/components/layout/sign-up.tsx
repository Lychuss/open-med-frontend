"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Input from "../ui/input";
import Label from "../ui/label";
import Button from "../ui/button";

import { FaGoogle} from "react-icons/fa";

//API CALLS
import SignUpEmailApi from "@/api/auth/signup.api";
import { searchCities, type CitySuggestion } from "@/api/http/city.api";

export default function SignUp() {

    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [cityQuery, setCityQuery] = useState<string>("");
    const [citySuggestions, setCitySuggestions] = useState<CitySuggestion[]>([]);
    const [loadingCities, setLoadingCities] = useState<boolean>(false);
    const [citySearchError, setCitySearchError] = useState<string>("");
    const [citySearchComplete, setCitySearchComplete] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [error, setError] = useState<boolean | null>(false);
    const [passwordNotMatch, setPasswordNotMatch] = useState<boolean>(false);

    useEffect(() => {
        const query = cityQuery.trim();
        if (query.length < 2 || city === cityQuery) return;

        const controller = new AbortController();
        let cancelled = false;
        const timeoutId = window.setTimeout(async () => {
            setLoadingCities(true);
            setCitySearchError("");

            try {
                setCitySuggestions(await searchCities(query, controller.signal));
                setCitySearchComplete(true);
            } catch (error) {
                if (cancelled) return;
                setCitySuggestions([]);
                setCitySearchError(
                    error instanceof Error ? error.message : "Could not load city suggestions."
                );
            } finally {
                if (!cancelled) setLoadingCities(false);
            }
        }, 300);

        return () => {
            cancelled = true;
            window.clearTimeout(timeoutId);
            controller.abort();
        };
    }, [city, cityQuery]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
                        <div className="relative">
                            <input
                                id="city"
                                name="city"
                                type="text"
                                role="combobox"
                                aria-autocomplete="list"
                                aria-expanded={
                                    loadingCities ||
                                    citySuggestions.length > 0 ||
                                    Boolean(citySearchError) ||
                                    citySearchComplete
                                }
                                aria-controls="city-suggestions"
                                autoComplete="off"
                                placeholder="Type your city"
                                value={cityQuery}
                                onChange={(e) => {
                                    setCity("");
                                    setCityQuery(e.target.value);
                                    setCitySuggestions([]);
                                    setLoadingCities(e.target.value.trim().length >= 2);
                                    setCitySearchError("");
                                    setCitySearchComplete(false);
                                }}
                                className="border border-gray-300 bg-gray-300 rounded-xl text-black px-2 w-full"
                                required
                            />
                            {(loadingCities || citySuggestions.length > 0 || citySearchError || citySearchComplete) && (
                                <ul
                                    id="city-suggestions"
                                    role="listbox"
                                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-300 bg-white py-1 shadow-lg"
                                >
                                    {loadingCities && (
                                        <li role="status" className="px-3 py-2 text-sm text-gray-500">
                                            Searching cities...
                                        </li>
                                    )}
                                    {citySearchError && (
                                        <li role="status" className="px-3 py-2 text-sm text-red-600">
                                            {citySearchError}
                                        </li>
                                    )}
                                    {!loadingCities && !citySearchError && citySuggestions.map((suggestion) => (
                                        <li key={suggestion.id} role="option" aria-selected={false}>
                                            <button
                                                type="button"
                                                className="w-full px-3 py-2 text-left text-sm text-black hover:bg-gray-100"
                                                onClick={() => {
                                                    const selectedCity = `${suggestion.name}, ${suggestion.country}`;
                                                    setCity(selectedCity);
                                                    setCityQuery(selectedCity);
                                                    setCitySuggestions([]);
                                                    setLoadingCities(false);
                                                    setCitySearchComplete(false);
                                                }}
                                            >
                                                {suggestion.name}
                                                {suggestion.admin1 && `, ${suggestion.admin1}`}
                                                {`, ${suggestion.country}`}
                                            </button>
                                        </li>
                                    ))}
                                    {!loadingCities && !citySearchError && citySuggestions.length === 0 && (
                                        <li role="status" className="px-3 py-2 text-sm text-gray-500">
                                            No matching cities found.
                                        </li>
                                    )}
                                </ul>
                            )}
                        </div>
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
            </form>
        </div>
    )
}