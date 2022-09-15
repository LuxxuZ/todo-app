import styled from "styled-components";
import { animated } from "react-spring";

export const TodoMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const TasksContainer = styled(animated.div)`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
`;

export const TaskCardContainer = styled(animated.div)``;
