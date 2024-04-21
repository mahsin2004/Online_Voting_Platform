import { createChatBotMessage } from "react-chatbot-kit";
import Question1 from "./components/Question1";
import Question2 from "./components/Question2";
const botName = "FAQ Chatbot";

const CombinedWidget = (props) => (
  <div>
    <Question1 {...props} />
    <Question2 {...props} />
  </div>
);

const config = {
  botName: botName,
  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName}`),
    createChatBotMessage(
      "I'm available to assist you by answering FAQs and engaging in basic conversation to help you with your needs.",
      {
        withAvatar: true,
        delay: 1000,
      }
    ),
    createChatBotMessage(
      "Here are some common questions:",
      {
        withAvatar: true,
        delay: 2500,
        widget: 'CombinedWidget',
      }
    ),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#5C6BC0",
    },
    chatButton: {
      backgroundColor: "#5C6BC0",
    },
  },

  state: {
    gist: "",
    infoBox: "",
  },

  widgets: [
    {
      widgetName: "Question1",
      widgetFunc: (props) => <Question1 {...props} />,
      mapStateToProps: ["gist"],
    },
    {
      widgetName: "Question2",
      widgetFunc: (props) => <Question2 {...props} />,
      mapStateToProps: ["infoBox"],
    },
    {
      widgetName: "CombinedWidget",
      widgetFunc: (props) => <CombinedWidget {...props} />,
    },
  ],
};

export default config;
