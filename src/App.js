import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth";

// components
import NavBar from "./components/NavBar";
import AuthRoute from "./util/AuthRoute";
import RoutePath from "./util/RoutePath";
// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";

// sem-ui
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <NavBar />
          <Container>
            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/signup" component={Signup} />
            <RoutePath exact path="/orders" component={Orders} />
            <RoutePath exact path="/cart" component={Cart} />
          </Container>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
