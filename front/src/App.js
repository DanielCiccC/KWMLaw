import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import '@radix-ui/themes/styles.css';
import {Avatar, Card, Flex, Box, Text, Dialog, Button, DropdownMenu, CaretDownIcon} from '@radix-ui/themes';
// import { Theme } from '@radix-ui/themes';
import {
    ChatBubbleIcon,
    FontSizeIcon,
    HamburgerMenuIcon,
    LightningBoltIcon,
    PaperPlaneIcon
} from '@radix-ui/react-icons';

function Sidebar() {
    const [sessions, setSessions] = React.useState([
        {summary: "Matter #1", dateTime: "01/09/2023 12:00 PM"},
        {summary: "Matter #2", dateTime: "01/09/2023 12:00 PM"},
        {summary: "Matter #3", dateTime: "01/09/2023 12:00 PM"},
        {summary: "Matter #4", dateTime: "01/09/2023 12:00 PM"},
        {summary: "Matter #5", dateTime: "01/09/2023 12:00 PM"},
    ]);

    const pastChats = sessions.map((_session, index) => {
        const maxMsgLen = 20;
        const session = _session.summary;
        const dateTime = _session.dateTime;
        return (
            <div key={index} className='session'>
                {/* <div className='session-icon'><ChatBubbleIcon/></div> */}
                <div className='session-text-container'>
                    <div
                        className='session-name'>{session.substring(0, maxMsgLen) + (session.length > maxMsgLen ? "..." : "")}</div>
                    <span className='session-metadata'>{dateTime}</span>
                </div>
            </div>
        )
    });

    return (
        <div className='sidebar'>
            <div className='top'>
                <div className='sidebarTopTray'>
                    <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        
                        <HamburgerMenuIcon className='hamburgerIcon'/>
                        
                        
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        {/* <DropdownMenu.Item>Our disclaimer</DropdownMenu.Item> */}
                        <DropdownMenu.Item>Reach out</DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item shortcut="Alt + F4">About Lex™</DropdownMenu.Item>
                        <DropdownMenu.Item>Our Team</DropdownMenu.Item>
                    </DropdownMenu.Content>
                    </DropdownMenu.Root>
                    
                </div>
                {/* <div className='prevMessages'>{pastChats}</div> */}
            </div>

            <div className='bottom'>
                {/*<div classname='expedite'>*/}
                <div>
                    {/* <Dialog.Root>
                        <Dialog.Trigger>
                            <Button color='green' size='3'>Expedite to counselling session</Button>
                        </Dialog.Trigger>

                        <Dialog.Content style={{maxWidth: 450}}>
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
                    </Dialog.Root> */}
                </div>
                <div className='userInfo'>
                    {/* <div className='userIcon'>PD</div> */}
                    {/* <Avatar size="4" radius="full" fallback="PD" color='bronze' /> */}
                    <Card size='2'>
                        <Flex gap="3" align="center">
                            <Avatar size="4" radius="full" fallback="PD" color='bronze'/>
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

function BusyTyping({ message, isSender }) {
    // const path = require("path");
    // console.log(path.resolve(__dirname));
    return (
        <div className={`message-container sender`}>
            <div className='message-icon-container'>
                    <Avatar
                        size='4'
                        radius='full'
                        fallback={<LightningBoltIcon className='message-icon' />}
                        color='brown'
                    />
            </div>
            <div className='message-body'>
                <img width="55px" height="55px" alt="loading" src="https://assets-v2.lottiefiles.com/a/90bdd36c-1152-11ee-bdb8-cb8fe6b15cf6/Y75Gbkbapu.gif"></img>
            </div>
        </div>
    );
}

function Message({ message, isSender }) {
    const [typingEffect, setTypingEffect] = useState('');

    useEffect(() => {
        let typingTimer;

        if (!isSender) {
            const characters = message.split('');
            let i = 0;

            typingTimer = setInterval(() => {
                if (i < characters.length - 1) {
                    setTypingEffect((prevText) => prevText + characters[i]);
                    i++;
                } else {
                    clearInterval(typingTimer);
                }
            }, 20); // Adjust the interval for typing speed

            return () => {
                clearInterval(typingTimer);
            };
        } else {
            // Immediately set the sender's message
            setTypingEffect(message);
        }
    }, [message, isSender]);

    return (
        <div className={`message-container ${isSender ? 'sender' : 'recipient'}`}>
            <div className='message-icon-container'>
                {isSender ? (
                    <Avatar size='4' radius='full' fallback='PD' color='bronze' />
                ) : (
                    <Avatar
                        size='4'
                        radius='full'
                        fallback={<LightningBoltIcon className='message-icon' />}
                        color='brown'
                    />
                )}
            </div>
            <div className='message-body'>{typingEffect || message}</div>
        </div>
    );
}


function Main() {
    // TODO: For some reason it removes the second character, so for a hotfix, just type the second character in the
    // message twice.
    const messageList = [
        {
            body: "Heello Patricia, I'm Lex, your legal compassion companion. I'm here to help you better understand \ " +
            "your mental health and wellbeing. Together, we'll explore a few statements. Take your time to read each \ " + 
            "question carefully and respond as honestly as you can. There are no right or wrong answers, so simply share your thoughts. \ " +
            " \n\n Are you ready to begin?",
            isSender: false
        },

        {
            body: "Thhanks for that response. First question - it is important to check in with your emotional state through the day and identify \ " +
            "distressing feelings. When you become stressed, do you recognise what is causing you to have these feelings?",
            isSender: false
        },

        {
            body: "Thhank you. Do you have trouble concentrating when working on this particular matter?",
            isSender: false
        },
    ];
    const [messages, setMessages] = React.useState([messageList[0]]);
    const [messageIndex, setMessageIndex] = React.useState(1);
    const [showBusy, setShowBusy] = React.useState(false);

    const messageElements = messages.map((message, index) => {
        return (
            <Message key={index} message={message.body} isSender={message.isSender}/>
        )
    });

    const handleInput = async (e) => {
      console.log(e.target);
      const newMessages = [
        ...messages,
        { body: document.getElementById("msg_input").value, isSender: true },
      ];
      setMessages(newMessages);
      e.target.value = "";

      setShowBusy(true)

      setTimeout(() => {
        if (messageIndex >= messageList.length) return;
        setShowBusy(false)
        setMessages([...newMessages, messageList[messageIndex]]);
        setMessageIndex(messageIndex + 1);
      }, 1000);
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
          <Button variant='outline' color='gray' size='4'> 
            <span className='appName'>Lex •</span>
            <i className='appName2'>&nbsp; your legal compassion companion</i>
          </Button>
          
        </span>
            </div>
            <div className='main'>
                <div className='chatMessages'>
                    {messageElements}
                    {showBusy && <BusyTyping/>}
                </div>

                <div className='chatInput'>
                    <input className='chatInputField' id='msg_input' type='text' placeholder='Type a message...'
                           onKeyDown={handleKeyDown}/>
                    <PaperPlaneIcon className="chatInputButton" onClick={handleInput}/>
                </div>
            </div>
        </div>
    )
}

function App() {

    return (
        <div className="App">
            <div className='mainContent'>
                <Sidebar/>
                <Main/>
            </div>
        </div>
    );
}

export default App;
