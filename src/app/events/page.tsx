"use client";

import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "@/graphql/queries";
import client from "@/graphql/client";
import { useEffect, useState, useCallback } from "react";
import EventCard, { EventCardProps } from "./components/EventCard";
import { SidebarNavigation } from "./components/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import build from "@/app/assets/build.png";

export default function EventsPage() {
  const [events, setEvents] = useState<EventCardProps[]>([]);
  const { loading, error, data } = useQuery(GET_EVENTS, { client });
  const [loggedIn, setLoggedIn] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [allEvents, setAllEvents] = useState<EventCardProps[]>([]);
  const [sortBy, setSortBy] = useState<string>("start_time"); // default
  const totalEvents = allEvents.length;

  useEffect(() => {
    // get login state from localStorage on component mount
    const storedLoggedIn = localStorage.getItem("loggedIn");
    setLoggedIn(storedLoggedIn);
  }, []);

  const filterEvents = useCallback(() => {
    if (!data) return;

    let initialEvents = data.sampleEvents;

    if (loggedIn === "guest") {
      initialEvents = initialEvents.filter(
        (event: EventCardProps) => event.permission === "public",
      );
    }

    // make a copy for further filtering
    let filteredEvents = [...initialEvents];

    // searchbar
    if (searchTerm) {
      filteredEvents = filteredEvents.filter((event: EventCardProps) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedFilters.length > 0) {
      filteredEvents = filteredEvents.filter((event: EventCardProps) =>
        selectedFilters.includes(event.event_type),
      );
    }

    // sorting
    filteredEvents.sort((a: EventCardProps, b: EventCardProps) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "end_time") return a.end_time - b.end_time;
      return a.start_time - b.start_time;
    });

    setEvents(filteredEvents);
    setAllEvents(initialEvents);
  }, [data, loggedIn, selectedFilters, searchTerm, sortBy]);

  useEffect(() => {
    filterEvents();
  }, [data, loggedIn, selectedFilters, searchTerm, sortBy, filterEvents]);

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (val: string) => {
    setSortBy(val);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="relative flex min-h-screen">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-no-repeat bg-center bg-contain bg-fixed"
          style={{ backgroundImage: `url(${build.src})` }}
        ></div>
        <div className="absolute inset-0 bg-white/70"></div>
      </div>

      <div className="relative flex w-full">
        <div className="sticky top-0 h-screen">
          <SidebarNavigation
            onFilterChange={handleFilterChange}
            defaultFilters={selectedFilters}
          />
        </div>

        <div className="flex-1 p-4 min-h-screen">
          <h1 className="text-5xl font-bold text-left mb-4 ml-16 mt-14">
            Events
          </h1>
          <div className="flex items-center gap-x-4 ml-16">
            <Input
              type="text"
              placeholder="Search events..."
              className="p-3 border-2 rounded-xl h-10 w-[790px]"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Select onValueChange={handleSortChange} defaultValue={sortBy}>
              <SelectTrigger className="ml-[101px] h-10 w-36 text-left">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="start_time">Start Time</SelectItem>
                <SelectItem value="end_time">End Time</SelectItem>
                <SelectItem value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <p className="ml-16 mt-3 mb-4">
            Showing {events.length} out of {totalEvents} events
          </p>

          <ScrollArea className="overflow-y-auto overflow-visible px-16">
            {events.map((event: EventCardProps) => (
              <EventCard key={event.id} {...event} />
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
