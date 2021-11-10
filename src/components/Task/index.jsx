import { ButtonContainer, TaskCard, TasksContentContainer } from "./styles";
import { TaskButton, TodoText } from "../../screens/home/styles";
import {BsCheckLg} from "react-icons/bs"

export default function Task({ content, id, onCheck, done }) {

  const handleDone = () => {
    onCheck(id);
  }

  return (
    <TaskCard>
      <ButtonContainer>
      {done ? <TaskButton checkedButton onClick={handleDone}><BsCheckLg /></TaskButton> : <TaskButton checkButton onClick={handleDone}/>}
      </ButtonContainer>
      <TasksContentContainer >
        <TodoText>{content}</TodoText>
      </TasksContentContainer>
    </TaskCard>
  );
}
