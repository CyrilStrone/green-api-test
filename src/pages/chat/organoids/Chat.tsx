import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';
import { $apiTokenInstance, $idInstance } from '../../../common/function/stores';
import { InChatHistory } from '../logics/InChatHistory';
import { InCheckNumber } from '../logics/InCheckNumber';
import { InDeleteNotification } from '../logics/InDeleteNotification';
import { InReceiveNotification } from '../logics/InReceiveNotification';
import { InSendMessage } from '../logics/InSendMessage';

import '../styles/Chat.css'

export const Chat = () => {
    const apiTokenInstance = useStore($apiTokenInstance);
    const idInstance = useStore($idInstance);
    const [phone, setPhone] = useState<string>("")
    const [messages, setMessages] = useState<any | null>(null)
    const [inputValue, setInputValue] = useState('')
    const [check, setCheck] = useState<boolean | null>(null)
    const handleNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    };
    const handleTry = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const result = await InCheckNumber({ apiTokenInstance: apiTokenInstance, idInstance: idInstance, phone: phone })
            if (result) {
                setCheck(true)
            }
        } catch (error) {
            console.log(error)
            setCheck(false)
        }
    };
    const handleGetStatus = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const result = await InReceiveNotification({ apiTokenInstance: apiTokenInstance, idInstance: idInstance })
            if (result) {
                console.log("handleGetStatus result", result)
                handleReceiptMessage(result.receiptId)
            }
        } catch (error) {
            console.log(error)
        }
    };
    const handleGetMessage = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const result = await InChatHistory({ apiTokenInstance: apiTokenInstance, idInstance: idInstance, chatId: phone })
            if (result) {
                console.log("handleGetMessage result", result)
                setMessages(result)
            }
        } catch (error) {
            console.log(error)
        }
    };
    const handleSendMessage = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const result = await InSendMessage({ apiTokenInstance: apiTokenInstance, idInstance: idInstance, chatId: phone, message: inputValue })
            if (result) {
                setInputValue('')
            }
        } catch (error) {
            console.log(error)
        }
    };
    const handleReceiptMessage = async (receiptId:string) => {
        try {
            const result = await InDeleteNotification({ apiTokenInstance: apiTokenInstance, idInstance: idInstance, receiptId: receiptId })
            if (result) {
                console.log("handleReceiptMessage result", result)
            }
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <div className="Chat">
            <form onSubmit={handleTry}>
                <input type="text" value={phone} placeholder="Write the number of your interlocutor" onChange={handleNumber} />
                <button type="submit">Try</button>
            </form>
            <div>
                {check ?
                    <div>
                        Есть
                    </div> :
                    <div>
                        Нет
                    </div>
                }
                <div>
                    {messages && messages.map((message: any) => (
                        message.type == "incoming" ?
                            <div>
                                {message.textMessage && message.textMessage}
                            </div> :
                            <div>
                                {message.textMessage && message.textMessage}
                            </div>
                    ))}
                    <button type="submit" onClick={handleGetStatus}>Check Status</button>
                    <button type="submit" onClick={handleGetMessage}>Check Messages</button>
                </div>
                <form onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};
