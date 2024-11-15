import React from 'react';
import { MessageSquare, Search, MoreVertical } from 'lucide-react';

const conversations = [
  {
    id: 1,
    name: 'Sarah Wilson',
    message: 'Hey, how are you doing?',
    time: '5m ago',
    unread: 2,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&q=60',
  },
  {
    id: 2,
    name: 'Alex Thompson',
    message: 'The project looks great! When can we...',
    time: '2h ago',
    unread: 0,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&q=60',
  },
];

export default function MessagesPage() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="border-b border-gray-200">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
        </div>
        <div className="px-6 py-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="px-6 py-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <img
                src={conversation.avatar}
                alt={conversation.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-sm font-medium text-gray-900">
                    {conversation.name}
                  </h2>
                  <span className="text-xs text-gray-500">{conversation.time}</span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {conversation.message}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {conversation.unread > 0 && (
                <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-600 text-xs font-medium text-white">
                  {conversation.unread}
                </span>
              )}
              <button className="text-gray-400 hover:text-gray-500">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}