import service from "./HttpClient.js"

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

export function userRegister(user) {
    return service({
        method: "POST",
        url: "/account/register",
        data: user,
        headers: {'Content-Type': 'multipart/form-data'}
    })
}

