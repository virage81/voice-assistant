'use client';

import { useVapi } from '@/hooks/useVapi';

export default function Home() {
	const { isCallActive, statusMessage, startCall, endCall } = useVapi();

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4'>
			<div className='max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8'>
				{/* Header */}
				<div className='text-center mb-8'>
					<h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-2'>Voice Meeting Assistant</h1>
					<p className='text-gray-600 dark:text-gray-300'>Schedule your meeting using voice commands</p>
				</div>

				{/* Status Indicator */}
				<div className='mb-8'>
					<div className='flex items-center justify-center gap-3 mb-4'>
						<div
							className={`w-3 h-3 rounded-full transition-colors ${
								isCallActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
							}`}
						/>
						<span className='text-lg font-medium text-gray-700 dark:text-gray-200'>{statusMessage}</span>
					</div>
				</div>

				{/* Call Control Button */}
				<div className='flex justify-center mb-8'>
					{!isCallActive ? (
						<button
							onClick={startCall}
							className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-12 rounded-full text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg'>
							Start Call
						</button>
					) : (
						<button
							onClick={endCall}
							className='bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-12 rounded-full text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg'>
							End Call
						</button>
					)}
				</div>

				{/* Instructions */}
				<div className='mt-8 p-6 bg-blue-50 dark:bg-gray-700 rounded-lg'>
					<h3 className='text-sm font-semibold text-blue-900 dark:text-blue-200 mb-3 uppercase tracking-wide'>
						How it works
					</h3>
					<ol className='space-y-2 text-sm text-blue-800 dark:text-blue-300'>
						<li>1. Click &quot;Start Call&quot; to begin</li>
						<li>2. The assistant will ask for your name</li>
						<li>3. Tell the assistant when you&apos;d like to meet</li>
						<li>4. Choose from available time slots</li>
						<li>5. Confirm your booking</li>
					</ol>
				</div>
			</div>
		</div>
	);
}
