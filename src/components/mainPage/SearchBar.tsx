import { Dispatch, SetStateAction } from "react";
import TabMenu from "./TabMenu";

interface SearchBarProps {
  viewMode: "map" | "list";
  setViewMode: Dispatch<SetStateAction<"map" | "list">>;
}

export default function SearchBar({ viewMode, setViewMode }: SearchBarProps) {
  return (
    <div>
      <TabMenu viewMode={viewMode} setViewMode={setViewMode} />
    </div>
  );
}
