import React from "react";

function Task(props) {
  const { id, text, done } = props.task;

  return (
    <div className="row">
      <form onSubmit={(event) => event.preventDefault()}>
        <input
          checked={done}
          type="checkbox"
          className="mx-4"
          onChange={() => props.handleChange(id, text, !done)}
        />
        <input
          type="text"
          value={text}
          placeholder="New task"
          onChange={(event) => props.handleChange(id, event.target.value, done)}
        />
      </form>
    </div>
  );
}

export default Task;
