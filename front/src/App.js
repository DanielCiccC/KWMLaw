import React from 'react';
import './App.css';

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
    return (
      <div key={index} className='session'>
        <div className='session-icon'>💬</div>
        <div className='session-name'>{session}</div>
      </div>
    )
  });

  return (
    <div className='sidebar'>
      <div className='prevMessages'>{pastChats}</div>
      <div className='userInfo'>
        <div className='userIcon'>👤</div>
        <div className='userName'>&nbsp;Joe Biden</div>
      </div>
    </div>
  )
}

function Message({message, isSender}) {
  return (
    <div className={`message-container ${isSender ? "sender" : "recipient"}`}>
      <div className='message-icon'>
        {isSender ? '👤' : '🤖'}
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
        <div classNames='chatMessages'>
          {messageElements}
        </div>

        <div className='chatInput'>
          <input className='chatInputField' id='msg_input' type='text' placeholder='Type a message...' onKeyDown={handleKeyDown}/>
          <button className="chatInputButton" onClick={handleInput}>✈️</button>
        </div>
    </div>
  )
}

function App() {

  return (
    <div className="App">
      <Sidebar/>
      <Main/>
    </div>
  );
}

export default App;
