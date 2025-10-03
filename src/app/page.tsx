'use client';
import { useVapi, VapiStatus } from '@/lib/vapi/use-vapi';
import { useMemo } from 'react';

export default function VoiceAssistant() {
	const { startCall, status, stopCall } = useVapi();

	const isActive = useMemo(() => status === VapiStatus.Active, [status]);
	const isLoading = useMemo(() => status === VapiStatus.Loading, [status]);

	return (
		<div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4'>
			<div className='max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center'>
				<h1 className='text-2xl font-bold text-gray-800 mb-4'>Voice Assistant</h1>
				<p className='text-gray-600 mb-6'>
					Click the button below to start speaking. The assistant will transcribe your voice in real-time.
				</p>

				<div className='flex justify-center items-center mb-6'>
					<span
						className={`inline-block w-4 h-4 rounded-full mr-2 ${
							isLoading ? 'bg-green-500 animate-pulse' : 'bg-red-500'
						}`}></span>
					<span className='text-gray-700'>
						{isLoading ? 'Loading...' : isActive ? 'Listening...' : 'Not Listening'}
					</span>
				</div>

				<button
					onClick={status !== VapiStatus.Active ? startCall : stopCall}
					className={`px-6 py-3 rounded-full font-semibold text-white transition-colors duration-300 ${
						isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
					}`}>
					{isActive ? 'End Call' : 'Start Call'}
				</button>

				<p className='text-sm text-gray-500 mt-6'>
					Tip: Ensure your microphone is enabled and speak clearly. Works best in a quiet environment!
				</p>
			</div>
		</div>
	);
}
