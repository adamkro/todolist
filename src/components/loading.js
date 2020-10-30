import React from "react";

export default function Loading() {
  return (
    <div className="container-fluid align-self-center text-center">
      <div className="spinner-border text-info" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
