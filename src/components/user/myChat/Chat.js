import {useEffect, useState} from 'react';
import {GET_CHOOSEN_USER_MESSAGES_REQUEST, GET_MESSAGES_REQUEST} from '../../../redux/chat/actions';
import { useDispatch, useSelector } from 'react-redux';
import uuid from "react-uuid";
import {Link, useLocation} from "react-router-dom";

const Chat = () => {
    const dispatch = useDispatch();
    //get all chatusers
    const {chatUsers} = useSelector((state) => state.chatUsers)
    //send a message
    const [messageText, setMessageText] = useState('');

    const sendMessage = (event, id) => {
      console.log(id)
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

    //active nav links
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/")

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
                                                <li key={uuid()} className={+splitLocation[2] === user.id ? "chat-active-room p-2 m-2 border" : "p-2 m-2 border"} onClick={event => getChatMessages(event, user.id)}>
                                                    <Link to={"/chat/"+user.id} className="d-flex justify-content-between room-links">
                                                        <div className="d-flex flex-row user-names">
                                                            {/*<img src=""*/}
                                                            {/*     alt="avatar"*/}
                                                            {/*     className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"*/}
                                                            {/*     width="60"*/}
                                                            {/*/>*/}
                                                            <div className="pt-1 user-names">
                                                                <p className="fw-bold mb-0">{user.name} {user.surname}</p>
                                                                {/*<p className="small text-muted">user1 unread message</p>*/}
                                                            </div>
                                                        </div>
                                                        {/*<div className="pt-1">*/}
                                                        {/*    <p className="small text-muted mb-1">Just now</p>*/}
                                                        {/*    <span className="badge bg-danger float-end">1</span>*/}
                                                        {/*</div>*/}
                                                    </Link>
                                                </li>)
                                        }): (
                                            <h4>no message</h4>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
    {/*active chat messages*/}
                        <div className="col-md-6 col-lg-7 col-xl-8 room-body">
                            <h5 className="font-weight-bold mb-3 headings text-lg-start">Messages</h5>
                            <ul className="list-unstyled">
                                <li className="d-flex justify-content-between mb-4">
                                    <div className="card w-100">
                                        <div className="card-header d-flex justify-content-between p-3">
                                            <p className="fw-bold mb-0 text-success">User x message</p>
                                            <p className="text-muted small mb-0">
                                                <i className="far fa-clock"/> 13 mins ago -> time when written
                                            </p>
                                        </div>
                                        <div className="card-body">
                                            <p className="mb-0">
                                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
                                            </p>
                                        </div>
                                    </div>
                                    {/*<img*/}
                                    {/*    src=""*/}
                                    {/*    alt="avatar"*/}
                                    {/*    className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"*/}
                                    {/*    width="60"*/}
                                    {/*/>*/}
                                </li>

                                <li className="d-flex justify-content-between mb-4">
                                    {/*<img*/}
                                    {/*    src=""*/}
                                    {/*    alt="avatar"*/}
                                    {/*    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"*/}
                                    {/*    width="60"*/}
                                    {/*/>*/}
                                    <div className="card">
                                        <div className="card-header d-flex justify-content-between p-3">
                                            <p className="fw-bold mb-0 text-success">user y message</p>
                                            <p className="text-muted small mb-0">
                                                <i className="far fa-clock"/> 10 mins ago -> time when written
                                            </p>
                                        </div>
                                        <div className="card-body">
                                            <p className="mb-0">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            </p>
                                        </div>
                                    </div>
                                </li>

                                <li className="row">
                                    <div className="col-md-11">
                                        {/*<label className="form-label" htmlFor="textAreaExample2">Type a message</label>*/}
                                        <textarea
                                            className="form-control"
                                            id="textAreaExample2"
                                            rows="1"
                                            placeholder="Type a message"
                                        />
                                    </div>
                                    <div className="col-md-1">
                                        <button
                                            onClick={event => sendMessage(event, 1)}
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
