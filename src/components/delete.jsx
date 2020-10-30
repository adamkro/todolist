import React from "react";
import { DeleteListDB } from "../db_funcs";

export default function Delete(props) {
  const { title, removeList } = props;
  const handleClick = () => {
    let del = window.confirm("Are you sure?");
    if (del) {
      removeList(title);
      DeleteListDB(title);
    }
  };
  return (
    <div>
      <button type="button" className="close" onClick={handleClick}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
