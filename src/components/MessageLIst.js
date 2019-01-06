import React from 'react';

//  objects simulating data from chatkit
const DUMMY_DATA = [
    {
        senderId: 'Virgil',
        text: 'Hey, how is it going?'
    },

    {
        senderId: 'Homer',
        text: 'Great! How about you?'
    },

    {
        senderId: 'Virgil',
        text: 'Good to hear from you!'
    }
]

class MessageList extends React.Component {
    render() {
        return (
            <div className="message-list">
                {DUMMY_DATA.map((message, index)=> {
                    return (
                        <div key={index} className="message-list">
                            <div>{message.senderId}</div>
                            <div>{message.text}</div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default MessageList;