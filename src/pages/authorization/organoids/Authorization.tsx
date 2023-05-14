import { useEffect, useState } from 'react';
import useWebSocketQr from '../logics/useWebSocketQr';
import '../styles/Authorization.css'
import { $apiTokenInstance, $authorization, $check, $idInstance, setApiTokenInstance, setCheck, setIdInstance } from '../../../common/function/stores';
import { useStore } from 'effector-react';

export const Authorization = () => {
    const apiTokenInstance = useStore($apiTokenInstance);
    const idInstance = useStore($idInstance);
    const check = useStore($check);
    const authorization = useStore($authorization);
    const [qr,setQR] = useState<any | null>(null)
    const { messages, sendMessage, disconnect } = useWebSocketQr();
    const handleClick = async () => {
        if (!check) {
            try {
                setCheck(!check)
            } catch (error) {
                console.log(error)
            }
        } else {
            setCheck(!check)
        }
    };
    useEffect(() => {
        console.log("messages", messages)
        // if(JSON.parse(messages[messages.length - 1]).message == "Instance already logged"){

        // }
    }, [messages])




    return (
        <div className="Authorization">
            <form onSubmit={e => { e.preventDefault(); handleClick(); }}>
                <input required type="text" placeholder="IdInstance" value={idInstance} onChange={(event: any) => { setIdInstance(event.target.value) }} />
                <input required type="text" placeholder="ApiTokenInstance" value={apiTokenInstance} onChange={(event: any) => { setApiTokenInstance(event.target.value) }} />
                <input type="submit" value={!check ? "connect" : "close"} />
            </form>
            {
                check && messages && messages.length &&
                <>
                    <img src={`data:image/png;base64, ${JSON.parse(messages[messages.length - 1]).message}`} alt="QR code" />
                </>
            }
        </div>
    );
};
