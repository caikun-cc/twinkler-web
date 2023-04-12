const subjectKey = "subject"

class JwtSubject {

    /**
     * 保存登录信息
     *
     * @param subject
     */
    save(subject) {
        if (subject != null) {
            localStorage.setItem(subjectKey, JSON.stringify(subject))
        } else {
            console.log("token save failure!")
        }
    }

    obtainDetails() {
        let subject = localStorage.getItem(subjectKey)
        return JSON.parse(subject)
    }

    isAvailable() {
        const subject = this.obtainDetails()
        const {accessToken} = subject
        return accessToken.expiration >= new Date().getTime();
    }

    refreshToken() {
        const subject = this.obtainDetails()
        return subject.refreshToken
    }
}


const jwtSubject = new JwtSubject()

export default jwtSubject