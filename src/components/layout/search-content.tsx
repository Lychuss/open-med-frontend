// src/app/[services]/search/SearchContent.tsx
"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import Input  from "@/components/ui/input";

let services = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "Hematology",
  "Infectious Disease",
  "Nephrology",
  "Neurology",
  "Oncology",
  "Ophthalmology",
  "Orthopedics",
  "Otolaryngology (ENT)",
  "Pediatrics",
  "Psychiatry",
  "Pulmonology",
  "Rheumatology",
  "Urology"
]

export default function SearchContent() {

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredServices, setFilteredServices] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const params = useParams();
  const service = params.services as string;

  useEffect(() => {
    setFilteredServices(
      services.filter((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  return (
    <section className="flex flex-col w-full min-h-screen px-[1rem] py-[3rem] space-y-3 mt-[2rem]">
      <div className="relative items-center gap-1">
        <Input className="w-full border rounded-lg px-[1rem] py-[0.5rem] text-black" placeholder={`Search for services...`} 
          id="search" name="search" type="text" onChange={(e) => setSearchQuery(e.target.value)} />     
        { /* Display filtered services in a dropdown */ }
        {filteredServices.length > 0 && searchQuery !== "" && (
          <ul className="absolute bg-white border rounded-lg mt-[0.5rem] w-full h-autoz-10">
            {filteredServices.map((s) => (
              <li key={s} className={`px-[1rem] py-[0.5rem] cursor-pointer text-black ${selectedService === s ? "bg-blue-100" : ""}`}
                onClick={() => setSelectedService(s)}>
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        
        
      </div>  
    </section>
  );
}