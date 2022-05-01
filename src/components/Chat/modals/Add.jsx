import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Modal, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import getValidationSchema from './helpers/validation';
import { useChatService } from '../../../hooks/useContext';

function AddModal({ isShow, handleClose }) {
  const channels = useSelector((state) => state.chatReducer.data.channels);
  const { socket } = useChatService();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  React.useEffect(() => setFocus('name'), [setFocus]);

  const onSubmit = (data) => {
    socket.emit('newChannel', data);
    handleClose();
  };

  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Channel name</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              name="name"
              placeholder="Type a channel name"
              {...register('name', getValidationSchema(channels))}
            />
            <div>{errors.name?.message}</div>
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
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

AddModal.propTypes = {
  isShow: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddModal;
