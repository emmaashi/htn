import EventCard, {
  type EventCardProps,
} from "@/app/events/components/event-card";
import { ScrollArea } from "@/components/ui/scroll-area";

type EventsListProps = {
  events: EventCardProps[];
};

export default function EventsList({ events }: EventsListProps) {
  return (
    <ScrollArea className="w-full overflow-y-auto overflow-visible px-16">
      {events.length > 0 ? (
        events.map((event) => <EventCard key={event.id} {...event} />)
      ) : (
        <div className="flex items-center justify-center h-[400px] text-gray-500">
          No events found
        </div>
      )}
    </ScrollArea>
  );
}
