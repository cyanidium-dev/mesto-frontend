import { Suspense } from "react";
import { Business } from "@/types/business";
import { Event } from "@/types/event";
import Card from "./Card";
import EventCard from "./EventCard";
import Container from "../shared/container/Container";

interface ListProps {
  businesses: Business[];
  events?: Event[];
}

export default function List({ businesses, events = [] }: ListProps) {
  return (
    <Container className="pt-[96px] pb-[68px] min-h-screen">
      <h2 className="mb-2 font-medium">В радиусе 2 км</h2>
      <ul className="flex flex-col gap-2">
        {events.map((event) => (
          <Suspense key={event.id} fallback={<div>Loading...</div>}>
            <EventCard event={event} />
          </Suspense>
        ))}
        {businesses.map((business) => (
          <Suspense key={business.id} fallback={<div>Loading...</div>}>
            <Card business={business} />
          </Suspense>
        ))}
      </ul>
    </Container>
  );
}
