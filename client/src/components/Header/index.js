import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Logo from "../../assets/logo.png";
import { MainHeader } from "./styles";
import MainMenu from "../MainMenu/index";
import * as switchRouteAction from "../../actions/switchRoute";

function Header(props) {
  const { switchRouteCreators } = props;
  const { switchRoute } = switchRouteCreators;

  return (
    <nav id="main-header">
      <MainHeader>
        <Link to="/">
          <div
            className="logo"
            role="button"
            tabIndex="0"
            onClick={() => switchRoute("home")}
          >
            <img src={Logo} alt="Logo" />
          </div>
        </Link>
        <div id="search">
          <input type="text" />
          <span className="searchIcon" />
          <span className="textSearch">Search</span>
        </div>
        <MainMenu />
      </MainHeader>
    </nav>
  );
}

Header.propTypes = {
  switchRouteCreators: PropTypes.shape({
    switchRoute: PropTypes.func,
  }),
};

const mapDispatchToProps = (dispatch) => {
  return {
    switchRouteCreators: bindActionCreators(switchRouteAction, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(Header);
