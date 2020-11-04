import React, { useState, useEffect } from "react";
import axios from "axios";

const WEEKDAY = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function Card() {
  let today = new Date();
  let month = today.toLocaleString("default", { month: "short" });

  const [wikiTitle, setWikiTitle] = useState("");

  const url = "https://en.wikipedia.org/api/rest_v1/page/random/title"; //REST API
  // ANOTHER AVAILABLE: "https://en.wikipedia.org/w/api.php?action=query&origin=*&list=random&rnnamespace=0&format=json";

  function getNewWiki(){
    axios.get(url).then((wikiItem) => {
      setWikiTitle(wikiItem.data.items[0].title)
    });
  }
  useEffect(() => {
    getNewWiki();
  }, []);

  return (
    <div>
      <div className="card text-white bg-info m-3">
        <div className="card-header pb-0">
          <h3 className="card-title">{`${
            WEEKDAY[today.getDay()]
          }, ${today.getDate()} ${month}`}</h3>
        </div>
        <div className="card-body p-2">
          <h5 className="mx-3 mb-2">{wikiTitle.replace(/_/g, " ")}</h5>
          <a
            role="button"
            className="btn btn-dark"
            href={`https://en.wikipedia.org/wiki/${wikiTitle}`}
          >
            Wiki
          </a>
          <button
            type="button"
            className="btn btn-dark float-right"
            onClick={getNewWiki} //re-run useEffect
          >
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              className="bi bi-arrow-repeat"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
              <path
                fillRule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
