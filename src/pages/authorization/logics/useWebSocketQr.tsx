import { useState, useEffect } from 'react';
import { w3cwebsocket as WebSocket } from 'websocket';
import { $apiTokenInstance, $check, $idInstance } from '../../../common/function/stores';
import { useStore } from 'effector-react';

interface WebSocketState  {
  messages: string[];
  sendMessage: (message: string) => void;
  disconnect: () => void;
}

const useWebSocketQr = (params:{check:boolean}): WebSocketState => {
  const apiTokenInstance = useStore($apiTokenInstance);
  const idInstance = useStore($idInstance);
  
  const [client, setClient] = useState<WebSocket>();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (params.check && apiTokenInstance && idInstance) {
      const newClient = new WebSocket(`wss://api.green-api.com/waInstance${idInstance}/scanqrcode/${apiTokenInstance}`);
      setClient(newClient);
      return () => {
        newClient.close();
      };
    }
  }, [apiTokenInstance, idInstance, params.check]);

  useEffect(() => {
    if (!client) {
      return;
    }
    console.log(client)

    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message: any) => {
      setMessages((prevMessages) => [...prevMessages, message.data]);
    };
    client.onerror = (error: any) => {
      console.log(`WebSocket error: ${error}`);
    };
    client.onclose = () => {
      console.log('WebSocket closed');
    };
    
  }, [client]);

  const sendMessage = (message: string) => {
    if (client) {
      client.send(message);
    }
  };

  const disconnect = () => {
    if (client) {
      client.close();
    }
  };

  return {
    messages,
    sendMessage,
    disconnect,
  };
};

export default useWebSocketQr;