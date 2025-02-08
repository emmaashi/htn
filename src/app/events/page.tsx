"use client";

import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "@/graphql/queries";
import EventCard, { EventCardProps } from "./components/EventCard";
import client from "@/graphql/client";
import { useEffect, useState, useCallback } from "react";
import { SidebarNavigation } from "./components/Sidebar";
import { Input } from "@/components/ui/input";

export default function EventsPage() {
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const { loading, error, data } = useQuery(GET_EVENTS, { client });
  const [loggedIn, setLoggedIn] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allEvents, setAllEvents] = useState<EventCardProps[]>([]);
  const totalEvents = allEvents.length;

  useEffect(() => {
    // Get login state from localStorage on component mount
    const storedLoggedIn = localStorage.getItem("loggedIn");
    setLoggedIn(storedLoggedIn);
  }, []);

  const filterEvents = useCallback(() => {
    if (!data) return;

    let initialEvents = data.sampleEvents;

    if (loggedIn === "guest") {
      initialEvents = initialEvents.filter(
        (event: EventCardProps) => event.permission === "public"
      );
    }

    // make a copy for further filtering
    let filteredEvents = [...initialEvents];

    // searchbar
    if (searchTerm) {
      filteredEvents = filteredEvents.filter((event: EventCardProps) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedFilters.length > 0) {
      filteredEvents = filteredEvents.filter((event: EventCardProps) =>
        selectedFilters.includes(event.event_type)
      );
    }

    // default sort by start_time
    filteredEvents.sort((a: EventCardProps, b: EventCardProps) => a.start_time - b.start_time);

    setEvents(filteredEvents);
    setAllEvents(initialEvents);
  }, [data, loggedIn, selectedFilters, searchTerm]);

  useEffect(() => {
    filterEvents();
  }, [data, loggedIn, selectedFilters, searchTerm, filterEvents]);

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
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
        <h1 className="text-4xl font-bold text-left mb-4 ml-8 mt-4">Events</h1>
          <Input
            type="text"
            placeholder="Search events..."
            className="p-3 border-2 rounded-xl h-12 ml-8 w-96"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        <p className="ml-8 mt-2 mb-4">Showing {events.length} out of {totalEvents} events</p>
        {events.map((event: EventCardProps) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}
