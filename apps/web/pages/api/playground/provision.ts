import { NextApiRequest, NextApiResponse } from 'next';

import { allocateIpAddress, createApp, createMachine, deleteApp } from './_utils/fly';

/**
 * Handles provisioning a new sandboxed playground for the user by first
 * creating a new fly app, assigning it an IP address, and then assigning a
 * machine running our image to the app.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    if (method  !== 'POST') {   
        return res.status(404).end()
    }

    const appName = `fennel-playground-${Date.now()}`;
    const app = await createApp(appName);

    await allocateIpAddress(app.name);

    try {
        await createMachine(app.name);
    } catch (error) {
        console.log(`Machine creation failed. Cleaning up App: ${app.name}`);
        await deleteApp(app.name);

        return res.status(500).json({
            detail: `Machine creation failed for ${app.name}`,
            error: error
        });
    }
    
    res.status(200).json(app);
}