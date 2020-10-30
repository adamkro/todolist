import React from "react";
import ReactTooltip from "react-tooltip";

export default function Link(props) {
  const { show, title, id, url } = props;
  if (!show) return null;

  return (
    <div className="float-right m-0 p-0">
      <a href={url} data-tip data-for={id}>
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          className="bi bi-arrow-up-right-circle-fill"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.879 10.828a.5.5 0 1 1-.707-.707l4.096-4.096H6.5a.5.5 0 0 1 0-1h3.975a.5.5 0 0 1 .5.5V9.5a.5.5 0 0 1-1 0V6.732l-4.096 4.096z"
          />
        </svg>{" "}
      </a>

      <ReactTooltip id={id} place="top" effect="solid">
        {title}
      </ReactTooltip>
    </div>
  );
}
