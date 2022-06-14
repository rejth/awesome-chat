import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Col,
  ListGroup,
  SplitButton,
  Dropdown,
} from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import showModal from '../modals';
import { useChatService } from '../../../hooks/useContext';
import { addChannel, removeChannel, renameChannel } from '../../../store/slices/chatSlice.js';
import { getChatData } from '../../../store/selectors/index.js';

function ChatSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { socket } = useChatService();

  const dispatch = useDispatch();
  const data = useSelector(getChatData);

  const [modal, setModal] = React.useState({ type: '', channelId: null });
  const Modal = showModal(modal.type);

  React.useEffect(() => {
    socket.on('newChannel', (newChannel) => {
      dispatch(addChannel(newChannel));
      navigate(`/chat#${newChannel?.id}`);
    });
    socket.on('removeChannel', ({ id }) => {
      dispatch(removeChannel(id));
      navigate('/chat#1');
    });
    socket.on('renameChannel', (channel) => {
      dispatch(renameChannel(channel));
      navigate(`/chat#${channel?.id}`);
    });
  }, [socket, dispatch, navigate]);

  return (
    <>
      {modal.type && (
        <Modal
          channelId={modal.channelId}
          isShow={!!modal.type}
          handleClose={() => setModal({ type: '', channelId: null })}
        />
      )}

      <Col sm={3}>
        <div className="d-flex justify-content-between align-items-start">
          <h4 className="mb-3">{t('chatSidebar.title')}</h4>
          <button
            data-testid="add-channel-btn"
            type="button"
            className="btn btn-outline-success btn-sm float-right"
            onClick={() => setModal({ type: 'adding', channelId: null })}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        <div className="chat-page__sidebar-list">
          <ListGroup>
            {data.channels.map(({ id, name, removable }) => (
              <ListGroup.Item
                key={id}
                data-testid="channel-elem-link"
                action
                active={id === +location.hash.substring(1) || (!location.hash && id === 1)}
                href={`#${id}`}
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <SplitButton
                    key={id}
                    id={`dropdown-split-variants-${id}`}
                    variant="light"
                    size="xl"
                    title={name}
                  >
                    <Dropdown.Item
                      eventKey="1"
                      data-testid="rename-channel-btn"
                      onClick={() => setModal({ type: 'renaming', channelId: id })}
                    >
                      {t('chatSidebar.renameChannelButton')}
                    </Dropdown.Item>
                    {removable && (
                      <>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          eventKey="2"
                          data-testid="remove-channel-btn"
                          onClick={() => setModal({ type: 'removing', channelId: id })}
                        >
                          {t('chatSidebar.removeChannelButton')}
                        </Dropdown.Item>
                      </>
                    )}
                  </SplitButton>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Col>
    </>
  );
}

export default ChatSidebar;
