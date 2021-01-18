import React from "react";
import TasksList from "./TasksList/TasksList";
import "./index";
import TaskListController from "./BLL/TaskListController";

function App() {
  return (
    <div className="appWrapper">
      <TaskListController>
        <TasksList />
      </TaskListController>
    </div>
  );
}

export default App;
