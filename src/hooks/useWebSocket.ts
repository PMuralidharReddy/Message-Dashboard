import { useEffect, useRef, useState, useCallback } from 'react';

interface WebSocketMessage {
  type: 'message' | 'notification' | 'status';
  data: {
    id: string;
    platform: string;
    sender: string;
    content: string;
    timestamp: string;
  };
}

export function useWebSocket(url: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    // Simulate WebSocket connection
    setIsConnected(true);
    
    // Simulate receiving messages
    const interval = setInterval(() => {
      const platforms = ['Twitter', 'Facebook', 'Instagram', 'LinkedIn'];
      const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
      
      const newMessage: WebSocketMessage = {
        type: 'message',
        data: {
          id: crypto.randomUUID(), // Ensure unique ID
          platform: randomPlatform,
          sender: `${randomPlatform} User`,
          content: `New message from ${randomPlatform} at ${new Date().toLocaleTimeString()}`,
          timestamp: new Date().toISOString()
        }
      };
      
      setMessages(prev => [...prev, newMessage]);
    }, 5000);

    return () => clearInterval(interval);
  }, [url]);

  useEffect(() => {
    const cleanup = connect();
    return () => {
      cleanup();
      setIsConnected(false);
    };
  }, [connect]);

  const sendMessage = useCallback((message: any) => {
    if (isConnected) {
      console.log('Sending message:', message);
    }
  }, [isConnected]);

  return {
    isConnected,
    messages,
    sendMessage
  };
}