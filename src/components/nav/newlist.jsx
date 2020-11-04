import React, { useState } from "react";
import { addToDoListDB } from "../../db_funcs";

export default function NewList() {
  const [text, setText] = useState("");
  return (
    <div className="row flex-nowrap m-3">
        <input
          className="form-control"
          type="text"
          value={text}
          placeholder="New List"
          onChange={(e) => setText(e.target.value)}
        />
        {/* change "add!" description to icon "+"  */}
      <button
        type="button"
        className="btn btn-info btn-sm ml-auto mr-0"
        onClick={() => {
          addToDoListDB(text);
          setText("");
        }}
      >
        Add!
      </button>
    </div>
  );
}
