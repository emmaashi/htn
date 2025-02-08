'use client';

import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "@/graphql/queries";
import EventCard, { EventCardProps } from "./components/EventCard";
import client from "@/graphql/client";
import { useEffect, useState } from "react";

export default function EventsPage() {
    const [events, setEvents] = useState<EventCardProps[]>([]);
    const { loading, error, data } = useQuery(GET_EVENTS, { client }); // fetch data using the query and configured client
    const [loggedIn, setLoggedIn] = useState<string | null>(null);

    // retrieves login state
    useEffect(() => {
        const storedLoggedIn = localStorage.getItem("loggedIn");
        setLoggedIn(storedLoggedIn);
    }, []);

    // filter events based on retrieved state
    useEffect(() => {
        if (data) {
        let filteredEvents = data.sampleEvents;
        if (loggedIn === "guest") {
            filteredEvents = filteredEvents.filter(
            (event: EventCardProps) => event.permission === "public"
            );
        }
        setEvents(filteredEvents);
        }
    }, [data, loggedIn]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
        {events.map((event: EventCardProps) => (
            <EventCard key={event.id} {...event} />
        ))}
        </div>
    );
}
