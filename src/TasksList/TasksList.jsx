import React, { useContext } from "react";
import TaskItem from "./TaskItem";
import TaskInput from "./TaskInput";
import Spinner from "../Common/Spinner";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { TaskListContext } from "../BLL/TaskListController";
import Message from "./Message";

const TasksList = () => {
  const {
    message,
    setMessage,
    tasks,
    isFetching,
    addTask,
    editTask,
    deleteTask,
    changeCompleteness,
  } = useContext(TaskListContext);

  return (
    <div className="taskList">
      <h1>My tasks list</h1>
      <TaskInput
        addTask={addTask}
        isFetching={isFetching}
        setMessage={setMessage}
      />
      {isFetching ? (
        <Spinner />
      ) : (
        <Message
          type={message.type}
          title={message.title}
          setMessage={setMessage}
          isSet={message.isSet}
        />
      )}
      <ul>
        <TransitionGroup>
          {tasks.map((task, index) => (
            <CSSTransition key={task.id} timeout={200} classNames="taskItem">
              <TaskItem
                setMessage={setMessage}
                changeCompleteness={changeCompleteness}
                editTask={editTask}
                task={task}
                number={index + 1}
                deleteTask={deleteTask}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ul>
    </div>
  );
};
export default TasksList;
