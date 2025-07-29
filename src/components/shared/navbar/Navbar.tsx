"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Tabs, Tab } from "@heroui/react";
import Image from "next/image";
import Container from "../container/Container";

export default function Navbar() {
  const pathname = usePathname();
  const trimmedPathname = pathname.startsWith("/")
    ? pathname.slice(1)
    : pathname;

  const router = useRouter();

  const [selected, setSelected] = useState(trimmedPathname);

  const navigationList = [
    { value: "main", icon: "/images/navbar/home.svg" },
    { value: "chat", icon: "/images/navbar/chat.svg" },
    { value: "create", icon: "/images/navbar/create.svg" },
    { value: "notifications", icon: "/images/navbar/bell.svg" },
    { value: "profile", icon: "/images/navbar/user.svg" },
  ];

  const handleTabChange = (key: string) => {
    setSelected(key);
    router.push(`/${key}`);
  };

  return (
    <>
      {pathname === "/main" ||
      pathname === "/profile" ||
      pathname === "/notifications" ? (
        <Container className={`fixed bottom-0 left-0 z-50`}>
          {" "}
          <Tabs
            onSelectionChange={(key) => handleTabChange(key as string)}
            aria-label="navigation"
            classNames={{
              base: "bg-transparent w-full",
              tabList: "bg-primary h-[60px] rounded-full w-full",
              cursor: "block bg-accent rounded-full py-[13px]",
              tab: "h-[50px]",
            }}
          >
            {navigationList.map(({ value, icon }, idx) => (
              <Tab
                aria-label="navigation tab"
                key={value}
                title={
                  <div className="flex flex-col items-center gap-1">
                    <Image src={icon} alt={value} width={24} height={24} />
                    {value === "create" ? (
                      <span className="text-[10px] font-semibold leading-[120%] text-white text-center">
                        Создать
                      </span>
                    ) : null}
                  </div>
                }
              />
            ))}
          </Tabs>
        </Container>
      ) : null}
    </>
  );
}
