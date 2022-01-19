import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  SupabaseContext,
  AuthContext,
  TodoContext,
} from "../../utilities/context-wrapper";

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
} from "./styles";

import Logo from "../../images/signInLogo.svg";
import GoogleLogo from "../../images/Google_Logo.svg";
import GithubLogo from "../../images/Github_Logo.png";
import { HiMail } from "react-icons/hi";
import { IoMdLock } from "react-icons/io";

function Home() {
  const navigate = useNavigate();
  const client = useContext(SupabaseContext);
  const { authToken, setAuthToken } = useContext(AuthContext);
  const { tasks, setTasks } = useContext(TodoContext);

  const [firstLoading, setFirstLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState();

  const onStorageChange = (e) => {
    console.log(e);
  };

  const handleNavigate = () => {
    navigate("/register");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await client.auth
      .signIn({
        email,
        password,
      })
      .then((session) => {
        const credentialsError = session.error;
        setLoginError(credentialsError);
        setAuthToken(localStorage.getItem("supabase.auth.token"));
        // console.log(loginError);
        !credentialsError && navigate("../tasks");
      })

      .catch((error) => console.log(error));
  };

  const handleGoogleAuth = async () => {
    await client.auth.signIn(
      {
        provider: "google",
      },
      {
        redirectTo: "http://localhost:3000/redirect",
      }
    );
  };

  const handleGitAuth = async () => {
    await client.auth.signIn(
      {
        provider: "github",
      },
      {
        redirectTo: "http://localhost:3000/redirect",
      }
    );
  };

  useEffect(() => {
    window.addEventListener("storage", onStorageChange);
  }, []);

  useEffect(() => {
    if (authToken) {
      const { currentSession } = JSON.parse(authToken || "{}");
      const { user } = currentSession;

      client &&
        client
          .from("tasks")
          .select("*")
          .eq("user_id", user.id)
          .then(({ data = [] }) => {
            setTasks(data);
            setFirstLoading(false);
          })
          .then(authToken && navigate("../tasks"));
    }
  }, [authToken]);

  return (
    <HomeMainContainer>
      <TitleContainer>
        <TextContainer>
          <TodoText size="3.375rem" weight="700" margin="0">
            Ricardo Zsabo{" "}
            <TodoText weight="500" margin="0">
              TODO List
            </TodoText>
          </TodoText>
        </TextContainer>
        <LogoContainer>
          <LogoImg
            src={Logo}
            height="100%"
            width="100%"
            alt="1"
            draggable="false"
          />
        </LogoContainer>
      </TitleContainer>
      <FormMainContainer>
        <SignInContainer>
          <TodoText size="2.375rem" weight="600" margin="0">
            Sign In
          </TodoText>
          <SignInContainerRow>
            <TodoText size="0.875rem" margin="0" weight="500">
              Don’t have an account yet?
            </TodoText>
            <LinkText
              size="0.875rem"
              margin="0"
              margin_x="0.2rem"
              weight="500"
              onClick={handleNavigate}
            >
              Create it here
            </LinkText>
          </SignInContainerRow>
          <form onSubmit={handleSubmit}>
            <FormContainer>
              <SignInContainer>
                <LoginContainer>
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
                    />
                    <InputLogoContainer>
                      <HiMail />
                    </InputLogoContainer>
                  </InputContainer>
                </LoginContainer>
                <LoginContainer>
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
                    />
                    <InputLogoContainer>
                      <IoMdLock />
                    </InputLogoContainer>
                  </InputContainer>
                </LoginContainer>

                <ButtonContainer>
                  <LoginButton>Login</LoginButton>
                </ButtonContainer>
              </SignInContainer>
            </FormContainer>
            {loginError ? (
              <TextErrorContainer>
                <TodoText margin="4px" size="14px" color="#dd5454">
                  Your email or password are incorrect
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
            <AltSgInButton onClick={handleGoogleAuth}>
              <AltSgInLogo>
                <LogoImg src={GoogleLogo} height="100%" alt="Google" />
              </AltSgInLogo>
            </AltSgInButton>
            <AltSgInButton onClick={handleGitAuth}>
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
