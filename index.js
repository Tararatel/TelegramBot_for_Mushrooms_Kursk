const TelegramApi = require('node-telegram-bot-api');
const { Sequelize } = require('sequelize');
const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD, DATABASE_URL } = process.env;

// export const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
// 	host: DB_HOST,
// 	dialect: 'postgres',
// 	logging: false,
// });

const sequelize = new Sequelize(DATABASE_URL, {
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
});

const token = '5371501689:AAH814sNx68iyVyjROFSiDZM6WalKoRBzck';

const bot = new TelegramApi(token, { polling: true });

const start = async () => {
	try {
		sequelize.authenticate().then(() => {
			console.log('Postgres connection has been established successfully.');
		});
		await sequelize.sync();
	} catch (e) {
		console.log('Подключение к БД не удалось', e);
	}

	bot.setMyCommands([
		{ command: '/start', description: 'Запустить бота' },
		{ command: '/send', description: 'Отправить координаты' },
	]);

	try {
		bot.on('message', async (msg) => {
			const text = msg.text;
			const chatId = msg.chat.id;

			if (text === '/start') {
				await bot.sendSticker(
					chatId,
					'https://tlgrm.ru/_/stickers/81a/4f6/81a4f635-870c-370c-830d-02004b54e0a8/6.webp'
				);
				return bot.sendMessage(chatId, `Приветствую тебя, путник!`);
			}
			return bot.sendMessage(chatId, 'Эта команда не поддерживается ботом');
		});
	} catch (e) {
		console.log('Какая-то ошибка', e);
	}
};

start();
