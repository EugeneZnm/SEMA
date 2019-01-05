import React, { Component } from 'react';
import MessageList from '../components/messagelist';
import SendMessageForm from '../components/sendmessageform';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(){
    super()
    this.state = {
      messages: DUMMY_DATA
    }
  }
  render() {
    return (
      <div className="App">
        <Title/>
        <MessageList messages={this.state.messages}/>
        <SendMessageForm/>
      </div>
    );
  }
}

export default App;
