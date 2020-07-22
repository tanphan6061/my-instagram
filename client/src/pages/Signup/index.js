import React from "react";
import { Link } from "react-router-dom";
import { Input, Button } from "reactstrap";

import { PageLogin, ContainerLoginForm, Form, Text } from "./styles";
import LoginLogo from "../../assets/login_logo.png";

const input = {
  margin: "0 0 10px",
  width: "70%",
  background: "#fafafa",
  fontSize: "12px",
};

const button = {
  background: "rgba(0,149,246,.3)",
  border: "none",
  width: "70%",
  fontSize: "14px",
};

const signup = {
  color: "#0095f6",
  fontWeight: "500",
  fontSize: "15px",
  marginLeft: "10px",
};

export default function () {
  return (
    <PageLogin>
      <div className="image">
        <img src={LoginLogo} alt="Login Logo" />
      </div>
      <ContainerLoginForm>
        <div>
          <Form>
            <h1 className="logo-login"></h1>
            <Input
              style={input}
              type="email"
              name="email"
              placeholder="email"
            />
            <Input
              style={input}
              type="text"
              name="fullname"
              placeholder="Full name"
            />
            <Input
              style={input}
              type="text"
              name="username"
              placeholder="Username"
            />
            <Input
              style={input}
              type="password"
              name="password"
              placeholder="password"
            />
            <Button style={button} color="primary">
              Sign Up
            </Button>

            <Text>
              By signing up, you agree to our Terms , Data Policy and Cookies
              Policy .
            </Text>
          </Form>
          <Form className="mt-3">
            <p>
              Have an account?
              <Link to="/" style={signup}>
                Login
              </Link>
            </p>
          </Form>
        </div>
      </ContainerLoginForm>
    </PageLogin>
  );
}
