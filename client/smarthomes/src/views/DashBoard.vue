<template>
    <div class="lg:flex flex-1 relative">
        <Loading :show="loading" />
        <div class="order-2 user-panel" style="background-color:var(--offWhiteLight)">
            <UserPanel />
        </div>
        <div class="flex-1" style="padding:20px; background-color:var(--offWhiteLight)">
            <a-row :gutter="[16, 16]">
                <a-col class="mode-display" @click="changeMode(mode.name.charAt(0).toLowerCase())" v-for="(mode, modeI) in modes" :key="mode.name+modeI" :xl="{span:8}" :lg="{span:12}" :md="{span:24}">
                    <i v-if="currentUser.userPreference.dt == mode.name.charAt(0).toLowerCase()" style="color:var(--success); font-size:20px; position:absolute; right:0; top:-5px" class="fas fa-check-circle"></i>
                    <div style="height:132px;" class="display-card" :style="mode.name == 'Power Saving' ? 'background-color:#c94c26' : mode.name == 'Smart Mode'  ? 'background-color:#1e317a' : mode.name == 'Manual Mode' ? 'background-color:#ba435a' : ''">
                        <div class="flex justify-between">
                            <div style="font-size:20px; font-weight:500; color:#FFF">{{mode.name}}</div>
                            <i :style="mode.name == 'Power Saving' ? 'color:#fab24b': mode.name == 'Smart Mode' ? 'color:#3f5ab5' : mode.name == 'Manual Mode' ? 'color:#fb8ca4' : ''" style="font-size:35px;" :class="mode.icon"></i>
                        </div>
                        <div class="mt-3" style="color:#FFF; font-size:15px">{{mode.description}}</div>
                    </div>
                </a-col>
            </a-row>
            <div style="font-size:30px; font-weight:500;" class="my-5">User Preference</div>
            <!-- temperature preference -->
            <a-row class="mt-6" :gutter="[16, 16]"> 
                <a-col :lg="{span:24}">
                    <div class="justify-between" style="background-color:#FFF; border-radius:20px; border:1px solid #f1f2fd; padding:10px; display:flex">
                        <div class="flex">
                            <div style="padding:20px; border-radius:20px; border: 1px solid #f1f2fd;">
                                <i style="font-size:55px; color:var(--orange)" class="fas fa-thermometer-quarter" />
                            </div>
                            <div class="ml-4">
                                <div style="font-size:15px; font-weight:500">Indoor Temperature</div>
                                <div class="flex items-end mt-4">
                                    <div class="flex items-center">
                                        <div style="font-size:25px; font-weight:500; line-height:1">{{currentUser.userPreference.tP}}</div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 30 30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle ml-2"><circle cx="12" cy="12" r="10"></circle></svg>
                                    </div>
                                    <div style="font-size:15px; font-weight:500">C</div>
                                </div>
                            </div>
                        </div>
                        <div class="flex-col flex justify-between" style="background-color:#f7f7f9; border-radius:20px; padding:10px 20px">
                            <i @click="increaseTemp" style="cursor:pointer; font-size:20px" class="fas fa-angle-up" />
                            <i @click="decreaseTemp" style="cursor:pointer; font-size:20px" class="fas fa-angle-down" />
                        </div>
                    </div>
                </a-col>
            </a-row>
            <!-- light preference -->
            <a-row class="mt-6" :gutter="[16, 16]">
                <!-- light intensity -->
                <a-col :lg="{span:12}" :md="{span:24}">
                    <div class="flex" style="background-color:#FFF; border-radius:20px; border:1px solid #f1f2fd; padding:10px">
                        <div style="padding:20px; border-radius:20px; border: 1px solid #f1f2fd;">
                            <i style="font-size:40px; color:#fed53b" class="fas fa-lightbulb" />
                        </div>
                        <div class="ml-4 flex-1">
                            <div style="font-size:15px; font-weight:500">Light Intensity</div>
                            <div class="flex items-center">
                                <div style="width:100%" class="flex items-center">
                                    <i :style="currentUser.userPreference.lIP == 0 ? 'color:#000' : 'color:rgba(0, 0, 0, 0.25);'" style="width:10px" class="far fa-sun" />
                                    <a-slider @change="changeIntensity" class="flex-1" v-model="currentUser.userPreference.lIP" />
                                    <i :style="currentUser.userPreference.lIP == 100 ? 'color:#000' : 'color:rgba(0, 0, 0, 0.25);'" style="width:10px" class="fas fa-sun" />
                                </div>
                                <div class="ml-2" style="font-size:25px; font-weight:500">{{currentUser.userPreference.lIP}}%</div>
                            </div>
                        </div> 
                    </div>
                </a-col>
                <!-- light state -->
                <a-col :lg="{span:12}" :md="{span:24}">
                    <div class="flex" style="background-color:#FFF; border-radius:20px; border:1px solid #f1f2fd; padding:10px">
                        <div style="padding:20px; border-radius:20px; border: 1px solid #f1f2fd;">
                            <i style="font-size:40px; color:#fed53b" class="fas fa-lightbulb" />
                        </div>
                        <div class="ml-4 flex-1">
                            <div style="font-size:15px; font-weight:500">Light State</div>
                            <div class="flex items-center mt-3">
                                <a-switch @change="updatePreference" v-model="currentUser.userPreference.lSP"></a-switch>
                                <div class="ml-2">{{currentUser.userPreference.lSP ? 'ON':'OFF'}}</div>
                            </div>
                        </div> 
                    </div>
                </a-col>
            </a-row>
            <!-- fan preference -->
            <a-row class="mt-6" :gutter="[16, 16]">
                <!-- fan intensity -->
                <a-col :lg="{span:12}" :md="{span:24}">
                    <div class="flex" style="background-color:#FFF; border-radius:20px; border:1px solid #f1f2fd; padding:10px">
                        <div style="padding:20px; border-radius:20px; border: 1px solid #f1f2fd;">
                            <i style="font-size:40px; color:var(--blue)" class="fas fa-fan" />
                        </div>
                        <div class="ml-4 flex-1">
                            <div style="font-size:15px; font-weight:500">Fan Intensity</div>
                            <div class="flex items-center">
                                <div style="width:100%" class="flex items-center">
                                    <i :style="currentUser.userPreference.fIP == 0 ? 'color:#000' : 'color:rgba(0, 0, 0, 0.25);'" style="width:10px" class="far fa-fan" />
                                    <a-slider @change="changeIntensity" class="flex-1" v-model="currentUser.userPreference.fIP" />
                                    <i :style="currentUser.userPreference.fIP == 100 ? 'color:#000' : 'color:rgba(0, 0, 0, 0.25);'" style="width:10px" class="fas fa-fan" />
                                </div>
                                <div class="ml-2" style="font-size:25px; font-weight:500">{{currentUser.userPreference.fIP}}%</div>
                            </div>
                        </div> 
                    </div>
                </a-col>
                <!-- fan state -->
                <a-col :lg="{span:12}" :md="{span:24}">
                    <div class="flex" style="background-color:#FFF; border-radius:20px; border:1px solid #f1f2fd; padding:10px">
                        <div style="padding:20px; border-radius:20px; border: 1px solid #f1f2fd;">
                            <i style="font-size:40px; color:var(--blue)" class="fas fa-fan" />
                        </div>
                        <div class="ml-4 flex-1">
                            <div style="font-size:15px; font-weight:500">Fan State</div>
                            <div class="flex items-center mt-3">
                                <a-switch @change="updatePreference" v-model="currentUser.userPreference.fSP"></a-switch>
                                <div class="ml-2">{{currentUser.userPreference.fSP ? 'ON':'OFF'}}</div>
                            </div>
                        </div> 
                    </div>
                </a-col>
            </a-row>
            <a-row :gutter="[16, 16]">
                <a-col :span="24">
                    <div style="background-color:#FFF; border-radius:20px; border:1px solid #f1f2fd; padding:20px">
                        <div style="font-size:25px; font-weight: 500">Message</div>
                        <a-input v-model="currentUser.userPreference.msg" class="mt-3" placeholder="Input your message" />
                        <div class="mt-3 flex justify-end">
                            <a-button @click="updatePreference" class="confirm-button">SAVE</a-button>
                        </div>
                    </div>
                </a-col>
            </a-row>
            <a-row :gutter="[16,16]">
                <a-col :span="24">
                    <div style="background-color:#FFF; border-radius:20px; border:1px solid #f1f2fd; padding:20px">
                        <div style="font-size:25px; font-weight: 500;">LED Color Settings</div>
                        <div class="grid grid-cols-2 gap-2 mt-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                            <div v-for="color in colors" :key="color" :value="color" class="shadow-xl" style="border-radius:8px; border:1px solid #F2F2F2" >
                                <div style="padding:10px">
                                    <div :style="`background-color:${color}`" class="h-20 md:h-30 lg:h-40" style="width:100%;"></div>
                                    <div style="background-color:#FFF; padding:10px 0"><strong>{{color}}</strong></div>
                                </div>
                            </div>
                        </div>
                        <div class="mt-3 flex justify-end">
                            <a-button class="confirm-button">SAVE</a-button>
                        </div>
                    </div>
                </a-col>
            </a-row>
            <!-- <a-row class="mt-6" :gutter="16">
                <a-col :span="24">
                    <div style="background-color:#FFF; border-radius:20px; border: 1px solid #f1f2fd; padding:10px">
                        <div id="chart"></div>
                    </div>
                </a-col>
            </a-row> -->
            <!-- <a-button @click="test">teste</a-button> -->
        </div>
    </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import UserPanel from '@/components/UserPanel.vue'
