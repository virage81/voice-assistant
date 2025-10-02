'use client';

import { MicrophoneButton } from '@/components/microphone-button';
import { StatusIndicator } from '@/components/status-indicator';
import { Status } from '@/types';
import { useRef, useState } from 'react';

export default function Home() {
	const [status, setStatus] = useState<Status>('idle');
	const recognitionRef = useRef<any>(null);
	const synthRef = useRef<SpeechSynthesis | null>(null);

	const handleMicrophoneClick = async () => {
		if (status === 'listening') {
			if (recognitionRef.current) {
				recognitionRef.current.stop();
			}
			setStatus('idle');
			return;
		}

		if (status === 'talking') {
			if (synthRef.current) {
				synthRef.current.cancel();
			}
			setStatus('idle');
			return;
		}

		if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
			alert('Speech recognition is not supported in your browser.');
			return;
		}

		setStatus('loading');

		const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
		const recognition = new SpeechRecognition();

		recognition.continuous = false;
		recognition.interimResults = false;
		recognition.lang = 'en-US';

		recognition.onstart = () => {
			setStatus('listening');
		};

		recognition.onresult = async (event: any) => {
			const speechResult = event.results[0][0].transcript;
			setStatus('processing');

			try {
				const res = await fetch('/api/chat', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ question: speechResult }),
				});

				const data = await res.json();

				setStatus('talking');
				const synth = window.speechSynthesis;
				synthRef.current = synth;
				const utterance = new SpeechSynthesisUtterance(data.answer);

				utterance.onend = () => {
					setStatus('idle');
				};

				synth.speak(utterance);
			} catch (error) {
				console.error('Error getting AI response:', error);
				setStatus('idle');
			}
		};

		recognition.onerror = (event: any) => {
			console.error('Speech recognition error:', event.error);
			setStatus('idle');
		};

		recognition.onend = () => {
			setStatus('listening');
		};

		recognitionRef.current = recognition;
		recognition.start();
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-8 gap-12'>
			<div className='text-center space-y-2'>
				<h1 className='text-4xl font-bold text-balance'>AI Voice Assistant</h1>
				<p className='text-muted-foreground text-pretty'>Click the microphone to ask a question</p>
			</div>

			<div className='flex flex-col items-center gap-8'>
				<MicrophoneButton status={status} onClick={handleMicrophoneClick} />
				<StatusIndicator status={status} />
			</div>
		</main>
	);
}
