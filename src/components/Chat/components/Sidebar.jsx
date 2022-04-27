import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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
import { addChannel, removeChannel, renameChannel } from '../../../slices/chatSlice';

function ChatSidebar() {
  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();
  const data = useSelector((state) => state.chatReducer.data);

  const { socket } = useChatService();
  const [modal, setModal] = React.useState({ type: '', channelId: null });
  const Modal = showModal(modal.type);

  React.useEffect(() => {
    socket.on('newChannel', (newChannel) => {
      dispatch(addChannel(newChannel));
      history.push(`/chat#${newChannel?.id}`);
    });
    socket.on('removeChannel', ({ id }) => {
      dispatch(removeChannel(id));
      history.push('/chat#1');
    });
    socket.on('renameChannel', (channel) => {
      dispatch(renameChannel(channel));
      history.push(`/chat#${channel?.id}`);
    });
  }, [socket, dispatch, history]);

  return (
    <>
      {modal.type && (
        <Modal
          channelId={modal.channelId}
          isShow={!!modal.type}
          handleClose={() => setModal({ type: '', channelId: null })}
        />
      )}
      <Col sm={4}>
        <div className="d-flex justify-content-between align-items-start">
          <h4 className="mb-3">Channels</h4>
          <button
            type="button"
            className="btn btn-outline-success btn-sm float-right"
            onClick={() => setModal({ type: 'adding', channelId: null })}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        <ListGroup>
          {data.channels.map(({ id, name, removable }) => (
            <ListGroup.Item
              key={id}
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
                    onClick={() => setModal({ type: 'renaming', channelId: id })}
                  >
                    Rename
                  </Dropdown.Item>
                  {removable && (
                    <>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        eventKey="2"
                        onClick={() => setModal({ type: 'removing', channelId: id })}
                      >
                        Remove
                      </Dropdown.Item>
                    </>
                  )}
                </SplitButton>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
    </>
  );
}

export default ChatSidebar;
