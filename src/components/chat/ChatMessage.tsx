import React from 'react';
import './ChatMessage.scss';
import { Avatar } from '@mui/material';
import { Timestamp } from 'firebase/firestore';

type Props = {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo?: string;
    email: string;
    displayName?: string; 
  } | null;
};

const ChatMessage = ({ message, timestamp, user }: Props) => {
  const displayName = user?.displayName || 'Unknown User';
  const photoUrl = user?.photo || '/default-icon.png';

  return (
    <div className='message'>
      <Avatar src={photoUrl} />
      <div className='messageInfo'>
        <h4>
          {displayName}
          <span className='messageTimestamp'>
            {timestamp ? new Date(timestamp.toDate()).toLocaleString() : ''}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
