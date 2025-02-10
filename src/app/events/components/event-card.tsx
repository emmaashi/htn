import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ExternalLinkIcon } from "lucide-react";

// Colour palette for event types htn 2024
const eventTypeColors: Record<string, string> = {
  workshop: "border-2 border-[#F2B3DA]",
  tech_talk: "border-2 border-[#ADB2F3]",
  activity: "border-2 border-[#BDEAE0]",
};

const eventShadowColors: Record<TEventType, string> = {
  workshop: "hover:shadow-[#F2B3DA]/50",
  tech_talk: "hover:shadow-[#ADB2F3]/50",
  activity: "hover:shadow-[#BDEAE0]/50",
};

// Event Types
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

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const day = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${day} at ${time}`;
};

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
    <Card
      className={`group block rounded-2xl border-4 bg-white p-4 mb-6 shadow-md transition-all duration-300 
            hover:shadow-lg ${eventTypeColors[event_type]} ${eventShadowColors[event_type]}`}
    >
      <CardHeader>
        <CardTitle className="text-xl font-bold mb-2">{name}</CardTitle>
        <div className="flex items-center space-x-2">
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
          <p className="text-gray-600 text-sm font-semibold">
            <CalendarIcon className="inline-block h-4 w-4 mr-1" />
            {formatDate(start_time)} - {formatDate(end_time)}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        {description && <p className="text-gray-700">{description}</p>}

        <div className="mt-2 text-sm">
          {speakers.length > 0 && (
            <p className="text-gray-500">
              <strong>Speakers:</strong>{" "}
              {speakers.map((s) => s.name).join(", ")}
              {(public_url || private_url) && (
                <span className="ml-2">
                  {public_url && (
                    <a
                      href={public_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center"
                    >
                      <ExternalLinkIcon className="h-4 w-4 mr-1" />
                      Public
                    </a>
                  )}
                  {public_url && private_url && <span className="mx-1">|</span>}
                  {private_url && (
                    <a
                      href={private_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center"
                    >
                      <ExternalLinkIcon className="h-4 w-4 mr-1" />
                      Private
                    </a>
                  )}
                </span>
              )}
            </p>
          )}

          {related_events.length > 0 && (
            <p className="text-gray-500 mt-1">
              <strong>Related Events:</strong> {related_events.join(", ")}
              , {id} {/* temporarily here bc of eslint error */}
              {(public_url || private_url) && !speakers.length && (
                <span className="ml-2">
                  {public_url && (
                    <a
                      href={public_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center"
                    >
                      <ExternalLinkIcon className="h-4 w-4 mr-1" />
                      Public
                    </a>
                  )}
                  {public_url && private_url && <span className="mx-1">|</span>}
                  {private_url && (
                    <a
                      href={private_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center"
                    >
                      <ExternalLinkIcon className="h-4 w-4 mr-1" />
                      Private
                    </a>
                  )}
                </span>
              )}
            </p>
          )}

          {!speakers.length &&
            !related_events.length &&
            (public_url || private_url) && (
              <p className="text-gray-500">
                <span>
                  {public_url && (
                    <a
                      href={public_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center"
                    >
                      <ExternalLinkIcon className="h-4 w-4 mr-1" />
                      Public Event Link
                    </a>
                  )}
                  {public_url && private_url && <span className="mx-1">|</span>}
                  {private_url && (
                    <a
                      href={private_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-flex items-center"
                    >
                      <ExternalLinkIcon className="h-4 w-4 mr-1" />
                      Private Event Link
                    </a>
                  )}
                </span>
              </p>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
