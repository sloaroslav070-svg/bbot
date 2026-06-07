require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error('Error: TELEGRAM_BOT_TOKEN not found in .env file');
  process.exit(1);
}

// Создаем бота
const bot = new TelegramBot(token, { polling: true });

console.log('Bot started successfully ✅');

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    'Привет! 👋\n\nЭто твой Telegram бот.\n\nДоступные команды:\n/start - Начало\n/help - Помощь\n/ping - Проверка статуса'
  );
});

// Обработка команды /help
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    'Справка по командам:\n\n' +
      '/start - Приветствие\n' +
      '/help - Эта справка\n' +
      '/ping - Проверить, работает ли бот\n' +
      '/time - Текущее время\n' +
      'Просто напиши мне что-нибудь, и я отвечу!'
  );
});

// Обработка команды /ping
bot.onText(/\/ping/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Pong! 🏓 Бот работает нормально.');
});

// Обработка команды /time
bot.onText(/\/time/, (msg) => {
  const chatId = msg.chat.id;
  const currentTime = new Date().toLocaleString('ru-RU');
  bot.sendMessage(chatId, `⏰ Текущее время: ${currentTime}`);
});

// Обработка обычных сообщений
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;

  // Игнорируем команды (они обработаны выше)
  if (messageText.startsWith('/')) {
    return;
  }

  // Отвечаем на обычные сообщения
  const reply = `Ты написал: "${messageText}"\n\nЯ получил твое сообщение! 😊`;
  bot.sendMessage(chatId, reply);
});

// Обработка ошибок
bot.on('polling_error', (error) => {
  if (error.code === 'ETIMEOUT') {
    console.log('Timeout error');
  } else if (error.code === 'EFATAL') {
    console.log('Fatal error:', error.message);
    process.exit(1);
  } else {
    console.log('Error:', error);
  }
});

console.log('Bot is running... Press Ctrl+C to stop');
