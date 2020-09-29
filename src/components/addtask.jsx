import React, { useState } from "react";

function AddTask(props) {
  const [text, setText] = useState("");
  const handleChangeText = (event) => setText(event.target.value);

  const handlePush = (event) => {
    event.preventDefault();
    if (text === "") return;
    let newText = text;
    setText("");
    return props.handleNewTask(newText);
  };

  return (
    <div className="row">
      <form onSubmit={(event) => handlePush(event)}>
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
  );
}

export default AddTask;
