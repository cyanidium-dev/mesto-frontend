"use client";
import { useState } from "react";
import Container from "../shared/container/Container";
import SearchBar from "./SearchBar";

export default function Main() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  return (
    <Container className="mt-2">
      <SearchBar viewMode={viewMode} setViewMode={setViewMode} />
    </Container>
  );
}
