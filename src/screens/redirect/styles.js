import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  font-weight: 600;
  margin: 0;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoadIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #5ebcf1;
  font-size: 50px;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }

  animation: rotate 950ms linear infinite;
`;
