import styled, { css } from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const TittleContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const LogOutButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9d4d4;
  color: #e04949;
  border-radius: 8px;
  padding-inline: 10px;
  height: 40%;
  cursor: pointer;
  font-size: 18px;
`;

export const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 43.75rem;
  height: 100vh;
  color: #131313;
`;

export const NewTaskDiv = styled.div`
  margin-bottom: 1.875rem;
  height: 4.688rem;
  width: 100%;
`;

export const NewTaskContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  height: 4.688rem;
  width: 100%;
  padding-left: 1.25rem;
  align-items: center;
  background-color: #f3f3f3;
  border-radius: 1.25rem;
  cursor: pointer;
`;

export const TaskInput = styled.input`
  width: 31.25rem;
  height: 1.875rem;
  border: 0;
  background-color: #f3f3f3;
  outline-style: none;
  font-size: 1.375rem;
  font-weight: normal;
  font-family: "Poppins", sans-serif;
`;

export const TodoText = styled.p`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  word-break: break-word;
  text-decoration: ${(props) => props.decoration};
  text-align: center;
  margin: ${(props) => props.margin};
  margin-left: ${(props) => props.margin_x};
  margin-right: ${(props) => props.margin_x};
  color: ${(props) => props.color};
  user-select: ${(props) => props.user_select};
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
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2.5rem;
      height: 2.5rem;
      background: ${(props) => props.theme.bg};
      border: 0.25rem solid #5ebcf1;
      border-radius: 0.875rem;
      font-size: 1.563rem;
      cursor: pointer;
    `}
`;

export const ButtonContainer = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  margin-right: 0.375rem;
`;

export const TodoForm = styled.form``;
