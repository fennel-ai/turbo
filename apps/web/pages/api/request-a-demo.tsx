import { NextApiRequest, NextApiResponse } from 'next';
import sendMail from '../../emails';
import Welcome from '../../emails/Welcome';

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse,
) {
	const { body } = request;

	await sendMail({
		to: 'luke@fennel.ai',
		subject: 'test',
		component: <Welcome />
	});
	
	response.status(200).json({
		body: {
			"status": "ok"
		},
		query: request.query,
		cookies: request.cookies,
	});
}