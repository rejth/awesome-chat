import React from 'react';
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
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.chatReducer.data.channels);
  const { socket } = useChatService();

  const [modal, setModal] = React.useState({ type: '', channelId: null });

  React.useEffect(() => {
    socket.on('newChannel', (newChannel) => {
      dispatch(addChannel(newChannel));
    });
    socket.on('removeChannel', ({ id }) => {
      dispatch(removeChannel(id));
    });
    socket.on('renameChannel', (channel) => {
      dispatch(renameChannel(channel));
    });
  }, [dispatch, socket]);

  const Modal = showModal(modal.type);

  return (
    <>
      {modal.type && (
      <Modal
        channelId={modal.channelId}
        socket={socket}
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
            onClick={() => {}}
          >
            <FontAwesomeIcon
              icon={faPlus}
              onClick={() => setModal({ type: 'adding', channelId: null })}
            />
          </button>
        </div>

        <ListGroup>
          {channels.map(({ id, name }) => (
            <ListGroup.Item
              key={id}
              action
              href={`#link${id}`}
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
                  <Dropdown.Divider />
                  <Dropdown.Item
                    eventKey="2"
                    onClick={() => setModal({ type: 'removing', channelId: id })}
                  >
                    Remove
                  </Dropdown.Item>
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
