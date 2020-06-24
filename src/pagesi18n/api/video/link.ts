import {
    extractVideoLinkInformation,
    getRedirectLink,
  } from "~@/utils/server/helper";
  import { NextApiRequest, NextApiResponse } from "next";
  import Tiktok from "~@/utils/server/Tiktok";
  import _ from "lodash";
  import qs from "query-string";
  const tiktok = new Tiktok();
  
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
    };
  }
  const serializeGlobalVideoData = async (
    aweme_detail,
    type
  ): Promise<ReturningVideoInformation> => {
    if (type === "Global") {
      return {
        video: {
          tags: aweme_detail.text_extra
            .filter((text) => text.hashtag_name && text.hashtag_name.length > 0)
            .map((tag) => tag.hashtag_name),
          id: aweme_detail.aweme_id,
          cover: _.get(aweme_detail, "video.cover.url_list[0]"),
          noWatermark: _.get(aweme_detail, "video.play_addr.url_list[0]"),
          preview: _.get(aweme_detail, "video.play_addr.url_list[0]"),
          watermark: await tiktok.getVideoLinkFromApiLink(
            _.get(aweme_detail, "video.download_addr.url_list[0]")
          ),
        },
        desc: aweme_detail.desc,
        music: {
          author: aweme_detail.music.author,
          playUrl: aweme_detail.music.play_url.url_list[0],
          id: aweme_detail.music.id,
          title: aweme_detail.music.title,
        },
      };
    } else {
      return {
        desc: aweme_detail.desc,
  
        video: {
          id: aweme_detail.video.vid,
          tags: aweme_detail.text_extra
            .filter((text) => text.hashtag_name && text.hashtag_name.length > 0)
            .map((tag) => tag.hashtag_name),
          watermark: await getRedirectLink(
            qs.stringifyUrl({
              query: {
                video_id: aweme_detail.video.vid,
                ratio: "360p",
                line: 1,
                improve_bitrate: 1,
              } as any,
              url: qs.parseUrl(aweme_detail.video.play_addr.url_list[0]).url,
            })
          ),
          noWatermark: await getRedirectLink(
            qs.stringifyUrl({
              query: {
                video_id: aweme_detail.video.vid,
                ratio: "1080p",
                media_type: 4,
                vr_type: 0,
                is_play_url: 1,
                improve_bitrate: 1,
                line: 1,
              } as any,
              url: `https://aweme-hl.snssdk.com/aweme/v1/play/`,
            })
          ),
  
          preview: await getRedirectLink(
            qs.stringifyUrl({
              query: {
                video_id: aweme_detail.video.vid,
                ratio: "360p",
                media_type: 4,
                vr_type: 0,
                is_play_url: 1,
                line: 1,
                improve_bitrate: 1,
              } as any,
              url: `https://aweme-hl.snssdk.com/aweme/v1/play/`,
            })
          ),
          cover: aweme_detail.video.cover.url_list[0],
          // duration: payload.video.duration,
        },
        music: {
          id: aweme_detail.music.mid,
          playUrl: aweme_detail.music.play_url.url_list[0],
          title: aweme_detail.music.title,
          // duration: payload.music.duration,
          author: aweme_detail.music.author,
        },
      };
    }
  };
  
  export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { link } = req.body;
      const { url, type, videoId } = await extractVideoLinkInformation(link);
      console.log("videoId", videoId);
      let aweme_detail = null;
      if (type === "Global") {
        const { aweme_detail: data } = await tiktok.getVideo(videoId);
        aweme_detail = data;
      } else {
        aweme_detail = await tiktok.getVideoChinaById(videoId);
      }
      console.log(aweme_detail);
      if (!aweme_detail) {
        throw new Error("NOT_SUPPORT_VIDEO_LINK");
      }
      res.json({
        isError: false,
        payload: await serializeGlobalVideoData(aweme_detail, type),
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        isError: true,
        payload: err.message,
      });
    }
  };
  