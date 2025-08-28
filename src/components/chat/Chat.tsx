import React, { useState, useRef, useEffect } from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import GifIcon from '@mui/icons-material/Gif';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ChatMessage from './ChatMessage';
import { useAppSelector } from '../../app/hooks';
import { addDoc, collection, CollectionReference, DocumentData, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import useSubCollection, { Message } from '../../hooks/useSubCollection';

const Chat = () => {
  const [inputText, setInputText] = useState<string>('');
  const ChannelName = useAppSelector((state) => state.channel.channelName);
  const channelId = useAppSelector((state) => state.channel.channelId);
  const user = useAppSelector((state) => state.user.user);

  const messages: Message[] = useSubCollection('channels', 'messages');

  // 自動スクロール用 ref
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom(); // messages が更新されたら下にスクロール
  }, [messages]);

  const sendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!inputText || !channelId) return;

    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      'channels',
      String(channelId),
      'messages'
    );

    await addDoc(collectionRef, {
      message: inputText,
      timestamp: serverTimestamp(),
      user: user || null,
    });

    setInputText(""); // 送信後に入力クリア
    scrollToBottom(); // 念のため送信直後にもスクロール
  };

  return (
    <div className='chat'>
      {/* chatHeader */}
      <ChatHeader channelName={ChannelName} />

      {/* chatMessage */}
      <div className='chatMessage'>
        {messages.map((msg, index) => (
          <ChatMessage 
            key={index}
            message={msg.message}
            timestamp={msg.timestamp}
            user={msg.user}
          />
        ))}
        {/* 最後のダミー div に ref を付与 */}
        <div ref={messagesEndRef} />
      </div>

      {/* chatInput */}
      <div className='chatInput'>
        <AddCircleOutlineIcon />
        <form>
          <input 
            type="text" 
            placeholder={`#${ChannelName} へメッセージを送信`} 
            value={inputText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
          />
          <button 
            type='submit' 
            className='chatInputbutton'
            onClick={sendMessage}
          >
            送信
          </button>
        </form>

        <div className='chatinputIcons'>
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  );
};

export default Chat;
