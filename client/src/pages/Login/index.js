import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Input, Button, Form } from "reactstrap";
import PropTypes from "prop-types";
import Loading from "../../components/Loading";

import {
  PageLogin,
  ContainerLoginForm,
  FormContainer,
  HR,
  SocialText,
  SPAN,
} from "./styles";
import LoginLogo from "../../assets/login_logo.png";
import * as authActions from "../../actions/auth";

const input = {
  margin: "0 0 10px",
  width: "100%",
  background: "#fafafa",
  fontSize: "12px",
};

const button = {
  background: "#0095f6",
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

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { showLoading, AuthActionCreators } = props;
  const { login } = AuthActionCreators;

  const handleSubmitForm = (event) => {
    event.preventDefault();
    login(username, password);
  };

  return (
    <>
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
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Input
                  style={input}
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  style={button}
                  type="submit"
                  color="primary"
                  disabled={!password || !username}
                >
                  Log In
                </Button>
              </Form>
              <HR>
                <SPAN>OR</SPAN>
              </HR>
              <div className="login-with-social d-flex flex-column mt-4 mb-3">
                <div className="d-flex align-items-center">
                  <span className="facebook mr-2" />
                  <SocialText>Log in with Facebook</SocialText>
                </div>

                <Link
                  to="/"
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    marginTop: "20px",
                  }}
                >
                  Forgot the password
                </Link>
              </div>
            </FormContainer>
            <FormContainer className="mt-3">
              <p>
                Don&apos;t have account?
                <Link to="/signup" style={signup}>
                  Sign up
                </Link>
              </p>
            </FormContainer>
          </div>
        </ContainerLoginForm>
      </PageLogin>
      {showLoading && <Loading />}
    </>
  );
}

Login.propTypes = {
  AuthActionCreators: PropTypes.shape({
    login: PropTypes.func,
  }),
  showLoading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    showLoading: state.auth.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    AuthActionCreators: bindActionCreators(authActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
