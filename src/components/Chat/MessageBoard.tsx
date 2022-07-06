import { Box, Flex } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import Moment from 'react-moment';
import AvatarIcon from './AvatarIcon';

export enum MsgOrigin {
  'ME' = 'me',
  'THEY' = 'they',
}

export interface IMessage {
  origin: string;
  content: string;
  createdAt: Date;
  orientation?: string;
}

const Message: FC<IMessage> = ({ origin, content, createdAt, orientation = 'row' }) => (
  <Flex direction='row' justify={orientation} align='center'>
    <AvatarIcon name={origin} />
    <Box flexDirection='row' p={2}>
      <Text fontSize={14} pb={2}>
        {content}
      </Text>
      <Text fontSize={10}>
        <Moment format='h:mm a'>{createdAt}</Moment>
      </Text>
    </Box>
  </Flex>
);

interface MessageBoardProps {
  messages: IMessage[];
}

const MessageBoard: FC<MessageBoardProps> = ({ messages }) => {
  const messageArray = messages.map((msg) => (
    <Message origin={msg.origin} content={msg.content} createdAt={msg.createdAt} orientation={msg.orientation} />
  ));

  return (
    <Flex direction='column-reverse' overflowY='scroll' p={5} height='95vh'>
      {messageArray.reverse()}
    </Flex>
  );
};

export default MessageBoard;
