import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ForgotPassword from "./authentication/ForgotPassword";
import Login from "./authentication/Login";
import PrivateRoute from "./authentication/PrivateRoute";
import Signup from "./authentication/Signup";
import UpdateProfile from "./authentication/UpdateProfile";
import Profile from "./authentication/Profile";
import NavbarComponent from "./getCloud/Navbar";
import Dashboard from "./getCloud/Dashboard";
import ChangeMode from "./theme/ChangeMode";
import Home from "./getCloud/Home";
import Landing from "./landing/Landing";
import "animate.css/animate.css";
import Recent from "./getCloud/menuRecent/Recent";
import "./App.css"
import Stared from "./getCloud/menuStarted/Stared";
import Trash from "./getCloud/menuTrash/Trash";
import PageNotFound from "./menu404/PageNotFound";
import PageNotFoundmenu from "./menu404/PageNotFoundmenu";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
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
            <PrivateRoute path="*" component={PageNotFoundmenu} />

          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
