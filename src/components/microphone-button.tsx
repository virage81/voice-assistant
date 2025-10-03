'use client';

import { Button } from '@/components/ui/button';
import { CALL_STATUS } from '@/lib/vapi';
import { Mic } from 'lucide-react';
import { useMemo } from 'react';

interface MicrophoneButtonProps {
	status: CALL_STATUS;
	onClick: () => void;
}

export function MicrophoneButton({ status, onClick }: MicrophoneButtonProps) {
	const isActive = useMemo(() => status === CALL_STATUS.ACTIVE, [status]);
	const isDisabled = useMemo(() => status === CALL_STATUS.LOADING, [status]);

	return (
		<div className='relative'>
			{isActive && <div className='absolute inset-0 rounded-full bg-accent/30 animate-ping' />}

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
