import getUrls from 'get-urls';
import DvRequest from 'devergroup-request'
import _ from 'lodash';
export const encryptWithXOR = (value: string, key = 5) => value
  .split('')
  .map(c => (c.charCodeAt(0) ^ key).toString(16))
  .join('');

export const extractVideoLinkInformation = async (link) => {
    const links = Array.from(getUrls(link));
    if(links.length <= 0) {
        throw new Error('NOT_FOUND_VIDEO_LINK')
    }
    const videoLink = links[0];
    let returning: any = {};
    returning.url = videoLink;
    if(videoLink.includes('tiktok.com')) {
        returning.type = 'Global'
    }

    if(videoLink.includes('douyin.com')) {
        returning.type = 'China'
    }
    if(!returning.type) {
        throw new Error('NOT_SUPPORT_VIDEO_LINK')
    }
    const videoId = await getVideoIDLinkFromSharedLink(videoLink);
    returning.videoId = videoId;
    return returning;
}

export const getVideoIDLinkFromSharedLink = async (url) => {
    const request  = new DvRequest({
        autoUserAgent: true,
        axiosOpt: {
            timeout: 30* 1000,
            maxRedirects: 0,
        },
        cookieJarString: undefined,
        proxy: []
    });
    try {
       await request.get(url)
        throw new Error("NOT_SUPPORT_VIDEO_LINK");
    } catch (err) {
      const redirect_url = _.get(err, "response.headers.location");
      const regexSearch = redirect_url.match(/[0-9]{19,}(?!\?)/);
      console.log(regexSearch)
      if (!redirect_url) {
        throw err;
      }
      if (!regexSearch) {
        throw new Error("Not support formatted url");
      }
      const videoId = regexSearch[0];
    
      return videoId;
    }
}