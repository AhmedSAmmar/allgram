import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Posts from "./pages/Posts";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { useSelector } from "react-redux";
import { currentAuthUser } from "./api/userAuth";
import UserPosts from "./pages/UserPosts";

function App() {
  const currentUser = useSelector((state) => state.currentUser.value.user);
  useEffect(() => {
    currentAuthUser();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={currentUser ? <Posts /> : <SignIn />} />
          <Route
            path="userPosts"
            element={currentUser ? <UserPosts /> : <SignIn />}
          />
          <Route path="signin" element={currentUser ? <Posts /> : <SignIn />} />
          <Route path="signup" element={currentUser ? <Posts /> : <SignUp />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
