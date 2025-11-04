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
          <EventCard key={event.id} event={event} />
        ))}
        {businesses.map((business) => (
          <Card key={business.id} business={business} />
        ))}
      </ul>
    </Container>
  );
}
