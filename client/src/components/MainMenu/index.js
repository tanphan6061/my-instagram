import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import {
  Home,
  HomeActive,
  Inbox,
  InboxActive,
  Explore,
  ExploreActive,
  Heart,
  HeartActive,
  Profile,
  Saved,
  Setting,
} from "../../constants/svgs";
import { Button, ListUl, Item } from "./styles";
import DropDown from "../DropDown";
import * as switchRouteAction from "../../actions/switchRoute";
import * as authAction from "../../actions/auth";
import * as uiAction from "../../actions/ui";

function MainMenu(props) {
  const {
    mainProfile,
    auth,
    where,
    switchRouteCreators,
    authActionCreators,
    uiActionCreators,
    dropdownHeart,
    dropdownProfile,
  } = props;
  const { switchRoute } = switchRouteCreators;
  const { logout } = authActionCreators;
  const { toggleDropdownHeart, toggleDropdownProfile } = uiActionCreators;

  const profile = {
    top: [
      { icon: Profile, name: "Profile", link: `/${mainProfile.username}` },
      { icon: Saved, name: "Saved", link: `/${mainProfile.username}/saved` },
      { icon: Setting, name: "Setting", link: "/accounts/edit" },
    ],
  };

  return (
    <div id="main-menu" style={{ width: "30%" }}>
      <ListUl>
        <Item>
          <Link to="/" onClick={() => switchRoute("home")}>
            <img src={where === "home" ? HomeActive : Home} alt="Home" />
          </Link>
        </Item>
        <Item>
          <Link to="/inbox" onClick={() => switchRoute("inbox")}>
            <img src={where === "inbox" ? InboxActive : Inbox} alt="Inbox" />
          </Link>
        </Item>
        <Item>
          <Link to="/explore" onClick={() => switchRoute("explore")}>
            <img
              src={where === "explore" ? ExploreActive : Explore}
              alt="Explore"
            />
          </Link>
        </Item>
        <Item role="button" tabIndex="0" onClick={() => switchRoute("heart")}>
          <DropDown
            src={where === "heart" ? HeartActive : Heart}
            classname="heart"
            dropdown={dropdownHeart}
            toggleDropdown={toggleDropdownHeart}
          >
            <div className="item d-flex justify-content-between">
              <div className="info d-flex align-items-center">
                <div className="avatar" style={{ width: "15%" }}>
                  <img
                    src="https://instagram.fhan5-1.fna.fbcdn.net/v/t51.2885-19/s150x150/16465429_553607288175748_347144476910682112_a.jpg?_nc_ht=instagram.fhan5-1.fna.fbcdn.net&_nc_ohc=5S0DWX3BsqAAX_YRJ9l&oh=d8e4f892a830ba25fed14f0c07709984&oe=5F3D3586"
                    alt="Avatar"
                  />
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    marginLeft: "8px",
                  }}
                >
                  phanviettan1606
                </p>
              </div>
              <Button>Follow</Button>
            </div>
          </DropDown>
        </Item>

        {auth && (
          <Item style={{ cursor: "pointer", width: "8.5%" }}>
            <DropDown
              src={mainProfile.avatar}
              dropdown={dropdownProfile}
              toggleDropdown={toggleDropdownProfile}
            >
              <div className="top">
                {profile.top.map((item, index) => (
                  <Link key={index} to={item.link}>
                    <div className="icon">
                      <img src={item.icon} alt="icon" />
                    </div>
                    <p className="text">{item.name}</p>
                  </Link>
                ))}
              </div>

              <div className="bottom">
                <p
                  className="text"
                  style={{ marginLeft: "18px" }}
                  onClick={logout}
                >
                  Logout
                </p>
              </div>
            </DropDown>
          </Item>
        )}
      </ListUl>
    </div>
  );
}

MainMenu.propTypes = {
  avatar: PropTypes.object,
  auth: PropTypes.bool,
  where: PropTypes.string,
  dropdownHeart: PropTypes.bool,
  dropdownProfile: PropTypes.bool,
  mainProfile: PropTypes.shape({
    username: PropTypes.string,
    avatar: PropTypes.string,
  }),

  switchRouteCreators: PropTypes.shape({
    switchRoute: PropTypes.func,
  }),

  authActionCreators: PropTypes.shape({
    logout: PropTypes.func,
  }),

  uiActionCreators: PropTypes.shape({
    toggleDropdownHeart: PropTypes.func,
    toggleDropdownProfile: PropTypes.func,
  }),
};

const mapStateToProps = (state) => {
  return {
    where: state.route.name,
    auth: state.auth.auth,
    dropdownHeart: state.ui.dropdownHeart,
    dropdownProfile: state.ui.dropdownProfile,
    mainProfile: state.user.mainProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    switchRouteCreators: bindActionCreators(switchRouteAction, dispatch),
    authActionCreators: bindActionCreators(authAction, dispatch),
    uiActionCreators: bindActionCreators(uiAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
