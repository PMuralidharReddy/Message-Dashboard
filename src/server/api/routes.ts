import express from 'express';
import rateLimit from 'express-rate-limit';
import env from '../config/env';
import twitterService from './twitter/twitter.service';
import telegramService from './telegram/telegram.service';
import quoraService from './quora/quora.service';
import logger from '../utils/logger';

const router = express.Router();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: parseInt(env.RATE_LIMIT_WINDOW) * 60 * 1000,
  max: parseInt(env.RATE_LIMIT_MAX_REQUESTS),
});

router.use(limiter);

// Twitter routes
router.post('/twitter/tweet', async (req, res) => {
  try {
    const { text, userId } = req.body;
    const tweet = await twitterService.tweet(text, userId);
    res.json(tweet);
  } catch (error) {
    logger.error('Twitter tweet error:', error);
    res.status(500).json({ error: 'Failed to post tweet' });
  }
});

router.get('/twitter/timeline/:userId', async (req, res) => {
  try {
    const timeline = await twitterService.getTimeline(req.params.userId);
    res.json(timeline);
  } catch (error) {
    logger.error('Twitter timeline error:', error);
    res.status(500).json({ error: 'Failed to fetch timeline' });
  }
});

router.get('/twitter/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Query parameter required' });
    }
    const tweets = await twitterService.searchTweets(q as string);
    res.json(tweets);
  } catch (error) {
    logger.error('Twitter search error:', error);
    res.status(500).json({ error: 'Failed to search tweets' });
  }
});

// Telegram routes
router.post('/telegram/message', async (req, res) => {
  try {
    const { chatId, text } = req.body;
    const result = await telegramService.sendMessage(chatId, text);
    res.json(result);
  } catch (error) {
    logger.error('Telegram message error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

router.get('/telegram/updates/:chatId', async (req, res) => {
  try {
    const updates = await telegramService.getUpdates(req.params.chatId);
    res.json(updates);
  } catch (error) {
    logger.error('Telegram updates error:', error);
    res.status(500).json({ error: 'Failed to get updates' });
  }
});

// Quora routes
router.get('/quora/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Query parameter required' });
    }
    const questions = await quoraService.searchQuestions(q as string);
    res.json(questions);
  } catch (error) {
    logger.error('Quora search error:', error);
    res.status(500).json({ error: 'Failed to search questions' });
  }
});

router.get('/quora/profile/:username', async (req, res) => {
  try {
    const profile = await quoraService.getUserProfile(req.params.username);
    res.json(profile);
  } catch (error) {
    logger.error('Quora profile error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

export default router;