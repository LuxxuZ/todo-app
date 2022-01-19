import React, { useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./screens/home";
import SignUp from "./screens/signUp";
import Tasks from "./screens/tasks";
import Redirect from "./screens/redirect";
import reportWebVitals from "./reportWebVitals";
import {
  SupabaseProvider,
  TodoProvider,
  AuthProvider,
} from "./utilities/context-wrapper";
import { AuthContext } from "./utilities/context-wrapper";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

const Auth = () => {};

ReactDOM.render(
  <React.StrictMode>
    <SupabaseProvider>
      <AuthProvider>
        <TodoProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="register" element={<SignUp />} />
              <Route path="/redirect" element={<Redirect />} />
            </Routes>
          </BrowserRouter>
        </TodoProvider>
      </AuthProvider>
    </SupabaseProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
