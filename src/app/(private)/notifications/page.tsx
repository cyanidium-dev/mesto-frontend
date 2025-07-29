"use client";
import { useRouter } from "next/navigation";
import Container from "@/components/shared/container/Container";
import NavigationButton from "@/components/shared/buttons/NavigationButton";
import ArrowIcon from "@/components/shared/icons/ArrowIcon";

export default function NotificationsPage() {
  const router = useRouter();
  return (
    <Container>
      <NavigationButton onClick={() => router.back()} className="mb-2">
        <ArrowIcon />
        Назад
      </NavigationButton>
      <p>Notifications page</p>
    </Container>
  );
}
