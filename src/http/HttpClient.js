import axios from 'axios'
import jwtSubject from "../utils/JwtSubject.js";
import {multipartDataHeader} from "./Apis.js";
import {ElNotification} from "element-plus";
import router from "../router/router.js";

const SUCCESS = 0
const TOKEN_EXPIRED = 1005

let isRefreshing = false
let requests = []

export const devWebsite = "http://localhost:8080"
export const proWebsite = "https://twinkler.caikun.site"

const service = axios.create({
    baseURL: proWebsite,
})

/**
 * 全局请求拦截器，为每个请求的请求头添加Token，如果Token存在的话
 */
service.interceptors.request.use(
    config => {
        if (jwtSubject.isAvailable()) {
            const {accessToken} = jwtSubject.obtainDetails()
            config.headers.token = accessToken.token
        }
        return config
    }
)

/**
 * Axios全局响应拦截器，根据业务响应返回更加简洁的结果
 */
service.interceptors.response.use(
    response => {
        const request = response.config
        const data = response.data
        //业务响应Token过期时
        if (data.code === TOKEN_EXPIRED) {
            if (!isRefreshing) {
                isRefreshing = true
                const {refreshToken} = jwtSubject.obtainDetails()
                //请求刷新Token
                return refresh(refreshToken.token).then(r => {
                    jwtSubject.save(r)
                    requests.forEach(q => q())
                    requests = []
                    return service(request)
                }).catch(e => {
                    console.log(e)
                    router.push({name: "login"}).then(() => {
                        ElNotification.info({message: "认证信息失效，请重新登录"})
                    })
                }).finally(() => {
                    isRefreshing = false
                })
            } else {
                return new Promise((resolve) => {
                    requests.push(() => {
                        resolve(service(request))
                    })
                })
            }
        }
        if (data.code === SUCCESS) return data.data; else return Promise.reject(data.message)
    },
    error => {
        return Promise.reject(error)
    }
)

/**
 * 刷新Token
 *
 * @param token refreshToken
 */
function refresh(token) {
    return service({
        method: "POST",
        url: "/account/refresh",
        data: {
            "token": token
        },
        headers: multipartDataHeader
    })
}

export default service