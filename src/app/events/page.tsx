// app/events/page.tsx
'use client';

import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "@/graphql/queries";
import EventCard, { EventCardProps } from "./components/EventCard";
import client from "@/graphql/client";
import { useEffect, useState } from "react";
import { SidebarNavigation } from "./components/Sidebar";

export default function EventsPage() {
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const { loading, error, data } = useQuery(GET_EVENTS, { client });
  const [loggedIn, setLoggedIn] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    // Get login state from localStorage on component mount
    const storedLoggedIn = localStorage.getItem("loggedIn");
    setLoggedIn(storedLoggedIn);
  }, []);

  useEffect(() => {
    if (data) {
      let filteredEvents = data.sampleEvents;

      // Filter events based on login state
      if (loggedIn === "guest") {
        filteredEvents = filteredEvents.filter(
          (event: EventCardProps) => event.permission === "public"
        );
      }

      // Apply event type filters
      if (selectedFilters.length > 0) {
        filteredEvents = filteredEvents.filter((event: EventCardProps) =>
          selectedFilters.includes(event.event_type)
        );
      }

      setEvents(filteredEvents);
    }
  }, [data, loggedIn, selectedFilters]);

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex">
      <SidebarNavigation
        onFilterChange={handleFilterChange}
        defaultFilters={selectedFilters}
      />
      <div className="flex-1 p-4">
        {events.map((event: EventCardProps) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}
