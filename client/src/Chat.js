/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import './Chat.css'

function Chat({socket,username,room}){
    const [currentMessage,setCurrentMessage] = useState("");
    const [messageList,setMessageList] = useState([]);
    const sendMessage = async (event)=>{
        
        if(currentMessage !== ""){
            var minutes = String(new Date(Date.now()).getMinutes());
            if([...minutes].length === 1){
                minutes = "0"+minutes;
            }
            const messageData = {
                id:socket.id,
                room:room,
                author:username,
                message:currentMessage,
                alignment:"right",
                time:new Date(Date.now()).getHours() + ":"+ minutes
            };
            await socket.emit('send_message',messageData);
            setMessageList((list)=>[...list,messageData]);
            setCurrentMessage("");
        }
    }

    useEffect(()=>{
        socket.on("receive_message",async (message)=>{
            var minutes = String(new Date(Date.now()).getMinutes());
            if([...minutes].length === 1){
                minutes = "0"+minutes;
            }
            const receivedMessage = {
                id:socket.id,
                room:message.room,
                author:message.author,
                message:message.message,
                alignment:"left",
                time:new Date(Date.now()).getHours() + ":"+ minutes
            }
            console.log("1");
            setMessageList((list)=>[...list,receivedMessage]);

        })
    },[socket]);
    return (
        <div className="chat-page">
            <div className='navbar'>
                {/* <img width="60" height="60" src="https://img.icons8.com/arcade/100/chat.png" alt="chat"/> */}
                <div  className='chat-heading'>
                    <h1>iChat</h1>
                </div>
                
            </div>
            
            <div className='chat-container'>
                <ScrollToBottom className='message-container'>
                {
                messageList.map((messageContent,index)=>{
                    return (
                        <div key = {index} id={messageContent.alignment} className='messageContainer'>
                            <div className='message-box'>
                                <p className='message' >{messageContent.message}</p>
                                <div className='message-meta'>
                                    <p className='username'>{messageContent.author}</p>
                                    <p className='time'>{messageContent.time}</p>
                                </div>
                            </div>
                        </div>
                        
                    )
                }
                    
                )}
                </ScrollToBottom>
            </div>
            <div className='send-container'>
                <div className="sendForm" >

                <input value = {currentMessage} type='text' placeholder='Type something...' name='msgInp' className='message-input' onChange={(event)=>{
                    setCurrentMessage(event.target.value)
                }}
                onKeyDown={(event)=>{if(event.key ==="Enter"){sendMessage();} return;}}/>
                <button className='send-button' onClick={sendMessage}>
                    <img width="80%" height="80%" src="https://img.icons8.com/color/48/sent--v1.png" alt="send-logo"/>
                </button>
                </div>
            </div>
    </div>
    )
}
export default Chat

