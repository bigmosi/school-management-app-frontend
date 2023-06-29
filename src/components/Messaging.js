import React, { useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const Messaging = ({ firebaseConfig }) => {
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  // Create Firestore reference
  const firestore = firebase.firestore();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Get messages collection
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [loadedMessages] = useCollectionData(query, { idField: 'id' });

  useEffect(() => {
    if (loadedMessages) {
      setMessages(loadedMessages);
    }
  }, [loadedMessages]);

  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      // Add new message to Firestore
      await messagesRef.add({
        text: newMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      // Clear input field
      setNewMessage('');
    }
  };

  return (
    <div>
      <h2>Messaging</h2>
      <div>
        {messages &&
          messages.map((message) => (
            <div key={message.id}>
              <p>{message.text}</p>
            </div>
          ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Messaging;
