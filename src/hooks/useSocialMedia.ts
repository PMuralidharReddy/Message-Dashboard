import { useState, useEffect } from 'react';
import { twitterApi, telegramApi, quoraApi } from '../services/socialMedia';

interface TwitterData {
  timeline: Array<{
    id: string;
    author: {
      name: string;
      avatar?: string;
    };
    text: string;
    createdAt: string;
    likes: number;
    replies: number;
    retweets: number;
    media?: string;
  }>;
  loading: boolean;
  error: string | null;
}

interface TelegramData {
  messages: Array<{
    id: string;
    chatId: string;
    sender: string;
    content: string;
    timestamp: string;
    platform: string;
  }>;
  loading: boolean;
  error: string | null;
}

interface QuoraData {
  questions: any[];
  loading: boolean;
  error: string | null;
}

interface SocialMediaData {
  twitter: TwitterData;
  telegram: TelegramData;
  quora: QuoraData;
}

const initialState: SocialMediaData = {
  twitter: {
    timeline: [],
    loading: true,
    error: null
  },
  telegram: {
    messages: [],
    loading: true,
    error: null
  },
  quora: {
    questions: [],
    loading: true,
    error: null
  }
};

export function useSocialMedia(userId: string) {
  const [data, setData] = useState<SocialMediaData>(initialState);

  const fetchTwitterTimeline = async () => {
    try {
      setData(prev => ({
        ...prev,
        twitter: { ...prev.twitter, loading: true, error: null }
      }));
      const response = await twitterApi.getTimeline(userId);
      // Ensure the response is properly formatted
      const timeline = Array.isArray(response) ? response : [];
      setData(prev => ({
        ...prev,
        twitter: { timeline, loading: false, error: null }
      }));
    } catch (error) {
      setData(prev => ({
        ...prev,
        twitter: { ...prev.twitter, loading: false, error: 'Failed to fetch Twitter timeline' }
      }));
    }
  };

  const fetchTelegramUpdates = async () => {
    try {
      setData(prev => ({
        ...prev,
        telegram: { ...prev.telegram, loading: true, error: null }
      }));
      const response = await telegramApi.getUpdates(userId);
      const messages = Array.isArray(response) ? response : [];
      setData(prev => ({
        ...prev,
        telegram: { messages, loading: false, error: null }
      }));
    } catch (error) {
      setData(prev => ({
        ...prev,
        telegram: { ...prev.telegram, loading: false, error: 'Failed to fetch Telegram updates' }
      }));
    }
  };

  const fetchQuoraQuestions = async () => {
    try {
      setData(prev => ({
        ...prev,
        quora: { ...prev.quora, loading: true, error: null }
      }));
      const response = await quoraApi.searchQuestions('');
      const questions = Array.isArray(response) ? response : [];
      setData(prev => ({
        ...prev,
        quora: { questions, loading: false, error: null }
      }));
    } catch (error) {
      setData(prev => ({
        ...prev,
        quora: { ...prev.quora, loading: false, error: 'Failed to fetch Quora questions' }
      }));
    }
  };

  const refreshAll = () => {
    fetchTwitterTimeline();
    fetchTelegramUpdates();
    fetchQuoraQuestions();
  };

  useEffect(() => {
    if (userId) {
      refreshAll();
      // Set up polling interval for real-time updates
      const interval = setInterval(refreshAll, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [userId]);

  return {
    data,
    refreshAll,
    refreshTwitter: fetchTwitterTimeline,
    refreshTelegram: fetchTelegramUpdates,
    refreshQuora: fetchQuoraQuestions
  };
}