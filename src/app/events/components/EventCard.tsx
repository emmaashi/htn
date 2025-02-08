import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import  Link from "next/link";


// Colour palette for event types htn 2024
const eventTypeColors: Record<string, string> = {
  workshop: "border-2 border-[#F2B3DA]",
  tech_talk: "border-2 border-[#ADB2F3]",
  activity: "border-2 border-[#BDEAE0]",
};

const eventTypeLabels: Record<TEventType, string> = {
    workshop: "Workshop",
    tech_talk: "Tech Talk",
    activity: "Activity",
};

// Types
type TEventType = "workshop" | "tech_talk" | "activity";
type TPermission = "public" | "private";
type TSpeaker = {
    name: string;
  };

export type EventCardProps = {
    id: number;
    name: string;
    event_type: TEventType;
    start_time: number;
    end_time: number;
    description?: string;
    speakers?: TSpeaker[];
    public_url?: string;
    private_url?: string;
    related_events?: number[];
    permission: TPermission;
  };

// format dates
const formatDate = (timestamp: number) =>
    new Date(timestamp).toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

export default function EventCard({
    id,
    name,
    event_type,
    start_time,
    end_time,
    description,
    speakers = [],
    public_url,
    private_url,
    related_events = [],
    permission,
        }: EventCardProps) {
    return (
        <Link href={`/events/${id}`} className="pointer-events-none">
            <Card
            className={`group block rounded-2xl border-4 bg-white p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg w-[80%] mx-auto mb-4
                ${eventTypeColors[event_type]}`}
            >
            <CardHeader>
                <CardTitle className="text-xl font-bold mb-2">{name}</CardTitle>
                <div className="flex items-center space-x-2">
                {/* Event Type Badge */}
                <Badge
                    variant="outline"
                    className={`rounded-full px-3 py-1 font-semibold ${eventTypeColors[event_type]}`}
                >
                    {eventTypeLabels[event_type]}
                </Badge>

                <Badge
                    variant="outline"
                    className="rounded-full px-3 py-1 text-muted-foreground font-medium"
                >
                    {permission === "private" ? "Private" : "Public"}
                </Badge>
                </div>

                <p className="text-gray-600 text-sm">
                {formatDate(start_time)} - {formatDate(end_time)}
                </p>
            </CardHeader>

            <CardContent>
                {description && <p className="text-gray-700">{description}</p>}

                {speakers.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                    <strong>Speakers:</strong> {speakers.map((s) => s.name).join(", ")}
                </p>
                )}

                {related_events.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                    <strong>Related Events:</strong> {related_events.join(", ")}
                </p>
                )}

                {public_url && (
                <p className="text-sm text-blue-600 mt-2">
                    <a href={public_url} target="_blank" rel="noopener noreferrer">
                    Public Event Link
                    </a>
                </p>
                )}
            </CardContent>
            </Card>
        </Link>
    );
}