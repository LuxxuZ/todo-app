import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import "./styles.css";

import {
  MainContainer,
  NewTaskContainer,
  NewTaskInput,
  TaskButton,
  Title,
  TodoContainer,
  TodoText,
} from "../home/styles";
import Task from "../../components/Task";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [focus, setFocus] = useState(false);

  const handleAddTask = (event) => {
    event.preventDefault();

    const addTask = [
      ...tasks,
      { content: newTask, createAt: new Date(), estate: false },
    ];

    setTasks(addTask);

    setNewTask("");
    setFocus(false);
  };

  const onChangeInput = (event) => {
    setNewTask(event.target.value);
  };

  return (
    <MainContainer>
      <TodoContainer>
        <Title>Daily TODO List</Title>
        <NewTaskContainer
          onClick={() => {
            setFocus(true);
          }}
        >
          <TaskButton>
            <HiPlus />
          </TaskButton>
          <form onSubmit={handleAddTask}>
            {!focus ? (
              <TodoText>Add a new task</TodoText>
            ) : (
              <NewTaskInput
                id="new-task-input"
                placeholder="Add a new task"
                value={newTask}
                onChange={onChangeInput}
                autoFocus={true}
              />
            )}
          </form>
        </NewTaskContainer>

        {!!tasks.length && <TodoText>Tasks - {tasks.length}</TodoText>}
        <div>
          {tasks.map((task) => (
            <Task content={task.content} />
          ))}
        </div>
      </TodoContainer>
    </MainContainer>
  );
}

export default Home;
