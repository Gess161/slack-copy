import { chatUser, phone, info, settings, chatSearch, at, star, overflow } from "../../../stylesheets/icons/icons"
import React, { useState } from "react";
import OverflowModal from "./OverflowModal/index"
const ChatHeader = ({ roomName, userList }) => {
    const [active, setActive] = useState(false)
    const handleModal = () => {
        setActive(!active)
    }
    return (
        <div className="chat-header">
            <div className="chat-header-left">
                <div className="chat-header-left-text">#{roomName}</div>
                <div className="status">
                    <img alt="icon" className="status-icon" src={chatUser} />
                    <div className="status-users">{userList.length}</div>
                </div>
            </div>
            <div className="chat-header-right">
                <div className="buttons-left">
                    <img src={phone} alt="icon" className="buttons-icon" />
                    <img src={info} alt="icon" className="buttons-icon" />
                    <img src={settings} alt="icon" className="buttons-icon" />
                </div>
                <div className="chat-search">
                    <img alt="icon" src={chatSearch} className="buttons-icon buttons-icon-search" />
                    <input placeholder="Search" className="chat-search-input" />
                </div>
                <div className="buttons-right">
                    <img src={at} alt="icon" className="buttons-icon" />
                    <img src={star} alt="icon" className="buttons-icon" />
                    <img src={overflow} alt="icon" className="buttons-icon" onClick={handleModal} />
                    <OverflowModal display={active} handleModal={handleModal} />
                </div>
            </div>
        </div>
    );
};

export default ChatHeader