import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit-client';
import MessageList from '../src/components/MessageLIst';
import SendMessageForm from '../src/components/SendMessageForm';
import NewsRoomForm from '../src/components/NewsRoomForm';
import RoomList from '../src/components/RoomList';
import { tokenUrl, instanceLocator} from './config';
import './App.css';

class App extends Component {

  constructor(){
    super()
    this.state = {
      // storing messages in state
      messages: []
    }

    this.sendMessage = this.sendMessage.bind(this)
  }
  
  componentDidMount(){
    const chatManager = new Chatkit.ChatManager({
       instanceLocator, 
       userId: 'Eugene',
       tokenProvider: new Chatkit.TokenProvider({
         url: tokenUrl
       })
    })

    chatManager.connect().then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: 25025149,
        hooks: {

          // event listener for new messages
          onNewMessage:message => {
             this.setState ({
              //  ... expands message array to fit in new array
               messages: [...this.state.messages, message]
             })
          }
        }
      })
    })
  }

  // access to current user object and calling the sendmessage method to send data to chatkit
  sendMessage(text){
    this.currentUser.sendMessage({
      text,
      roomId: 25025149 
    })
  }
  render() {
    return (
      <div className="App">
        <RoomList/>
        <MessageList messages={this.state.messages}/>
        <SendMessageForm sendMessage={this.sendMessage}/>
        <NewsRoomForm/>
      </div>
    );
  }
}

export default App;
