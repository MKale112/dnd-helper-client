import React, { FC } from 'react';

// interface MessageProps {}

const Message: FC = () => {
  console.log('msg');
  return <div>Message</div>;
};

// interface MessageBoardProps {}

const MessageBoard: FC = () => {
  console.log('first');
  return <div>MessageBoard</div>;
};

export default MessageBoard;
