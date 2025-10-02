'use client';

import { Status } from '@/types';
import { Loader2, Mic, Radio, Waves } from 'lucide-react';
import { useMemo } from 'react';

interface StatusIndicatorProps {
	status: Status;
}

const getStatusConfig = (status: Status) => {
	switch (status) {
		case 'loading':
			return {
				icon: <Loader2 className='w-6 h-6 animate-spin' />,
				text: 'Loading...',
				color: 'text-muted-foreground',
			};
		case 'listening':
			return {
				icon: <Mic className='w-6 h-6 animate-pulse' />,
				text: 'Listening...',
				color: 'text-primary',
			};
		case 'processing':
			return {
				icon: <Radio className='w-6 h-6' />,
				text: 'Processing...',
				color: 'text-accent',
			};
		case 'talking':
			return {
				icon: <Waves className='w-6 h-6 animate-pulse' />,
				text: 'Speaking...',
				color: 'text-accent',
			};
		default:
			return {
				icon: <Mic className='w-6 h-6' />,
				text: 'Ready',
				color: 'text-muted-foreground',
			};
	}
};

export function StatusIndicator({ status }: StatusIndicatorProps) {
	const config = useMemo(() => getStatusConfig(status), [status]);

	return (
		<div className='flex flex-col items-center gap-3'>
			<div className={`${config.color} transition-colors duration-300`}>{config.icon}</div>
			<p className={`text-sm font-medium ${config.color} transition-colors duration-300`}>{config.text}</p>
		</div>
	);
}
