import React, { useState, useEffect } from "react";
import axios from "axios";

const calendarsIds = [
  //optional - get more calendars
  "primary",
  "en.jewish%23holiday%40group.v.calendar.google.com", // holidays
  "r4crd3a30lrqpts96eqm7m0a18%40group.calendar.google.com", // CS uni > EMPTY? check calendar
];

export default function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const main = await axios.get(
          `http://localhost:5000/events/${calendarsIds[0]}`
        );
        const holidays = await axios.get(
          `http://localhost:5000/events/${calendarsIds[1]}`
        );
        let eventList = [...main.data, ...holidays.data]
          .sort((a, b) => new Date(a.start) - new Date(b.start)) // sort by date
          .slice(0, 7); // get top 7
        setEvents(eventList);
      } catch (err) {
        console.log("error getting events: ", err);
      }
    })();
  }, []);

  const eventsRows = events.map((e) => (
    <tr key={e.summary}>
      <td>{`${new Date(e.start).getDate()}/${
        new Date(e.start).getMonth() + 1
      }`}</td>
      <td>{e.summary}</td>
    </tr>
  ));

  return (
    <div className="container-fluid">
      <table className="table table-striped table-sm table-bordered">
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Event</th>
          </tr>
        </thead>
        <tbody>{eventsRows}</tbody>
      </table>
    </div>
  );
}
