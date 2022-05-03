import React from 'react';
import { Tab, Row } from 'react-bootstrap';

import ErrorIndicator from '../ErrorIndicator';
import Spinner from '../Spinner';
import ChatBody from './components/Body';
import ChatSidebar from './components/Sidebar';
import useChatData from '../../hooks/useChatData';

import './styles/index.scss';

function Chat() {
  const { data, isLoading, isError } = useChatData();

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorIndicator />;

  return (
    <Tab.Container
      id="chat-channels-wrapper"
      defaultActiveKey={`#${data?.currentChannelId}`}
    >
      <Row>
        <ChatSidebar />
        <ChatBody />
      </Row>
    </Tab.Container>
  );
}

export default Chat;
