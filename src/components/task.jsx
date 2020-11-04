import React, { useState, useEffect } from "react";
import { updateTaskDb } from "../db_funcs";
import Link from "./link";
import { getYouTubeTitle } from "../youtube";

function Task(props) {
  const { id, text, done } = props.task;
  const [linkTitle, setLinkTitle] = useState("");

  useEffect(() => {
    (async () => {
      if (text.includes("youtube")) {
        const res = await getYouTubeTitle(text);
        setLinkTitle(res);
      } else if (text.includes("http")) {
        setLinkTitle("Go");
      }
    })();
  }, [text]);

  return (
    <div className="flex-row">
      <form className="w-100" onSubmit={(event) => event.preventDefault()}>
        <input
          type="checkbox"
          checked={done}
          className="mr-3 ml-1"
          onChange={() => props.handleChange(id, text, !done)}
        />
        <input
          type="text"
          value={text}
          style={{ width: "80%" }}
          onChange={(event) => props.handleChange(id, event.target.value, done)}
          onBlur={() => updateTaskDb(id, text, done)}
        />
        {text.includes("http") ? (
          <Link title={linkTitle} id={id} url={text} />
        ) : null}
      </form>
    </div>
  );
}

export default Task;
