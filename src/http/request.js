import axios from 'axios'

export const website = "https://twinkler.caikun.site/"

const service = axios.create({
    baseURL: website,
})



export default service