import { profilePicture } from "../../../stylesheets/icons/icons";

const Message = ({key, message}) => {
    return (
        <div className="message-container" key={key}>
            <img alt='userPicture' src={profilePicture} />
            <div className="message">
                <h2 className="username">{message.senderName}</h2>
                <p className="message-text">{message.message}</p>
            </div>
        </div>
    );
};

export default Message;