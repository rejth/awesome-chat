import React from 'react';
import { Tab, Row } from 'react-bootstrap';

import ChatBody from './components/Body';
import ChatSidebar from './components/Sidebar';
import useChatData from '../../hooks/useChatData';

function Chat() {
  const { isLoading, isError } = useChatData();

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error</span>;

  return (
    <Tab.Container
      id="chat-channels-wrapper"
      defaultActiveKey="#link1"
    >
      <Row>
        <ChatSidebar />
        <ChatBody />
      </Row>
    </Tab.Container>
  );
}

export default Chat;
