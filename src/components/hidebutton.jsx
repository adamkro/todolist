import React from "react";

export default function HideButton(props) {
  const { show } = props;
  const d = show
    ? "M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
    : "M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z";

  return (
    <div className="m-0 p-0">
      <label type="button" onClick={props.handleHide} className="my-2">
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fillRule="evenodd" d={d} />
        </svg>{" "}
      </label>
    </div>
  );
}
