import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit-client';
import MessageList from '../src/components/MessageLIst';
import SendMessageForm from '../src/components/SendMessageForm';
import NewsRoomForm from '../src/components/NewsRoomForm';
import RoomList from '../src/components/RoomList';
import { tokenUlr, instanceLocator } from './config';
import './App.css';

class App extends Component {
  
  componentDidMount(){
    const chatManager = new Chatkit.ChatManager({
       instanceLocator, 
       userId: 'Eugene',
       tokenProvider: new Chatkit.TokenProvider({
         url: tokenUlr
       })
    })

    chatManager.connect().then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: 25025149,
        hooks: {
          onNewMessage:message => {
             console.log('message.text ', message.text);
          }
        }
      })
    })
  }
  render() {
    return (
      <div className="App">
        <RoomList/>
        <MessageList/>
        <SendMessageForm/>
        <NewsRoomForm/>
      </div>
    );
  }
}

export default App;
