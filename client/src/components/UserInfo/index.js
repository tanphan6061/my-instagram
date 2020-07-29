import React from "react";

import PropTypes from "prop-types";

import { Setting } from "../../constants/svgs";
import { UserInfo, Info, Username, EditProfile, FollowButton } from "./styles";

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

function UserInfoComponent(props) {
  const { profile, listFollowers, isCurrentLogin, handleFollow } = props;
  console.log(listFollowers);
  const checkIsFollow = (id) => {
    return listFollowers.findIndex((item) => item._id === id);
  };

  return (
    <>
      <UserInfo>
        <div className="avatar" style={avatar}>
          <img src={profile.avatar} alt="avatar" />
        </div>
        <Info>
          <div className="header d-flex align-items-center">
            <Username>{profile.username}</Username>
            {isCurrentLogin ? (
              <>
                <EditProfile className="edit-profile">Edit Profile</EditProfile>
                <div className="setting" style={setting}>
                  <img src={Setting} alt="setting" />
                </div>
              </>
            ) : (
              <FollowButton onClick={() => handleFollow(profile._id)}>
                {checkIsFollow(profile._id) > -1 ? "Unfollow" : "Follow"}
              </FollowButton>
            )}
          </div>
          <div className="content d-flex mt-2 mb-3">
            <span>
              <strong>{profile.postsCount}</strong> posts
            </span>
            <span style={followers}>
              <strong>{profile.followers}</strong> followers
            </span>
            <span>
              <strong>{profile.followings}</strong> following
            </span>
          </div>
          <div className="footer">
            <h1 style={h1}>{profile.fullname}</h1>
          </div>
        </Info>
      </UserInfo>
    </>
  );
}

UserInfoComponent.propTypes = {
  listFollowers: PropTypes.array,
  profile: PropTypes.shape({
    _id: PropTypes.string,
    avatar: PropTypes.string,
    username: PropTypes.string,
    postsCount: PropTypes.number,
    followings: PropTypes.number,
    followers: PropTypes.number,
    fullname: PropTypes.string,
  }),
  isCurrentLogin: PropTypes.bool,
  handleFollow: PropTypes.func,
};

export default UserInfoComponent;
