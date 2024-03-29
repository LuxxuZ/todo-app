import styled from "styled-components";
import { animated } from "react-spring";

export const TaskCard = styled(animated.div)`
  display: flex;
  justify-content: start;
  width: 100%;
  margin-top: 0.5rem;
  background-color: #f8f8f8;
  border: 0.125rem solid #ededed;
  margin-bottom: 1.875rem;
  border-radius: 1.25rem;

  @media (max-width: 768px) {
    border-radius: 0.625rem;
  }
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
  min-width: 7rem;
  max-width: 7.25rem;
  height: 1.875rem;
  color: ${(props) => props.$theme.color};
  background-color: ${(props) => props.$theme.bg};
  border-radius: 0.4375rem;

  @media (max-width: 768px) {
    min-width: 4.375rem;
    max-width: 4.6875rem;
  }
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
  width: 90%;
  border-width: 0 0 1px;
  border-color: #e5e5e5;
  background-color: transparent;
  outline: 0;
  font-size: 1.375rem;
  font-weight: normal;
  font-family: "Poppins", sans-serif;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
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
  font-size: 1.375rem;
  background-color: transparent;
  color: #5ebcf1;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;
