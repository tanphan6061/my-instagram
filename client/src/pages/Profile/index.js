import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import PropTypes from "prop-types";

import {
  PageProfile,
  Content,
  Header,
  Title,
  ButtonClose,
  AccountList,
  AccountItem,
  Info,
  Avatar,
  Name,
  Username,
  Fullname,
  Follow,
} from "./styles";
import { Posts, Igtv, Saved, Tagged } from "../../constants/svgs";
import { PROFILE_ROUTES } from "../../constants/routes";
import UserInfo from "../../components/UserInfo";
import ChildProfilePage from "../../components/ChildProfilePage";
import Modal from "../../components/Modal";
import * as userAction from "../../actions/user";

const getSubRoutes = (username) => [
  { name: "POSTS", link: `/${username}/post`, icon: Posts },
  { name: "IGTV", link: `/${username}/channel`, icon: Igtv },
  {
    name: "SAVED",
    link: `/${username}/saved`,
    icon: Saved,
    style: { width: "20%" },
  },
  { name: "TAGGED", link: `/${username}/tagged`, icon: Tagged },
];

const showRoutes = (routes, posts) => {
  let result = null;
  if (routes.length > 0) {
    result = routes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          name={route.name}
          exact={route.exact}
          render={(props) => <ChildProfilePage posts={posts} {...props} />}
        />
      );
    });
  }
  return result;
};

function Profile(props) {
  const [modalFollower, setModalFollower] = useState(false);
  const [modalFollowing, setModalFollowing] = useState(false);
  const {
    match,
    mainProfile,
    userProfile,
    listFollowings,
    userFollower,
    userFollowing,
    userActionCreators,
  } = props;
  const { username } = match.params;
  const { getProfileUser, follow } = userActionCreators;
  const currentLogin = localStorage.getItem("username");
  const profile = currentLogin === username ? mainProfile : userProfile;

  useEffect(() => {
    if (currentLogin !== username) {
      getProfileUser(username);
    }
  }, [username, currentLogin, getProfileUser]);

  const toggleFollower = () => setModalFollower(!modalFollower);
  const toggleFollowing = () => setModalFollowing(!modalFollowing);

  return (
    <PageProfile>
      <UserInfo
        className="user-info"
        profile={profile}
        listFollowings={listFollowings}
        isCurrentLogin={currentLogin === username}
        handleFollow={follow}
        toggleFollower={toggleFollower}
        toggleFollowing={toggleFollowing}
      />

      <div className="d-flex justify-content-center mt-2 route-profile">
        <ul>
          {getSubRoutes(username).map((item, index) => (
            <Link to={item.link} key={index} className="ml-5">
              <li className="d-flex align-items-center">
                <img
                  style={item.style && item.style}
                  src={item.icon}
                  className="mr-2"
                  alt={item.name}
                />
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <Content>{showRoutes(PROFILE_ROUTES, profile.posts)}</Content>
      <Modal modal={modalFollower} toggle={toggleFollower}>
        <Header>
          <div />
          <Title>Follower</Title>
          <ButtonClose onClick={() => setModalFollower(false)}>
            &Chi;
          </ButtonClose>
        </Header>
        <AccountList onClick={() => setModalFollower(false)}>
          {userFollower.length > 0 &&
            userFollower.map((item, index) => (
              <AccountItem key={index}>
                <Link to={`/${item.username}`}>
                  <Info>
                    <Avatar className="avatar">
                      <img src={item.avatar} alt="avatar" />
                    </Avatar>
                    <Name>
                      <Username>{item.username}</Username>
                      <Fullname>{item.fullname}</Fullname>
                    </Name>
                  </Info>
                </Link>
                {/* <Follow>Follow</Follow> */}
              </AccountItem>
            ))}
        </AccountList>
      </Modal>
      <Modal modal={modalFollowing} toggle={toggleFollowing}>
        <Header>
          <div />
          <Title>Following</Title>
          <ButtonClose onClick={() => setModalFollowing(false)}>
            &Chi;
          </ButtonClose>
        </Header>
        <AccountList onClick={() => setModalFollowing(false)}>
          {userFollowing.length > 0 &&
            userFollowing.map((item, index) => (
              <AccountItem key={index}>
                <Link to={`/${item.username}`}>
                  <Info>
                    <Avatar className="avatar">
                      <img src={item.avatar} alt="avatar" />
                    </Avatar>
                    <Name>
                      <Username>{item.username}</Username>
                      <Fullname>{item.fullname}</Fullname>
                    </Name>
                  </Info>
                </Link>
                {/* <Follow>Follow</Follow> */}
              </AccountItem>
            ))}
        </AccountList>
      </Modal>
    </PageProfile>
  );
}

Profile.propTypes = {
  listFollowings: PropTypes.array,
  match: PropTypes.object,
  mainProfile: PropTypes.object,
  userProfile: PropTypes.object,
  userFollower: PropTypes.array,
  userFollowing: PropTypes.array,
  userActionCreators: PropTypes.shape({
    getProfileUser: PropTypes.func,
    follow: PropTypes.func,
  }),
};

const mapStateToProps = (state) => {
  return {
    mainProfile: state.user.mainProfile,
    userProfile: state.user.userProfile,
    listFollowings: state.user.followings,
    userFollower: state.user.userFollower,
    userFollowing: state.user.userFollowing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userActionCreators: bindActionCreators(userAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
