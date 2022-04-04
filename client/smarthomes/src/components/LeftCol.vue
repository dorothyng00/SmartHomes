<template>
    <div style="background-color:var(--offWhiteLight)">
        <Confirm :content="'Are you sure you want to log out?'" @onClose="onClose" @ok="ok" :cancelButton="'CANCEL'" :confirmButton="'LOGOUT'" :title="'Log out'" :visible="visible" />
        <Loading :show="loading" />
        <div class="flex-col flex left-col-width" :style="resize ? 'width:65px':'width:200px'" style="justify-content:space-between; min-height:calc(100vh - 80px); height:100%; background-color:var(--green); border-radius:0 50px 0 0; overflow:hidden">
            <div>    
                <div style="padding:15px 20px; border-bottom:1px solid #FFF; display:flex; align-items: center; color:#FFF">
                    <i @click="openNav" style="font-size:20px; cursor:pointer" class="fas fa-bars mr-3" />
                    <div v-if="!resize">SmartHomes</div>
                </div>
                <div @click="redirect('/')" class="nav-el" :class="selectedNav == '/' ? 'selected-nav':''">
                    <i style="font-size:20px" class="fas fa-tachometer-alt" :class="resize ? '' :' mr-3'" :style="selectedNav == '/' ? 'color:var(--orange)':''"></i>
                    <div v-if="!resize" :style="selectedNav == '/' ? 'color:#000':''">Dashboard</div>
                </div>
                <div @click="redirect('/rooms')" class="nav-el" :class="selectedNav == '/rooms' ? 'selected-nav':''">
                    <i style="font-size:20px" class="fas fa-home" :class="resize ? '' :' mr-3'" :style="selectedNav == '/rooms' ? 'color:var(--orange)':''"></i>
                    <div v-if="!resize" :style="selectedNav == '/rooms' ? 'color:#000':''">Rooms</div>
                </div>
                <!-- <div @click="redirect('/devices')" class="nav-el" :class="selectedNav == '/devices' ? 'selected-nav':''">
                    <i style="font-size:20px" class="fas fa-tablet-alt" :class="resize ? '' :' mr-3'" :style="selectedNav == '/devices' ? 'color:var(--orange)':''" />
                    <div v-if="!resize" :style="selectedNav == '/devices' ? 'color:#000':''">Devices</div>
                </div> -->
                <div @click="redirect('/security')" class="nav-el" :class="selectedNav == '/security' ? 'selected-nav':''">
                    <i style="font-size:20px" class="fas fa-lock" :class="resize ? '' :' mr-3'" :style="selectedNav == '/security' ? 'color:var(--orange)':''" />
                    <div v-if="!resize" :style="selectedNav == '/security' ? 'color:#000':''">Security</div>
                </div>
                <!-- <div @click="redirect('/statistics')" class="nav-el" :class="selectedNav == '/statistics' ? 'selected-nav':''">
                    <i style="font-size:20px" class="fas fa-signal" :class="resize ? '' :' mr-3'" :style="selectedNav == '/statistics' ? 'color:var(--orange)':''" />
                    <div v-if="!resize" :style="selectedNav == '/statistics' ? 'color:#000':''">Statisics</div>
                </div> -->
                <div @click="redirect('/members')" class="nav-el" :class="selectedNav == '/members' ? 'selected-nav':''">
                    <i style="font-size:20px" class="fas fa-users" :class="resize ? '' :' mr-3'" :style="selectedNav == '/members' ? 'color:var(--orange)':''" />
                    <div v-if="!resize" :style="selectedNav == '/members' ? 'color:#000':''">Members</div>
                </div>
            </div>
            <div>
                <div @click="logout" class="nav-el logout">
                    <i style="font-size:20px" class="fas fa-power-off" :class="resize ? '' :' mr-3'" />
                    <div v-if="!resize">Logout</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Confirm from '@/components/Confirm.vue'
import Loading from '@/components/Loading.vue'
import api from '@/services/api'
export default {
    components:{
        Confirm, Loading
    },
    data(){
        return{
            resize:false,
            selectedNav:'/',
            visible:false,
            loading:false,
        }
    },
    watch:{
        '$route':{
            handler(val) {
                console.log('rounter', val)
                this.selectedNav = val.path
            }
        }
    },
    methods:{
        onClose() {
            this.visible = false
        },
        ok() {
            this.loading = true
            api().post('/logout').then(async ({data}) => {
                console.log('data' , data)
                this.loading = false
                document.cookie = await '__shtk ='
                this.$router.push('/login')
                this.onClose()
            })
        },
        logout() {
            this.visible = true
        },
        redirect(route) {
            if (this.$route.path != route) this.$router.push(route)
        },
        openNav() {
            if (window.innerWidth >= 640) this.resize = !this.resize
        }
    },
    created() {
        let w = window.innerWidth
        if (w < 640) this.resize = true
        this.selectedNav = this.$route.path
    },
    mounted() {
        let iconScript = document.createElement('script')
        iconScript.setAttribute('src', 'https://kit.fontawesome.com/f086bec7e5.js')
        document.head.appendChild(iconScript)
    }
}
</script>

<style scoped>

.left-col-width{
    width:200px;
    transition:width .3s ease-in-out;
}
.nav-el{
    display:flex;
    padding:15px 20px;
    align-items: center;
    color:#FFF;
    cursor: pointer;
}
.logout:hover{
    color:var(--danger) !important;
}
.nav-el:hover{
    background-color:var(--offWhite);
    color:#000;
    border-radius:30px 0 0 30px;
}
.selected-nav{
    background-color: #FFF !important;
    border-radius: 30px 0 0 30px;
}
</style>