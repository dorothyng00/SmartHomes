import api from '@/services/api'

export default {
    test () {
        return api().get('app')
    },
    postTest(){
        return api().post('test')
    }
}