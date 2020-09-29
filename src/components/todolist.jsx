//shortcut - rcc

import React, { useState } from "react";
import AddTask from "./addtask";
import tasksdata from "../tasksdata";
import TaskList from "./tasklist";

function ToDoList(props) {
  const [tasks, setTasks] = useState(tasksdata);

  const handleChange = (id, text, done) => {
    const newTasks = tasks.slice();
    let changedTask = newTasks.find((task) => task.id === id);
    changedTask.text = text;
    changedTask.done = done;
    setTasks(newTasks);
  };

  const handleNewTask = (text) => {
    const newTask = { id: Math.random(), text, done: false }; //CHANGE ID
    setTasks([newTask, ...tasks]);
  };

  // function renderTasks(list, done) {
  //   return list
  //     .filter((task) => task.done === done)
  //     .map((task) => (
  //       <li key={task.id} className="list-group-item">
  //         <Task key={task.id} task={task} handleChange={handleChange} />
  //       </li>
  //     ));
  // }

  return (
    <div className="tdl">
      <ul className="list-group">
        <li className="list-group-item">
          <AddTask key={0} handleNewTask={handleNewTask} />
        </li>
      </ul>
      <TaskList
        title="To Do"
        tasks={tasks}
        done={false}
        handleChange={handleChange}
      />
      <TaskList
        title="Done"
        tasks={tasks}
        done={true}
        handleChange={handleChange}
      />
    </div>
  );
}
//   return (
//     <div className="tdl">
//       <ul className="list-group">
//         <li className="list-group-item">
//           <AddTask key={0} handleNewTask={handleNewTask} />
//         </li>
//       </ul>
//       <h5>To Do</h5>
//       <ul className="list-group">{renderTasks(tasks, false)}</ul>
//       <h5>Done</h5>
//       <ul className="list-group done">{renderTasks(tasks, true)}</ul>
//     </div>
//   );
// }

export default ToDoList;

// state = {
//     tasks: tasksdata.filter((task) => !task.done),
//     tasksDone: tasksdata.filter((task) => task.done),
//   };

// componentDidMount() {
//   //GET data
// }
// componentDidUpdate() {
//   // PUSH data?
// }

// handleChange2 = (task) => {
//   let state = { ...this.state };
//   const prevStatus = task.done;
//   const taskAfterChange = {
//     ...task,
//     done: !prevStatus,
//   };
//   if (!prevStatus) {
//     // undone --> done
//     state.tasks = state.tasks.filter(
//       (item) => item.id !== taskAfterChange.id
//     );
//     state.tasksDone.unshift(taskAfterChange);
//   } else {
//     state.tasksDone = state.tasksDone.filter(
//       (item) => item.id !== taskAfterChange.id
//     );
//     state.tasks.unshift(taskAfterChange);
//   }
//   this.setState(state);
// };

//   render() {
//   //   const tasksListItems = this.state.tasks.map((task) => (
//   //     <li key={task.id} className="list-group-item">
//   //       <Task key={task.id} task={task} handleChange={this.handleChange} />
//   //     </li>
//   //   ));
//   //   const tasksDoneListItems = this.state.tasksDone.map((task) => (
//   //     <li key={task.id} className="list-group-item">
//   //       <Task key={task.id} task={task} handleChange={this.handleChangeText} />
//   //     </li>
//   //   ));

//   //   return (
//   //     <div>
//   //       <ul className="list-group">{tasksListItems}</ul>
//   //       <ul className="list-group done">{tasksDoneListItems}</ul>
//   //     </div>
//   //   );
//   // }
// }
