import { useState } from "react";
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
                  value={newTask}
                  onChange={onChangeInput}
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
              <Task {...task} key={uuidv4()} onCheck={handleFinishTask} />
            ))}
        </TasksContainer>
      </TodoContainer>
    </MainContainer>
  );
}

export default Home;