import api from '@/services/api'
// import ApexCharts from 'apexcharts'
export default {
    components:{
        UserPanel,Loading
    },
    data() {
        return{
            loading:false,
            colors:['#FF0000','#C80000','#640000','#00FF00','#00C800','#006400','#0000FF','#0000C8','#000064','#FFFFFF'],
            options:{},
            modes:[
                {
                    name:"Power Saving",
                    description:"Turns off all devices",
                    icon:"fas fa-power-off"
                },
                {
                    name:"Smart Mode",
                    description:"Automatically adjusts hardware to user preferences",
                    icon:"fas fa-magic"
                },
                {
                    name:"Manual Mode",
                    description:"Manually sets the hardware settings",
                    icon:"fas fa-cog"
                }
            ],
            currentUser:{
                device:'',
                email:'',
                firstName:'',
                hub:'',
                lastName:'',
                role:'',
                room:'',
                userPreference:{
                    b:0,
                    device:'',
                    dt:'',
                    fIP:100,
                    fSP:false,
                    lIP:100,
                    lSP:false,
                    msg:'',
                    r:0,
                    g:0,
                    room:'',
                    tP:0
                }
            }
        }
    },
    computed:{
        hubs(){
            return this.$store.state.hubs
        },
        users() {
            return this.$store.state.users
        },
        user() {
            return this.$store.state.user
        },
        rooms() {
            return this.$store.state.rooms
        }
    },
    methods:{
        changeMode(mode) {
            let preference = JSON.parse(JSON.stringify(this.currentUser.userPreference))
            preference.dt = mode
            if (preference.fSP == false) preference.fSP = 0
            if (preference.fSP == true) preference.fSP = 1
            if (preference.lSP == false) preference.lSP = 0
            if (preference.lSP == true) preference.lSP = 1
            api().post(`/updateUserPreference/${this.currentUser.id}`, {userPreference:preference, room:this.currentUser.room, device:this.currentUser.device}).then(({data}) => {
                if (data.success) {
                    if (preference.fSP == 0) preference.fSP = false
                    if (preference.fSP == 1) preference.fSP = true
                    if (preference.lSP == 0) preference.lSP = false
                    if (preference.lSP == 1) preference.lSP = true
                    this.$store.commit('UPDATE_PREFERENCE', preference)
                } else return this.$notification['error']({
                    message: 'Error',
                    description: 'Something went wrong',
                    duration: 4
                });
            })
        },
        updatePreference() {
            let preference = JSON.parse(JSON.stringify(this.currentUser.userPreference))
            if (preference.fSP == false) preference.fSP = 0
            if (preference.fSP == true) preference.fSP = 1
            if (preference.lSP == false) preference.lSP = 0
            if (preference.lSP == true) preference.lSP = 1
            api().post(`/updateUserPreference/${this.currentUser.id}`, {userPreference:preference, room:this.currentUser.room, device:this.currentUser.device}).then(({data}) => {
                if (data.success) {
                    if (preference.fSP == 0) preference.fSP = false
                    if (preference.fSP == 1) preference.fSP = true
                    if (preference.lSP == 0) preference.lSP = false
                    if (preference.lSP == 1) preference.lSP = true
                    this.$store.commit('UPDATE_PREFERENCE', preference)
                } else return this.$notification['error']({
                    message: 'Error',
                    description: 'Something went wrong',
                    duration: 4
                });
            })
        },
        changeIntensity() {
            const makeAPICall = () => {
                this.updatePreference()
            }

            if(this.timerId) clearTimeout(this.timerId)

            this.timerId = setTimeout(function () {
                makeAPICall()
                this.timerId = undefined
            }, 500)
        },
        // test() {
        //     this.$http.get('https://capstone-database2-default-rtdb.firebaseio.com/esp32-cam.json').then(({data}) => {
        //         console.log('dataa', data)
        //     })
        // },
        increaseTemp() {
            if (this.currentUser.userPreference.tP < 40) {
                let preference = JSON.parse(JSON.stringify(this.currentUser.userPreference))
                preference.tP = preference.tP+1
                if (preference.fSP == false) preference.fSP = 0
                if (preference.fSP == true) preference.fSP = 1
                if (preference.lSP == false) preference.lSP = 0
                if (preference.lSP == true) preference.lSP = 1
                api().post(`/updateUserPreference/${this.currentUser.id}`, {userPreference:preference, room:this.currentUser.room, device:this.currentUser.device}).then(({data}) => {
                    if(data.success) {
                        this.$store.commit('INCREASE_TEMP')
                    } else return this.$notification['error']({
                        message: 'Error',
                        description: 'Something went wrong',
                        duration: 4
                    });
                })
            }
            else return this.$notification['error']({
                message: 'Error',
                description: 'Room temperature cannot be over 40',
                duration: 4
            });
        },
        decreaseTemp() {
            if (this.currentUser.userPreference.tP > 15) {
                let preference = JSON.parse(JSON.stringify(this.currentUser.userPreference))
                preference.tP = preference.tP-1
                if (preference.fSP == false) preference.fSP = 0
                if (preference.fSP == true) preference.fSP = 1
                if (preference.lSP == false) preference.lSP = 0
                if (preference.lSP == true) preference.lSP = 1
                api().post(`/updateUserPreference/${this.currentUser.id}`, {userPreference:preference, room:this.currentUser.room, device:this.currentUser.device}).then(({data}) => {
                    if(data.success) {
                        this.$store.commit('DECREASE_TEMP')
                    }
                })
            }
            else return this.$notification['error']({
                message: 'Error',
                description: 'Room temperature cannot be below 15',
                duration: 4
            });
        }
    },
    async created() {
        this.loading = true
        let error = false
        await api().post('/checkLogin', {test:"test"}).then(async ({data}) => {
            if (data.success) {
                if (data.user == null) {
                    error = true
                    document.cookie = await '__shtk ='
                    this.$router.push('/login')
                }
                else {
                    this.$store.commit('GET_APPDATA', data)
                    if (data.user[0].room == null || data.user[0].hub == null) this.$router.push('/setup')
                }
            }
            this.loading = false
        })
        if (!error) {
            this.currentUser = this.user
            if (this.currentUser.userPreference.lSP == 1) this.currentUser.userPreference.lSP = true
            if (this.currentUser.userPreference.lSP == 0) this.currentUser.userPreference.lSP = false
            if (this.currentUser.userPreference.fSP == 1) this.currentUser.userPreference.fSP = true
            if (this.currentUser.userPreference.fSP == 0) this.currentUser.userPreference.fSP = false

            console.log('currentUser', this.currentUser)
        }
    }
}
</script>

<style>
.high-percent .ant-progress-inner .ant-progress-circle{
    stroke: var(--danger) !important;
}
.display-card{
    border-radius: 10px;
    border-color:rgba(63,63,63,.15);
    -webkit-box-shadow: 0 1px 3px rgb(63 63 68 / 15%);
    border:none;
    background-color:#FFF;
    padding:20px 15px;
}
</style>
<style scoped>
.mode-display:hover{
    border:1px solid var(--blue);
    cursor:pointer;
}
@media (max-width:1024px) {
    .user-panel{
        padding:0 20px 20px 20px;
    }
}

</style>