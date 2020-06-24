import {createRequest} from './request'
import DevergroupAxios from 'devergroup-request';
import { encryptWithXOR } from './helper';
import fs from 'fs';
class API {
    request:DevergroupAxios| null = null;
    constructor() {
        this.request = createRequest({
            deviceType: 'SM-G950U1',
            as: 'a145b02eeed42e58bf4355',
            cp: '0d45e051e7f1e786e1ikqo',
            mas: '01202bb1cbaf0cef3fb185654ec634443aacaccc2c66461caca64c',
            iid: '6840682979162556161',
            device_id: '6840682491255326210',
            device_type: 'SM-G950U1',
            openudid: '1503eaaaacf3a108',
        });

    }
   async getUser(id) {
        const {data}  =  await this.request.get('/aweme/v1/user/',{
            params:  {
                user_id: id
            }
        })
        if(data.length <= 0) {
            throw new Error('Request not valid')
        }
        return data;
    }
    async searchUser(keyword: string) {
        const {data} = await this.request.get('/aweme/v1/discover/search/', {
            params: {
                keyword,
                count:10,
                cursor:0,
                type:1
            }
        });
        return data;
    }
    async searchHashTag(keyword: string ) {
        const {data} = await this.request.get('/aweme/v1/challenge/search/', {
            params: {
                keyword,
                count:10,
                cursor:0,
            }
        });
        return data;
    }
    async getUserPosts(id: string) {
        const {data} = await this.request.get('/aweme/v1/aweme/post/', {
            params: {
                user_id: id,
                count: 10,
                cursor:0
            }
        })
        return data;
    }
    async getVideo(id) {
        const {data} = await this.request.get('/aweme/v1/aweme/detail/' ,{
            params: {
                aweme_id: id
            }
        })
        return data;
    }
    
    async getVideoLinkFromApiLink(url: string) {
        const request = new DevergroupAxios({
            autoUserAgent: false,
            axiosOpt: {
                timeout: 30* 1000,
                maxRedirects: 0,
                headers: {
                    Accept: '*/*',
                    'Accept-Language': 'en',
                    'Host': 'api-h2.tiktokv.com'
                }
            },
            proxy :[],
            cookieJarString: undefined
        })
        try {
        const {headers} = await request.get(url);
        return headers['location']
        } catch(err) {
            return err.response.headers['location']
        }
    }

    async login (params) {
        
    return this.request.post('passport/user/login/', null, {
        params: {
          mix_mode: 1,
          username: '',
          email: '',
          mobile: '',
          account: '',
          password: '',
          captcha: '',
          ...params,
        },
      })
        .then((res) => {  
          if (res.headers['x-tt-token']) {
            this.request.instance.defaults.headers.common['x-tt-token'] = res.headers['x-tt-token'];
          }
          return res;
        })
    }

    loginWithUsername = ({
        username,
        password
    }) => this.login({
        username: encryptWithXOR(username),
        password: encryptWithXOR(password),
      })

    loginWithEmail = ({
    email,
    password
}) => this.login({
    email: encryptWithXOR(email),
    password: encryptWithXOR(password),
    })

    loginWithMobile = (mobile) => {
        return this.request.post('/passport/mobile/send_code/v1/', {
            mix_mode:1,
            type: 0,
            mobile: encryptWithXOR(mobile)
        })
    }
    logout = () => {
        return this.request.post('/passport/user/logout/', {
            logout_from: 'user_logout',
            user_was_login:1,
            multi_login:1,
        })
    }
}
export default API;