import styled, { css } from "styled-components";
import { animated } from "react-spring";
import { Link } from "react-router-dom";

export const HomeMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
`;

export const TitleContainer = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #07b5cd;
  width: 50vw;
  height: 100vh;
`;

export const FormMainContainer = styled(animated.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 100vh;
  opacity: 0;

  @keyframes formFadeIn {
    0% {
      opacity: 0;
      transform: translateX(-5%);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  animation: formFadeIn 250ms ease-out forwards 300ms;
`;

export const SignInContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  color: #5f5f5f;
`;

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.625rem;
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 0.625rem;
`;

export const InputTextContainer = styled.div`
  display: flex;
  margin-left: 0.625rem;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  justify-content: center;
  border-radius: 0.625rem;
  border: 0.125rem solid;
  border-color: #e7e6e6;
  cursor: text;
  padding: 0;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  padding-right: 0.625rem;
  padding-left: 0.625rem;
  transition: border 100ms ease-in;

  &:focus-within {
    border-color: #54aee0;
  }
`;

export const InputLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #54aee0;
  font-size: 1.5rem;
`;

export const LoginInput = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  outline: 0;
  font-size: 0.875rem;
  font-weight: 400;
  font-family: "Poppins", sans-serif;
  background-color: transparent;
`;

export const TextContainer = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f6f6f6;
  opacity: 0;

  animation: fadeIn 300ms ease-out 100ms forwards;
`;

export const LogoContainer = styled(animated.div)`
  height: 40vh;
  position: relative;

  @keyframes fadeIn {
    0% {
      transform: translateX(-50%);
      opacity: 0;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  animation: fadeIn 250ms ease-out;
`;

export const LogoImg = styled.img`
  user-select: none;
`;

export const LinkText = styled(Link)`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  word-break: break-word;
  text-decoration: none;
  text-align: center;
  margin: ${(props) => props.margin};
  margin-left: ${(props) => props.margin_x};
  margin-right: ${(props) => props.margin_x};
  color: #40b0ee;
  cursor: pointer;
  outline: none;
  transition: all 100ms linear;

  &:focus-visible {
    text-decoration: underline;
    color: #85d2fc;
  }
`;

export const LoginButton = styled(animated.button)`
  display: flex;
  border: 0;
  width: 150px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  background-color: #54aee0;
  outline-color: #1c9add;

  color: #ffffff;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 600;
  user-select: none;
  transition: all;

  @keyframes focusTransform {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.9);
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-top: 1.25rem;
`;

export const AltSgInMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const AltSgInButton = styled(animated.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 3rem;
  margin-right: 0.625rem;
  margin-left: 0.625rem;
  margin-top: 1.25rem;
  background-color: #e8e8e8;
  border: 0.125rem solid #e2e2e2;
  border-radius: 0.625rem;
  cursor: pointer;
  outline-color: #3a3a3a;
`;

export const AltSgInLogo = styled.div`
  height: 1.625rem;
  padding: 0.5625rem;
`;

export const TextErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;

export const ErrorContainer = styled.div`
  margin: 0.25rem;
  height: 1.3125rem;
`;

export const AnimatedLoadingCircle = styled(animated.div)`
  display: flex;
  font-size: 30px;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }

  animation: rotate 650ms linear infinite;
`;
