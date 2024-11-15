import React, { useState } from 'react';
import { MessageSquare, Star, Archive, Trash2, Loader2, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSocialMedia } from '../../hooks/useSocialMedia';
import { telegramApi } from '../../services/socialMedia';

export default function UnifiedInbox() {
  const { user } = useAuth();
  const { data: { telegram }, refreshTelegram } = useSocialMedia(user?.id || '');
  const [newMessage, setNewMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    setIsSending(true);
    try {
      await telegramApi.sendMessage(selectedChat, newMessage);
      setNewMessage('');
      refreshTelegram();
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  if (telegram.loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        <span className="ml-2 text-gray-600">Loading messages...</span>
      </div>
    );
  }

  if (telegram.error) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 text-center">
          <p className="text-red-600">{telegram.error}</p>
          <button
            onClick={refreshTelegram}
            className="mt-2 text-indigo-600 hover:text-indigo-500"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Unified Inbox</h2>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <Star className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <Archive className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-500">
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {telegram.messages.map((message: any) => (
          <div
            key={message.id}
            className={`px-6 py-4 hover:bg-gray-50 cursor-pointer ${
              selectedChat === message.chatId ? 'bg-indigo-50' : ''
            }`}
            onClick={() => setSelectedChat(message.chatId)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-5 w-5 text-gray-400" />
                <span className="font-medium text-gray-900">{message.sender}</span>
                <span className="text-sm text-gray-500">{message.platform}</span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
              {message.content}
            </p>
          </div>
        ))}
        
        {telegram.messages.length === 0 && (
          <div className="px-6 py-8 text-center text-gray-500">
            No messages yet
          </div>
        )}
      </div>

      {selectedChat && (
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={isSending || !newMessage.trim()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}