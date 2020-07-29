import React from "react";
import { Modal, ModalBody } from "reactstrap";

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

export default ModalContainer;
