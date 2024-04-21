"use client";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../Config";
import MessageParser from "../MessageParser";
import ActionProvider from "../ActionProvider";
import "../Bot.css";

const Chat = () => {

  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem('chat_messages'));
    return messages;
  };

  return (
    <div className="drop-shadow-lg">
      <div className="App">
        <Chatbot
          headerText="FAQ Chatbot"
          placeholderText="Ask Your Question"
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
          messageHistory={loadMessages()}
          saveMessages={saveMessages}
          runInitialMessagesWithHistory
        />
      </div>
    </div>
  );
};

export default Chat;
