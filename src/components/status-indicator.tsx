'use client';

import { CALL_STATUS } from '@/lib/vapi';
import { Loader2, Mic } from 'lucide-react';
import { useMemo } from 'react';

interface StatusIndicatorProps {
	status: CALL_STATUS;
}

const getStatusConfig = (status: CALL_STATUS) => {
	switch (status) {
		case CALL_STATUS.LOADING:
			return {
				icon: <Loader2 className='w-6 h-6 animate-spin' />,
				text: 'Loading...',
				color: 'text-muted-foreground',
			};
		case CALL_STATUS.ACTIVE:
			return {
				icon: <Mic className='w-6 h-6 animate-pulse' />,
				text: 'Listening...',
				color: 'text-primary',
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
