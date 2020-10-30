import React, { useState, useEffect } from "react";
import Loading from "./loading";
import { getFilteredLists } from "../db_funcs";
import ToDoList from "./todolist";

export default function Board(props) {
  const [TodoLists, setTodoLists] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const removeList = (title) => {
    const updatedLists = TodoLists.filter((list) => list.title !== title);
    setTodoLists(updatedLists);
  };

  useEffect(() => {
    (async () => {
      const lists = await getFilteredLists();
      setTodoLists(lists);
      setLoading(false);
    })();
  }, []); //pass empty arr as 2nd arg makes effect run once

  if (isLoading) return <Loading />;
  return (
    <div className="container-fluid">
      <div className="row mx-1">
        {TodoLists.map((tdl) => (
          <ToDoList
            key={tdl.title}
            fetchedTasks={tdl.tasks}
            title={tdl.title}
            removeList={removeList}
          />
        ))}
      </div>
    </div>
  );
}
