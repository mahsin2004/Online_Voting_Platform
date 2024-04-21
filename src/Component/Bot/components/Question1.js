import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

const Question1 = (props) => {
  const { setState } = props;

  // This function will be called when the button is clicked
  const handleClick = () => {
    const message = createChatBotMessage(
      "An online voting system is a software platform that allows groups to securely conduct votes and elections"
    );
    setState((state) => ({
      ...state,
      messages: [...state.messages, message],
      buttonClicked: true,
    }));
  };

  return (
    <button
      onClick={handleClick}
      style={{
        width: "100%",
        borderColor: "#4F46E5",
        backgroundColor: "#5C6BC0", // Add background color
        color: "white", // Text color
        borderRadius: "5px", // Border radius
        cursor: "pointer", // Cursor on hover
        margin: "5px 0", // Margin
        padding: "10px 10px", // Padding
        border: "none", // No border
      }}
    >
      What is the purpose of the DVS platform?
    </button>
  );
};

export default Question1;
