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

function App() {
  
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            {/* getCloud */}
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/folder/:folderId" component={Dashboard}/>

            {/* Profile */}
            <PrivateRoute path="/user" component={Profile} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />

            {/* Auth */}
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
