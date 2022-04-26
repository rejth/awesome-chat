import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { useChatService } from '../../../hooks/useContext';

function RemoveModal({
  channelId,
  isShow,
  handleClose,
}) {
  const { socket } = useChatService();
  const onSubmit = () => {
    socket.emit('removeChannel', { id: channelId });
    handleClose();
  };

  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Remove the channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Are you sure?</h4>
        <p>
          You cannot restore the channel after removing
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="danger"
          onClick={onSubmit}
        >
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

RemoveModal.propTypes = {
  channelId: PropTypes.number.isRequired,
  isShow: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default RemoveModal;
