import '../App.css';
import send from "../assets/send.png"
import {useState} from "react";

/**
 * A message bubble within the messaging window.
 * @param message A string of the message.
 * @param isSender A boolean indicating whether the current user sent the message or not.
 * @returns {JSX.Element}
 */
function Message({message, isSender}) {
    return (<div className={`message message-${isSender ? "sender" : "recipient"}`}>
        <p>{message}</p>
    </div>)
}

/**
 * The element containing the collection of message bubbles.
 * @param messages A collection of messages (dictionary with keys "body" and "isSender")
 * @returns {*} JSX elements to be displayed.
 */
function MessageBubbles({messages}) {
    let messageId=0
    let res = messages.map( (m) => {
        return <Message message={m.body} isSender={m.isSender} key={messageId++}/>
    })
    return res
}

/**
 * The message window component responsible for handling the message input.
 * @returns {JSX.Element}
 * @constructor
 */
export default function MessageWindow() {
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        // TODO: For demonstration purposes, add both isSender:true and false to show both sides
        // of the conversation. Remove when hooking up to the backend.
        setMessages(
            [...messages, {
                body: document.getElementById("messageInput").value,
                isSender: false
            },{
                body: document.getElementById("messageInput").value,
                isSender: true
            }]
        );
        // Reset the input element to empty.
        document.getElementById("messageInput").value="";
    }

    const respondKeyDown = (e) => {
        if (e.key === "Enter") sendMessage();
    }

    return (
        <div className="messageWindow">
            <MessageBubbles messages={messages}/>
            <div className="messageInputTray">
                <input id="messageInput" type="text" className="messageInput" onKeyDown={respondKeyDown}/>
                <button className="sendButton" onClick={sendMessage}>
                    <img src={send} alt="send-plane" className="sendButtonImage"/>
                </button>
            </div>
        </div>
    );
}