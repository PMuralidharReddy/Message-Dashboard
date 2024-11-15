import React from 'react';
import { Bell, Heart, MessageCircle, Repeat, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSocialMedia } from '../../hooks/useSocialMedia';

export default function NotificationsPanel() {
  const { user } = useAuth();
  const { data, refreshAll } = useSocialMedia(user?.id || '');

  const isLoading = data.twitter.loading || data.telegram.loading || data.quora.loading;
  const hasError = data.twitter.error || data.telegram.error || data.quora.error;

  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="h-5 w-5 text-pink-500" />;
      case 'comment':
        return <MessageCircle className="h-5 w-5 text-blue-500" />;
      case 'repost':
        return <Repeat className="h-5 w-5 text-green-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 flex items-center justify-center">
          <RefreshCw className="h-6 w-6 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading notifications...</span>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 text-center">
          <p className="text-red-600">Failed to load notifications</p>
          <button
            onClick={refreshAll}
            className="mt-2 text-indigo-600 hover:text-indigo-500"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // Combine and sort notifications from all platforms
  const allNotifications = [
    ...data.twitter.timeline.map((tweet: any) => ({
      id: `twitter-${tweet.id}`,
      type: 'post',
      user: tweet.author.name,
      action: 'posted a new tweet',
      time: tweet.createdAt,
      platform: 'twitter',
    })),
    ...data.telegram.messages.map((message: any) => ({
      id: `telegram-${message.id}`,
      type: 'message',
      user: message.sender,
      action: 'sent a message',
      time: message.timestamp,
      platform: 'telegram',
    })),
  ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
        <button
          onClick={refreshAll}
          className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>
      
      <div className="divide-y divide-gray-200">
        {allNotifications.map((notification) => (
          <div
            key={notification.id}
            className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{notification.user}</span>{' '}
                  {notification.action}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(notification.time).toLocaleTimeString()} · {notification.platform}
                </p>
              </div>
            </div>
          </div>
        ))}

        {allNotifications.length === 0 && (
          <div className="px-6 py-8 text-center text-gray-500">
            No notifications yet
          </div>
        )}
      </div>
    </div>
  );
}