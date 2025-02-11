"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  ExternalLinkIcon,
} from "lucide-react";
import { useEvents } from "../actions/useEvents";

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
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const MAX_LINES = 3;

const useLineClamp = (text: string | undefined) => {
  const [clamped, setClamped] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (containerRef.current && text) {
      const lineHeight = Number.parseFloat(
        getComputedStyle(containerRef.current).lineHeight,
      );
      const maxHeight = lineHeight * MAX_LINES;
      setShowButton(containerRef.current.scrollHeight > maxHeight);
    }
  }, [text, clamped]);

  const toggleClamped = () => setClamped((prev) => !prev);

  return { clamped, toggleClamped, showButton, containerRef };
};

export default function EventCard({
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
  const { clamped, toggleClamped, showButton, containerRef } =
    useLineClamp(description);

  const { events } = useEvents();

  // map related event IDs to actual event objects
  const relatedEventNames = related_events
    .map((eventId) =>
      events.find((event: EventCardProps) => event.id === eventId),
    ) // find the event by it's id
    .filter((event) => event !== undefined); // remove undefined events

  return (
    <Card
      className={`group block rounded-2xl ${eventTypeColors[event_type]} ${eventShadowColors[event_type]} transition-all duration-300 hover:shadow-lg w-full mb-4`}
    >
      <CardHeader className="space-y-1 pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-bold tracking-tight mb-2">{name}</h3>
            <div className="flex flex-wrap gap-2">
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
          </div>
          <div className="text-right text-sm text-gray-700">
            <div className="flex items-center justify-end space-x-1">
              <CalendarIcon className="h-3 w-3" />
              <time dateTime={new Date(start_time).toISOString()}>
                {formatDate(start_time)}
              </time>
            </div>
            <div className="flex items-center justify-end space-x-1 mt-1">
              <ClockIcon className="h-3 w-3" />
              <span>
                {formatTime(start_time)} - {formatTime(end_time)}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {description && (
          <div>
            <p
              ref={containerRef}
              className={`text-sm text-muted-foreground ${
                clamped ? "line-clamp-3 overflow-hidden text-ellipsis" : ""
              }`}
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: clamped ? MAX_LINES : "unset",
              }}
            >
              {description}
            </p>
            {showButton && (
              <Button
                variant="link"
                className="h-auto p-0 text-sm"
                onClick={toggleClamped}
              >
                {clamped ? "Read more" : "Show less"}
              </Button>
            )}
          </div>
        )}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 mb-2">
              <UsersIcon className="h-4 w-4" />
              <div className="flex flex-wrap gap-2">
                {speakers.map((speaker, index) => (
                  <Badge key={index} variant="secondary">
                    {speaker.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {(public_url || private_url) && (
                <div className="flex gap-2">
                  {public_url && (
                    <a
                      href={public_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-primary hover:underline"
                    >
                      Public Link
                      <ExternalLinkIcon className="ml-1 h-4 w-4" />
                    </a>
                  )}
                  {private_url && (
                    <a
                      href={private_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-primary hover:underline"
                    >
                      Private Link
                      <ExternalLinkIcon className="ml-1 h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
          </div>
        </div>
        <Separator/>
        {relatedEventNames.length > 0 && (
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-sm font-medium">Related Events:</span>
                  <div className="flex flex-wrap gap-2">
                    {relatedEventNames.map((event) => (
                      <Link
                        key={event?.id}
                        href={`/events/${event?.id}`}
                        passHref
                      >
                        <Badge
                          variant="outline"
                          className="cursor-pointer transition-colors hover:border-primary hover:text-primary"
                        >
                          {event?.name}
                          <ExternalLinkIcon className="ml-1 h-3 w-3" />
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
      </CardContent>
    </Card>
  );
}
