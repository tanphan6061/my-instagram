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
import { Button } from "./styles";
import DropDown from "../DropDown";
import * as switchRouteAction from "../../actions/switchRoute";
import * as uiAction from "../../actions/ui";

const profile = {
  top: [
    { icon: Profile, name: "Profile", link: "/qnguyenhuy1999" },
    { icon: Saved, name: "Saved", link: "/qnguyenhuy1999/saved" },
    { icon: Setting, name: "Setting", link: "/accounts/edit" },
  ],
  bottom: [
    {
      icon: "",
      name: "Logout",
      link: "/logout",
    },
  ],
};

const width = {
  width: "15%",
};

function MainMenu(props) {
  const { where, switchRouteCreators, uiActionCreators } = props;
  const { switchRoute } = switchRouteCreators;
  const { toggleDropdown } = uiActionCreators;

  return (
    <div id="main-menu">
      <ul>
        <li>
          <Link to="/" onClick={() => switchRoute("home")}>
            <img src={where === "home" ? HomeActive : Home} alt="Home" />
          </Link>
        </li>
        <li>
          <Link to="/inbox" onClick={() => switchRoute("inbox")}>
            <img src={where === "inbox" ? InboxActive : Inbox} alt="Inbox" />
          </Link>
        </li>
        <li>
          <Link to="/explore" onClick={() => switchRoute("explore")}>
            <img
              src={where === "explore" ? ExploreActive : Explore}
              alt="Explore"
            />
          </Link>
        </li>
        <li onClick={() => switchRoute("heart")}>
          <DropDown
            src={where === "heart" ? HeartActive : Heart}
            classname="heart"
          >
            <div className="item d-flex justify-content-between">
              <div className="info d-flex align-items-center">
                <div className="avatar" style={width}>
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
        </li>

        <li style={{ cursor: "pointer" }}>
          <DropDown src={Profile}>
            <div className="top">
              {profile.top.map((item, index) => (
                <Link key={index} to={item.link} onClick={toggleDropdown}>
                  <div className="icon">
                    <img src={item.icon} alt="icon" />
                  </div>
                  <p className="text">{item.name}</p>
                </Link>
              ))}
            </div>

            <div className="bottom">
              {profile.bottom.map((item, index) => (
                <Link key={index} to={item.link} onClick={toggleDropdown}>
                  {item.icon && (
                    <div className="icon">
                      <img src={item.icon} alt="icon" />
                    </div>
                  )}
                  <p className="text">{item.name}</p>
                </Link>
              ))}
            </div>
          </DropDown>
        </li>
      </ul>
    </div>
  );
}

MainMenu.propTypes = {
  where: PropTypes.string,
  switchRouteCreators: PropTypes.shape({
    switchRoute: PropTypes.func,
  }),
  uiActionCreators: PropTypes.shape({
    toggleDropdown: PropTypes.func,
  }),
};

const mapStateToProps = (state) => {
  return {
    where: state.route.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    switchRouteCreators: bindActionCreators(switchRouteAction, dispatch),
    uiActionCreators: bindActionCreators(uiAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
