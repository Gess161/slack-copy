import { profilePicture } from "../../../stylesheets/icons/icons";

const Message = (props) => {
    return (
        <div className="message-container" key={props.key}>
            <img alt='userPicture' src={profilePicture}/>
            <div className="message">
                <h2 className="username">Username</h2>
                <p className="message-text">{props.message}</p>
            </div>
        </div>
    );
};

export default Message;