import {useEffect, useState} from 'react';
import {GET_CHOOSEN_USER_MESSAGES_REQUEST, GET_MESSAGES_REQUEST} from '../../../redux/chat/actions';
import { useDispatch, useSelector } from 'react-redux';
import uuid from "react-uuid";
import {Link, useLocation} from "react-router-dom";

const Chat = () => {
    const dispatch = useDispatch();
    const {chatUsers} = useSelector((state) => state.chatUsers)
    const {chatMessages} = useSelector((state) => state.chatMessages)
    //send message
    const [messageText, setMessageText] = useState('Type a message');
    //active nav links
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/")

    //send message
    const onChangeMsg = (event) => {
        setMessageText(event.target.value)
    }

    const sendMessage = (event, id) => {
      console.log('msg', messageText)
    }
    //get all chatusers
    useEffect(() => {
        dispatch({
            type: GET_MESSAGES_REQUEST
        })
    }, [dispatch]);
    //get chosen user chat messages
    const getChatMessages = (event, id) => {
        dispatch({
            type: GET_CHOOSEN_USER_MESSAGES_REQUEST,
            payload: id
        })
    }

    return (
        <>
            <h4 className="mt-5 mb-4">Chat rooms</h4>
            <section className="chat-box">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                            <h5 className="font-weight-bold mb-3 headings text-lg-start">Rooms</h5>
                            <div className="card">
                                <div className="card-body">
                                    <ul className="list-unstyled mb-0 room-body">
    {/*active chat*/}
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
    {/*active chat messages*/}
                        <div className="col-md-6 col-lg-7 col-xl-8 room-body">
                            <h5 className="font-weight-bold mb-3 headings text-lg-start">Messages</h5>
                            <ul className="list-unstyled">
                                {chatMessages.length ? chatMessages.map((messages) => {
                                    return (
                                        <li key={uuid()} className="d-flex justify-content-between mb-4">
                                            <div className="card w-100">
                                                <div className="card-header d-flex justify-content-between p-3">
                                                    <p className="fw-bold mb-0 text-success">
                                                        {messages.receiver_id.id === +splitLocation[2] ? messages.user_receiver.name : messages.user_sender.name}
                                                    </p>
                                                    <p className="text-muted small mb-0">
                                                        <i className="far fa-clock"/>
                                                        {messages.created_at.slice(0,10).split('-').reverse().join('-')+' '}
                                                        {messages.created_at.slice(11,16)}
                                                    </p>
                                                </div>

                                                <div className="card-body">
                                                    <p className={messages.receiver_id === +splitLocation[2] ? "mb-0 text-lg-start" : "text-lg-end mb-0"}>
                                                        <b className="text-back bg-info text-white">{messages.message}</b>
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                    }) : (<h4 className="my-5">Choose a room</h4>)
                                }

                               <li className="row">
                                   <div className="col-md-11">
                                       <textarea
                                           onChange={event => onChangeMsg(event)}
                                           className="form-control"
                                           id="textAreaExample2"
                                           rows="1"
                                           placeholder={messageText}
                                       />
                                   </div>
                                   <div className="col-md-1">
                                       <button
                                           onClick={event => sendMessage(event, +splitLocation[2])}
                                           type="button"
                                           className="btn btn-primary btn-rounded float-end"
                                       >
                                           Send
                                       </button>
                                   </div>
                               </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Chat;
