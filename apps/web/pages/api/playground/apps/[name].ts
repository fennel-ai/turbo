import type { NextApiRequest, NextApiResponse } from "next";
import { getApp } from "../_utils/fly";

type GetAppParameters = {
    name: string;
}

/**
 * Given it's name, return a single Fly App.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse)  {
    const { method, query } = req;

    if (method !== 'GET') {
        return res.status(404).end();
    }

    const { name } = query as GetAppParameters;

    const app = await getApp(name);

    res.status(200).json(app);
}