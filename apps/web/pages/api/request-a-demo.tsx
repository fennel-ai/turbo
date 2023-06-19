import { NextApiRequest, NextApiResponse } from 'next';
import sendMail from '../../emails';
import RequestADemoInternal from '../../emails/RequestADemoInternal';

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse,
) {
	const { body } = request;

	if (!body.name || !body.role || !body.email) {
		response.status(400).json({
			body: "Malformed Request Body"
		});
	}

	await sendMail({
		to: 'luke@fennel.ai',
		subject: `New Demo Request <${body.email}>`,
		component: <RequestADemoInternal name={body.name} role={body.role} email={body.email} />
	});
	
	response.status(200).json({
		body: {
			"status": "ok"
		},
		query: request.query,
		cookies: request.cookies,
	});
}