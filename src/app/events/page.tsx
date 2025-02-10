"use client";

import { useEffect, useState } from "react";
import { useEvents } from "./actions/useEvents";
import { useEventFilters } from "./actions/useEventFilters";
import { SidebarNavigation } from "./components/Sidebar";
import EventsList from "./components/events-list";
import SearchBar from "./components/search-bar";
import SortDropdown from "./components/sort-dropdown";
import build from "@/app/assets/build.png";

export default function EventsPage() {
  const { loading, error, events } = useEvents();
  const [loggedIn, setLoggedIn] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("loggedIn");
    setLoggedIn(storedLoggedIn);
  }, []);

  const {
    filterEvents,
    setSelectedFilters,
    setSortBy,
    totalAvailableEvents,
  } = useEventFilters(events, loggedIn, searchTerm);
  const filteredEvents = filterEvents();

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
            onFilterChange={setSelectedFilters}
            defaultFilters={[]}
          />
        </div>

        <div className="flex-1 p-4 min-h-screen">
          <h1 className="text-5xl font-bold text-left mb-4 ml-16 mt-14">
            Events
          </h1>
          <div className="flex items-center gap-x-4 ml-16">
            <SearchBar
              searchTerm={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SortDropdown sortBy={"start_time"} onSortChange={setSortBy} />
          </div>
          <p className="ml-16 mt-3 mb-4">
            Showing {filteredEvents.length} out of {totalAvailableEvents} events
          </p>

          <EventsList events={filteredEvents} />
        </div>
      </div>
    </div>
  );
}
