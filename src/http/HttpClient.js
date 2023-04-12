import axios from 'axios'
import jwtSubject from "../utils/JwtSubject.js";

export const website = "https://twinkler.caikun.site/"

const service = axios.create({
    baseURL: website,
})

/**
 * 全局请求拦截器，Token过期时先请求刷新Token，用户无感
 */
const requestInterceptor = service.interceptors.request.use(
    config => {
        if (!jwtSubject.isAvailable()) {
            refreshDispatcher(jwtSubject.refreshToken()).then(r => {
                jwtSubject.save(r)
                console.log("token refreshed")
                return config
            }).catch(e => {
                return Promise.reject("Token已过期：" + e)
            })
        }
        return config
    }, error => {
        console.log(error)
    }
)

/**
 * Axios全局响应拦截器，根据业务响应返回更加简洁的结果
 */
service.interceptors.response.use(
    response => {
        //请求响应成功时只有业务代码为0才返回成功后结果
        if (response.status === 200) {
            const data = response.data
            if (data.code === 0) return data.data; else return Promise.reject(data.message)
        } else {
            return Promise.reject(response.data)
        }
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
function refreshDispatcher(token) {
    return service({
        method: "POST",
        url: "/account/refresh",
        data: {
            "token": token
        }
    }).interceptors.request.eject(requestInterceptor)
}

export default service