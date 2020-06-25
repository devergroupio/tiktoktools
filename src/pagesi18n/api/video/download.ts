import { NextApiRequest, NextApiResponse } from "next";
import {xorDecrypt} from '~@/utils/server/helper'
import axios from 'axios';
export default async (req:NextApiRequest , res: NextApiResponse) => {
    console.log('hello',req.query)
    const {hashed} = req.query;
    const url = xorDecrypt(hashed as string)
    try {
      const { data } = await axios.get(
        url,
        {
          responseType: "arraybuffer"
        }
      );
      return res.end(data);
    } catch (err) {
      res.status(500).send({
        isError: true,
        message: err.toString()
      });
    }
}