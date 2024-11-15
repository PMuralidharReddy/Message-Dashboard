import axios from 'axios';

const API_BASE_URL = '/api';

// Twitter API calls
export const twitterApi = {
  async authenticate() {
    const response = await axios.post(`${API_BASE_URL}/twitter/auth`);
    return response.data;
  },

  async disconnect() {
    const response = await axios.post(`${API_BASE_URL}/twitter/disconnect`);
    return response.data;
  },

  async getTimeline(userId: string) {
    const response = await axios.get(`${API_BASE_URL}/twitter/timeline/${userId}`);
    return response.data;
  },

  async postTweet(text: string, userId: string) {
    const response = await axios.post(`${API_BASE_URL}/twitter/tweet`, { text, userId });
    return response.data;
  },

  async searchTweets(query: string) {
    const response = await axios.get(`${API_BASE_URL}/twitter/search`, { params: { q: query } });
    return response.data;
  }
};

// Telegram API calls
export const telegramApi = {
  async authenticate() {
    const response = await axios.post(`${API_BASE_URL}/telegram/auth`);
    return response.data;
  },

  async disconnect() {
    const response = await axios.post(`${API_BASE_URL}/telegram/disconnect`);
    return response.data;
  },

  async sendMessage(chatId: string, text: string) {
    const response = await axios.post(`${API_BASE_URL}/telegram/message`, { chatId, text });
    return response.data;
  },

  async getUpdates(chatId: string) {
    const response = await axios.get(`${API_BASE_URL}/telegram/updates/${chatId}`);
    return response.data;
  }
};

// Quora API calls
export const quoraApi = {
  async authenticate() {
    const response = await axios.post(`${API_BASE_URL}/quora/auth`);
    return response.data;
  },

  async disconnect() {
    const response = await axios.post(`${API_BASE_URL}/quora/disconnect`);
    return response.data;
  },

  async searchQuestions(query: string) {
    const response = await axios.get(`${API_BASE_URL}/quora/search`, { params: { q: query } });
    return response.data;
  },

  async getUserProfile(username: string) {
    const response = await axios.get(`${API_BASE_URL}/quora/profile/${username}`);
    return response.data;
  }
};