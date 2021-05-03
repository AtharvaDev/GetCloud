import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { ThemeProvider } from "styled-components";
import { useAuth } from "../../contexts/AuthContext";
import { GlobalStyles } from "./global";
import { darkTheme, lightTheme } from "./theme";
import Toggle from "./Toggle";
import { useDarkMode } from "./useDarkMode";

function ChangeMode() {
  const { setGlobalDarkTheme, globalDarkTheme } = useAuth();
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />;
  }

  function changeTheme() {
    if (theme === "light") {
      setGlobalDarkTheme(false);
      // console.log(globalDarkTheme)
    } else {
      // console.log("dark is true");
      setGlobalDarkTheme(true);
      // console.log(globalDarkTheme)
    }
  }

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <div onClick={changeTheme()}>
          <Toggle theme={theme} toggleTheme={toggleTheme} />
        </div>
        {/* <h1>It's a {theme === 'light' ? 'light theme' : 'dark theme'}!</h1> */}
      </>
    </ThemeProvider>
  );
}

export default ChangeMode;
