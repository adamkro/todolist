import React from "react";
import Task from "./task";

export default function TaskList(props) {
  const { title, tasks, handleChange } = props;

  const tasklist = tasks.map((task) => (
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
