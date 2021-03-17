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

function App() {
  
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            {/* getCloud */}
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/folder/:folderId" component={Home}/>

            {/* Profile */}
            <PrivateRoute path="/user" component={Profile} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />

            {/* Auth */}
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />

            {/* Landing page */}
            <Route path="/" component={Landing}/>

          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
