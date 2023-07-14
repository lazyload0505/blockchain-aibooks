import { cookies } from 'next/headers';

export const runtime = 'edge';

export async function GET(request: Request) {
	return new Response('Test open AI proxy', {
		status: 200,
	});
}