import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { HiPlus } from "react-icons/hi";
import "./styles.css";

import {
  ButtonContainer,
  MainContainer,
  NewTaskContainer,
  NewTaskDiv,
  NewTaskInput,
  TaskButton,
  TasksContainer,
  Title,
  TodoContainer,
  TodoText,
} from "../home/styles";
import Task from "../../components/Task";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [focus, setFocus] = useState(false);
  const pendingSize = tasks.filter((task) => !task.done).length;
  const finishedSize = tasks.filter((task) => task.done).length;

  const handleAddTask = (event) => {
    event.preventDefault();

    setTasks([
      ...tasks,
      {
        content: newTask,
        createAt: new Date(),
        id: uuidv4(),
        done: false,
      },
    ]);

    setNewTask("");
    setFocus(false);
  };

  const onChangeInput = (event) => {
    setNewTask(event.target.value);
  };

  const handleFinishTask = (id) => {
    const updatedTasks = tasks.map((currentTask) => {
      if (currentTask.id === id) {
        currentTask.done = true;
      }
      return currentTask;
    });
    setTasks(updatedTasks);
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
            <form onSubmit={handleAddTask}>
              {!focus ? (
                <TodoText>Add a new task</TodoText>
              ) : (
                <NewTaskInput
                  required
                  type="text"
                  placeholder="Add a new task"
                  value={newTask}
                  onChange={onChangeInput}
                  autoFocus={true}
                  onBlur={() => setFocus(false)}
                />
              )}
            </form>
          </NewTaskContainer>
        </NewTaskDiv>

        {tasks.some((task) => !task.done) && (
          <TodoText>Tasks - {pendingSize}</TodoText>
        )}
        <TasksContainer>
          {tasks
            .filter((currentTask) => !currentTask.done)
            .map((task) => (
              <Task {...task} key={uuidv4()} onCheck={handleFinishTask} />
            ))}
        </TasksContainer>
        {tasks.some((task) => task.done) && (
          <TodoText>Completed Tasks - {finishedSize}</TodoText>
        )}
        <TasksContainer>
          {tasks
            .filter((finishedTask) => finishedTask.done)
            .map((task) => (
              <Task {...task} key={uuidv4()} onCheck={handleFinishTask} />
            ))}
        </TasksContainer>
      </TodoContainer>
    </MainContainer>
  );
}

export default Home;
