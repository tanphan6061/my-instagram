import React from "react";
import { Dropdown, DropdownMenu, DropdownToggle } from "reactstrap";
import PropTypes from "prop-types";

function DropDown(props) {
  const { dropdown, children, src, classname, toggleDropdown } = props;

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
  toggleDropdown: PropTypes.func,
  src: PropTypes.string,
  classname: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default DropDown;
