import React from 'react';
import { Tab, Row } from 'react-bootstrap';

import ChatBody from './components/Body';
import ChatSidebar from './components/Sidebar';
import useChatData from '../../hooks/useChatData';

import './styles/index.scss';

function Chat() {
  const { data, isLoading, isError } = useChatData();

  // TODO: инициализировать сокет здесь, а не в App
  // TODO: продумать кейс с отключением интернета

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error</span>;

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
