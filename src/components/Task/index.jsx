import { useEffect, useState } from "react";
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
import { useSpring } from "react-spring";

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
  task,
  created_at,
  onDelete,
}) {
  const [editMode, setEditMode] = useState(false);
  const [taskContent, setTaskContent] = useState(task.content);

  const buttonTheme = task.done ? checkedButton : checkButton;
  const textDecoration = task.done && "line-through";

  const handleDone = () => {
    onCheck(task.id);
  };
  const handleEdit = (event) => {
    event.preventDefault();

    onEdit(task.id, taskContent);
  };

  const onChangeInput = (event) => {
    setTaskContent(event.target.value);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleDoubleClick = () => {
    !task.done && setEditMode(true);
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

  const fadeIn = useSpring({
    to: { scale: 1, opacity: 1 },
    from: { scale: 0, opacity: 0 },
  });

  return (
    <TaskCard>
      <TaskContainer>
        <ButtonContainer onClick={handleDone}>
          <TaskButton checkButton theme={buttonTheme}>
            {task.done && <BsCheckLg />}
          </TaskButton>
        </ButtonContainer>
        <TasksContentContainer>
          <TaskTextContainer onDoubleClick={handleDoubleClick}>
            {editMode ? (
              <TodoForm onSubmit={handleEdit} spellCheck="false">
                <EditInput
                  value={taskContent}
                  onChange={onChangeInput}
                  onBlur={handleEdit}
                  autoFocus={true}
                  done={task.done}
                  required
                />
              </TodoForm>
            ) : (
              <TodoText
                decoration={textDecoration}
                size="1.375rem"
                t_align="left"
              >
                {task.content}
              </TodoText>
            )}
          </TaskTextContainer>
          <DateContainer>
            <DateCard theme={DATE_THEME[getDate(task.created_at)]}>
              <CalendarDiv>
                <BsCalendar />
              </CalendarDiv>
              <TodoText size="0.9375rem">
                {getDate(task.created_at) ||
                  format(new Date(task.created_at), "dd/MM/yyyy")}
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
