import React, { useEffect, useRef, useState } from "react";
import { Api } from "../api/api";
import { getCookie } from "../helpers/Cookie";
import { socket } from "../helpers/Socket";
import { ListUpdateType, MsgType, RingColorType, SendMsgType, UserType } from "../types/types";
import { PencilSquareIcon, FaceSmileIcon, CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

const emojiInput = document.querySelector('#emoji') as HTMLInputElement;

export const LiveChat = () => {

    const [user, setUser] = useState<UserType>();
    const [usersList, setUsersList] = useState<UserType[]>([]);
    const [thatUser, setThatUser] = useState<UserType>();

    const [msgs, setMsgs] = useState<MsgType[]>([]);

    const [input, setInput] = useState('');

    const [disabled, setDisabled] = useState(false);
    const [menu, setMenu] = useState(true);
    const ulRef = useRef<any>(null);
    const [emojiMenu, setEmojiMenu] = useState(false);
    const [status, setStatus] = useState(false);
    const [colorRing, setColorRing] = useState(`w-14 rounded-full ring ring-green-500 ring-offset-base-100 ring-offset-2`);
    const [usersColorRing, setUsersColorRing] = useState('ring-green-500');
    const [height, setHeight] = useState('100vh');

    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();

    useEffect(() => {
        const getUser = async () => {

            const token = getCookie();

            if(token) {
                const response: UserType = await Api.getUser(token);
                setUser(response);
                document.title = `DevChat - ${response.userName}`;

                response.statusColor = usersColorRing;

                socket.emit('join-request', response);
                setDisabled(false);
            } else {
                console.log('token invalido');
            }
        };
        getUser();
    },[]);

    useEffect(() => {
        if (ulRef) {
          ulRef.current.addEventListener('DOMNodeInserted', (event: any) => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });
        }
      }, [])

    socket.on('user-ok', (connectedUsers: UserType[]) => {
        setUsersList(connectedUsers);

        setMsgs([...msgs, {
            status: true,
            user: user as UserType,
            msg: 'Conectado...'
        }]);
        
    });
    
    socket.on('list-update', (data: ListUpdateType) => {

        if(data.joined) {
            setMsgs([...msgs, {
                status: true,
                user: data.joined,
                msg: 'entrou no chat!'
            }]);
            
        }

        if(data.left) {
            setMsgs([...msgs, {
                status: true,
                user: data.left,
                msg: 'saiu no chat!'
            }]);
            
        }   

        setUsersList(data.list);
    });

    const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSendMsg = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.keyCode === 13) {
            socket.emit('send-msg', {
                input,
                user
            });
            setInput('');
            emojiInput.focus();
        }
    };

    const handleAddEmoji = (emoji: number) => {

        switch(emoji){
            case 1:
                setInput(`${input} 😀`);
                emojiMenu ? setEmojiMenu(false) : setEmojiMenu(true);
                emojiInput.focus();
            break;
            case 2:
                setInput(`${input} 😁`);
                emojiMenu ? setEmojiMenu(false) : setEmojiMenu(true);
                emojiInput.focus();
            break;
            case 3:
                setInput(`${input} 😂`);
                emojiMenu ? setEmojiMenu(false) : setEmojiMenu(true);
                emojiInput.focus();
            break;
            case 4:
                setInput(`${input} 😋`);
                emojiMenu ? setEmojiMenu(false) : setEmojiMenu(true);
                emojiInput.focus();
            break;
            case 5:
                setInput(`${input} 😎`);
                emojiMenu ? setEmojiMenu(false) : setEmojiMenu(true);
                emojiInput.focus();
            break;
            case 6:
                setInput(`${input} 😍`);
                emojiMenu ? setEmojiMenu(false) : setEmojiMenu(true);
                emojiInput.focus();
            break;
            case 7:
                setInput(`${input} 😑`);
                emojiMenu ? setEmojiMenu(false) : setEmojiMenu(true);
                emojiInput.focus();
            break;
            case 8:
                setInput(`${input} 😮`);
                emojiMenu ? setEmojiMenu(false) : setEmojiMenu(true);
                emojiInput.focus();
            break;
            case 9:
                setInput(`${input} 😴`);
                emojiMenu ? setEmojiMenu(false) : setEmojiMenu(true);
                emojiInput.focus();
            break;
            case 10:
                setInput(`${input} 😒`);
                emojiMenu ? setEmojiMenu(false) : setEmojiMenu(true);
                emojiInput.focus();
            break;
            case 11:
                setInput(`${input} 🙁`);
                emojiMenu ? setEmojiMenu(false) : setEmojiMenu(true);
                emojiInput.focus();
            break;
            case 12:
                setInput(`${input} 😭`);
                emojiMenu ? setEmojiMenu(false) : setEmojiMenu(true);
                emojiInput.focus();
            break;
            case 13:
                setInput(`${input} 😱`);
                emojiMenu ? setEmojiMenu(false) : setEmojiMenu(true);
                emojiInput.focus();
            break;
            case 14:
                setInput(`${input} 😡`);
                emojiMenu ? setEmojiMenu(false) : setEmojiMenu(true);
                emojiInput.focus();
            break;
            case 15:
                setInput(`${input} 😇`);
                emojiMenu ? setEmojiMenu(false) : setEmojiMenu(true);
                emojiInput.focus();
            break;
        }
    };

    const handleStatus = (color: string) => {
        switch(color){
            case 'green':
                setColorRing(`w-14 rounded-full ring ring-green-500 ring-offset-base-100 ring-offset-2`);
                status ? setStatus(false) : setStatus(true);
                socket.emit('status-color', {
                    color: 'ring-green-500',
                    user
                });
            break;
            case 'red':
                setColorRing(`w-14 rounded-full ring ring-red-500 ring-offset-base-100 ring-offset-2`);
                status ? setStatus(false) : setStatus(true);
                socket.emit('status-color', {
                    color: 'ring-red-500',
                    user
                });
            break;
            case 'yellow':
                setColorRing(`w-14 rounded-full ring ring-yellow-500 ring-offset-base-100 ring-offset-2`);
                status ? setStatus(false) : setStatus(true);
                socket.emit('status-color', {
                    color: 'ring-yellow-500',
                    user
                });
            break;
        }
    };

    socket.on('show-msg', (data: SendMsgType) => {
        setMsgs([...msgs, {
            status: false,
            user: data.user,
            msg: data.input
        }]);
        
        
    });

    socket.on('update-status', (data: RingColorType, connectedUsers: UserType[]) => {
        setUsersList(connectedUsers)
        setMsgs([...msgs, {
            status: true,
            user: data.user,
            msg: 'mudou seu status!'
        }]);
    });

    socket.on('disconnect', () => {
        setMsgs([...msgs, {
            status: true,
            user: user as UserType,
            msg: 'você está desconectado!'
        }]);
        
        setDisabled(true);
    });

    socket.io.on('reconnect_error', () => {
        setMsgs([...msgs, {
            status: true,
            user: user as UserType,
            msg: 'tentando reconectar...'
        }]);
        
    });

    socket.io.on('reconnect', () => {
        setMsgs([...msgs, {
            status: true,
            user: user as UserType,
            msg: 'reconectado!'
        }]);
        
        setDisabled(false);
    });

    window.addEventListener('resize', () => {

        setHeight(window.screen.height.toString());
        
    });

    return (
        <div className="h-[100vh] flex flex-row-reverse mg:flex-col bg-white text-stone-800">
            <div className={`bg-gradient-to-r from-white to-pink-300 ease-in duration-300 w-80 mg:w-full ${menu ? 'w-28 mg:w-full' : ''}`}>
                <ul className={`flex flex-col gap-3 overflow-y-scroll h-[100vh] mg:overflow-y-hidden mg:overflow-x-hidden ease-in duration-300 mg:gap-0  ${disabled ? 'opacity-50' : ''} ${menu ? 'mg:h-[80px]' : 'mg:h-[200px]'}`}>
                    <div className={`p-5 h-20  flex items-center ${menu ? 'justify-center mg:justify-between bg-pink-500 ' : 'justify-between bg-gradient-to-r from-white to-pink-500'}`}>
                        
                        <div className={`flex justify-center gap-5 ${menu ? 'hidden mg:flex' : ''}`}>
                            <div className="avatar cursor-pointer" onClick={() => status ? setStatus(false) : setStatus(true)}>
                                <div className={colorRing}>
                                    <img src={user?.avatar} />
                                </div>
                                <ul className={`absolute flex flex-col mg:flex-row gap-5 cursor-default border-2 border-pink-500 bg-white p-2 z-50 rounded-2xl left-[120%] mg:top-[11%] ${status ? '' : 'hidden'}`}>
                                    <li className="flex gap-2 hover:cursor-pointer" onClick={() => handleStatus('green')}><CheckCircleIcon className="w-5 stroke-green-500"/>Online</li>
                                    <li className="flex gap-2 hover:cursor-pointer" onClick={() => handleStatus('yellow')}><ExclamationCircleIcon className="w-5 stroke-yellow-500" /> Ausente</li>
                                    <li className="flex gap-2 hover:cursor-pointer" onClick={() => handleStatus('red')}><XCircleIcon className="w-5 stroke-red-500"/> Ocupado</li>
                                </ul>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold">{user?.userName}</span>
                            </div>
                        </div>
                        
                        <label className="btn btn-circle btn-ghost swap swap-rotate">
                            <input 
                                type="checkbox"
                                onChange={() => menu ? setMenu(false) : setMenu(true)}
                            />
                            <svg className="swap-off fill-secondary-focus" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>
                            <svg className="swap-on fill-secondary-focus" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
                        </label>
                    </div>
                    <div className={`flex flex-col gap-7 justify-center items-center mg:flex-row mg:overflow-x-scroll mg:justify-start mg:items-start${menu ? '' : ''}`}>
                        {usersList.map((item, index) => {
                            if(item.avatar != user?.avatar) {
                                return(
                                    <li className="flex gap-5 mg:flex-col mg:gap-0 mg:justify-center mg:items-center mg:ml-3 mg:mt-3" key={index}>
                                        <div className="avatar">
                                            <div className={`w-14 rounded-full ring ring-offset-base-100 ring-offset-2 ${item.statusColor}`}>
                                                <img src={item.avatar} />
                                            </div>
                                        </div>
                                        <div className={menu ? 'hidden mg:flex' : ''}>
                                            <h1 className="font-semibold text-lg mg:text-sm mg:text-center">{item.userName}</h1>
                                            <span></span>
                                        </div>
                                    </li>
                                );
                            }
                        })}
                    </div>
                </ul>
            </div>
            <div className="flex-1 flex flex-col">
                <div className="flex-1">
                    <ul className={`overflow-y-scroll h-[calc(100vh-50px)] p-5 ${menu ? `mg:h-[calc(${height}-130px)]` : `mg:h-[calc(${height}px-250px)]`}`} id="chatList" ref={ulRef} style={{scrollbarColor: 'light'}}>
                        {msgs.map((item, index) => {
                            if(item.status) {
                                return (
                                    <li className="italic text-stone-600" key={index}><strong>{item.user.userName}</strong> {item.msg}</li>
                                )
                            } else {
                                return (
                                    <li key={index}>
                                        <div className={`chat ${item.user.avatar != user?.avatar ? 'chat-end' : 'chat-start'}`}>
                                            <div className="chat-image avatar">
                                                <div className="w-10 rounded-full">
                                                <img src={item.user.avatar} />
                                                </div>
                                            </div>
                                            <div className="chat-header flex items-end gap-2">
                                                <div>{item.user.userName}</div>
                                                <time className="text-xs opacity-50">{`${hour}:${min}h`}</time>
                                            </div>
                                            <div className={`chat-bubble ${item.user.avatar != user?.avatar ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>{item.msg}</div>
                                            <div className="chat-footer opacity-50">
                                                Delivered
                                            </div>
                                        </div>
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </div>
                <div className="flex justify-end items-center">
                    <div className="absolute mr-2 bottom-1 flex flex-col justify-center items-end">
                        <ul className={`border-2 border-secondary p-2 rounded-lg bg-white ${emojiMenu ? '' : 'hidden'}`}>
                            <li className="cursor-pointer text-2xl" onClick={() => handleAddEmoji(1)}>😀</li>
                            <li className="cursor-pointer text-2xl" onClick={() => handleAddEmoji(2)}>😁</li>
                            <li className="cursor-pointer text-2xl" onClick={() => handleAddEmoji(3)}>😂</li>
                            <li className="cursor-pointer text-2xl" onClick={() => handleAddEmoji(4)}>😋</li>
                            <li className="cursor-pointer text-2xl" onClick={() => handleAddEmoji(5)}>😎</li>
                            <li className="cursor-pointer text-2xl" onClick={() => handleAddEmoji(6)}>😍</li>
                            <li className="cursor-pointer text-2xl" onClick={() => handleAddEmoji(7)}>😑</li>
                            <li className="cursor-pointer text-2xl" onClick={() => handleAddEmoji(8)}>😮</li>
                            <li className="cursor-pointer text-2xl" onClick={() => handleAddEmoji(9)}>😴</li>
                            <li className="cursor-pointer text-2xl" onClick={() => handleAddEmoji(10)}>😒</li>
                            <li className="cursor-pointer text-2xl" onClick={() => handleAddEmoji(11)}>🙁</li>
                            <li className="cursor-pointer text-2xl" onClick={() => handleAddEmoji(12)}>😭</li>
                            <li className="cursor-pointer text-2xl" onClick={() => handleAddEmoji(13)}>😱</li>
                            <li className="cursor-pointer text-2xl" onClick={() => handleAddEmoji(14)}>😡</li>
                            <li className="cursor-pointer text-2xl" onClick={() => handleAddEmoji(15)}>😇</li>
                        </ul>
                        <FaceSmileIcon className="w-10 cursor-pointer mg:z-50" onClick={() => emojiMenu ? setEmojiMenu(false) : setEmojiMenu(true)}/>
                    </div>
                    <input
                        id='emoji'
                        type="text"
                        placeholder="Mensagem"
                        className="input input-secondary w-full h-[50px] rounded-none hover:outline-none bg-white mg:absolute mg:bottom-0"
                        value={input}
                        onChange={changeInput}
                        onKeyUp={handleSendMsg}
                        disabled={disabled}
                    />
                </div>
            </div>

        </div>
    );
};