import React from 'react';

function Message(props) {
    return (
        <div  className='message'>
            <div className='message-username'>{props.msg.senderId}</div>
            <div className='message-text'>{props.msg.text}</div>
        </div>

    )
}
export default Message;