import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit-client';
import MessageList from './components/MessageList';
import SendMessageForm from '../src/components/SendMessageForm';
import NewRoomForm from './components/NewRoomForm';
import RoomList from '../src/components/RoomList';

import { tokenUrl, instanceLocator } from './config'

class App extends React.Component {
    
    constructor() {
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
        this.createRoom = this.createRoom.bind(this)
    } 
    
    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: 'perborgen',
            tokenProvider: new Chatkit.TokenProvider({
                url: tokenUrl
            })
        })
        
        chatManager.connect()
        .then(currentUser => {
            this.currentUser = currentUser
            this.getRooms()
        })
        .catch(err => console.log('error on connecting: ', err))
    }
    
    // method to get available rooms
    getRooms() {

        //  accessing joinable rooms in from roomlist
        this.currentUser.getJoinableRooms()
        .then(joinableRooms => {
            this.setState({
                joinableRooms,
                joinedRooms: this.currentUser.rooms
            })
        })
        .catch(err => console.log('error on joinableRooms: ', err))
    }
    
    // method to subscribe to rooms
    subscribeToRoom(roomId) {

        // cleaning up state before subscribing to a room
        this.setState({ messages: [] })
        this.currentUser.subscribeToRoom({
            roomId: roomId,
            hooks: {

                // event listener for new messages
                onNewMessage: message => {
                    this.setState({

                      //  "..." spread operator expanding message array to fit in new array
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
    sendMessage(text) {
        this.currentUser.sendMessage({
            text,
            roomId: this.state.roomId
        })
    }
    
    // function to create new chatroom
    createRoom(name) {
        this.currentUser.createRoom({
            name
        })
        .then(room => this.subscribeToRoom(room.id))
        .catch(err => console.log('error with createRoom: ', err))
    }
    
    render() {
        return (
            <div className="app">
                <RoomList
                    subscribeToRoom={this.subscribeToRoom}
                    rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                    roomId={this.state.roomId} />
                <MessageList 
                    roomId={this.state.roomId}
                    messages={this.state.messages} />
                <SendMessageForm
                    disabled={!this.state.roomId}
                    sendMessage={this.sendMessage} />
                <NewRoomForm createRoom={this.createRoom} />
            </div>
        );
    }
}

export default App