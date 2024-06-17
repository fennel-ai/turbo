import type { NextApiRequest, NextApiResponse } from "next";

import { deleteApp, getApp } from "../../_utils/fly";
import { isExpired } from "../../_utils/helpers";

type CleanQueryParameters = {
    name: string;
}

/**
 * Checks a specific app, given it's name, and returns an object
 * containing a boolean property `expired.` The endpoint will also 
 * delete the app if it is expired.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req;

    if (method !== 'GET') {
        return res.status(404).end()
    }

    const { name } = query as CleanQueryParameters;

    const app = await getApp(name);

    let expired = isExpired(app);

    if (expired) {
        await deleteApp(app.name);
    }

    res.status(200).json({ expired })
}