import service from "./HttpClient.js"

export const multipartDataHeader = {"Content-Type": "multipart/form-data"}

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

export function getUserDetails() {
    return service({
        method: "GET",
        url: "/user/details",
    })
}

//image/collection
export function getImageList(pageNumber, pageSize) {
    return service({
        method: "GET",
        url: "/image/collection",
        params: {
            "page": pageNumber,
            "size": pageSize
        }
    })
}

export function getImageCount() {
    return service({
        method: "GET",
        url: "/comptroller/image/counts",
    })
}

