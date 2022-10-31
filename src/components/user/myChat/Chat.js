import {useEffect, useRef, useState} from 'react';
import {
    GET_CHOSEN_USER_MESSAGES_REQUEST,
    GET_MESSAGES_REQUEST,
    SEND_MESSAGE_REQUEST
} from '../../../redux/chat/actions';
import { useDispatch, useSelector } from 'react-redux';
import uuid from "react-uuid";
import {Link, useLocation} from "react-router-dom";
import Pusher from 'pusher-js';
import EmojiPicker from 'emoji-picker-react';

const initialValue = 'Type a message';
const initialValueOfInput = '';

const Chat = () => {
    //on render page bring chat users list and on clicking on user bring users messages
    const dispatch = useDispatch();
    const {chatUsers} = useSelector((state) => state.chatUsers)
    const {chatMessages} = useSelector((state) => state.chatMessages)
    // Broadcasting
    const [messageText, setMessageText] = useState(initialValue);
    const [inputValue, setInputValue] = useState(initialValueOfInput);
    //active nav links
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/")
    const bottomRef = useRef(null);
    //emoji
    const emojiRef = useRef(null);
    const [openEmoji, setOpenEmoji] = useState('none');

    //get all chatUsers
    useEffect(() => {
        dispatch({
            type: GET_MESSAGES_REQUEST
        })
    }, [dispatch]);
    //get chosen user chat messages
    const getChatMessages = (event, id) => {
        dispatch({
            type: GET_CHOSEN_USER_MESSAGES_REQUEST,
            payload: id
        })
        Pusher.logToConsole = true;

        let pusher = new Pusher('6014ac3bdb98a5b9f8c9')

        let channel = pusher.subscribe('chat')

        let callback = (messages) => {
            console.log('Message', messages)
            let newMessage =
                '<li key='+uuid()+' ref='+bottomRef+' className="d-flex justify-content-between mb-4">' +
                    '<div className="card w-100">' +
                        '<div className="card-header d-flex justify-content-between p-3">' +
                            '<p className="fw-bold mb-0 text-success">' +
                                (+messages.receiver_id.id === +splitLocation[2]) ? messages.user_receiver.name : messages.user_sender.name + '' +
                            '</p>' +
                            '<p className="text-muted small mb-0"> ' +
                                '<i className="far fa-clock"/>' +
                            '</p>' +
                        '</div>' +
                        '<div className="card-body"> ' +
                            '<p className='+(+messages.receiver_id === +splitLocation[2]) ? (+ "mb-0 text-lg-end") : (+ "text-lg-start mb-0") +'>' +
                                '<b className="text-back bg-info text-white">'+messages.message+'</b>' +
                            '</p>' +
                        '</div>' +
                    '</div>' +
                '</li>'
            document.getElementById('chat-ul').innerHTML += newMessage;
        }

        channel.bind('message', callback)
    }

    const sendMessage = (event, id) => {
        dispatch({
            type: SEND_MESSAGE_REQUEST,
            payload: {
                id: id,
                messageText: inputValue
            }
        })
        setInputValue(initialValueOfInput)
        setMessageText(initialValue)
        setOpenEmoji('none')
    }

    const onChangeMsg = (event) => {
        setMessageText(event.target.value)
        setInputValue(event.target.value)
    }
    //scroll down chat
    useEffect(() => {
        bottomRef.current?.scrollIntoView();
    }, [chatMessages]);
    //emoji 
    const addEmoji = (e) => {
      setInputValue(inputValue+e.emoji)
    }

    const toggleEmoji = () => {
        emojiRef.current.style.display === 'none' ?
        setOpenEmoji('block') :
        setOpenEmoji('none')
    }

    return (
        <div className="container">
            <h4 className="mt-4">Chat rooms</h4>
            <section className="chat-box">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                            <h5 className="font-weight-bold mb-3 headings text-lg-start">Rooms</h5>
    {/*real time chat members*/}
                            <div className="card">
                                <div className="card-body">
                                    <ul className="list-unstyled mb-0 room-body">
                                        {chatUsers ? chatUsers.map((user) => {
                                            return (
                                                <li
                                                    key={uuid()}
                                                    className={+splitLocation[2] === user.id ? "chat-active-room p-2 m-2 border" : "p-2 m-2 border"}
                                                    onClick={event => getChatMessages(event, user.id)}
                                                >
                                                    <Link to={"/chat/"+user.id} className="d-flex justify-content-between room-links">
                                                        <div className="d-flex flex-row user-names">
                                                          <div className="pt-1 user-names">
                                                                <p className="fw-bold mb-0">{user.name} {user.surname}</p>
                                                                {/*<p className="small text-muted">user1 unread message</p>*/}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </li>)
                                        }): (
                                            <h4>no chats</h4>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
    {/*real time chat messages*/}
                        <div className="col-md-6 col-lg-7 chat-cont col-xl-8">
                            <h5 className="font-weight-bold mb-3 headings text-lg-start">Messages</h5>
                            <div className='room-body body-messages'>
                                <ul className="list-unstyled" id="chat-ul">
                                    {chatMessages.length ? chatMessages.map((messages) => {
                                        return (
                                            <li key={uuid()} className="d-flex justify-content-between mb-4">
                                                <div className="card w-100">
                                                    <div className="card-header d-flex justify-content-between p-3">
                                                        <p className="fw-bold mb-0 text-success">
                                                            {+messages.receiver_id.id === +splitLocation[2] ? messages.user_receiver.name : messages.user_sender.name}
                                                        </p>
                                                        <p className="text-muted small mb-0">
                                                            <i className="far fa-clock"/>
                                                            {messages.created_at.slice(0,10).split('-').reverse().join('-')+' '}
                                                            {messages.created_at.slice(11,16)}
                                                        </p>
                                                    </div>

                                                    <div ref={bottomRef} className="card-body">
                                                        <p className={+messages.receiver_id === +splitLocation[2] ? "mb-0 text-end" : "text-start mb-0"}>
                                                            <b className="text-back bg-info text-white">{messages.message}</b>
                                                        </p>
                                                    </div>
                                                </div>
                                            </li>
                                        )
                                        }) : (<p/>)
                                    }
                                </ul>
                            </div>
    {/*real time chat controls*/}
                            {chatMessages.length ?
                                (<div className="row controls">
                                    <div className="col-md-12 d-flex flex-wrap-nowrap my-1" id="textAreaExample2">
                                        <textarea
                                            onChange={event => onChangeMsg(event)}
                                            className="form-control my-1"
                                            rows="1"
                                            value={inputValue}
                                            placeholder={messageText}
                                        />

                                        <button
                                            onClick={toggleEmoji}
                                            type="button"
                                            className="btn btn-success btn-rounded float-end mx-2 form-text"
                                        >
                                            Emoji
                                        </button>

                                        <button
                                            onClick={event => sendMessage(event, +splitLocation[2])}
                                            type="button"
                                            className="btn btn-primary btn-rounded float-end form-text"
                                        >
                                            Send
                                        </button>
                                    </div>

                                    <div
                                        style={{display: openEmoji}}
                                        className="col-md-12 emoji"
                                        id="emoji"
                                        ref={emojiRef}
                                    >
                                        <EmojiPicker
                                            height="340px"
                                            width="450px"
                                            theme="dark"
                                            emojiStyle="native" // google, apple, facebook, twitter, native
                                            suggestedEmojisMode='frequent' // recent
                                            autoFocusSearch={false}
                                            skinTonePickerLocation="PREVIEW"
                                            onEmojiClick={event => addEmoji(event)}
                                        />
                                    </div>
                                </div>)
                                :
                                (<h4 className="my-5 choose-room-message">
                                    Choose a room
                                </h4>)
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Chat;
