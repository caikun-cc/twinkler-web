import axios from 'axios'

export const website = "http://192.168.1.183:8080"

const service = axios.create({
    baseURL: website,
})



export default service