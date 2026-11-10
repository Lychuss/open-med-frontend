"use client";

import { createContext, useCallback, useEffect, useState, useContext, ReactNode } from "react";
import { DoctorData } from "../interface/api/doctorData";
import DoctorsApi from "@/api/endpoints/doctors.api";

const DoctorsContext = createContext<DoctorData | null>(null);

export function DoctorsProvider({ children }: { children: ReactNode }) {
    const [doctors, setDoctors] = useState<DoctorData | null>(null);

    const fetchDoctors = useCallback(async () => {
        try {
            const data = await DoctorsApi();
            setDoctors(data);
        } catch(err){
            console.log(err);
        }
    }, []);

    useEffect(() => {
        fetchDoctors();
    }, [fetchDoctors]);

    return (
        <DoctorsContext.Provider value={doctors}>
            {children}
        </DoctorsContext.Provider>
    );
}

export const useDoctorsContext = (): DoctorData | null => {
    const context = useContext(DoctorsContext);
    if (!context) return null;
    return context;
}