import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Posts from "./pages/Posts";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { useSelector } from "react-redux";
import { currentAuthUser } from "./api/userAuth";

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
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
