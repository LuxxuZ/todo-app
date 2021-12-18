import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { HiPlus } from "react-icons/hi";
import "./styles.css";

import {
  ButtonContainer,
  MainContainer,
  NewTaskContainer,
  NewTaskDiv,
  TaskInput,
  TaskButton,
  TasksContainer,
  Title,
  TodoContainer,
  TodoText,
  TodoForm,
} from "../home/styles";
import Task from "../../components/Task";

function Home() {
  const [supabaseClient, setSupabaseClient] = useState();
  const [tasks, setTasks] = useState([]);
  const [content, setContent] = useState("");

  const [focus, setFocus] = useState(false);
  const pendingSize = tasks.filter((task) => !task.done).length;
  const finishedSize = tasks.filter((task) => task.done).length;

  useEffect(() => {
    const supabaseKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTM3NjIxNiwiZXhwIjoxOTU0OTUyMjE2fQ.kcXseb_m6vRM9rrpv3s27QQFDGeDBOeQZlo5Z_Xk8kk";
    const supabaseUrl = "https://gbmqcxzcxaegwgkwjcrf.supabase.co";
    const supabase = createClient(supabaseUrl, supabaseKey);

    setSupabaseClient(supabase);
  }, []);

  const handleAddTask = async (event) => {
    event.preventDefault();

    supabaseClient &&
      (await supabaseClient
        .from("tasks")
        .insert([{ content }])
        .then(() => alert("Task Subida")));

    // setTasks([
    //   ...tasks,
    //   {
    //     id: uuidv4(),
    //     content: newTask,
    //     createAt: new Date(),
    //     done: false,
    //   },
    // ]);

    // setNewTask("");
    // setFocus(false);
  };

  const handleSetValue = (event, setter) => setter(event.target.value);

  const handleEditTask = (id, taskContent) => {
    const editTasks = tasks.map((currentTask) => {
      if (currentTask.id === id) {
        currentTask.content = taskContent;
      }
      return currentTask;
    });
    setTasks(editTasks);
  };

  const handleFinishTask = (id) => {
    const updatedTasks = tasks.map((currentTask) => {
      if (currentTask.id === id) {
        const taskEstate = currentTask.done;
        currentTask.done = !taskEstate;
      }
      return currentTask;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter((currentTask) => currentTask.id !== id);
    setTasks(filteredTasks);
  };

  return (
    <MainContainer>
      <TodoContainer>
        <Title>Daily TODO List</Title>
        <NewTaskDiv>
          <NewTaskContainer
            onClick={() => {
              setFocus(true);
            }}
          >
            <ButtonContainer>
              <TaskButton>
                <HiPlus />
              </TaskButton>
            </ButtonContainer>
            <TodoForm onSubmit={handleAddTask}>
              {!focus ? (
                <TodoText size="1.375rem">Add a new task</TodoText>
              ) : (
                <TaskInput
                  required
                  type="text"
                  placeholder="Add a new task"
                  value={content}
                  onChange={(event) => handleSetValue(event, setContent)}
                  autoFocus={true}
                  onBlur={() => setFocus(false)}
                />
              )}
            </TodoForm>
          </NewTaskContainer>
        </NewTaskDiv>

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
      </TodoContainer>
    </MainContainer>
  );
}

export default Home;
