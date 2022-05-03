import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { useChatService } from '../../../hooks/useContext';

function RemoveModal({
  channelId,
  isShow,
  handleClose,
}) {
  const { t } = useTranslation();
  const { socket } = useChatService();

  const onSubmit = () => {
    socket.emit('removeChannel', { id: channelId });
    handleClose();
  };

  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{t('modals.removeChannelModal.subTitle1')}</h4>
        <p>
          {t('modals.removeChannelModal.subTitle2')}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleClose}
        >
          {t('modals.removeChannelModal.closeButton')}
        </Button>
        <Button
          type="submit"
          variant="danger"
          onClick={onSubmit}
        >
          {t('modals.removeChannelModal.saveButton')}
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
