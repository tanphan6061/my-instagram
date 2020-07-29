import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Input, Button, Form } from "reactstrap";
import PropTypes from "prop-types";

import { PageLogin, ContainerLoginForm, FormContainer } from "./styles";
import LoginLogo from "../../assets/login_logo.png";
import * as authAction from "../../actions/auth";

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
  cursor: "pointer",
};

function Verify(props) {
  const [code, setCode] = useState("");
  const { authActionCreators } = props;
  const { verify, resendCode } = authActionCreators;

  const handleSubmitForm = (event) => {
    event.preventDefault();
    verify(code);
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
                type="text"
                name="username"
                placeholder="Verify code"
                onChange={(e) => setCode(e.target.value)}
              />
              <Button
                style={button}
                type="submit"
                color="primary"
                disabled={!code}
              >
                Verify
              </Button>
            </Form>
            <p style={signup} onClick={resendCode}>
              Resend code.
            </p>
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

Verify.propTypes = {
  authActionCreators: PropTypes.shape({
    verify: PropTypes.func,
    resendCode: PropTypes.func,
  }),
};

const mapDispatchToProps = (dispatch) => {
  return {
    authActionCreators: bindActionCreators(authAction, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Verify);
