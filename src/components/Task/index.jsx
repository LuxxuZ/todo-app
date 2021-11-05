import { useState } from "react";
import { TaskCard } from "./styles";
import { TaskButton, TodoText } from "../../screens/home/styles";
import {BsCheckLg} from "react-icons/bs"

export default function Task({ content }) {
  const [taskCompleted, setTaskCompleted] = useState(false);

  const handleTaskCompleted = () => {
    setTaskCompleted(!taskCompleted);
  };

  return (
    <TaskCard>
      {taskCompleted ? <TaskButton checkedButton onClick={handleTaskCompleted}><BsCheckLg /></TaskButton> : <TaskButton checkButton onClick={handleTaskCompleted}/>}
      <TodoText>{content}</TodoText>
    </TaskCard>
  );
}
