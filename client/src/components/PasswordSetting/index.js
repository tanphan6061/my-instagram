import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Label, Input, Button } from "reactstrap";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

import { ContentItem, Avatar, ContainerInput } from "./styles";
import * as userAction from "../../actions/user";

function PasswordSetting(props) {
  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { userActionCreators } = props;
  const { changePassword } = userActionCreators;

  const checkDisable = () => {
    if (!confirm || !password || !newPassword) return true;
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirm !== newPassword)
      return toast.error("Confirm password not corrent with new password");
    return changePassword(password, newPassword);
  };

  return (
    <>
      <form autoComplete="off">
        <ContentItem style={{ margin: "20px 0 20px 100px" }}>
          <Avatar className="avatar">
            <img
              src="https://res.cloudinary.com/binzlark/image/upload/v1595751014/my-instagram/avatars/person_paqs7g_y8gkjc.png"
              alt="avatar"
            />
          </Avatar>
          <div className="name">
            <p
              className="username"
              style={{ marginBottom: "5px", fontSize: "20px" }}
            >
              qnguyenhuy1999
            </p>
          </div>
        </ContentItem>

        <ContentItem>
          <Label htmlFor="old_password" style={{ width: "20%" }}>
            Old Password
          </Label>
          <ContainerInput>
            <Input
              type="password"
              name="old_password"
              style={{ background: "#fafafa" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </ContainerInput>
        </ContentItem>

        <ContentItem>
          <Label htmlFor="new_password" style={{ width: "20%" }}>
            New Password
          </Label>
          <ContainerInput>
            <Input
              type="password"
              name="new_password"
              style={{ background: "#fafafa" }}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </ContainerInput>
        </ContentItem>

        <ContentItem>
          <Label htmlFor="confirm_password" style={{ width: "20%" }}>
            Confirm New Password
          </Label>
          <ContainerInput>
            <Input
              type="password"
              name="confirm_password"
              style={{ background: "#fafafa" }}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </ContainerInput>
        </ContentItem>

        <Button
          type="submit"
          color="primary"
          style={{
            padding: "4px 12px",
            marginLeft: "25%",
            fontSize: "14px",
            fontWeight: "500",
          }}
          disabled={checkDisable()}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </form>
    </>
  );
}

PasswordSetting.propTypes = {
  userActionCreators: PropTypes.shape({
    changePassword: PropTypes.func,
  }),
};

const mapDispatchToProps = (dispatch) => {
  return {
    userActionCreators: bindActionCreators(userAction, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(PasswordSetting);
