import { createContext, useCallback, useState, useEffect, useContext, ReactNode } from "react";
import { betterAuth } from "../lib/better-auth";
import { UserDataContextInterface } from "../interface/api/userData";

const UserDataContext = createContext<UserDataContextInterface | null>(null);

export default function UserContext( {children}: { children: ReactNode }){
    const [data, setData] = useState<UserDataContextInterface>();


}


