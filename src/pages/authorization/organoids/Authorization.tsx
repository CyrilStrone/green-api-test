import '../styles/Authorization.css';
import { useEffect, useState } from 'react';
import useWebSocketQr from '../logics/useWebSocketQr';
import { $apiTokenInstance, $authorization, $idInstance, setApiTokenInstance, setAuthorization, setIdInstance } from '../../../common/function/stores';
import { useStore } from 'effector-react';
import { InLogout } from '../logics/InLogout';

export const Authorization = () => {
    const apiTokenInstance = useStore($apiTokenInstance);
    const idInstance = useStore($idInstance);
    const authorization = useStore($authorization);

    const [qr, setQR] = useState<any | null>(null);
    const [check, setCheck] = useState<boolean>(false);

    const { messages } = useWebSocketQr({ check });

    const establishSocketConnection = () => {
        setCheck(prevCheck => !prevCheck);
    };

    const logout = async () => {
        try {
            const result = await InLogout({ idInstance, apiTokenInstance });
            if (result) {
                setAuthorization(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (messages && messages.length) {
            const result = JSON.parse(messages[messages.length - 1]).message;
            if (result === "Instance already logged") {
                setAuthorization(true);
                setQR(null);
            } else {
                setAuthorization(false);
                setQR(result);
            }
        }
    }, [messages]);

    const handleIdInstanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIdInstance(event.target.value);
    };

    const handleApiTokenInstanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setApiTokenInstance(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        establishSocketConnection();
    };

    return (
        <div className="Authorization">
            <form onSubmit={handleSubmit}>
                <input required type="text" placeholder="IdInstance" value={idInstance} onChange={handleIdInstanceChange} />
                <input required type="text" placeholder="ApiTokenInstance" value={apiTokenInstance} onChange={handleApiTokenInstanceChange} />
                {!authorization ? (
                    <input type="submit" value={check ? "authorization process" : "authorization attempt"} />
                ) : (
                    <button onClick={logout}>log out</button>
                )}
            </form>
            {qr && <img src={`data:image/png;base64, ${qr}`} alt="QR code" />}
        </div>
    );
};
