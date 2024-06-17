import { NextApiRequest, NextApiResponse } from 'next';

import { deleteApp, listApps } from './utils/fly';
import { isExpired } from './utils/helpers';

/**
 * Handles cleaning up old and inactive playground instances.
 * TODO: Quite basic right now and can likely be improved.
 * TODO: Should be ran periodically as a cron job.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    if (method !== 'POST') {
        res.status(404).json({ message: "Not Found" })
    }

    const apps = await listApps();

    await Promise.all(apps.map(({ node }) => {
        if (node.name !== 'fennel-vs' && isExpired(node)) {
            return deleteApp(node.name)
        }
    }));

    res.status(200).end();
}