import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';

function RenameModal({
  channelId,
  socket,
  isShow,
  handleClose,
}) {
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: ({ name }) => {
      socket.emit('renameChannel', { id: channelId, name });
      handleClose();
    },
  });

  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Rename the channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Channel name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              name="name"
              placeholder="Type a channel name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          type="submit"
          variant="primary"
          onClick={formik.handleSubmit}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

RenameModal.propTypes = {
  channelId: PropTypes.number.isRequired,
  isShow: PropTypes.bool.isRequired,
  socket: PropTypes.any.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default RenameModal;
