import { useEffect, useState } from 'react';
import { collection, CollectionReference, DocumentData, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAppSelector } from '../app/hooks';

export interface Message {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;    
  } | null;
}

const useSubCollection = (collectionName: string, subCollectionName: string) => {
  const channelId = useAppSelector((state) => state.channel.channelId);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!channelId) return;

    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      collectionName,
      String(channelId),
      subCollectionName
    );

    const collectionQuery = query(collectionRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(collectionQuery, (snapshot) => {
      const results: Message[] = snapshot.docs.map(doc => ({
        timestamp: doc.data().timestamp,
        message: doc.data().message,
        user: doc.data().user || null,
      }));
      setMessages(results);
    });

    return () => unsubscribe();
  }, [channelId]);

  return messages;
};

export default useSubCollection;
