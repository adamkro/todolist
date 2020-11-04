import React, { useState } from "react";
import AddTask from "./addtask";
import TaskList from "./tasklist";
import Delete from "./delete";

import { addTaskDB, updateTaskDb } from "../db_funcs";
import HideButton from "./hidebutton";

function ToDoList(props) {
  const [tasks, setTasks] = useState(props.fetchedTasks);
  const [show, setShow] = useState(false);
  const { title } = props;

  const handleChange = (id, text, done) => {
    const newTasks = tasks.slice();
    let changedTask = newTasks.find((task) => task.id === id);
    changedTask.text = text;
    if (changedTask.done !== done) updateTaskDb(id, text, done);
    changedTask.done = done;
    setTasks(newTasks);
  };

  const handleNewTask = async (text) => {
    const newId = await addTaskDB(text, title);
    const newTask = { id: newId, text, done: false }; //CHANGE ID******!!! after adding a new one, i don't have the id and can't update
    setTasks([newTask, ...tasks]);
  };

  const handleHide = () => setShow(!show);

  return (
    <div className="col-3 p-1">
      <div className="tdl rounded overflow-auto">
        <Delete title={title} removeList={props.removeList} />
        <h3 className="text-center">{title}</h3>
        <AddTask key={"add button"} handleNewTask={handleNewTask} />
        <TaskList
          title="To Do"
          tasks={tasks.filter((tsk) => tsk.done === false)}
          show={true}
          handleChange={handleChange}
        />
        <HideButton handleHide={handleHide} show={show} />
        {show && (
          <TaskList
            title="Done"
            className="done"
            tasks={tasks.filter((tsk) => tsk.done === true)}
            handleChange={handleChange}
          />
        )}
      </div>
    </div>
  );
}
export default ToDoList;
