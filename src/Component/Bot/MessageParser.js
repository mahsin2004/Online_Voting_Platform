import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.toLowerCase().includes("hello")) {
      actions.handleHello();
    }
    else if(message.toLowerCase().includes("hi")) {
      actions.handleHi();
    }
    else if(message.includes("")) {
      actions.handleNull();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        });
      })}
    </div>
  );
};

export default MessageParser;
