import styled from "styled-components";
import { animated } from "react-spring";

export const TaskCard = styled(animated.div)`
  display: flex;
  padding-left: 0.5rem;
  justify-content: start;
  width: 100%;
  margin-top: 0.5rem;
  background-color: #f8f8f8;
  border: 0.125rem solid #ededed;
  margin-bottom: 1.875rem;
  border-radius: 1.25rem;

  /* @keyframes taskFadeIn {
    0% {
      opacity: 0;
      transform: scale(20%);
    }
    50% {
      opacity: 1;
      transform: scale(102%);
    }
    70% {
      transform: scale(98%);
    }
    100% {
      transform: scale(100%);
    }
  }

  animation: taskFadeIn 450ms ease-in-out forwards; */
`;

export const TaskContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const TasksContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 0.625rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 1.25rem;
  margin-left: 1.25rem;
  margin-right: 1.25rem;
`;

export const DateContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const DateCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-inline: 10px;
  min-width: ${(props) => props.theme.width};
  max-width: 7.25rem;
  height: 1.875rem;
  color: ${(props) => props.theme.color};
  background-color: ${(props) => props.theme.bg};
  border-radius: 0.4375rem;
`;

export const CalendarDiv = styled.div`
  display: flex;
  margin-right: 0.25rem;
`;

export const TaskTextContainer = styled.div`
  display: flex;
`;

export const EditInput = styled.input`
  margin-block: 1.375rem;
  width: 21.875rem;
  border-width: 0 0 1px;
  border-color: #e5e5e5;
  background-color: transparent;
  outline: 0;
  font-size: 1.375rem;
  font-weight: normal;
  font-family: "Poppins", sans-serif;
`;

export const DeleteButtonDiv = styled.div`
  display: flex;
  justify-self: end;
  margin-top: 1.25rem;
  margin-left: 1.25rem;
  margin-right: 1.25rem;
`;

export const DeleteButton = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  font-size: 22px;
  background-color: transparent;
  color: #5ebcf1;
  cursor: pointer;
`;
