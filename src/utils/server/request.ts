import Request from 'devergroup-request';

export const createRequest = (opts: {
    deviceType: string;
    as: string,
    cp: string,
    mas: string,
    iid: string,
    device_id: string,
    device_type: string,
    openudid: string,

}) => {

    const request = new Request({
        axiosOpt: {
            timeout: 30* 1000,
            baseURL: `https://api.tiktokv.com`,
            headers: {
                'User-Agent': `com.ss.android.ugc.trill/300 (Linux; U; Android 4.4.2; en_US; ${opts.deviceType}; Build/NRD90M; Cronet/58.0.2991.0)`
            }
        },
        cookieJarString: undefined,
        autoUserAgent: false,
        proxy: []
    });
    request.instance.interceptors.request.use(request => {
        let currentParams = request.params;
        const params = {
            ...currentParams,
            ... {          
                channel: 'googleplay',
                app_name: 'trill',
                version_code: 300,
                version_name: '3.0.0',
                device_platform: 'android',
                os_api: 19,
                os_version: '4.4.2',
                aid: 1180,
                as: opts.as,
                cp: opts.cp,
                mas: opts.mas,
                iid: opts.iid,
                device_id: opts.device_id,
                device_type: opts.deviceType,
                openudid: opts.openudid,
            
            }
        }

        request.params = params;
        console.log(request.params);

        return request;
    })
    return request;
}