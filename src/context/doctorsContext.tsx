"use client";

import { createContext, useCallback, useEffect, useState, useContext, ReactNode } from "react";
import { DoctorData } from "../interface/api/doctorData";
import DoctorsApi from "@/api/endpoints/doctors.api";

export const DoctorsContext = createContext<DoctorData | null>(null);

export function DoctorsProvider({ children }: { children: ReactNode }) {
    const [doctors, setDoctors] = useState<DoctorData | null>(null);

    const fetchDoctors = useCallback(async () => {
        await DoctorsApi().then(setDoctors);
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

export function useDoctorsContext() {
    const context = useContext(DoctorsContext);
    if (!context) {
        throw new Error("useDoctors must be used within a DoctorsProvider");
    }
    return context;
}