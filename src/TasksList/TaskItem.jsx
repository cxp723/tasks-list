import React, { Fragment, useRef, useState } from "react";
import "./taskListStyle.scss";
import cn from "classnames";

function TaskItem(props) {
  const { id, title, date, completed } = props.task;
  let [editMode, setEditMode] = useState(false);
  let [newTitle, setNewTitle] = useState(title);

  const onSend = () => {
    if (newTitle.trim()) {
      props.editTask({
        ...props.task,
        title: newTitle,
      });
      setEditMode(false);
    } else {
      props.setMessage({
        type: "Warning",
        title: "You can not add empty task",
        isSet: true,
      });
    }
  };
  const onKeyDown = (key) => {
    switch (key.keyCode) {
      case 13:
        onSend();
        break;
      case 27:
        setEditMode(false);
        break;
      default:
    }
  };
  return (
    <li className="task">
      {editMode ? (
        <div className="editMode">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.currentTarget.value);
            }}
            onKeyDown={onKeyDown}
            ref={(editInput) => editInput && editInput.focus()}
            className="editTask"
          />
          <button className={`button green`} onClick={onSend}>
            Edit
          </button>
        </div>
      ) : (
        <Fragment>
          <div>
            <input
              className="isDone"
              type="checkbox"
              checked={completed}
              onChange={() => {
                props.changeCompleteness(props.task);
              }}
            />
            <span className="taskNumber">{props.number}</span>
            <span className={cn(completed && "completedTask", "taskTitle")}>
              {title}
            </span>
          </div>
          <div className="buttons">
            <button
              className={cn("button", "red")}
              onClick={() => {
                props.deleteTask(id);
              }}
            >
              Delete
            </button>
            <button
              className={`button green`}
              onClick={() => {
                setEditMode(true);
              }}
            >
              Edit
            </button>
          </div>
        </Fragment>
      )}
    </li>
  );
}

export default TaskItem;
