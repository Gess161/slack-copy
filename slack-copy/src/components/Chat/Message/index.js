const Message = (props) => {
    return (
        <div className="msg-container" key={props.key}>
            <img alt='userPicture' />
            <div>
                <h2>Username</h2>
                <p>{props.message}</p>
            </div>
        </div>
    );
};

export default Message;