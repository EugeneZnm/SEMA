import React, { Component } from 'react';
import MessageList from '../src/components/MessageLIst';
import SendMessageForm from '../src/components/SendMessageForm';
import NewsRoomForm from '../src/components/NewsRoomForm';
import RoomList from '../src/components/RoomList';
import './App.css';

class App extends Component {
  
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
