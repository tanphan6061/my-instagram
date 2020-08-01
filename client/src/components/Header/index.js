import React, { useState } from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Logo from "../../assets/logo.png";
import {
  MainHeader,
  GroupSearch,
  Accounts,
  Account,
  Avatar,
  Name,
  Username,
  Fullname,
} from "./styles";
import MainMenu from "../MainMenu";
import * as switchRouteAction from "../../actions/switchRoute";
import * as userAction from "../../actions/user";

function Header(props) {
  const [input, setInput] = useState("");
  const { switchRouteCreators, userActionCreators, users } = props;
  const { switchRoute } = switchRouteCreators;
  const { search } = userActionCreators;

  const handleChange = (e) => {
    setInput(e.target.value);
    search(input);
  };

  const removeTextInput = () => {
    setInput("");
  };

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
        <GroupSearch>
          <div id="search" role="button" tabIndex={0}>
            <input
              type="text"
              placeholder="Search"
              onChange={handleChange}
              value={input}
              autoComplete="off"
            />
          </div>
          {users.length > 0 && input && (
            <Accounts onClick={removeTextInput}>
              {users.map((user, index) => (
                <Link to={`/${user.username}`} key={index}>
                  <Account>
                    <Avatar className="avatar">
                      <img src={user.avatar} alt="avatar" />
                    </Avatar>
                    <Name>
                      <Username>{user.username}</Username>
                      <Fullname>{user.fullname}</Fullname>
                    </Name>
                  </Account>
                </Link>
              ))}
            </Accounts>
          )}
        </GroupSearch>
        <MainMenu />
      </MainHeader>
    </nav>
  );
}

Header.propTypes = {
  users: PropTypes.array,
  switchRouteCreators: PropTypes.shape({
    switchRoute: PropTypes.func,
  }),
  userActionCreators: PropTypes.shape({
    search: PropTypes.func,
  }),
};

const mapStateToProps = (state) => {
  return {
    users: state.user.search,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    switchRouteCreators: bindActionCreators(switchRouteAction, dispatch),
    userActionCreators: bindActionCreators(userAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
