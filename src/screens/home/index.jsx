import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, config } from "react-spring";

import { SupabaseContext, AuthContext } from "../../utilities/context-wrapper";

import { TodoText } from "../tasks/styles";
import {
  AltSgInMainContainer,
  AltSgInLogo,
  HomeMainContainer,
  LoginContainer,
  InputContainer,
  SignInContainer,
  TextContainer,
  TitleContainer,
  LogoImg,
  LogoContainer,
  LoginInput,
  FormContainer,
  FormMainContainer,
  SignInContainerRow,
  LinkText,
  InputLogoContainer,
  LoginButton,
  AltSgInButton,
  ButtonContainer,
  InputTextContainer,
  ErrorContainer,
  TextErrorContainer,
  AnimatedLoadingCircle,
} from "./styles";

import Logo from "../../images/sign_in_logo.svg";
import GoogleLogo from "../../images/Google_Logo.svg";
import GithubLogo from "../../images/Github_Logo.png";
import { HiMail } from "react-icons/hi";
import { IoMdLock } from "react-icons/io";
import { BiLoaderAlt } from "react-icons/bi";

function Home() {
  const navigate = useNavigate();
  const client = useContext(SupabaseContext);
  const { authToken, setAuthToken } = useContext(AuthContext);

  const [firstLoading, setFirstLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tittleDisplay, setTittleDisplay] = useState("visible");

  const [tittleButtonPressed, setTittleButtonPressed] = useState(false);
  const [formButtonPressed, setFormButtonPressed] = useState(false);
  const [googleButtonPressed, setGoogleButtonPressed] = useState(false);
  const [gitButtonPressed, setGitButtonPressed] = useState(false);

  const tittleButtonAnim = useSpring({
    to: { scale: tittleButtonPressed ? 0.9 : 1 },
    from: { scale: 1 },
    config: config.wobbly,
  });

  const formButtonAnim = useSpring({
    to: { scale: formButtonPressed ? 0.9 : 1 },
    from: { scale: 1 },
    config: config.wobbly,
  });

  const googleButtonAnim = useSpring({
    to: { scale: googleButtonPressed ? 0.85 : 1 },
    from: { scale: 1 },
    config: config.wobbly,
  });

  const gitButtonAnim = useSpring({
    to: { scale: gitButtonPressed ? 0.85 : 1 },
    from: { scale: 1 },
    config: config.wobbly,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    await client.auth
      .signIn({
        email,
        password,
      })
      .then((session) => {
        const credentialsError = session.error;
        setLoginError(credentialsError.message);
        credentialsError && setIsLoading(false);
      })

      .catch((error) => console.log(error));
  };

  const handleGoogleAuth = async () => {
    await client.auth.signIn(
      {
        provider: "google",
      },
      {
        redirectTo: "http://rztodolist.surge.sh/",
      }
    );
  };

  const handleGitAuth = async () => {
    await client.auth.signIn(
      {
        provider: "github",
      },
      {
        redirectTo: "http://rztodolist.surge.sh/",
      }
    );
  };

  useEffect(() => {
    client && setAuthToken(client.auth.session());

    client &&
      client.auth.onAuthStateChange((_event, session) => {
        setAuthToken(session);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  useEffect(() => {
    if (authToken) {
      setIsLoading(true);
      navigate("../tasks");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  return (
    <HomeMainContainer>
      <TitleContainer display={!firstLoading ? tittleDisplay : "hidden"}>
        <TextContainer id="renderAnimation">
          <TodoText size="3.375rem" smSize="2.5rem" weight="700" margin="0">
            Ricardo Zsabo{" "}
            <TodoText weight="500" margin="0">
              TODO List
            </TodoText>
          </TodoText>
        </TextContainer>
        <LogoContainer smHeight="30vh" id="renderAnimation">
          <LogoImg
            src={Logo}
            height="100%"
            width="100%"
            type="presentation"
            draggable="false"
          />
        </LogoContainer>
        <LoginButton
          onMouseDown={() => setTittleButtonPressed(true)}
          onFocus={() => setTittleButtonPressed(true)}
          onMouseUp={() => setTittleButtonPressed(false)}
          onMouseLeave={() => setTittleButtonPressed(false)}
          onTouchStart={() => setTittleButtonPressed(true)}
          onTouchEnd={() => setTittleButtonPressed(false)}
          onBlur={() => setTittleButtonPressed(false)}
          onClick={() => setTittleDisplay("hidden")}
          style={tittleButtonAnim}
          display="none"
          smDisplay="flex"
          bgColor="#F3F3F3"
          outlineColor="#EDEDED"
          textColor="#5EBCF1"
          marginT="8px"
        >
          Login
        </LoginButton>
      </TitleContainer>
      <FormMainContainer firstLoad={firstLoading}>
        <SignInContainer id="renderAnimation">
          <TodoText size="2.375rem" weight="600" margin="0">
            Sign In
          </TodoText>
          <SignInContainerRow>
            <TodoText size="0.875rem" margin="0" weight="500">
              Don’t have an account yet?
            </TodoText>
            <LinkText
              to="/register"
              size="0.875rem"
              margin="0"
              margin_x="0.2rem"
              weight="500"
              onClick={() => setFirstLoading("true")}
            >
              Create it here
            </LinkText>
          </SignInContainerRow>
          <form onSubmit={handleSubmit}>
            <FormContainer>
              <SignInContainer>
                <LoginContainer>
                  <label for="username_input">
                    <InputTextContainer>
                      <TodoText margin="0" color="#5EBCF1" weight="500">
                        Email
                      </TodoText>
                    </InputTextContainer>

                    <InputContainer>
                      <LoginInput
                        spellCheck="false"
                        type="email"
                        placeholder="Your email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        id="username_input"
                      />
                      <InputLogoContainer>
                        <HiMail />
                      </InputLogoContainer>
                    </InputContainer>
                  </label>
                </LoginContainer>
                <LoginContainer>
                  <label for="password_input">
                    <InputTextContainer>
                      <TodoText margin="0" color="#5EBCF1" weight="500">
                        Password
                      </TodoText>
                    </InputTextContainer>

                    <InputContainer>
                      <LoginInput
                        type="password"
                        placeholder="Your Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        id="password_input"
                      />
                      <InputLogoContainer>
                        <IoMdLock />
                      </InputLogoContainer>
                    </InputContainer>
                  </label>
                </LoginContainer>

                <ButtonContainer>
                  <LoginButton
                    onMouseDown={() => setFormButtonPressed(true)}
                    onFocus={() => setFormButtonPressed(true)}
                    onMouseUp={() => setFormButtonPressed(false)}
                    onMouseLeave={() => setFormButtonPressed(false)}
                    onTouchStart={() => setFormButtonPressed(true)}
                    onTouchEnd={() => setFormButtonPressed(false)}
                    onBlur={() => setFormButtonPressed(false)}
                    style={formButtonAnim}
                    display="flex"
                    bgColor="#54aee0"
                    outlineColor="#1c9add"
                    textColor="#f3f3f3"
                  >
                    {isLoading ? (
                      <AnimatedLoadingCircle>
                        <BiLoaderAlt />
                      </AnimatedLoadingCircle>
                    ) : (
                      "Login"
                    )}
                  </LoginButton>
                </ButtonContainer>
              </SignInContainer>
            </FormContainer>
            {loginError ? (
              <TextErrorContainer>
                <TodoText margin="4px" size="14px" color="#dd5454">
                  {loginError}
                </TodoText>
              </TextErrorContainer>
            ) : (
              <ErrorContainer></ErrorContainer>
            )}
          </form>
          <TodoText size="1.125rem" weight="500" color="#5F5F5F" margin="0">
            Or sign in with
          </TodoText>
          <AltSgInMainContainer>
            <AltSgInButton
              onClick={handleGoogleAuth}
              onMouseDown={() => setGoogleButtonPressed(true)}
              onFocus={() => setGoogleButtonPressed(true)}
              onMouseUp={() => setGoogleButtonPressed(false)}
              onMouseLeave={() => setGoogleButtonPressed(false)}
              onTouchStart={() => setGoogleButtonPressed(true)}
              onTouchEnd={() => setGoogleButtonPressed(false)}
              onBlur={() => setGoogleButtonPressed(false)}
              style={googleButtonAnim}
            >
              <AltSgInLogo>
                <LogoImg src={GoogleLogo} height="100%" alt="Google" />
              </AltSgInLogo>
            </AltSgInButton>
            <AltSgInButton
              onClick={handleGitAuth}
              onMouseDown={() => setGitButtonPressed(true)}
              onFocus={() => setGitButtonPressed(true)}
              onMouseUp={() => setGitButtonPressed(false)}
              onMouseLeave={() => setGitButtonPressed(false)}
              onTouchStart={() => setGitButtonPressed(true)}
              onTouchEnd={() => setGitButtonPressed(false)}
              onBlur={() => setGitButtonPressed(false)}
              style={gitButtonAnim}
            >
              <AltSgInLogo>
                <LogoImg src={GithubLogo} height="100%" alt="Github" />
              </AltSgInLogo>
            </AltSgInButton>
          </AltSgInMainContainer>
        </SignInContainer>
      </FormMainContainer>
    </HomeMainContainer>
  );
}

export default Home;
