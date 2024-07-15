import { NextApiRequest, NextApiResponse } from 'next';
import fetch, { RequestInit } from 'node-fetch';

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

        const [firstname, ...restName]  = body.name.split(' ');

        const requestInit: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`
            },
            body: JSON.stringify({
                fields: [
                    {
                        name: 'firstname',
                        value: firstname
                    }, 
                    {
                        name: 'lastname',
                        value: restName.join(' '),
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
                    }
                ],
                context: {
                    pageUri: body.pageUri,
                    hutk: body.hutk,
                }
            })
        };

        await fetch(`https://api.hsforms.com/submissions/v3/integration/secure/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_OPEN_DEMO_FORM_ID}`, requestInit);

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