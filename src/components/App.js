import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import ForgotPassword from "./authentication/ForgotPassword";
import Login from "./authentication/Login";
import PrivateRoute from "./authentication/PrivateRoute";
import Signup from "./authentication/Signup";
import UpdateProfile from "./authentication/UpdateProfile";
import Profile from "./authentication/Profile";
import ChangeMode from "./theme/ChangeMode";
import Home from "./getCloud/Home";
import Landing from "./landing/Landing";
import "animate.css/animate.css";
import Recent from "./getCloud/menuRecent/Recent";
import "./App.css";
import Stared from "./getCloud/menuStarted/Stared";
import Trash from "./getCloud/menuTrash/Trash";
import PageNotFoundmenu from "./menu404/PageNotFoundmenu";
import { AnimatePresence } from "framer-motion";
import Features from "./landing/Features";
import Pricing from "./landing/Pricing";
import AboutUs from "./landing/AboutUs";

function App() {
  const location = useLocation();
  // console.log(location)
  return (
    <>
      <AuthProvider>
        {/* wait until current component exits and only then start animating new one */}
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            {/* getCloud */}
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/recent" component={Recent} />
            <PrivateRoute path="/stared" component={Stared} />
            <PrivateRoute path="/trash" component={Trash} />

            <PrivateRoute path="/folder/:folderId" component={Home} />

            {/* Profile */}
            <PrivateRoute path="/user" component={Profile} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />

            {/* Auth */}
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />

            {/* Landing page */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/features" component={Features} />
            <Route exact path="/pricing" component={Pricing} />
            <Route exact path="/aboutus" component={AboutUs} />
            <Route path="*">
              <Redirect to="/pagenotfound" />
              <PageNotFoundmenu />
            </Route>
          </Switch>
        </AnimatePresence>
      </AuthProvider>
    </>
  );
}

export default App;
