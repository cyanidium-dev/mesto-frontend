"use client";
import { useState } from "react";
import Container from "../shared/container/Container";
import SearchBar from "./SearchBar";

export default function Main() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  return (
    <Container className="min-h-screen">
      <SearchBar viewMode={viewMode} setViewMode={setViewMode} />
    </Container>
  );
}
