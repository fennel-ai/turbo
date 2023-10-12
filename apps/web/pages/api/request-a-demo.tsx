import { NextApiRequest, NextApiResponse } from 'next';
import fetch, { RequestInit } from 'node-fetch';
import sendMail from '../../emails';
import RequestADemoInternal from '../../emails/RequestADemoInternal';

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    try {
        const { body } = request;

        if (!body.name || !body.role || !body.email) {
            response.status(400).json({
                body: "Malformed Request Body"
            });
        }

        const requestInit: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`
            },
            body: JSON.stringify({
                fields: [
                    {
                        name: 'firstName',
                        value: body.name
                    }, 
                    {
                        name: 'email',
                        value: body.email
                    }, 
                    {
                        name: 'company',
                        value: body.company
                    }, 
                    {
                        name: 'jobtitle',
                        value: body.role
                    }, 
                    {
                        name: 'referred_from',
                        value: body.referred_from
                    }
                ],
            })
        };

        await fetch(`https://api.hsforms.com/submissions/v3/integration/secure/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_ID}`, requestInit);

        await sendMail({
            to: 'hello@fennel.ai',
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
    } catch (e) {
        response.status(500).json({
            body: {
                "status": "error"
            },
            query: request.query,
            cookies: request.cookies,
        });
    }
}