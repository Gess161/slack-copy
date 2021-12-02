import React from "react";
import Message from "../Message";

const MessageContainer = (props) => {
    const { messages } = props;

    return (
        <div className="chat-field">
            {messages.map((message, index) => {
                return (
                    <Message key={index} index={index} message={message} />
                );
            })}
        </div>
    );
};

export default MessageContainer;