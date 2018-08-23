
import React from 'react'
import Chatkit from '@pusher/chatkit';
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'
import { tokenUrl, instanceLocator } from './config'

//import './index.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    }
  }

  // After Loading Render function  
  componentDidMount() {
    // Preparation to connect
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: "user2",
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })

    chatManager.connect()
      .then(currentUser => {
        this.currentUser = currentUser
        this.getRooms()
      })
  }

  getRooms() {
    this.currentUser.getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        })
      })
  }

  subscribeToRoom = (roomId) => {
    this.setState({ messages: [] })
    this.currentUser.subscribeToRoom({
      roomId: roomId,
      hooks: {
        onNewMessage: message => {
          this.setState({
            messages: [...this.state.messages, message]
          })
        }
      }
    }).then(room => {
      this.setState({
        roomId: room.id
      })
      this.getRooms()
    })
  }


  sendMessage = (text) => {
    this.currentUser.sendMessage({
      text: text,
      roomId: this.state.roomId
    })
  }
  createRoom = (name) => {
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
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
        />

        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages}
        />

        <SendMessageForm
          disabled={!this.state.roomId}
          sendMessage={this.sendMessage} />
        <NewRoomForm createRoom={this.createRoom} />
      </div>
    );
  }
}

export default App