import { createContext, useCallback, useEffect, useState, useContext, ReactNode } from "react";
import { betterAuth } from "../lib/better-auth";
import TokenApi from "../api/endpoints/token.api";
import { UserDataContextInterface } from "../interface/api/userData";

const TokenContext = createContext<UserDataContextInterface | null>(null);

export function TokenProvider({ children }: { children: ReactNode }){

    const [data, setData] = useState(null);
    const user = betterAuth.useSession();
    const userId = user.data?.session.id;

    console.log("TokenProvider userId:", userId);

    const fetchData = useCallback(async () => {
        if(!userId){
            setData(null);
            return;
        }

        await TokenApi().then(setData);
    }, [userId]);

    useEffect(() => {
        fetchData();
    }, [fetchData])

    return (
        <TokenContext.Provider value={data}>
            {children}
        </TokenContext.Provider>
    );
}

export const useTokenContext = (): UserDataContextInterface| null => {
    const tokenContextData = useContext(TokenContext);
    console.log("Token Context Data:", tokenContextData);
    if(!tokenContextData) return null;
    return tokenContextData;
}