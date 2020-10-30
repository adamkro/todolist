import React from "react";

export default function Spotify() {
  return (
    <div className="container-fluid">
      <iframe
        title="spotify"
        style={{ height: "5rem" }}
        className="w-100"
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DWVqfgj8NZEp1"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
      <iframe
        title="spotify"
        style={{ height: "5rem" }}
        className="w-100"
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DWWQRwui0ExPn"
        frameBorder="0"
        allowtransparency="true"
        allow="encrypted-media"
      ></iframe>
    </div>
  );
}
