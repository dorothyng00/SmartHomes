import axios from 'axios'

export default () => {
    return axios.create({
        baseURL:'https://us-central1-smarthomes-61235.cloudfunctions.net/app/'
    })
}