import Vapi from '@vapi-ai/web';

export * from './assistant';
export * from './types';

const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_API_KEY!);

export default vapi;
