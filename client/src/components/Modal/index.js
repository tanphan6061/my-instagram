import React from "react";
import { Modal, ModalBody } from "reactstrap";
import PropTypes from "prop-types";

function ModalContainer(props) {
  const { modal, toggle, children } = props;

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>{children}</ModalBody>
      </Modal>
    </div>
  );
}

ModalContainer.propTypes = {
  modal: PropTypes.bool,
  toggle: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default ModalContainer;
