import { Telegraf } from 'telegraf';
import env from '../../config/env';
import logger from '../../utils/logger';

class TelegramService {
  private bot: Telegraf;

  constructor() {
    this.bot = new Telegraf(env.TELEGRAM_BOT_TOKEN);
    this.setupBot();
  }

  private setupBot(): void {
    this.bot.command('start', (ctx) => {
      ctx.reply('Welcome to the Social Media Dashboard bot!');
    });

    this.bot.on('message', (ctx) => {
      logger.info('Received message:', ctx.message);
    });

    // Setup webhook if URL is provided
    if (env.TELEGRAM_WEBHOOK_URL) {
      this.bot.telegram.setWebhook(env.TELEGRAM_WEBHOOK_URL);
    }
  }

  async sendMessage(chatId: string, text: string): Promise<any> {
    try {
      const result = await this.bot.telegram.sendMessage(chatId, text);
      return result;
    } catch (error) {
      logger.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  }

  async getUpdates(chatId: string): Promise<any> {
    try {
      const updates = await this.bot.telegram.getUpdates();
      return updates.filter(update => 
        update.message?.chat.id.toString() === chatId
      );
    } catch (error) {
      logger.error('Error getting updates:', error);
      throw new Error('Failed to get updates');
    }
  }

  async getChatInfo(chatId: string): Promise<any> {
    try {
      const chat = await this.bot.telegram.getChat(chatId);
      return chat;
    } catch (error) {
      logger.error('Error getting chat info:', error);
      throw new Error('Failed to get chat info');
    }
  }
}

export default new TelegramService();