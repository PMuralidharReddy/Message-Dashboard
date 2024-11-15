import React, { useState } from 'react';
import { Send, Image, Link, Loader2 } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { twitterApi, telegramApi } from '../../services/socialMedia';

export default function QuickActions() {
  const { authState } = useAuth();
  const [message, setMessage] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isPosting, setIsPosting] = useState(false);

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const handlePost = async () => {
    if (!message.trim() || selectedPlatforms.length === 0) return;

    setIsPosting(true);
    try {
      const promises = selectedPlatforms.map(platform => {
        switch (platform) {
          case 'twitter':
            return twitterApi.postTweet(message, '');
          case 'telegram':
            return telegramApi.sendMessage('', message);
          default:
            return Promise.resolve();
        }
      });

      await Promise.all(promises);
      setMessage('');
      setSelectedPlatforms([]);
    } catch (error) {
      console.error('Failed to post message:', error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="space-y-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
        />

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100">
              <Image className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100">
              <Link className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              {Object.entries(authState).map(([platform, state]) => (
                state.isAuthenticated && (
                  <button
                    key={platform}
                    onClick={() => handlePlatformToggle(platform)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedPlatforms.includes(platform)
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {platform}
                  </button>
                )
              ))}
            </div>

            <button
              onClick={handlePost}
              disabled={isPosting || !message.trim() || selectedPlatforms.length === 0}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPosting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}