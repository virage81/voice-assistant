import { useEffect, useState } from 'react';
import { assistant } from './assistant';
import { vapiClient } from './client';

export enum VapiStatus {
	Inactive = 'inactive',
	Loading = 'loading',
	Active = 'active',
	Error = 'error',
}

type UseVapiReturn = {
	startCall: () => void;
	stopCall: () => void;
	status: VapiStatus;
	error?: string;
};

interface VapiErrorEvent {
	message?: string;
}

export function useVapi(): UseVapiReturn {
	const [status, setStatus] = useState<VapiStatus>(VapiStatus.Inactive);
	const [error, setError] = useState<string | undefined>(undefined);

	useEffect(() => {
		setStatus(VapiStatus.Loading);
		try {
			const handleError = (err: VapiErrorEvent) => {
				setStatus(VapiStatus.Error);
				setError(err.message || 'Unknown error');
			};

			vapiClient.on('error', handleError);

			setStatus(VapiStatus.Inactive);

			return () => {
				vapiClient.off('error', handleError);
				vapiClient.stop();
			};
		} catch (err) {
			const errorObj = err as { message?: string };
			setStatus(VapiStatus.Error);
			setError(errorObj.message || 'Unknown error');
		}
	}, []);

	const startCall = () => {
		if (status === VapiStatus.Inactive && vapiClient) {
			setStatus(VapiStatus.Loading);
			try {
				vapiClient.start(assistant);
				setStatus(VapiStatus.Active);
				setError(undefined);
			} catch (err) {
				const errorObj = err as { message?: string };
				setStatus(VapiStatus.Error);
				setError(errorObj.message || 'Unknown error');
			}
		}
	};

	const stopCall = () => {
		if (status === VapiStatus.Active && vapiClient) {
			try {
				vapiClient.stop();
				setStatus(VapiStatus.Inactive);
				setError(undefined);
			} catch (err) {
				const errorObj = err as { message?: string };
				setStatus(VapiStatus.Error);
				setError(errorObj.message || 'Unknown error');
			}
		}
	};

	return { startCall, stopCall, status, error };
}
