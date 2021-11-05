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
  width: 700px;
  height: 100vh;
`;

export const NewTaskContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  height: 75px;
  width: 640px;
  padding-inline: 20px;
  align-items: center;
  background-color: #f3f3f3;
  border-radius: 20px;
  cursor: pointer;
`;

export const NewTaskInput = styled.input`
  width: 500px;
  height: 30px;
  border: 0;
  background-color: #f3f3f3;
  outline-style: none;
  font-size: 22px;
  font-weight: normal;
  color: #131313;
`;

export const TodoText = styled.p`
  font-size: 22px;
  font-weight: normal;
  margin-right: 22px;
  color: #131313;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 28px;
`;

export const TaskButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  background-color: #5ebcf1;
  margin-right: 6px;
  border-radius: 10px;
  color: #ffff;
  font-size: 20px;
  margin-right: 15px;

  ${(props) =>
    props.checkButton &&
    css`
      width: 40px;
      height: 40px;
      background: transparent;
      border: 4px solid #5ebcf1;
      border-radius: 14px;
      margin-top: 20px;
      margin-left: 20px;
      margin-right: 20px;
    `}

  ${(props) =>
    props.checkedButton &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      background: #5ebcf1;
      border: 4px solid #5ebcf1;
      border-radius: 14px;
      margin-top: 20px;
      margin-left: 20px;
      margin-right: 20px;
      font-size: 25px;
    `}
`;
