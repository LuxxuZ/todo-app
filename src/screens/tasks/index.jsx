import { useState, useEffect, useContext } from "react";
import { useSpring, config } from "react-spring";
import toast, { Toaster } from "react-hot-toast";

import {
  SupabaseContext,
  TodoContext,
  AuthContext,
} from "../../utilities/context-wrapper";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { HiPlus } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";

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
  TittleMainContainer,
  TittleContainer,
  LogOutButton,
  TodoTextContainer,
  TodoComponentContainer,
} from "./styles";
import Todo from "../../components/Todo";

export default function Tasks() {
  const { authToken, setAuthToken } = useContext(AuthContext);

  const [content, setContent] = useState("");
  const [focus, setFocus] = useState(false);
  const [username, setUsername] = useState("Guest");
  const [buttonPressed, setButtonPressed] = useState(false);
  const [addTaskText, setAddTaskText] = useState("Add a new task");

  const { tasks, setTasks } = useContext(TodoContext);
  const client = useContext(SupabaseContext);

  const addTaskDefText = "Add a new Task";
  const navigate = useNavigate();

  useEffect(() => {
    client && setAuthToken(client.auth.session());

    !authToken && navigate("../");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, authToken]);

  useEffect(() => {
    if (authToken) {
      const { user } = authToken || "Guest";
      setUsername(user.user_metadata.username || user.user_metadata.name);

      client &&
        client
          .from("tasks")
          .select("*")
          .eq("user_id", user.id)
          .then(({ data = [] }) => {
            setTasks(data);
          })
          .catch(() => toast.error("ERROR"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, authToken]);

  const handleAddTask = async (event) => {
    event.preventDefault();
    const { user } = authToken;

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
    setAddTaskText(addTaskDefText);
    setFocus(false);

    toast.promise(
      client.from("tasks").insert([
        {
          content,
          user_id: user.id,
          created_by: user.user_metadata.username,
        },
      ]),
      {
        loading: "Saving Tasks...",
        success: "Tasks saved successfully",
        error: "Error saving tasks",
      },
      {
        style: { border: "0.125rem solid #ededed", color: "#222222" },
        iconTheme: { primary: "#63e488", secondary: "#FFFAEE" },
      },
      {
        succes: { duration: 5000 },
      }
    );
  };

  const onBlurAddTask = () => {
    content ? setAddTaskText(content) : setAddTaskText(addTaskDefText);
    setFocus(false);
  };

  const handleSetValue = (event, setter) => setter(event.target.value);

  const handleLogOut = async () => {
    await client.auth.signOut().then(() => setAuthToken(null));
    setTasks([]);
    navigate("/");
  };

  const fadeIn = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } });

  const buttonAnimation = useSpring({
    to: { scale: buttonPressed ? 0.9 : 1 },
    from: { scale: 1 },
    config: config.stiff,
  });

  const AddTaskAnim = useSpring({
    to: { scale: focus ? 1.05 : 1 },
    from: { scale: 1 },
  });

  return (
    <MainContainer>
      <TodoContainer>
        <TittleMainContainer>
          <TittleContainer style={fadeIn}>
            <TodoTextContainer>
              <Title>Daily TODO List</Title>
              <TodoText
                margin="0"
                size="1.375rem"
                smSize="1.125rem"
                weight="200"
                color="#939393"
              >
                {username}
              </TodoText>
            </TodoTextContainer>
            <LogOutButton
              onMouseDown={() => setButtonPressed(true)}
              onFocus={() => setButtonPressed(true)}
              onMouseUp={() => setButtonPressed(false)}
              onMouseLeave={() => setButtonPressed(false)}
              onBlur={() => setButtonPressed(false)}
              onClick={handleLogOut}
              style={buttonAnimation}
            >
              <FiLogOut />
              <TodoText size="1rem" smDisplay="none">
                Log Out
              </TodoText>
            </LogOutButton>
          </TittleContainer>
        </TittleMainContainer>
        <NewTaskDiv>
          <NewTaskContainer
            style={AddTaskAnim}
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
                <TodoText size="1.375rem" smSize="1rem" user_select="none">
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
                  onBlur={onBlurAddTask}
                />
              )}
            </TodoForm>
          </NewTaskContainer>
        </NewTaskDiv>
        <TodoComponentContainer>
          <Todo />
        </TodoComponentContainer>
        <Toaster />
      </TodoContainer>
    </MainContainer>
  );
}
