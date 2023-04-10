import service from "../http/request"


export function sendEmail(email) {
    return service({
        method : "GET",
        url : "/account/code",
        params : {
            "email":email
        },
    })
}
