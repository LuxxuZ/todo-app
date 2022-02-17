import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthContext,
  SupabaseContext,
  TodoContext,
} from "../../utilities/context-wrapper";
import { LoadIconContainer, MainContainer, TextContainer } from "./styles";
import { TodoText } from "../tasks/styles";
import { BiLoaderAlt } from "react-icons/bi";

export default function Redirect() {
  const { tasks, setTasks } = useContext(TodoContext);
  const { authToken, setAuthToken } = useContext(AuthContext);
  const client = useContext(SupabaseContext);

  const navigate = useNavigate();

  async function loadTasks() {
    if (authToken) {
      const { currentSession } = JSON.parse(authToken || "{}");
      const { user } = currentSession;

      await client
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .then(({ data = [] }) => {
          setTasks(data);
        })
        .then(authToken ? navigate("../tasks") : navigate("/"));
    }
  }
  useEffect(() => {
    client && setAuthToken(client.auth.session());

    client &&
      client.auth.onAuthStateChange((_event, session) => {
        setAuthToken(session);
      });
  }, [client]);

  useEffect(() => {
    loadTasks();
  }, [authToken]);

  return (
    <MainContainer>
      <TextContainer>
        <TodoText margin="0" size="36px">
          Loading
        </TodoText>
        <TodoText margin="0" size="22px" color="#9e9e9e" weight="300">
          Wait a moment please
        </TodoText>
        <LoadIconContainer>
          <BiLoaderAlt />
        </LoadIconContainer>
      </TextContainer>
    </MainContainer>
  );
}
