// src/app/[services]/search/page.tsx
import { Suspense } from "react";
import SearchContent from "../../components/layout/search-content";
import { DoctorsProvider } from "@/context/doctorsContext";

export default function Search() {
  return (
    <DoctorsProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchContent />
      </Suspense>
    </DoctorsProvider>
  );
}