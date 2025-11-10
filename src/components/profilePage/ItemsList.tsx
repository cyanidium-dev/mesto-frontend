import { Business } from "@/types/business";
import { Event } from "@/types/event";
import { ListItem } from "./ListItem";

interface ItemsListProps {
    items: Event[] | Business[];
}

export const ItemsList = ({ items }: ItemsListProps) => {
    return (
        <ul className="flex flex-col gap-2">
            {items.map(item => (
                <ListItem key={item.id} item={item} />
            ))}
        </ul>
    );
};
