import React from "react";
import { useEffect, useState } from "react";
import {
  addTaskOnServer,
  getTasksFromServer,
  deleteTaskFromServer,
  editTaskOnServer,
} from "../TasksList/api";

export const TaskListContext = React.createContext({
  tasks: [],
  isFetching: false,
  message: { type: null, title: "", isSet: false },
  setMessage: (message) => {},
  addTask: (task) => {},
  deleteTask: (taskId) => {},
  toggleCompleteness: (taskId) => {},
});
const TaskListController = React.memo((props) => {
  let [tasks, setTasks] = useState([]);
  let [isFetching, setIsFetching] = useState(false);
  let [message, setMessage] = useState({ type: null, title: "", isSet: false });

  async function getTasks() {
    let newTasks = [];
    setIsFetching(true);
    try {
      const data = await getTasksFromServer().then((res) => res.data);
      for (var task in data) {
        newTasks.push({ ...data[task], id: task });
      }
      setTasks(newTasks);
    } catch (e) {
      console.error(e);
      createMessage({
        type: "Error",
        title: "Couldn't fetch tasks",
        isSet: true,
      });
    }
    setIsFetching(false);
  }
  useEffect(() => {
    getTasks();
  }, []);

  const addTask = (task) => {
    setIsFetching(true);
    addTaskOnServer(task)
      .then((data) => {
        setTasks((tasks) => [...tasks, data]);
        createMessage({
          type: "Success",
          title: "Task was added to the list",
          isSet: true,
        });
        setIsFetching(false);
      })
      .catch((e) => {
        console.error(e);
        createMessage({
          type: "Error",
          title: "Couldn't add new task",
          isSet: true,
        });
        setIsFetching(false);
      });
  };
  const changeCompleteness = (task) => {
    setIsFetching(true);
    editTaskOnServer(task.id, { ...task, completed: !task.completed })
      .then(() => {
        setTasks((tasks) =>
          tasks.map((item) =>
            item.id === task.id ? { ...task, completed: !task.completed } : item
          )
        );
        setIsFetching(false);
      })
      .catch((e) => {
        console.error(e);
        createMessage({
          type: "Error",
          title: "Couldn't complete this task",
          isSet: true,
        });
        setIsFetching(false);
      });
  };
  const editTask = (newTask) => {
    setIsFetching(true);
    editTaskOnServer(newTask.id, newTask)
      .then(() => {
        setTasks((tasks) =>
          tasks.map((task) => (task.id === newTask.id ? newTask : task))
        );
        createMessage({
          type: "Success",
          title: "Task was edited",
          isSet: true,
        });
        setIsFetching(false);
      })
      .catch((e) => {
        console.error(e);
        createMessage({
          type: "Error",
          title: "Couldn't edit the task",
          isSet: true,
        });
        setIsFetching(false);
      });
  };
  const deleteTask = async (taskId) => {
    setIsFetching(true);
    try {
      const data = await deleteTaskFromServer(taskId);
      setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
      createMessage({
        type: "Success",
        title: "Task was deleted",
        isSet: true,
      });
    } catch (e) {
      console.error("Deleting error: " + e);
      createMessage({
        type: "Error",
        title: "Couldn't delete task",
        isSet: true,
      });
    }
    setIsFetching(false);
  };
  const createMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage({ type: null, title: "", isSet: false });
    }, 2000);
  };
  return (
    <TaskListContext.Provider
      value={{
        tasks,
        isFetching,
        changeCompleteness,
        addTask,
        deleteTask,
        editTask,
        message,
        setMessage: createMessage,
      }}
    >
      {props.children}
    </TaskListContext.Provider>
  );
});
export default TaskListController;
