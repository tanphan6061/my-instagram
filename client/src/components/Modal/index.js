import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";

function ModalContainer() {
  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <div className="item">
            <p>Item</p>
          </div>
          <div className="item">
            <p>Item</p>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalContainer;
