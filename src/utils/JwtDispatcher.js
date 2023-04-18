const jwtSubjectKey = "jwt-subject"

class JwtDispatcher {

    /**
     * 保存登录信息
     *
     * @param jwtSubject
     */
    save(jwtSubject) {
        if (jwtSubject != null && jwtSubject !== {}) {
            localStorage.setItem(jwtSubjectKey, JSON.stringify(jwtSubject))
        } else {
            console.log("token save failure!")
        }
    }

    /**
     * 获取
     *
     * @returns {any}
     */
    getJwtSubject() {
        let jwtSubject = localStorage.getItem(jwtSubjectKey)
        return JSON.parse(jwtSubject)
    }

    /**
     * 判断AccessToken是否已过期
     *
     * @returns {boolean}
     */
    isAvailable() {
        let jwtSubject = this.getJwtSubject()
        if (jwtSubject) {
            let {accessToken} = jwtSubject
            return accessToken.expiration >= new Date().getTime();
        }
        return false
    }

    getUserDetails() {
        let jwtSubject = this.getJwtSubject()
        if (jwtSubject) {
            let {user} = jwtSubject
            return user
        } else {
            return null
        }
    }
}

const jwtDispatcher = new JwtDispatcher()

export default jwtDispatcher