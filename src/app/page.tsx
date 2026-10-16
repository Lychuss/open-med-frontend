"use client";

import { v4 as uuid4 } from "uuid";

//UI import
import Landing from "../components/pages/landing";
import Services from "../components/pages/services";

export const username = uuid4();

export default function Home() {

  return (
    <>
      <Landing />
      <Services />
    </>
  );
}
