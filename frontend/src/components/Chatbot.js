

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Widget, addResponseMessage, deleteMessages } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import avatar from '../assets/chatbot-avatar.png';
import { useUser } from '../pages/UserContext'; // Import UserContext for logout handling
import API from '../api';

const Chatbot = () => {
  const { isLoggedIn } = useUser(); // Check if the user is logged in
  const [isFirstMessage, setIsFirstMessage] = useState(true);

  // Function to handle new user messages
  const handleNewUserMessage = (message) => {
    // console.log(`New message incoming: ${message}`);
    // Send the message to the backend
    // axios
    //   .get('http://localhost:5000/get', 
      API
      .get('/get', {
        params: { msg: message },
        withCredentials: true, // Ensure cookies (sessions) are included
      })
      .then((response) => {
        const botMessage = response.data;
        console.log("Bot response: ", botMessage);
        renderBotResponse(botMessage);
      })
      .catch((error) => {
        console.error('Error getting response from the bot:', error);
        addResponseMessage('Sorry, something went wrong.');
      });
  };

  // Function to render bot responses with HTML
  const renderBotResponse = (message) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = message;
    const cleanMessage = tempDiv.innerText || message;
    addResponseMessage(cleanMessage);
  };

  // Clear messages when the user logs out or when the page reloads
  useEffect(() => {
    if (!isLoggedIn) {
      console.log('User logged out. Clearing chat messages...');
      deleteMessages(); // Clear the chat messages on logout
      setIsFirstMessage(true); // Reset the first message state for the next user
    }
  }, [isLoggedIn]); // Runs every time `isLoggedIn` changes

  // Render initial bot messages when the user is logged in
  useEffect(() => {
    if (isFirstMessage && isLoggedIn) {
      console.log('Setting initial messages for logged-in user...');
      addResponseMessage("Hello, my name is RoboDoc, and I will be happy to help diagnose your disease.");
      addResponseMessage("To start, we need to ask some basic questions. Type 'OK' to continue.");
      setIsFirstMessage(false);
    }
  }, [isFirstMessage, isLoggedIn]); // Run when `isFirstMessage` or `isLoggedIn` changes

  return (
    <div className="chat-container">
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={avatar}
        title="AI Healthcare Assistant"
        subtitle="How can I help you today?"
      />
    </div>
  );
};

export default Chatbot;








