import { useState, useEffect } from "react";
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
import { TaskButton, TodoText, TodoForm } from "../../screens/home/styles";
import {
  checkButton,
  checkedButton,
  todayCard,
  yesterdayCard,
  defaultDate,
} from "./themes";
import { BsCheckLg, BsCalendar } from "react-icons/bs";
import { differenceInDays, format } from "date-fns/esm";
import { formatDistance, subDays } from "date-fns";

export default function Task({ content, id, onCheck, done, onEdit, createAt }) {
  const [editMode, setEditMode] = useState(false);
  const [taskContent, setTaskContent] = useState(content);
  const [createDate, setCreateDate] = useState("");
  const [daysDiference, setDaysDiference] = useState(0);
  const [dateCardTheme, setDateCardTheme] = useState();

  const buttonTheme = done ? checkedButton : checkButton;

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

  useEffect(() => {
    setDaysDiference(differenceInDays(new Date(), createAt));
    switch (daysDiference) {
      case 0:
        setCreateDate("Today");
        setDateCardTheme(todayCard);
        break;

      case 1:
        setCreateDate("Yesterday");
        setDateCardTheme(yesterdayCard);
        break;

      default:
        setCreateDate(format(createAt, "MM/dd/yyyy"));
        setDateCardTheme(defaultDate);
    }
  }, [daysDiference, createAt]);

  return (
    <TaskCard>
      <TaskContainer>
        <ButtonContainer>
          <TaskButton checkButton theme={buttonTheme} onClick={handleDone}>
            {done && <BsCheckLg />}
          </TaskButton>
        </ButtonContainer>
        <TasksContentContainer>
          <TaskTextContainer onDoubleClick={() => !done && setEditMode(true)}>
            {editMode ? (
              <TodoForm onSubmit={handleEdit}>
                <EditInput
                  value={taskContent}
                  onChange={onChangeInput}
                  onBlur={handleEdit}
                  autoFocus={true}
                />
              </TodoForm>
            ) : (
              <TodoText size="1.375rem">{content}</TodoText>
            )}
          </TaskTextContainer>
          <DateContainer>
            <DateCard theme={dateCardTheme}>
              <CalendarDiv>
                <BsCalendar />
              </CalendarDiv>
              <TodoText size="0.9375rem">{createDate}</TodoText>
            </DateCard>
          </DateContainer>
        </TasksContentContainer>
      </TaskContainer>
      <DeleteButtonDiv>
        <DeleteButton></DeleteButton>
      </DeleteButtonDiv>
    </TaskCard>
  );
}
