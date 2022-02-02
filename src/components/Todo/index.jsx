import { useContext, useState, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

import { TodoText } from "../../screens/tasks/styles";
import { TaskCardContainer, TasksContainer } from "./styles";
import Task from "../Task";
import {
  TodoContext,
  SupabaseContext,
  TaskLoadContext,
} from "../../utilities/context-wrapper";

import { useSpring, animated } from "react-spring";

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
        console.log(currentTask.id, "=", id);
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
  const handleFinishTask = useCallback(async (id) => {
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
      (await client.from("tasks").update({ done: !taskDone }).eq("id", id));
  }, []);

  const handleDeleteTask = async (id) => {
    const filteredTasks = tasks.filter((currentTask) => currentTask.id !== id);
    setTasks(filteredTasks);
    client && (await client.from("tasks").delete().eq("id", id));
  };

  const AnimatedTask = animated(Task);

  const fadeIn = useSpring({
    to: { scale: 1, opacity: 1 },
    from: { scale: 0, opacity: 0 },
  });

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
              <AnimatedTask
                style={fadeIn}
                task={task}
                key={task.id}
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
                key={task.id}
                onCheck={handleFinishTask}
                onDelete={handleDeleteTask}
              />
            </TaskCardContainer>
          ))}
      </TasksContainer>
    </>
  );
}
