import { useContext, useEffect, useState } from "react";
import { SupabaseContext, AuthContext } from "../../utilities/context-wrapper";
import { useNavigate } from "react-router-dom";
import { useSpring, config } from "react-spring";

import { TodoText } from "../tasks/styles";
import {
  AltSgUpMainContainer,
  AltSgUpLogo,
  SignUpMainContainer,
  RegisterContainer,
  InputContainer,
  SignUpContainer,
  TextContainer,
  TitleContainer,
  LogoImg,
  LogoContainer,
  RegisterInput,
  FormContainer,
  FormMainContainer,
  SignUpContainerRow,
  LinkText,
  InputLogoContainer,
  RegisterButton,
  AltSgUpButton,
  ButtonContainer,
  ErrorContainer,
  TextErrorContainer,
  AnimatedLoadingCircle,
  FormNameContainer,
} from "./styles";
import SignUpLogo from "../../images/signUpLogo.svg";
import GoogleLogo from "../../images/Google_Logo.svg";
import GithubLogo from "../../images/Github_Logo.png";

import { HiMail } from "react-icons/hi";
import { IoMdLock } from "react-icons/io";
import { RiUser3Fill } from "react-icons/ri";
import { BiLoaderAlt } from "react-icons/bi";
import { InputTextContainer } from "../home/styles";

function Home() {
  const { authToken, setAuthToken } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpError, setSignUpError] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const buttonAnimation = useSpring({
    to: { scale: buttonPressed ? 0.9 : 1 },
    from: { scale: 1 },
    config: config.wobbly,
  });

  const fadeIn = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 300,
  });

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("../");
  };

  const client = useContext(SupabaseContext);

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    await client.auth
      .signUp(
        {
          email,
          password,
        },
        {
          data: {
            username,
          },
        }
      )
      .then((session) => {
        const credentialsError = session.error;
        setSignUpError(credentialsError);
        if (credentialsError) {
          setErrorMessage(credentialsError.message);
          setIsLoading(false);
        }
        setAuthToken(localStorage.getItem("supabase.auth.token"));
        // console.log(signUpError);
      });
  };

  const handleGoogleAuth = async () => {
    await client.auth.signIn({
      provider: "google",
    });
  };

  const handleGitAuth = async () => {
    await client.auth.signIn({
      provider: "github",
    });
  };

  useEffect(() => {
    authToken && navigate("../tasks");
  }, [authToken]);

  return (
    <SignUpMainContainer>
      <TitleContainer>
        <TextContainer style={fadeIn}>
          <TodoText size="3.375rem" weight="bold" margin="0">
            TODO List <br /> Register
          </TodoText>
        </TextContainer>
        <LogoContainer style={fadeIn}>
          <LogoImg
            src={SignUpLogo}
            height="100%"
            width="100%"
            alt="1"
            draggable="false"
          />
        </LogoContainer>
      </TitleContainer>
      <FormMainContainer style={fadeIn}>
        <SignUpContainer>
          <FormNameContainer>
            <TodoText size="2.375rem" weight="600" margin="0">
              Sign Up
            </TodoText>
            <SignUpContainerRow>
              <TodoText size="0.875rem" margin="0" weight="500">
                Already have an account?
              </TodoText>
              <LinkText
                size="0.875rem"
                margin="0"
                margin_x="0.2rem"
                weight="500"
                onClick={handleNavigate}
              >
                Sign in here
              </LinkText>
            </SignUpContainerRow>
          </FormNameContainer>
          <form id="sign_up" onSubmit={onSubmitForm}>
            <FormContainer>
              <SignUpContainer>
                <RegisterContainer>
                  <InputTextContainer>
                    <TodoText margin="0" color="#5EBCF1" weight="500">
                      Username
                    </TodoText>
                  </InputTextContainer>

                  <InputContainer>
                    <RegisterInput
                      spellCheck="false"
                      type="text"
                      placeholder="Your username"
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <InputLogoContainer>
                      <RiUser3Fill />
                    </InputLogoContainer>
                  </InputContainer>
                </RegisterContainer>
                <RegisterContainer>
                  <InputTextContainer>
                    <TodoText margin="0" color="#5EBCF1" weight="500">
                      Email
                    </TodoText>
                  </InputTextContainer>
                  <InputContainer>
                    <RegisterInput
                      spellCheck="false"
                      type="email"
                      placeholder="Example@email.com"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <InputLogoContainer>
                      <HiMail />
                    </InputLogoContainer>
                  </InputContainer>
                </RegisterContainer>
                <RegisterContainer>
                  <InputTextContainer>
                    <TodoText margin="0" color="#5EBCF1" weight="500">
                      Password
                    </TodoText>
                  </InputTextContainer>
                  <InputContainer>
                    <RegisterInput
                      type="password"
                      placeholder="Your Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <InputLogoContainer>
                      <IoMdLock />
                    </InputLogoContainer>
                  </InputContainer>
                </RegisterContainer>
                <ButtonContainer>
                  <RegisterButton
                    onMouseDown={() => {
                      setButtonPressed(true);
                    }}
                    onMouseUp={() => {
                      setButtonPressed(false);
                    }}
                    style={buttonAnimation}
                  >
                    {isLoading ? (
                      <AnimatedLoadingCircle>
                        <BiLoaderAlt />
                      </AnimatedLoadingCircle>
                    ) : (
                      "Sign Up"
                    )}
                  </RegisterButton>
                </ButtonContainer>
              </SignUpContainer>
            </FormContainer>
          </form>
          {signUpError ? (
            <TextErrorContainer>
              <TodoText margin="4px" size="14px" color="#dd5454">
                {errorMessage}
              </TodoText>
            </TextErrorContainer>
          ) : (
            <ErrorContainer></ErrorContainer>
          )}
          <TodoText size="1.125rem" weight="500" color="#5F5F5F" margin="0">
            Or sign up with
          </TodoText>
          <AltSgUpMainContainer>
            <AltSgUpButton onClick={handleGoogleAuth}>
              <AltSgUpLogo>
                <LogoImg src={GoogleLogo} height="100%" alt="Google" />
              </AltSgUpLogo>
            </AltSgUpButton>
            <AltSgUpButton onClick={handleGitAuth}>
              <AltSgUpLogo>
                <LogoImg src={GithubLogo} height="100%" alt="Github" />
              </AltSgUpLogo>
            </AltSgUpButton>
          </AltSgUpMainContainer>
        </SignUpContainer>
      </FormMainContainer>
    </SignUpMainContainer>
  );
}

export default Home;
