import vapiClient from '@/lib/vapi';
import { assistantConfig } from '@/lib/vapi/assistant';
import { VapiMessage } from '@/types/vapi';
import { useCallback, useEffect, useState } from 'react';

export type VapiStatus =
	| 'idle'
	| 'starting'
	| 'active'
	| 'listening'
	| 'processing'
	| 'checking-availability'
	| 'creating-event'
	| 'success'
	| 'error'
	| 'ended';

interface UseVapiReturn {
	isCallActive: boolean;
	status: VapiStatus;
	statusMessage: string;
	startCall: () => Promise<void>;
	endCall: () => Promise<void>;
}

export function useVapi(): UseVapiReturn {
	const [isCallActive, setIsCallActive] = useState(false);
	const [status, setStatus] = useState<VapiStatus>('idle');
	const [statusMessage, setStatusMessage] = useState<string>('Ready to start');

	useEffect(() => {
		// Set up Vapi event listeners
		vapiClient.on('call-start', () => {
			setIsCallActive(true);
			setStatus('active');
			setStatusMessage('Call started');
		});

		vapiClient.on('call-end', () => {
			setIsCallActive(false);
			setStatus('ended');
			setStatusMessage('Call ended');
		});

		vapiClient.on('speech-start', () => {
			setStatus('listening');
			setStatusMessage('Listening...');
		});

		vapiClient.on('speech-end', () => {
			setStatus('processing');
			setStatusMessage('Processing...');
		});

		vapiClient.on('error', (error: Error) => {
			console.error('Vapi error:', error);
			setStatus('error');
			setStatusMessage(`Error: ${error.message || 'Unknown error'}`);
		});

		vapiClient.on('message', async (message: VapiMessage) => {
			console.log('Vapi message:', message);
		});

		return () => {
			// Clean up event listeners
			vapiClient.removeAllListeners();
		};
	}, []);

	const startCall = useCallback(async () => {
		try {
			setStatus('starting');
			setStatusMessage('Starting call...');
			await vapiClient.start(assistantConfig);
		} catch (error) {
			console.error('Error starting call:', error);
			setStatus('error');
			setStatusMessage('Failed to start call');
		}
	}, []);

	const endCall = useCallback(async () => {
		try {
			await vapiClient.stop();
			setStatus('ended');
			setStatusMessage('Call ended');
		} catch (error) {
			console.error('Error ending call:', error);
			setStatus('error');
			setStatusMessage('Error ending call');
		}
	}, []);

	return {
		isCallActive,
		status,
		statusMessage,
		startCall,
		endCall,
	};
}
