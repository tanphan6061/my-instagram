import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Label, Input, Button } from "reactstrap";
import PropTypes from "prop-types";

import { ContentItem, Avatar, Span, ContainerInput } from "./styles";
import * as userAction from "../../actions/user";

function SettingEdit(props) {
  const { profile, userActionCreators } = props;
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const { addAvatar, updateProfile } = userActionCreators;

  const uploadAvatar = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar, avatar.name);
    addAvatar(formData);
    setAvatar("");
  };

  const checkDisable = () => {
    if (!username || !fullname || !date || !gender) return true;
    return false;
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateProfile(username, fullname, profile.email, date, gender);
  };

  return (
    <>
      <ContentItem style={{ margin: "20px 0 20px 100px" }}>
        <Avatar className="avatar">
          <img src={profile.avatar} alt="avatar" />
        </Avatar>
        <div className="name">
          <p className="username" style={{ marginBottom: "5px" }}>
            {profile.username}
          </p>
          <input
            type="file"
            name="avatar"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
          <Button className="btn-sm" color="secondary" onClick={uploadAvatar}>
            Upload avatar
          </Button>
        </div>
      </ContentItem>

      <ContentItem>
        <Label htmlFor="name" style={{ width: "20%" }}>
          Name
        </Label>
        <ContainerInput>
          <Input
            type="text"
            name="name"
            placeholder="Full name"
            onChange={(e) => setFullname(e.target.value)}
          />
          <Span>
            Help people discover your account by using the name you&apos;re
            known by: either your full name, nickname, or business name. You can
            only change your name twice within 14 days.
          </Span>
        </ContainerInput>
      </ContentItem>

      <ContentItem>
        <Label htmlFor="username" style={{ width: "20%" }}>
          Username
        </Label>
        <ContainerInput>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </ContainerInput>
      </ContentItem>

      <ContentItem>
        <Label htmlFor="website" style={{ width: "20%" }}>
          Website
        </Label>
        <ContainerInput>
          <Input type="text" name="website" placeholder="Website" disabled />
        </ContainerInput>
      </ContentItem>

      <ContentItem>
        <Label htmlFor="bio" style={{ width: "20%" }}>
          Bio
        </Label>
        <ContainerInput>
          <Input type="textarea" name="bio" placeholder="Bio" disabled />
          <Span>
            <p style={{ color: "#8e8e8e", fontWeight: 500 }}>
              Personal Information
            </p>
            Provide your personal information, even if the account is used for a
            business, a pet or something else. This won&apos;t be a part of your
            public profile.
          </Span>
        </ContainerInput>
      </ContentItem>

      <ContentItem>
        <Label htmlFor="email" style={{ width: "20%" }}>
          Email
        </Label>
        <ContainerInput>
          <Input type="email" name="email" placeholder="Email" disabled />
        </ContainerInput>
      </ContentItem>

      <ContentItem>
        <Label htmlFor="phone" style={{ width: "20%" }}>
          Phone Number
        </Label>
        <ContainerInput>
          <Input type="text" name="phone" placeholder="Phone Number" disabled />
        </ContainerInput>
      </ContentItem>

      <ContentItem>
        <Label htmlFor="gender" style={{ width: "20%" }}>
          Gender
        </Label>
        <ContainerInput>
          <Input
            type="select"
            name="gender"
            placeholder="Gender"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="3rd">Other</option>
          </Input>
        </ContainerInput>
      </ContentItem>

      <ContentItem>
        <Label htmlFor="gender" style={{ width: "20%" }}>
          Date of birth
        </Label>
        <ContainerInput>
          <Input
            type="date"
            name="date"
            onChange={(e) => setDate(e.target.value)}
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
        onClick={handleUpdateProfile}
      >
        Submit
      </Button>
    </>
  );
}

SettingEdit.propTypes = {
  profile: PropTypes.shape({
    email: PropTypes.string,
    avatar: PropTypes.string,
    username: PropTypes.string,
  }),
  userActionCreators: PropTypes.shape({
    addAvatar: PropTypes.func,
    updateProfile: PropTypes.func,
  }),
};

const mapStateToProps = (state) => {
  return {
    profile: state.user.mainProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userActionCreators: bindActionCreators(userAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingEdit);
