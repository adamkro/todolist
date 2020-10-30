import React from "react";
import Task from "./task";

export default function TaskList(props) {
  const { title, tasks, done, handleChange, show } = props;
  if (!show) return null; //hide

  const tasklist = tasks
    .filter((task) => task.done === done)
    .map((task) => (
      <li key={task.id} className="list-group-item p-1">
        <Task key={task.id} task={task} handleChange={handleChange} />
      </li>
    ));

  return (
    <div className={props.className}>
      <h5 className="my-2">{title}</h5>
      <ul className="list-group">{tasklist}</ul>
    </div>
  );
}
