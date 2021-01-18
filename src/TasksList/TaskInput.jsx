import React, { useState } from "react";
import cn from "classnames";

function TaskInput({ addTask, isFetching, setMessage }) {
  let [task, setTask] = useState("");
  function onSubmit() {
    if (task.trim().length > 0) {
      addTask(task);
      setTask("");
    } else {
      setMessage({
        type: "Warning",
        title: "You can not add empty task to the list",
        isSet: true,
      });
    }
  }
  function onKeyPress(key) {
    if (key.charCode === 13) onSubmit();
  }
  return (
    <div className="newTask">
      <input
        className="taskInput"
        type="text"
        value={task}
        onChange={(task) => setTask(task.currentTarget.value)}
        onKeyPress={onKeyPress}
      />
      <button
        disabled={isFetching}
        className={cn("button", "green", "addButton")}
        onClick={onSubmit}
      >
        Add task
      </button>
    </div>
  );
}

export default TaskInput;
