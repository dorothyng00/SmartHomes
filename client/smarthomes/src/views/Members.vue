<template>
    <div>
        <Loading :show="loading" />
        <div style="padding:0 20px 20px 20px; background-color:var(--offWhiteLight); width:100%; height:100%; min-height:calc(100vh - 80px)">
            <div :class="userI != 0 ? 'mt-3':''" v-for="(user, userI) in users" :key="user.id" class="shadow round" style="padding:10px">
                <h3>{{`${user.firstName} ${user.lastName} ${user.role && user.role != '' ? `(${user.role})` : ''}`}}</h3>
                <div>{{user.email}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import api from '@/services/api'
export default {
    components:{
        Loading,
    },
    computed:{
        users() {
            return this.$store.state.users
        }
    },
    data() {
        return {
            loading:false
        }
    },
    async created() {
        this.loading = true
        await api().post('/checkLogin', {test:"test"}).then(async ({data}) => {
            if (data.success) {
                if (data.user == null) {
                    document.cookie = await '__shtk ='
                    this.$router.push('/login')
                }
                else {
                    this.$store.commit('GET_APPDATA', data)
                }
            }
            this.loading = false
        })
    }
}
</script>

<style>

</style>