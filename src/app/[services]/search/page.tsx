// src/app/[services]/search/page.tsx
import { Suspense } from "react";
import SearchContent from "../../../components/layout/search-content";

export default function Search() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}