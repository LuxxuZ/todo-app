import styled, { css } from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 43.75rem;
  height: 100vh;
`;

export const TasksContainer = styled.div`
  width: 100%;
`;

export const NewTaskContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.25rem;
  height: 4.688rem;
  width: 100%;
  padding-inline: 1.25rem;
  align-items: center;
  background-color: #f3f3f3;
  border-radius: 1.25rem;
  cursor: pointer;
`;

export const NewTaskDiv = styled.div`
  height: 4.688rem;
  width: 100%;
`;

export const NewTaskInput = styled.input`
  width: 31.25rem;
  height: 1.875rem;
  border: 0;
  background-color: #f3f3f3;
  outline-style: none;
  font-size: 1.375rem;
  font-weight: normal;
  color: #131313;
`;

export const TodoText = styled.p`
  font-size: 1.375rem;
  font-weight: normal;
  margin-right: 1.375rem;
  color: #131313;
  word-break: break-word;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 1.75rem;
`;

export const TaskButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.25rem;
  height: 2.25rem;
  background-color: #5ebcf1;
  border-radius: 0.625rem;
  color: #ffff;
  font-size: 1.25rem;
  margin-right: 0.938rem;

  ${(props) =>
    props.checkButton &&
    css`
      width: 2.5rem;
      height: 2.5rem;
      background: transparent;
      border: 0.25rem solid #5ebcf1;
      border-radius: 0.875rem;
    `}

  ${(props) =>
    props.checkedButton &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2.5rem;
      height: 2.5rem;
      background: #5ebcf1;
      border: 0.25rem solid #5ebcf1;
      border-radius: 0.875rem;
      font-size: 1.563rem;
    `}
`;

export const ButtonContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.375rem;
`;
