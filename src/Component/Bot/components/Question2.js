import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';

const Question2 = (props) => { // add props here
    const { setState } = props;

  // This function will be called when the button is clicked
  const handleClick = () => {
    const message = createChatBotMessage("This platform enables real-time secure results for elections and polls and The system should verify the identity and eligibility of the voters and candidate, and prevent unauthorized or duplicate voting.");
    setState((state) => ({ ...state, messages: [...state.messages, message], buttonClicked: true }));
  };

  return (
    <button onClick={handleClick}  style={{
        width: "100%",
        borderColor: "#4F46E5",
        backgroundColor: "#5C6BC0", // Add background color
        color: "white", // Text color
        borderRadius: "5px", // Border radius
        cursor: "pointer", // Cursor on hover
        margin: "5px 0", // Margin
        padding: "10px 10px", // Padding
        border: "none", // No border
      }}>
      What kinds of services are provided? 
    </button>
  );
};


export default Question2;
