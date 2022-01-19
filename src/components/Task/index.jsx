import { useState } from "react";
import {
  ButtonContainer,
  TaskCard,
  TasksContentContainer,
  DateCard,
  CalendarDiv,
  DateContainer,
  TaskTextContainer,
  EditInput,
  TaskContainer,
  DeleteButton,
  DeleteButtonDiv,
} from "./styles";
import { TaskButton, TodoText, TodoForm } from "../../screens/tasks/styles";
import {
  checkButton,
  checkedButton,
  todayCard,
  yesterdayCard,
  defaultDate,
} from "./themes";
import { BsCheckLg, BsCalendar } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { differenceInDays, format } from "date-fns/esm";

const DATE_THEME = {
  Today: todayCard,
  Yesterday: yesterdayCard,
  null: defaultDate,
};

export default function Task({
  content,
  id,
  onCheck,
  done,
  onEdit,
  created_at,
  onDelete,
}) {
  const [editMode, setEditMode] = useState(false);
  const [taskContent, setTaskContent] = useState(content);

  const buttonTheme = done ? checkedButton : checkButton;
  const textDecoration = done && "line-through";

  const handleDone = () => {
    onCheck(id);
  };
  const handleEdit = (event) => {
    event.preventDefault();

    onEdit(id, taskContent);
  };

  const onChangeInput = (event) => {
    setTaskContent(event.target.value);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const getDate = (date) => {
    const daysDiference = differenceInDays(new Date(), new Date(date));
    switch (daysDiference) {
      case 0:
        return "Today";

      case 1:
        return "Yesterday";

      default:
        return null;
    }
  };

  return (
    <TaskCard>
      <TaskContainer>
        <ButtonContainer onClick={handleDone}>
          <TaskButton checkButton theme={buttonTheme}>
            {done && <BsCheckLg />}
          </TaskButton>
        </ButtonContainer>
        <TasksContentContainer>
          <TaskTextContainer onDoubleClick={() => !done && setEditMode(true)}>
            {editMode ? (
              <TodoForm onSubmit={handleEdit} spellCheck="false">
                <EditInput
                  value={taskContent}
                  onChange={onChangeInput}
                  onBlur={handleEdit}
                  autoFocus={true}
                  done={done}
                />
              </TodoForm>
            ) : (
              <TodoText decoration={textDecoration} size="1.375rem">
                {content}
              </TodoText>
            )}
          </TaskTextContainer>
          <DateContainer>
            <DateCard theme={DATE_THEME[getDate(created_at)]}>
              <CalendarDiv>
                <BsCalendar />
              </CalendarDiv>
              <TodoText size="0.9375rem">
                {getDate(created_at) ||
                  format(new Date(created_at), "dd/MM/yyyy")}
              </TodoText>
            </DateCard>
          </DateContainer>
        </TasksContentContainer>
      </TaskContainer>
      <DeleteButtonDiv>
        <DeleteButton onClick={handleDelete}>
          <MdDelete />
        </DeleteButton>
      </DeleteButtonDiv>
    </TaskCard>
  );
}
