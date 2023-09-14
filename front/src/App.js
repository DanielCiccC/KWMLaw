import React from 'react';
import './App.css';
import { ChatBubbleIcon, DotsHorizontalIcon, FontSizeIcon, HamburgerMenuIcon, LightningBoltIcon, PaperPlaneIcon } from '@radix-ui/react-icons';

function Sidebar() {
  const [sessions, setSessions] = React.useState([
    "Vicarious Trauma Assessment",
    "Understanding Vicarious Trauma",
    "Identifying Vicarious Trauma",
    "Trauma Risk Check",
    "Assessing Vicarious Stress",
    "Vicarious Trauma Signs",
    "Trauma Risk Factors",
    "Detecting Vicarious Pain",
    "Vicarious Impact",
    "Trauma Evaluation",
    "Spotting Vicarious Stress",
    "Trauma Risk Quiz",
    "Vicarious Trauma Test",
    "Assessing Trauma Effects",
    "Vicarious Trauma Check",
    "Trauma Evaluation Talk",
    "Detecting Vicarious Pain",
    "Vicarious Impact Q&A",
    "Trauma Risk Discussion",
    "Vicarious Stress Probe",
  ]);

  const pastChats = sessions.map((session, index) => {
    const maxMsgLen = 20;
    return (
      <div key={index} className='session'>
        <div className='session-icon'><ChatBubbleIcon/></div>
        <div className='session-name'>{session.substring(0,maxMsgLen) + (session.length > maxMsgLen ? "..." : "")}</div>
      </div>
    )
  });

  return (
    <div className='sidebar'>
      <div className='top'>
        <div className='sidebarTopTray'>
          <HamburgerMenuIcon className='hamburgerIcon'/>
        </div>
        <div className='prevMessages'>{pastChats}</div>
      </div>
      <div className='userInfo'>
        <div className='userIcon'>PD</div>
        <div className='userName'>Patricia Daisy</div>
        <DotsHorizontalIcon className='dotsIcon'/>
      </div>
    </div>
  )
}

function Message({message, isSender}) {
  return (
    <div className={`message-container ${isSender ? "sender" : "recipient"}`}>
      <div className='message-icon-container'>
        {isSender ? <span className='message-icon'>PD</span> : <LightningBoltIcon className='message-icon'/>}
      </div>
      <div className='message-body'>
        <p>{message}</p>
      </div>
    </div>
  )
}

function Main() {
  const [messages, setMessages] = React.useState([
    {body: "Have you recently experienced or witnessed a highly distressing or life-threatening event, such as a natural disaster, accident, assault, or military combat?", isSender: false},
    {body: "No, I haven't recently experienced or witnessed a highly distressing or life-threatening event.", isSender: true},
    {body: "Are you frequently reliving or experiencing intrusive thoughts, memories, or nightmares related to a traumatic event?", isSender: false},
  ]);

  const messageElements = messages.map((message, index) => {
    return (
      <Message key={index} message={message.body} isSender={message.isSender}/>
    )
  });

  const handleInput = (e) => {
    console.log(e.target)
    setMessages([...messages, {body: document.getElementById('msg_input').value, isSender: true}]);
    e.target.value = '';
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleInput(e);
    }
  }

  return (
    <div className='main'>
        <div className='chatMessages'>
          {messageElements}
        </div>

        <div className='chatInput'>
          <input className='chatInputField' id='msg_input' type='text' placeholder='Type a message...' onKeyDown={handleKeyDown}/>
          <PaperPlaneIcon className="chatInputButton" onClick={handleInput}/>
        </div>
    </div>
  )
}

function App() {

  return (
    <div className="App">
      <div className="title">Lex</div>
      <div className='mainContent'>
        <Sidebar/>
        <Main/>
      </div>
    </div>
  );
}

export default App;
