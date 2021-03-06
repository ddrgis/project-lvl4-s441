import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
} from 'reactstrap';
import { useSelector } from 'react-redux';
import connect from '../store/connect';

const AlertModal = ({ hideAlertModal }) => {
  const { isShown, message } = useSelector(({ modals: { alert } }) => ({
    isShown: alert.isShown,
    message: alert.message,
  }));
  const hide = () => hideAlertModal();

  return (
    <div>
      <Modal isOpen={isShown} toggle={hide}>
        <ModalHeader toggle={hide}>Alert</ModalHeader>
        <ModalBody>
          <Alert color="danger">{message}</Alert>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={hide}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default connect()(AlertModal);
