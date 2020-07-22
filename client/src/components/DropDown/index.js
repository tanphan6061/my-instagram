import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import PropTypes from "prop-types";

import * as uiAction from "../../actions/ui";

function DropDown(props) {
  const { dropdown, uiActionCreators, children, src, classname } = props;
  const { toggleDropdown } = uiActionCreators;

  return (
    <Dropdown isOpen={dropdown} toggle={toggleDropdown}>
      <DropdownToggle
        tag="span"
        data-toggle="dropdown"
        aria-expanded={dropdown}
      >
        <img src={src} alt="icon" />
      </DropdownToggle>
      <DropdownMenu className={classname}>
        <div className="drop-item">
          <div className="arrow" />
          {children}
        </div>
      </DropdownMenu>
    </Dropdown>
  );
}

DropDown.propTypes = {
  dropdown: PropTypes.bool,
  uiActionCreators: PropTypes.shape({
    toggleDropdown: PropTypes.func,
  }),
  src: PropTypes.string,
  classname: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    dropdown: state.ui.dropdown,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uiActionCreators: bindActionCreators(uiAction, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropDown);
