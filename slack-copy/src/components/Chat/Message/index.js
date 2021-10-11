import { profilePicture } from "../../../stylesheets/icons/icons";

const Message = ({message}) => {
    console.log(message)
    // const time = message.createdAt.slice(11, 16)
    return (
        <div className="message-container" >
            <img alt='userPicture' src={profilePicture} />
            <div className="message">
                <h2 className="username">{message.senderName}<span>04:20</span></h2>
                <p className="message-text" >{message.message}</p>
            </div>
        </div>
    );
};

export default Message;