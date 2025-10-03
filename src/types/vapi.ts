// Vapi message types
export interface VapiFunctionCall {
	id: string;
	name: string;
	parameters: Record<string, string | number | boolean>;
}

export interface VapiMessage {
	type: string;
	functionCall?: VapiFunctionCall;
	transcript?: string;
	[key: string]: unknown;
}

export interface VapiError {
	action: string;
	errorMsg: string;
	error: Record<string, unknown>;
	callClientId: string;
}

export interface VapiFunctionResponse {
	type: 'add-message';
	message: {
		role: 'function';
		name: string;
		content: string;
	};
}

// API response types
export interface TimeSlot {
	date: string;
}

export interface AvailabilityResponse {
	slots: TimeSlot[];
}

export interface EventResponse {
	event: {
		id: string;
		title: string;
		description: string;
		when: {
			time: number;
			timezone: string;
		};
	};
}

export interface ErrorResponse {
	success: false;
	error: string;
}
