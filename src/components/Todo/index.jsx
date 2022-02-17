import { useContext, useState, useCallback, useMemo, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { lodash, orderBy } from "lodash.orderby";
import toast, { Toaster } from "react-hot-toast";

import { TodoText } from "../../screens/tasks/styles";
import { TaskCardContainer, TasksContainer } from "./styles";
import Task from "../Task";
import {
  TodoContext,
  SupabaseContext,
  TaskLoadContext,
} from "../../utilities/context-wrapper";

import { useSpring, animated, config } from "react-spring";

export default function Todo() {
  const client = useContext(SupabaseContext);
  const { tasks, setTasks } = useContext(TodoContext);
  const [taskLoaded, setTaskLoaded] = useState(false);

  // const [taskEstate, setTaskEstate] = useState(false);

  const { pendingSize, finishedSize } = useMemo(
    () => ({
      pendingSize: tasks?.filter((task) => !task.done).length,
      finishedSize: tasks?.filter((task) => task.done).length,
    }),
    [tasks]
  );

  const handleEditTask = async (id, taskContent) => {
    const editTasks = tasks.map((currentTask) => {
      if (currentTask.id === id) {
        currentTask.content = taskContent;
      }
      return currentTask;
    });
    setTasks(editTasks);

    client &&
      (await client
        .from("tasks")
        .update({ content: taskContent })
        .eq("id", id));
  };
  const handleFinishTask = async (id) => {
    let taskDone;
    const updatedTasks = tasks.map((currentTask) => {
      if (currentTask.id === id) {
        taskDone = currentTask.done;
        currentTask.done = !currentTask.done;
      }
      return currentTask;
    });
    setTasks(updatedTasks);
    client &&
      toast.promise(
        client.from("tasks").update({ done: !taskDone }).eq("id", id),
        {
          loading: "Saving...",
          success: "Task updated successfully",
          error: "Error updating task",
        },
        {
          style: { border: "0.125rem solid #ededed", color: "#222222" },
          iconTheme: { primary: "#5ebcf1", secondary: "#FFFAEE" },
        },
        {
          succes: { duration: 5000 },
        }
      );
  };

  const handleDeleteTask = async (id) => {
    const filteredTasks = tasks.filter((currentTask) => currentTask.id !== id);
    setTasks(filteredTasks);
    client &&
      toast.promise(
        client.from("tasks").delete().eq("id", id),
        {
          loading: "Deleting...",
          success: "Task successfully deleted",
          error: "Error deleting task",
        },
        {
          style: { border: "0.125rem solid #ededed", color: "#222222" },
          iconTheme: { primary: "#f1995e", secondary: "#FFFAEE" },
        },
        {
          succes: { duration: 5000 },
        }
      );
  };

  // useEffect(() => {
  //   const tasksOrder = lodash.orderBy(tasks, ["created_at"], ["desc", "asc"]);

  //   console.log(tasks);
  //   console.log(tasksOrder);
  // }, []);

  return (
    <>
      {tasks.some((task) => !task.done) && (
        <TodoText size="1.375rem">Tasks - {pendingSize}</TodoText>
      )}
      <TasksContainer>
        {tasks
          .filter((currentTask) => !currentTask.done)
          .map((task) => (
            <TaskCardContainer>
              <Task
                task={task}
                onCheck={handleFinishTask}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            </TaskCardContainer>
          ))}
      </TasksContainer>
      {tasks.some((task) => task.done) && (
        <TodoText size="1.375rem">Completed Tasks - {finishedSize}</TodoText>
      )}
      <TasksContainer>
        {tasks
          .filter((finishedTask) => finishedTask.done)
          .map((task) => (
            <TaskCardContainer>
              <Task
                task={task}
                onCheck={handleFinishTask}
                onDelete={handleDeleteTask}
              />
            </TaskCardContainer>
          ))}
      </TasksContainer>
    </>
  );
}
