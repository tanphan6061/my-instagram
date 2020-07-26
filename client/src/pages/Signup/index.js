import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Input, Button, Form } from "reactstrap";
import PropTypes from "prop-types";

import { PageLogin, ContainerLoginForm, FormContainer, Text } from "./styles";
import LoginLogo from "../../assets/login_logo.png";
import * as authAction from "../../actions/auth";

const input = {
  margin: "0 0 10px",
  width: "100%",
  background: "#fafafa",
  fontSize: "12px",
};

const button = {
  background: "rgba(0,149,246,.3)",
  border: "none",
  width: "100%",
  fontSize: "14px",
};

const signup = {
  color: "#0095f6",
  fontWeight: "500",
  fontSize: "15px",
  marginLeft: "10px",
};

function Signup(props) {
  const { authActionCreators } = props;
  const { register } = authActionCreators;

  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");

  const handleSubmitForm = (event) => {
    event.preventDefault();
    register(email, fullname, username, password, date);
  };

  return (
    <PageLogin>
      <div className="image">
        <img src={LoginLogo} alt="Login Logo" />
      </div>
      <ContainerLoginForm>
        <div>
          <FormContainer>
            <p className="logo-login" />
            <Form onSubmit={handleSubmitForm} style={{ width: "70%" }}>
              <Input
                style={input}
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                style={input}
                type="text"
                name="fullname"
                placeholder="Full name"
                onChange={(e) => setFullname(e.target.value)}
              />
              <Input
                style={input}
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                style={input}
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                style={input}
                type="date"
                name="date"
                placeholder="DD-MM-YYYY"
                onChange={(e) => setDate(e.target.value)}
              />

              <Button type="submit" color="primary" style={button}>
                Sign Up
              </Button>

              <Text>
                By signing up, you agree to our Terms , Data Policy and Cookies
                Policy .
              </Text>
            </Form>
          </FormContainer>
          <FormContainer className="mt-3">
            <p>
              Have an account?
              <Link to="/login" style={signup}>
                Login
              </Link>
            </p>
          </FormContainer>
        </div>
      </ContainerLoginForm>
    </PageLogin>
  );
}

Signup.propTypes = {
  authActionCreators: PropTypes.shape({
    register: PropTypes.func,
  }),
};

const mapDispatchToProps = (dispatch) => {
  return {
    authActionCreators: bindActionCreators(authAction, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Signup);
