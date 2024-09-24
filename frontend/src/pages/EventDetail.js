import {
  Await,
  defer,
  json,
  redirect,
  useRouteLoaderData,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

export default function EventDetail() {
  const { event, events } = useRouteLoaderData("event-detail");
  return (
    <>
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
      <Await resolve={event}>
        {(loadedEvent) => <EventItem event={loadedEvent}></EventItem>}
      </Await>
      </Suspense>
      <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents}></EventsList>}
      </Await>
      </Suspense>
    </>
  );
}
async function loadedEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch details from selected event." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }


  
}

async function loadedEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    return json({ message: "Could not fetch events." },
       { status: 500 });
  }

  const resData = await response.json();
  console.log(resData);  // Log the API response to verify structure

  // Adjust the return based on actual API response structure
  return resData.events || resData;
}

export async function loader({ request, params }) {
  const id = params.eventId;
  return defer({
    event: await loadedEvent(id),
    events: loadedEvents(),
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      { message: "Could not delete event." },
      {
        status: 500,
      }
    );
  }
  return redirect("/events");
}
