import { Business } from "@/types/business";
import Card from "./Card";
import Container from "../shared/container/Container";

interface ListProps {
  businesses: Business[];
}

export default function List({ businesses }: ListProps) {
  return (
    <Container className="pt-[96px] pb-[68px] min-h-screen">
      <h2 className="mb-2 font-medium">В радиусе 2 км</h2>
      <ul className="flex flex-col gap-2">
        {businesses.map((business) => (
          <Card key={business.id} business={business} />
        ))}
      </ul>
    </Container>
  );
}
