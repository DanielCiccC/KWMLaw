import React from 'react';
import {useState, useEffect} from 'react';
import './App.css';
import '@radix-ui/themes/styles.css';
import {Avatar, Card, Flex, Box, Text, Dialog, Button} from '@radix-ui/themes';
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
                <div className='session-icon'><ChatBubbleIcon/></div>
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
                    <HamburgerMenuIcon className='hamburgerIcon'/>
                </div>
                <div className='prevMessages'>{pastChats}</div>
            </div>

            <div className='bottom'>
                {/*<div classname='expedite'>*/}
                <div>`
                    <Dialog.Root>
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
                    </Dialog.Root>
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
            }, 10); // Adjust the interval for typing speed

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
            body: "Hii Patricia, I'm here to help you with your concerns regarding Vicarious Trauma. Could you please \ " +
                "answer the following questions for me to help you. Please read each statement and describe how you \ " +
                "relate to those statements. There are no right or wrong answers. Do not spend too much time on any statement.",
            isSender: false
        },

        {
            body: "Thhanks for that response. How does the statement 'I found it very hard to wind down' apply to you?",
            isSender: false
        },

        {
            body: "I  appreciate your response. How does the statement 'I experienced difficulty breathing (e.g. excessively rapid breathing breathing, breathlessness in the absence of physical exertion' apply to you?",
            isSender: false
        },
    ];
    const [messages, setMessages] = React.useState([messageList[0]]);
    const [messageIndex, setMessageIndex] = React.useState(1);

    ////////////////////////////////////////////////////////////////////////////
    // TODO: Change this back to let
    ////////////////////////////////////////////////////////////////////////////
    let messageElements = messages.map((message, index) => {
        console.log(message.body);
        return (
            <Message key={index} message={message.body} isSender={message.isSender}/>
        )
    });

    messageElements = [
        (<BusyTyping></BusyTyping>),
        ...messageElements
    ];

    const handleInput = (e) => {
        console.log(e.target);
        const newMessages = [...messages, {body: document.getElementById('msg_input').value, isSender: true}]
        setMessages(newMessages);
        e.target.value = '';

        setTimeout(() => {
            if (messageIndex >= messageList.length) return;
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
          <span className='appName'>Lex •</span>
          <i>&nbsp; Your legal compassion companion</i>
        </span>
            </div>
            <div className='main'>
                <div className='chatMessages'>
                    {messageElements}
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
