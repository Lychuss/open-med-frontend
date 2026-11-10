"use client";

import { useEffect, useState } from "react";

import { searchCities, type CitySuggestion } from "@/api/endpoints/city.api";

type CitySelectorProps = {
    onCityChange: (city: string) => void;
};

export default function CitySelector({ onCityChange }: CitySelectorProps) {
    const [cityQuery, setCityQuery] = useState("");
    const [citySuggestions, setCitySuggestions] = useState<CitySuggestion[]>([]);
    const [loadingCities, setLoadingCities] = useState(false);
    const [citySearchError, setCitySearchError] = useState("");
    const [citySearchComplete, setCitySearchComplete] = useState(false);
    const [citySelected, setCitySelected] = useState(false);

    useEffect(() => {
        const query = cityQuery.trim();
        if (query.length < 2 || citySelected) return;

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
    }, [cityQuery, citySelected]);

    return (
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
                onChange={(event) => {
                    setCitySelected(false);
                    onCityChange("");
                    setCityQuery(event.target.value);
                    setCitySuggestions([]);
                    setLoadingCities(event.target.value.trim().length >= 2);
                    setCitySearchError("");
                    setCitySearchComplete(false);
                }}
                className="border border-gray-300 bg-gray-300 rounded-xl text-black px-2 w-full"
                required
            />
            {(loadingCities ||
                citySuggestions.length > 0 ||
                citySearchError ||
                citySearchComplete) && (
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
                    {!loadingCities &&
                        !citySearchError &&
                        citySuggestions.map((suggestion) => (
                            <li key={suggestion.id} role="option" aria-selected={false}>
                                <button
                                    type="button"
                                    className="w-full px-3 py-2 text-left text-sm text-black hover:bg-gray-100"
                                    onClick={() => {
                                        const selectedCity = `${suggestion.name}, ${suggestion.country}`;
                                        setCitySelected(true);
                                        onCityChange(selectedCity);
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
    );
}
