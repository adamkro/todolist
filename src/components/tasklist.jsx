import React from "react";
import Task from "./task";

export default function TaskList(props) {
  const { title, tasks, done, handleChange } = props;
  const tasklist = tasks
    .filter((task) => task.done === done)
    .map((task) => (
      <li key={task.id} className="list-group-item">
        <Task key={task.id} task={task} handleChange={handleChange} />
      </li>
    ));

  return (
    <div>
      <h5>{title}</h5>
      <ul className="list-group">{tasklist}</ul>
    </div>
  );
}
