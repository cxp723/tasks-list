import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://taksks-list-default-rtdb.firebaseio.com/",
});

export const getTasksFromServer = () => apiInstance.get("tasks.json");
export const addTaskOnServer = (taskTitle) => {
  const task = {
    title: taskTitle,
    date: new Date(),
    completed: false,
  };
  return apiInstance
    .post("tasks.json", task)
    .then((res) => ({ ...task, id: res.data.name }));
};
export const deleteTaskFromServer = (taskId) =>
  apiInstance.delete("tasks/" + taskId + ".json");
export const editTaskOnServer = (taskId, newTask) =>
  apiInstance.patch("tasks.json", { [taskId]: newTask });
