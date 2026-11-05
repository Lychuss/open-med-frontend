import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const betterAuth = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    plugins: [
        inferAdditionalFields({
            user: {
                age: { type: "number", required: false },
                role: { type: "string", defaultValue: "PATIENT", input: false },
                city: { type: "string", required: true },
                sex: { type: "string", required: false }
            }
        })
    ]
});
