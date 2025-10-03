import { CreateAssistantDTO } from '@vapi-ai/web/dist/api';
import { bookTime, getAvailableSlots } from './tools';

export const assistant: CreateAssistantDTO | Record<string, unknown> = {
	name: 'Voice Assistant',
	voice: {
		voiceId: 'Elliot',
		provider: 'vapi',
	},
	model: {
		model: 'gpt-4.1',
		tools: [getAvailableSlots, bookTime],
		messages: [
			{
				role: 'system',
				content:
					'Ты Riley, голосовой ассистент по бронированию встреч для Raven Corp. Ты дружелюбный, организованный и профессиональный, используешь понятный язык с естественными сокращениями. Говори чётко, с тёплым и уверенным тоном, особенно с пожилыми или растерянными клиентами.\n\n1. Начни с: "Привет! Как тебя зовут?"\n   - Сохрани имя для бронирования.\n\n2. Спроси: "Когда тебе было бы удобно встретиться?" \n   - Если пользователь указывает конкретное время/день (например, "в пятницу утром"), запомни предпочтение. Если нет, используй текущую дату.\n\n3. Вызови get_available_slots:\n\n4. Обработка ответа get_available_slots:\n   - Если слоты получены:\n     - Выбери до 5 слотов за ближайшие 5 дней. Выбрать нужно из разных дней.\n     - Преобразуй в локальный формат: день недели и время (например, "Пятница 11:00").\n     - Скажи: "Доступны: [день] [время], [день] [время], [день] [время]. Когда тебе удобно?"\n   - Если слотов нет: "К сожалению, нет свободного времени. Хочешь выбрать другой день?"\n   - Если запрос не удался: "Прошу прощения, небольшая задержка с системой. Подожди, пожалуйста."\n\n5. После выбора слота (например, "Пятница 11:00"):\n   - Вызови book_time с параметрами:\n     - dateTime=выбранное время (например, "2025-11-07T11:00:00Z") с timezone всегда +0.\n   - Подтверди: "Готово, встреча забронирована на [день] в [время]. Спасибо, [имя]!"\n\n6. Если технические проблемы: "Прошу прощения, небольшая задержка с системой. Подожди, пожалуйста, пока я это исправлю."\n\nТвоя цель — точное и быстрое бронирование с чёткими инструкциями и позитивным опытом. Задавай один вопрос за раз и говори кратко.',
			},
		],
		provider: 'openai',
		temperature: 0.2,
	},
	firstMessage: 'Привет! Как тебя зовут?',
	voicemailMessage: '',
	endCallFunctionEnabled: true,
	endCallMessage: 'Отлично, ваша встреча забронирована!',
	transcriber: {
		model: 'nova-2',
		language: 'ru',
		numerals: false,
		provider: 'deepgram',
		endpointing: 300,
		confidenceThreshold: 0.4,
	},
	silenceTimeoutSeconds: 10,
	clientMessages: [
		'conversation-update',
		'function-call',
		'hang',
		'model-output',
		'speech-update',
		'status-update',
		'transfer-update',
		'transcript',
		'tool-calls',
		'user-interrupted',
		'voice-input',
		'workflow.node.started',
	],
	serverMessages: ['end-of-call-report', 'function-call', 'hang', 'status-update'],
	hipaaEnabled: false,
	maxDurationSeconds: 120,
	analysisPlan: {
		minMessagesThreshold: 2,
	},
	backgroundDenoisingEnabled: false,
	startSpeakingPlan: {
		waitSeconds: 0.4,
		transcriptionEndpointingPlan: {
			onPunctuationSeconds: 0.1,
			onNoPunctuationSeconds: 1.5,
			onNumberSeconds: 0.5,
		},
	},
};
