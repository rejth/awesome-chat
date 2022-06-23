import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Modal, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import useValidationSchema from '../hooks/useValidationSchema';
import { useChatService } from '../../../hooks/useContext';
import { getAllChannels } from '../../../store/selectors/index.js';

function AddModal({ isShow, handleClose }) {
  const channels = useSelector(getAllChannels);
  const schema = useValidationSchema(channels);
  const { socket } = useChatService();
  const { t } = useTranslation();

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
    <Modal
      data-testid="add-channel-modal"
      show={isShow}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.addChannelModal.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>{t('modals.addChannelModal.channelName')}</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              name="name"
              placeholder={t('modals.addChannelModal.errors.placeholder')}
              {...register('name', schema)}
            />
            <div>{errors.name?.message}</div>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          data-testid="cancel-add-btn"
          variant="secondary"
          onClick={handleClose}
        >
          {t('modals.addChannelModal.closeButton')}
        </Button>
        <Button
          data-testid="save-add-btn"
          type="submit"
          variant="primary"
          onClick={handleSubmit(onSubmit)}
        >
          {t('modals.addChannelModal.saveButton')}
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
