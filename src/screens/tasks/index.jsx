import { useState, useEffect, useContext } from "react";
import { createClient, payload } from "@supabase/supabase-js";
import { useSpring, config } from "react-spring";
import {
  SupabaseContext,
  TodoContext,
  AuthContext,
  TaskLoadContext,
} from "../../utilities/context-wrapper";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { HiPlus } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";

import { TaskProvider } from "../../utilities/context-wrapper";
import {
  ButtonContainer,
  MainContainer,
  NewTaskContainer,
  NewTaskDiv,
  TaskInput,
  TaskButton,
  Title,
  TodoContainer,
  TodoText,
  TodoForm,
  TittleContainer,
  LogOutButton,
  TodoTextContainer,
} from "./styles";
import Todo from "../../components/Todo";

export default function Tasks() {
  const { authToken, setAuthToken } = useContext(AuthContext);

  const [content, setContent] = useState("");
  const [focus, setFocus] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);

  const { tasks, setTasks } = useContext(TodoContext);
  const client = useContext(SupabaseContext);

  const addTaskText = "Add a new task";
  const navigate = useNavigate();

  useEffect(() => {
    setAuthToken(localStorage.getItem("supabase.auth.token"));
  }, []);

  useEffect(() => {
    if (authToken) {
      const { currentSession } = JSON.parse(authToken || "{}");
      const { user } = currentSession || "{}";
      setUsername(user.user_metadata.username || user.user_metadata.name);
    }
    !authToken && navigate("/");
  }, [authToken]);

  useEffect(() => {
    if (authToken) {
      const { currentSession } = JSON.parse(authToken || "{}");
      const { user } = currentSession || "{}";
      client &&
        client
          .from("tasks")
          .select("*")
          .eq("user_id", user.id)
          .then(({ data = [] }) => {
            setTasks(data);
          });
    }
  }, [client]);

  const handleAddTask = async (event) => {
    const { currentSession } = JSON.parse(authToken);
    const { user } = currentSession;
    event.preventDefault();

    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        content: content,
        created_at: new Date(),
        done: false,
        user_id: user.id,
        created_by: user.user_metadata.username,
      },
    ]);
    setContent("");
    setFocus(false);

    await client.from("tasks").insert([
      {
        content,
        user_id: user.id,
        created_by: user.user_metadata.username,
      },
    ]);
  };

  const handleSetValue = (event, setter) => setter(event.target.value);

  const handleLogOut = async () => {
    await client.auth.signOut().then(() => setAuthToken(null));
  };

  const fadeIn = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });

  const buttonAnimation = useSpring({
    to: { scale: buttonPressed ? 0.8 : 1 },
    from: { scale: 1 },
    config: config.stiff,
  });

  return (
    <MainContainer>
      <TodoContainer>
        <TittleContainer style={fadeIn}>
          <TodoTextContainer>
            <Title>Daily TODO List</Title>
            <TodoText margin="0" size="1.375rem" weight="200" color="#939393">
              {username}
            </TodoText>
          </TodoTextContainer>
          <LogOutButton
            onMouseDown={() => setButtonPressed(true)}
            onMouseUp={() => setButtonPressed(false)}
            onClick={handleLogOut}
            style={buttonAnimation}
          >
            <FiLogOut />
            Log Out
          </LogOutButton>
        </TittleContainer>
        <NewTaskDiv>
          <NewTaskContainer
            onClick={() => {
              setFocus(true);
            }}
          >
            <ButtonContainer>
              <TaskButton>
                <HiPlus />
              </TaskButton>
            </ButtonContainer>
            <TodoForm onSubmit={handleAddTask} spellCheck="false">
              {!focus ? (
                <TodoText size="1.375rem" user_select="none">
                  {addTaskText}
                </TodoText>
              ) : (
                <TaskInput
                  required
                  type="text"
                  placeholder={addTaskText}
                  value={content}
                  onChange={(event) => handleSetValue(event, setContent)}
                  autoFocus={true}
                  onBlur={() => setFocus(false)}
                  firstLoading={firstLoading}
                />
              )}
            </TodoForm>
          </NewTaskContainer>
        </NewTaskDiv>
        <Todo />
      </TodoContainer>
    </MainContainer>
  );
}
