import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { TodoText } from "../../screens/tasks/styles";
import { TasksContainer } from "./styles";
import Task from "../Task";
import { TodoContext, SupabaseContext } from "../../utilities/context-wrapper";

export default function Todo() {
  const client = useContext(SupabaseContext);
  const { tasks, setTasks } = useContext(TodoContext);
  // const [taskEstate, setTaskEstate] = useState(false);

  const pendingSize = tasks.filter((task) => !task.done).length;
  const finishedSize = tasks.filter((task) => task.done).length;

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

  const handleFinishTask = async (id, done) => {
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
  };

  const handleDeleteTask = async (id) => {
    const filteredTasks = tasks.filter((currentTask) => currentTask.id !== id);
    setTasks(filteredTasks);
    client && (await client.from("tasks").delete().eq("id", id));
  };

  return (
    <>
      {tasks.some((task) => !task.done) && (
        <TodoText size="1.375rem">Tasks - {pendingSize}</TodoText>
      )}
      <TasksContainer>
        {tasks
          .filter((currentTask) => !currentTask.done)
          .map((task) => (
            <Task
              {...task}
              key={uuidv4()}
              onCheck={handleFinishTask}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
            />
          ))}
      </TasksContainer>
      {tasks.some((task) => task.done) && (
        <TodoText size="1.375rem">Completed Tasks - {finishedSize}</TodoText>
      )}
      <TasksContainer>
        {tasks
          .filter((finishedTask) => finishedTask.done)
          .map((task) => (
            <Task
              {...task}
              key={uuidv4()}
              onCheck={handleFinishTask}
              onDelete={handleDeleteTask}
            />
          ))}
      </TasksContainer>
    </>
  );
}
