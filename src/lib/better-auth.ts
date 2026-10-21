import { createAuthClient } from "better-auth/react";

export const betterAuth = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL
})