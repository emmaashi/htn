import { useState, useCallback } from "react";
import { EventCardProps } from "@/app/events/components/event-card";

export function useEventFilters(
  events: EventCardProps[],
  loggedIn: string | null,
  searchTerm: string,
) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("start_time");

  const availableEvents = events.filter(
    (event) => loggedIn === "true" || event.permission === "public",
  );

  const filterEvents = useCallback(() => {
    let filtered = [...availableEvents];

    if (searchTerm) {
      filtered = filtered.filter((event) =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (selectedFilters.length > 0) {
      filtered = filtered.filter((event) =>
        selectedFilters.includes(event.event_type),
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "end_time") return a.end_time - b.end_time;
      return a.start_time - b.start_time;
    });

    return filtered;
  }, [availableEvents, searchTerm, selectedFilters, sortBy]);

  return {
    filterEvents,
    setSelectedFilters,
    setSortBy,
    totalAvailableEvents: availableEvents.length,
  };
}
