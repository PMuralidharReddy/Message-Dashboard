import React, { useState } from 'react';
import { MessageCircle, Heart, Share2, Bookmark, RefreshCw, Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSocialMedia } from '../../hooks/useSocialMedia';
import { twitterApi } from '../../services/socialMedia';

export default function SocialFeed() {
  const { user } = useAuth();
  const { data, refreshTwitter } = useSocialMedia(user?.id || '');
  const [newTweet, setNewTweet] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const handlePostTweet = async () => {
    if (!newTweet.trim() || !user) return;

    setIsPosting(true);
    try {
      await twitterApi.postTweet(newTweet, user.id);
      setNewTweet('');
      refreshTwitter();
    } catch (error) {
      console.error('Failed to post tweet:', error);
    } finally {
      setIsPosting(false);
    }
  };

  if (data.twitter.loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (data.twitter.error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-800">{data.twitter.error}</p>
        <button
          onClick={refreshTwitter}
          className="mt-2 text-red-600 hover:text-red-500"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* New Tweet Input */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex space-x-4">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&q=60'}
            alt={user?.name}
            className="h-10 w-10 rounded-full"
          />
          <div className="flex-1">
            <textarea
              value={newTweet}
              onChange={(e) => setNewTweet(e.target.value)}
              placeholder="What's happening?"
              className="w-full border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              rows={3}
            />
            <div className="mt-2 flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {280 - newTweet.length} characters remaining
              </div>
              <button
                onClick={handlePostTweet}
                disabled={isPosting || !newTweet.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPosting ? (
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Tweet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      {Array.isArray(data.twitter.timeline) && data.twitter.timeline.length > 0 ? (
        data.twitter.timeline.map((tweet) => (
          <div key={tweet.id} className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 flex items-center space-x-3">
              <div className="flex-shrink-0">
                <img
                  src={tweet.author.avatar || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&q=60`}
                  alt={tweet.author.name}
                  className="h-10 w-10 rounded-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{tweet.author.name}</p>
                <p className="text-sm text-gray-500">{tweet.createdAt}</p>
              </div>
            </div>
            
            <div className="px-6 py-2">
              <p className="text-gray-900">{tweet.text}</p>
            </div>
            
            {tweet.media && (
              <div className="relative h-64 w-full">
                <img
                  src={tweet.media}
                  alt="Tweet media"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-pink-500">
                  <Heart className="h-5 w-5" />
                  <span className="text-sm">{tweet.likes}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm">{tweet.replies}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500">
                  <Share2 className="h-5 w-5" />
                  <span className="text-sm">{tweet.retweets}</span>
                </button>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <Bookmark className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-500">No tweets to display</p>
        </div>
      )}
    </div>
  );
}