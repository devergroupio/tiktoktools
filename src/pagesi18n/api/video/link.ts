import { extractVideoLinkInformation } from "~@/utils/server/helper";
import {  NextApiRequest, NextApiResponse } from "next";
import Tiktok from '~@/utils/server/Tiktok'
import _ from 'lodash'
const tiktok = new Tiktok()

interface ReturningVideoInformation {
    desc: string;
    video: {
        id: string;
        watermark: string;
        tags: string[];
        noWatermark: string;
        preview: string;
        cover: string;
    };
    music: {
        id: string;
        playUrl: string;
        title: string;
        author: string;
    }
}
const serializeGlobalVideoData = async (aweme_detail): Promise<ReturningVideoInformation> => {
    return {
        video: {
            tags: aweme_detail.text_extra
            .filter((text) => text.hashtag_name && text.hashtag_name.length > 0)
            .map((tag) => tag.hashtag_name),
            id: aweme_detail.id,
            cover: _.get(aweme_detail,'video.cover.url_list[0]'),
            noWatermark: _.get(aweme_detail, 'video.play_addr.url_list[0]'),
            preview: _.get(aweme_detail, 'video.play_addr.url_list[0]'),
            watermark: await tiktok.getVideoLinkFromApiLink(_.get(aweme_detail, 'video.download_addr.url_list[0]'))
        },
        desc: aweme_detail.desc,
        music: {
            author: aweme_detail.music.author,
            playUrl:aweme_detail.music.play_url.url_list[0],
            id: aweme_detail.music.id,
            title: aweme_detail.music.title
        }
    }
}


export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
    const {link}  = req.body;
    console.log(link);
    const {url, type, videoId} = await extractVideoLinkInformation(link);
    const {aweme_detail} = await tiktok.getVideo(videoId)
    res.json({
        isError: false,
        payload: await serializeGlobalVideoData(aweme_detail)
    })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            isError: true,
            payload: err.message,
        })
    }
}