import React from 'react';

function Message (props){
        return(
            <div className="message">
                <div className="message-username">{props.username}</div>
                <div className="message-username">{props.text}</div>          
            </div>
        )
    }

export default Message; 