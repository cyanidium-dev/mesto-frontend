import { Dispatch, SetStateAction } from "react";
import { Tabs, Tab } from "@heroui/react";
import MapIcon from "../shared/icons/MapIcon";
import BurgerIcon from "../shared/icons/BurgerIcon";

interface TabMenuProps {
  viewMode: "map" | "list";
  setViewMode: Dispatch<SetStateAction<"map" | "list">>;
}

export default function TabMenu({ viewMode, setViewMode }: TabMenuProps) {
  const handleTabChange = (key: string) => {
    setViewMode(key as "map" | "list");
  };

  return (
    <Tabs
      onSelectionChange={(key) => handleTabChange(key as "map" | "list")}
      classNames={{
        base: "bg-transparent",
        tabList: `${
          viewMode === "map" ? "bg-white" : "bg-gray-ultra-light"
        } h-9 rounded-full w-full transition duration-300 ease-in-out`,
        cursor: "block bg-accent rounded-full",
        tab: "w-7 h-7",
      }}
    >
      <Tab
        aria-label="navigation tab"
        key="list"
        title={
          <BurgerIcon
            className={`${
              viewMode === "list" ? "text-white" : "text-dark"
            } transition duration-300 ease-in-out`}
          />
        }
      />
      <Tab
        aria-label="navigation tab"
        key="map"
        title={
          <MapIcon
            className={viewMode === "map" ? "text-white" : "text-dark"}
          />
        }
      />
    </Tabs>
  );
}
