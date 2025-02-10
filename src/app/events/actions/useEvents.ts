import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "@/graphql/queries";
import client from "@/graphql/client";

export function useEvents() {
  const { loading, error, data } = useQuery(GET_EVENTS, { client });

  if (loading) return { loading: true, error: null, events: [] };
  if (error) return { loading: false, error, events: [] };

  return { loading: false, error: null, events: data?.sampleEvents || [] };
}
