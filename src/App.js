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
  render() {
    return (
      <div className="App">
        <RoomList/>
        <MessageList messages={this.state.messages}/>
        <SendMessageForm/>
        <NewsRoomForm/>
      </div>
    );
  }
}

export default App;
