'use client';

import { MicrophoneButton } from '@/components/microphone-button';
import { StatusIndicator } from '@/components/status-indicator';
import { useVapi } from '@/hooks/useVapi';
import { CALL_STATUS } from '@/lib/vapi';

export default function Home() {
	const { start, stop, callStatus } = useVapi();

	const handleMicrophoneClick = async () => {
		if (callStatus === CALL_STATUS.INACTIVE) {
			start();
		}

		if (callStatus === CALL_STATUS.ACTIVE) {
			stop();
		}
	};

	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-8 gap-12'>
			<div className='text-center space-y-2'>
				<h1 className='text-4xl font-bold text-balance'>AI Voice Assistant</h1>
				<p className='text-muted-foreground text-pretty'>Click the microphone to ask a question</p>
			</div>

			<div className='flex flex-col items-center gap-8'>
				<MicrophoneButton status={callStatus} onClick={handleMicrophoneClick} />
				<StatusIndicator status={callStatus} />
			</div>
		</main>
	);
}
