'use client';

import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "@/graphql/queries";
import EventCard, { EventCardProps } from "./components/EventCard";
import client from "@/graphql/client";

export default function EventsPage() {
    const { loading, error, data } = useQuery(GET_EVENTS, { client });
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
      <div>
        <h1>Events</h1>
        {data.sampleEvents.map((event: EventCardProps) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    );
  }
  