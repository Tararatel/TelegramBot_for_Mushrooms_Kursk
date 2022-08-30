const TelegramApi = require('node-telegram-bot-api');

const token = '5371501689:AAH814sNx68iyVyjROFSiDZM6WalKoRBzck';

const bot = new TelegramApi(token, { polling: true });

const start = () => {
	bot.setMyCommands([
		{ command: '/start', description: 'Запустить бота' },
		{ command: '/send', description: 'Отправить координаты' },
	]);

	bot.on('message', async (msg) => {
		const text = msg.text;
		const chatId = msg.chat.id;

		if (text === '/start') {
			await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/81a/4f6/81a4f635-870c-370c-830d-02004b54e0a8/6.webp');
			await bot.sendMessage(chatId, `Приветствую тебя, путник!`);
		}
		return bot.sendMessage(chatId, 'Эта команда не поддерживается ботом');
	});
};

start();
