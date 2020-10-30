import React, { useState } from "react";

function AddTask(props) {
  const [text, setText] = useState("");
  const handleChangeText = (event) => setText(event.target.value);

  const handlePush = () => {
    if (text === "") return;
    let newText = text;
    setText("");
    props.handleNewTask(newText);
  };

  return (
    <ul className="list-group">
      <li className="list-group-item py-2">
        <div className="row">
          <form
            className="w-100"
            onSubmit={(event) => {
              event.preventDefault();
              handlePush(event);
            }}
          >
            <input
              checked={text === "" ? false : true}
              type="checkbox"
              className="mr-3 add-icon ml-1"
              onChange={(event) => handlePush(event)}
            />

            <input
              type="text"
              value={text}
              style={{ width: "80%" }}
              placeholder="New task"
              onChange={handleChangeText}
            />
          </form>
        </div>
      </li>
    </ul>
  );
}

export default AddTask;
