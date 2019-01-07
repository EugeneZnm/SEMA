import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
class MessageList extends React.Component {

    // preventing auto scroll to bottom if screen height of current position on screen is less than total scroll height
    componentWillUpdate(){
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight
    }

    // enabling auto scrolling
    componentDidUpdate(){
        if(this.shouldScrollToBottom){
            const node =ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight
        }
    }
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