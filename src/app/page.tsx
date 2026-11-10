"use client";

import { v4 as uuid4 } from "uuid";

//UI import
import Landing from "../components/pages/landing";
import Services from "../components/pages/services";
import Login from "../components/layout/login";

import { TokenProvider } from "../context/tokenContext";
import { DoctorsProvider } from "@/context/doctorsContext";

export const username = uuid4();

export default function Home() {

  return (
    <>
      <TokenProvider>

          <Landing />

        <DoctorsProvider>

          <Services />

        </DoctorsProvider>
        
      </TokenProvider>
    </>
  );
}
