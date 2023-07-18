/* eslint-disable no-unused-vars */
import io from 'socket.io-client';
import {useState} from "react";
import './App.css';
import Chat from './Chat.js'
const socket = io.connect("http://localhost:3001");

function App() {
  const [username,setUsername] = useState("");
  const [room,setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);
  
  const joinRoom = ()=>{
    if(username !=="" && room !== ""){
        setShowChat(true);
        const userdetails = {
          room:room,
          username:username
        }
        socket.emit('join_room',userdetails);
    }
  }
 return (
    <>{!showChat &&
      <div className='App'>
        <div className='login-container'>
          <p className = "main-heading">Join A Chat</p>
          <input type="text" className='input' placeholder='Enter Your Name...' onChange={(event) => {
            setUsername(event.target.value);
          } } onKeyDown={(event)=>(event.key ==="Enter" && joinRoom())}/>
          <input type="text" className='input' placeholder='Enter Room ID...' onChange={(event) => {
            setRoom(event.target.value);
          } } onKeyDown={(event)=>(event.key ==="Enter" && joinRoom())}/>
          <button type="button" className="join-button" onClick={joinRoom} >Join</button>
        </div>
        
      </div>}
      {showChat && <Chat socket ={socket} username={username} room={room} />}
   </>
  );
}
export default App;
