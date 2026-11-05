export type CitySuggestion = {
    id: number;
    name: string;
    country: string;
    admin1?: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function isCitySuggestion(value: unknown): value is CitySuggestion {
    return (
        isRecord(value) &&
        typeof value.id === "number" &&
        typeof value.name === "string" &&
        typeof value.country === "string" &&
        (value.admin1 === undefined || typeof value.admin1 === "string")
    );
}

export async function searchCities(
    query: string,
    signal?: AbortSignal
): Promise<CitySuggestion[]> {
    const params = new URLSearchParams({
        name: query.trim(),
        count: "10",
        language: "en",
        format: "json",
    });
    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?${params}`,
        { signal }
    );

    if (!response.ok) {
        throw new Error(`City search failed (${response.status}).`);
    }

    const data: unknown = await response.json();
    if (!isRecord(data)) {
        throw new Error("The city search returned an invalid response.");
    }

    if (data.results !== undefined && !Array.isArray(data.results)) {
        throw new Error("The city search returned an invalid response.");
    }

    return Array.isArray(data.results) ? data.results.filter(isCitySuggestion) : [];
}
