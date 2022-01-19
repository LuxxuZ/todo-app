import styled, { css } from "styled-components";

export const SignUpMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #07b5cd;
  width: 50vw;
  height: 100vh;
`;

export const FormMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 100vh;
`;

export const SignUpContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  color: #5f5f5f;
`;

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.625rem;
`;

export const RegisterContainer = styled.div`
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
  border: 0.125rem solid #e7e6e6;
  cursor: text;

  padding: 0;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  padding-right: 0.625rem;
  padding-left: 0.625rem;
`;

export const InputLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #54aee0;
  font-size: 1.5rem;
`;

export const RegisterInput = styled.input`
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

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f6f6f6;
`;

export const LogoContainer = styled.div`
  height: 45vh;
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

export const RegisterButton = styled.button`
  display: flex;
  margin-top: 1.25rem;
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
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-self: center;
`;

export const AltSgUpMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const AltSgUpButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.25rem;
  margin-right: 0.625rem;
  margin-left: 0.625rem;
  background-color: #e8e8e8;
  border: 0.125rem solid #e2e2e2;
  border-radius: 0.625rem;
  cursor: pointer;
`;

export const AltSgUpLogo = styled.div`
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
