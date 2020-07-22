import React from "react";

import { Setting } from "../../constants/svgs";
import { UserInfo, Info, Username, EditProfile } from "./styles";

const avatar = {
  width: "20%",
};

const setting = {
  width: "4.5%",
  cursor: "pointer",
};

const followers = {
  margin: "0 20px",
};

const h1 = {
  fontSize: "18px",
};

export default function () {
  return (
    <UserInfo>
      <div className="avatar" style={avatar}>
        <img src="https://scontent-xsp1-1.cdninstagram.com/v/t51.2885-19/s320x320/103639626_933546613773813_6928448489305567355_n.jpg?_nc_ht=scontent-xsp1-1.cdninstagram.com&_nc_ohc=pIJdlumA_BkAX9-BhNC&oh=d55403d6771bec6f698ffc8fbc9c96fb&oe=5F3DB48A" />
      </div>
      <Info>
        <div className="header d-flex align-items-center">
          <Username>qnguyenhuy1999</Username>
          <EditProfile className="edit-profile">Edit Profile</EditProfile>
          <div className="setting" style={setting}>
            <img src={Setting} />
          </div>
        </div>
        <div className="content d-flex mt-2 mb-3">
          <span>
            <strong>0</strong> posts
          </span>
          <span style={followers}>
            <strong>10</strong> followers
          </span>
          <span>
            <strong>25</strong> following
          </span>
        </div>
        <div className="footer">
          <h1 style={h1}>Nguyen Quang Huy</h1>
        </div>
      </Info>
    </UserInfo>
  );
}
