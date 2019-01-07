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

      roomId: null,

      // storing messages in state
      messages: [],

      // initialising joined and joinable rooms
      joinableRooms: [],
      joinedRooms: []
    }

    this.sendMessage = this.sendMessage.bind(this)
    this.subscribeToRoom = this.subscribeToRoom.bind(this)
    this.getRooms = this.getRooms.bind(this)
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
      this.currentUser = currentUser
      this.getRooms()

    })
    .catch(err => console.log('err on joinablerooms:', err))

  }

  // method to get available rooms
  getRooms(){
    //  accessing joinable rooms in from roomlist
    this.currentUser.getJoinableRooms().then(joinableRooms => {
      this.setState({
        joinableRooms, // rooms that user hasn't joined
        joinedRooms: this.currentUser.rooms

      })
    })

    .catch(err => console.log('err on joinablerooms:', err))
  }

  // method to subscribe to rooms
  subscribeToRoom(roomId){ 

    // cleaning up state before subscribing to a room
    this.setState({messages: []})
    this.currentUser.subscribeToRoom({
      roomId: roomId ,
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

    // call back function  updating state when one room switches arrays from joinable to joined
    .then(room => {
      this.setState({
        roomId: room.id
      })
      this.getRooms()
    })
    .catch(err => console.log('error on subscribing to room: ', err))
  }

  // access to current user object and calling the sendmessage method to send data to chatkit
  sendMessage(text){
    this.currentUser.sendMessage({
      text,
      roomId: this.state.roomId 
    })
  }
  render() {
    return (
      <div className="App">
        <RoomList 
          subscribeToRooms={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}/>
        <MessageList messages={this.state.messages}/>
        <SendMessageForm sendMessage={this.sendMessage}/>
        <NewsRoomForm/>
      </div>
    );
  }
}

export default App;
