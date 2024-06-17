import type { NextApiRequest, NextApiResponse } from "next";
import { listApps } from "../_utils/fly";

/**
 * Returns a list of all Fly Apps currently in existence
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;

    if (method !== 'GET') {
        return res.status(404).json({});
    }

    const apps = await listApps();

    res.status(200).json(apps);
}