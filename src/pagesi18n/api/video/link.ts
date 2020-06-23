import { getVideoIDFromUrl } from "~@/utils/server/helper";
import {  NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
    const {link}  = req.body;
    const videoID = getVideoIDFromUrl(link);
    console.log(videoID);
}