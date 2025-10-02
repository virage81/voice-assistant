'use client';

import { Button } from '@/components/ui/button';
import { Status } from '@/types';
import { Mic } from 'lucide-react';
import { useMemo } from 'react';

interface MicrophoneButtonProps {
	status: Status;
	onClick: () => void;
}

export function MicrophoneButton({ status, onClick }: MicrophoneButtonProps) {
	const isActive = useMemo(() => status === 'listening' || status === 'talking', [status]);
	const isDisabled = useMemo(() => status === 'loading' || status === 'processing', [status]);

	return (
		<div className='relative'>
			{isActive && <div className='absolute inset-0 rounded-full bg-accent/30 animate-ping' />}

			{status === 'listening' && (
				<div className='absolute inset-0 rounded-full border-4 border-primary animate-pulse' />
			)}

			<Button
				onClick={onClick}
				disabled={isDisabled}
				size='lg'
				className={`
          relative w-24 h-24 rounded-full transition-all duration-300
          ${isActive ? 'bg-accent hover:bg-accent/90 scale-110' : 'bg-primary hover:bg-primary/90'}
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
          shadow-lg hover:shadow-xl
        `}>
				<Mic className='w-10 h-10 text-primary-foreground' />
			</Button>
		</div>
	);
}
