import { NextApiRequest, NextApiResponse } from 'next';
import fetch, { RequestInit } from 'node-fetch';

type ZoomAddWebinarRegistrantResponse = { 
    registrant_id: string;
    topic: string;
    id: number;
    join_url: string;
    start_time: string;
}

const getName = (name: string) => {
    const [firstName, ...restName] = name.split(' ');
    return [firstName, restName.join(" ")]
};

const toHubspot = async (body: NextApiRequest['body']) => {
    const [firstName, lastName] = getName(body.name);

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
                    value: firstName
                },
                {
                    name: 'lastname',
                    value: lastName,
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
                    value: body.jobtitle
                }
            ],
            context: {
                pageUri: body.pageUri,
                hutk: body.hutk,
            }
        })
    };

    await fetch(`https://api.hsforms.com/submissions/v3/integration/secure/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_OPEN_DEMO_FORM_ID}`, requestInit);

    console.log(`Submitted ${body.name} <${body.email}> to Hubspot form ${process.env.HUBSPOT_OPEN_DEMO_FORM_ID}.`)
};

const toZoom = async (body: NextApiRequest['body']) => {
    const [firstName, lastName] = getName(body.name);

    const formData = new FormData();

    formData.append('grant_type', "account_credentials");
    formData.append('account_id', process.env.ZOOM_ACCOUNT_ID!);

    const tokenRes = await fetch(`https://zoom.us/oauth/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${Buffer.from(`${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_SECRET}`).toString('base64')}`,
            'Host': 'zoom.us'
        },
        body: formData
    });

    const { access_token } = await tokenRes.json() as { access_token: string, token_type: string, scope: string, expires_in: number };

    const invitationRes = await fetch(`https://api.zoom.us/v2/webinars/${body.webinarId}/registrants`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: body.email,
            job_title: body.jobtitle,
            org: body.company
        })
    });

    const { registrant_id, topic } = await invitationRes.json() as ZoomAddWebinarRegistrantResponse;

    console.log(`Added ${body.email} to webinar "${topic}" (${body.webinarId}) as registrant ${registrant_id}`)
}

const requiredFields = ['name', 'jobtitle', 'company', 'email', 'webinarId'];
export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    try {
        const { body } = request;

       for (const f of requiredFields) {
            if (!body[f]) {
                return response.status(400).json({
                    body: `Missing field: body.${f}`
                });
            }
       }

        await toHubspot(body);
        await toZoom(body)

        response.status(200).json({
            body: {
                "status": "ok"
            },
            query: request.query,
            cookies: request.cookies,
        });
    } catch (e) {
        console.log(e);
        response.status(500).json({
            body: {
                "status": "error"
            },
            query: request.query,
            cookies: request.cookies,
        });
    }
}