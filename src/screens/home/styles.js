import styled, { css } from "styled-components";
import { animated } from "react-spring";

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
`;

export const LogoContainer = styled(animated.div)`
  height: 40vh;
  position: relative;
`;

export const LogoImg = styled.img`
  user-select: none;
`;

export const LinkText = styled.p`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  word-break: break-word;
  text-decoration: ${(props) => props.decoration};
  text-align: center;
  margin: ${(props) => props.margin};
  margin-left: ${(props) => props.margin_x};
  margin-right: ${(props) => props.margin_x};
  color: #40b0ee;
  cursor: pointer;
`;

export const LoginButton = styled(animated.button)`
  display: flex;
  border: 0;
  border-radius: 0.75rem;
  background-color: #54aee0;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 3.125rem;
  padding-right: 3.125rem;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 600;

  &:focus-visible {
    outline: none;
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

export const AltSgInButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.625rem;
  margin-left: 0.625rem;
  margin-top: 1.25rem;
  background-color: #e8e8e8;
  border: 0.125rem solid #e2e2e2;
  border-radius: 0.625rem;
  cursor: pointer;
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
