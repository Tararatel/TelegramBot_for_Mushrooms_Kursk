require('dotenv').config();
const TelegramApi = require('node-telegram-bot-api');
const sequelize = require('./db');
const UserModel = require('./models');

const token = '5371501689:AAH814sNx68iyVyjROFSiDZM6WalKoRBzck';
const idAdmin = 269696052;

const bot = new TelegramApi(token, {
	polling: true,
});

const start = async () => {
	try {
		await sequelize.authenticate().then(() => {
			console.log('Подключение к БД прошло успешно.');
		});
		await sequelize.sync();
	} catch (e) {
		console.log('Подключение к БД не удалось', e);
	}

	bot.setMyCommands([
		{
			command: '/start',
			description: 'Запустить бота',
		},
		{
			command: '/send',
			description: 'Отправить координаты',
		},
	]);

	bot.on('message', async (msg) => {
		const text = msg.text;
		const chatId = msg.chat.id;
		const location = msg.location;

		try {
			if (text == '/start') {
				await bot.sendSticker(
					chatId,
					'https://tlgrm.ru/_/stickers/81a/4f6/81a4f635-870c-370c-830d-02004b54e0a8/6.webp'
				);
				return bot.sendMessage(
					chatId,
					`Приветствую тебя, путник! Если на твоём пути встретился гриб, отправь его координаты командой /send`
				);
			}
			if (text == '/send') {
				bot.onText(/send/, (msg) => {
					const opts = {
						reply_markup: JSON.stringify({
							keyboard: [[{ text: 'Отправить своё местоположение', request_location: true }]],
							resize_keyboard: true,
							one_time_keyboard: true,
						}),
					};
					bot.sendMessage(
						msg.chat.id,
						`
					Что делать?
					1. Нажми на кнопку "Отправить своё местоположение"
					2. Дай разрешение на отправку
					3. Отправь в чат название и фотографию гриба
					`,
						opts
					);
				});

				bot.on('location', async (msg) => {
					console.log(msg.location);

					// Тут надо что-то сделать с полученными координатами

					await UserModel.create({
						chatId,
						location,
					});
				});
			}
		} catch (e) {
			console.log('Какая-то ошибка', e);
		}
	});
};
start();
