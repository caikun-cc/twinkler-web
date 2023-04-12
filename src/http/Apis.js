import service from "./HttpClient.js"

const multipartDataHeader = {"Content-Type": "multipart/form-data"}

/**
 * 发送注册验证码
 *
 * @param email
 */
export function sendEmailVerificationCode(email) {
    return service({
        method: "GET",
        url: "/account/code",
        params: {
            "email": email
        },
    })
}

export function login(email, password) {
    return service({
        method: "POST",
        url: "/account/login",
        data: {
            "email": email,
            "password": password
        },
        headers: multipartDataHeader
    })
}

export function userRegister(user) {
    return service({
        method: "POST",
        url: "/account/register",
        data: user,
        headers: multipartDataHeader
    })
}

