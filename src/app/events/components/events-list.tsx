import EventCard, { EventCardProps } from "@/app/events/components/event-card";
import { ScrollArea } from "@/components/ui/scroll-area";

type EventsListProps = {
  events: EventCardProps[];
};

export default function EventsList({ events }: EventsListProps) {
  return (
    <ScrollArea className="overflow-y-auto overflow-visible px-16">
      {events.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </ScrollArea>
  );
}
