import React, { useState } from "react";

function AddTask(props) {
  const [text, setText] = useState("");
  const handleChangeText = (event) => setText(event.target.value);

  const handlePush = (event) => {
    //event.preventDefault();
    if (text === "") return;
    let newText = text;
    setText("");
    props.handleNewTask(newText);
  };

  return (
    <ul className="list-group">
      <li className="list-group-item">
        <div className="row">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handlePush(event);
            }}
          >
            <input
              checked={text === "" ? false : true}
              type="checkbox"
              className="mx-4 add-icon"
              onChange={(event) => handlePush(event)}
            />

            <input
              type="text"
              value={text}
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
