import React from 'react';
import Message from './Message';
class MessageList extends React.Component {
    render() {
        return (
            <div className="message-list">
                {this.props.messages.map((message, index)=> {
                    return (
                        /* looping through messages */
                        <div>
                            <Message key={index} username={message.senderId} text={message.text}/>
                            
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default MessageList;