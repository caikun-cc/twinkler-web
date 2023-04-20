import axios from 'axios'
import {multipartDataHeader} from "./Apis.js";
import {ElMessage, ElNotification} from "element-plus";
import router from "../router/router.js";
import jwtDispatcher from "../utils/JwtDispatcher.js";

const SUCCESS = 0
const TOKEN_EXPIRED = 1005

let isRefreshing = false
let requests = []

export const proWebsite = "https://twinkler.caikun.site"
export const devWebsite = "http://192.168.1.183:8080"

const service = axios.create({
    baseURL: devWebsite,
})

/**
 * 全局请求拦截器，为每个请求的请求头添加Token，如果Token存在的话
 */
service.interceptors.request.use(
    config => {
        let jwtSubject = jwtDispatcher.getJwtSubject()
        if (jwtSubject) {
            const {accessToken} = jwtSubject
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
            ElMessage.warning({message: "凭证过期，准备刷新！"})
            if (!isRefreshing) {
                isRefreshing = true
                const {refreshToken} = jwtDispatcher.getJwtSubject()
                //请求刷新Token
                return refresh(refreshToken.token).then(r => {
                    ElMessage.success("刷新完成，继续请求！")
                    jwtDispatcher.save(r)
                    requests.forEach(q => q())
                    requests = []
                    return service(request)
                }).catch(() => {
                    ElMessage.error({message: "凭证刷新失败！"})
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