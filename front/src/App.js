import React from 'react';
import './App.css';
import '@radix-ui/themes/styles.css';
import { Avatar, Card, Flex, Box, Text, Dialog,  Button} from '@radix-ui/themes';
// import { Theme } from '@radix-ui/themes';
import { ChatBubbleIcon, FontSizeIcon, HamburgerMenuIcon, LightningBoltIcon, PaperPlaneIcon } from '@radix-ui/react-icons';

function Sidebar() {
  const [sessions, setSessions] = React.useState([
    { summary: "Matter #1", dateTime: "01/09/2023 12:00 PM" },
    { summary: "Matter #2", dateTime: "01/09/2023 12:00 PM" },
    { summary: "Matter #3", dateTime: "01/09/2023 12:00 PM" },
    { summary: "Matter #4", dateTime: "01/09/2023 12:00 PM" },
    { summary: "Matter #5", dateTime: "01/09/2023 12:00 PM" },
  ]);

  const pastChats = sessions.map((_session, index) => {
    const maxMsgLen = 20;
    const session = _session.summary;
    const dateTime = _session.dateTime;
    return (
      <div key={index} className='session'>
        <div className='session-icon'><ChatBubbleIcon /></div>
        <div className='session-text-container'>
          <div className='session-name'>{session.substring(0, maxMsgLen) + (session.length > maxMsgLen ? "..." : "")}</div>
          <span className='session-metadata'>{dateTime}</span>
        </div>
      </div>
    )
  });

  return (
    <div className='sidebar'>
      <div className='top'>
        <div className='sidebarTopTray'>
          <HamburgerMenuIcon className='hamburgerIcon' />
        </div>
        <div className='prevMessages'>{pastChats}</div>
      </div>

      <div className='bottom'>
        <div classname='expedite'>
          <Dialog.Root>
            <Dialog.Trigger>
              <Button color='green' size='3'>Expedite to counselling session</Button>
            </Dialog.Trigger>

            <Dialog.Content style={{ maxWidth: 450 }}>
              <Dialog.Title>Expedite to counselling session</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Make changes to your profile.
              </Dialog.Description>

              <Flex direction="column" gap="3">
              <Text as="div" size="2" mb="1" weight="bold">
                    something
                  </Text>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button color='brown'>Accept</Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </div>
        <div className='userInfo'>
          {/* <div className='userIcon'>PD</div> */}
          {/* <Avatar size="4" radius="full" fallback="PD" color='bronze' /> */}
          <Card size='2' >
            <Flex gap="3" align="center" >
              <Avatar size="4" radius="full" fallback="PD" color='bronze' />
              <Box>
                <Text as="div" size="2" weight="bold">
                  Patricia Daisy
                </Text>
                <Text as="div" size="2" color="gray">
                  ImportantLawyer@outlook.com
                </Text>
              </Box>
            </Flex>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Message({ message, isSender }) {
  return (
    <div className={`message-container ${isSender ? "sender" : "recipient"}`}>
      <div className='message-icon-container'>
        {isSender ? <Avatar size="4" radius="full" fallback="PD" color='bronze' /> : <Avatar size="4" radius="full" fallback={<LightningBoltIcon className='message-icon' />} color='brown' /> }
      </div>
      
      <div className='message-body'>
        <p>{message}</p>
      </div>
    </div>
  )
}



function Main() {
  const [messages, setMessages] = React.useState([
    { body: "Have you recently experienced or witnessed a highly distressing or life-threatening event, such as a natural disaster, accident, assault, or military combat?", isSender: false },
    { body: "No, I haven't recently experienced or witnessed a highly distressing or life-threatening event.", isSender: true },
    { body: "Are you frequently reliving or experiencing intrusive thoughts, memories, or nightmares related to a traumatic event?", isSender: false },
  ]);

  const messageElements = messages.map((message, index) => {
    return (
      <Message key={index} message={message.body} isSender={message.isSender} />
    )
  });

  const handleInput = (e) => {
    console.log(e.target)
    setMessages([...messages, { body: document.getElementById('msg_input').value, isSender: true }]);
    e.target.value = '';
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleInput(e);
    }
  }

  return (
    <div className='main'>
      <div className="title">
        <span className='appDescription'>
          <span className='appName'>Lex •</span>
          <i>&nbsp; Your legal compassion companion</i>
        </span>
      </div>
      <div className='main'>
        <div className='chatMessages'>
          {messageElements}
        </div>

        <div className='chatInput'>
          <input className='chatInputField' id='msg_input' type='text' placeholder='Type a message...' onKeyDown={handleKeyDown} />
          <PaperPlaneIcon className="chatInputButton" onClick={handleInput} />
        </div>
      </div>
    </div>
  )
}

function App() {

  return (
    <div className="App">
      <div className='mainContent'>
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}

export default App;
