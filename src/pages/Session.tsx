import { Box, Flex, SimpleGrid } from '@chakra-ui/layout';
import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { io, Socket } from 'socket.io-client';
import InputLine from '../components/Chat/InputLine';
import MessageBoard, { IMessage } from '../components/Chat/MessageBoard';
import PlayerCharacters from '../components/Chat/PlayerCharacters';
import { useAppSelector } from '../state/hooks';
import { ICharacter } from '../types/character';

const Session: FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [characterData, setCharacterData] = useState([] as ICharacter[]);
  const [isLoadingChars, setIsLoadingChars] = useState(false);

  const { id } = useParams<{ id: string }>();
  const { user } = useAppSelector((state) => state.auth);

  const fetchCharacters = async (): Promise<void> => {
    try {
      setIsLoadingChars(true);
      const response = await axios.get(`/api/session/${id}`);
      const characters = response.data as ICharacter[];
      setCharacterData(characters);
      console.log('session chars: ', characters);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingChars(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');

    newSocket.on('received_message', (msg) => {
      console.log('msg:', msg);
      console.log('messages:', messages);
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    newSocket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [setSocket]);

  const sendMessage = (message: string): void => {
    console.log('sending msg');
    const messageObj = {
      origin: user.name,
      content: message,
      createdAt: new Date(),
      orientation: 'row-reverse',
    };
    setMessages((prevMessages) => [...prevMessages, messageObj]);
    socket?.emit('chatMessage', messageObj);
  };

  return (
    <SimpleGrid height='full' columns={2} spacing={5}>
      <Flex flexDirection='column' justifyContent='space-between'>
        <MessageBoard messages={messages} />
        <InputLine sendMessage={sendMessage} />
      </Flex>
      {characterData && <PlayerCharacters characterData={characterData} />}
    </SimpleGrid>
  );
};

export default Session;
