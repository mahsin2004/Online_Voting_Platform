import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello! Nice to meet you.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleHi = () => {
    const botMessage = createChatBotMessage('Hi! Nice to meet you.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleNull = () => {
    const botMessage = createChatBotMessage('Ask Valid questions.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };



  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleHi,
            handleNull,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;