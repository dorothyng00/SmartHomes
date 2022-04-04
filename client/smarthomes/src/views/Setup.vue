<template>
    <div style="background-color:var(--green); width: 100%; height:calc(100vh - 80px); overflow:hidden">
        <Loading :show="loading" />
        <div class="container mx-auto login-page">
            <div class="flex justify-center" style="margin:0 5%">
                <div>
                    <div class="text-center" style="color:#FFF; font-weight:600; font-size:30px">Set up your hub</div>
                    <div class="mt-3" style="background-color:#FFF; padding:20px; border-radius:4px">
                        <a-steps :current="current">
                            <a-step v-for="item in steps" :key="item.title" :title="item.title" />
                        </a-steps>   
                        <div v-if="current == 0" class="mt-5">
                            <a-form-model ref="hubInfo" :model="hubInfo">
                                <div class="flex justify-center">
                                    <div class="flex items-center">
                                        <div @click="hubInfo.create = true" class="select-button mr-3" :style="hubInfo.create ? 'background-color:var(--green) ' : ''">Create a New Hub</div>
                                        <div @click="hubInfo.create = false" class="select-button" :style="!hubInfo.create ? 'background-color:var(--green) ' : ''">Join a Hub</div>
                                    </div>
                                </div>
                                <a-row v-if="hubInfo.create" :gutter="[16, 16]">
                                    <a-col :span="24">
                                        <a-form-model-item ref="name" prop="name" required label="Hub Name">
                                            <a-input placeholder="Enter the hub name" v-model="hubInfo.name"></a-input>
                                        </a-form-model-item>
                                    </a-col>
                                </a-row>
                                <a-row v-if="!hubInfo.create" :gutter="[16, 16]">
                                    <a-col :span="24">
                                        <a-form-model-item ref="hubId" prop="hubId" required label="Hub Id">
                                            <a-input placeholder="Enter the id of the hub you want to join" v-model="hubInfo.hubId"></a-input>
                                        </a-form-model-item>
                                    </a-col>
                                </a-row>
                            </a-form-model>
                        </div>
                        <div v-if="current == 1">
                            <a-form-model ref="roomInfo" :model="roomInfo">
                                <a-row :gutter="[16, 16]">
                                    <a-col :span="24">
                                        <a-form-model-item ref="name" prop="name" required label="Room Name">
                                            <a-input placeholder="Enter the room name" v-model="roomInfo.name"></a-input>
                                        </a-form-model-item>
                                    </a-col>
                                </a-row>
                            </a-form-model>
                        </div>
                        <div style="width:100%; display:flex; justify-content:end">
                            <a-button @click="submit" :disabled="disabledCondition" class="login-button">{{current != 1 ? 'NEXT' : 'DONE'}}</a-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import api from '@/services/api'
export default {
    components:{
        Loading
    },
    data() {
        return{ 
            loading:false,
            current:0,
            steps:[
                {title:'Create or Join a Hub'},
                {title:'Create a room'}
            ],
            hubInfo:{
                create:true,
                name:'',
                hubId:'',
                user:{},
            },
            roomInfo:{
                name:''
            }
        }
    },
    computed:{
        user() {
            return this.$store.state.user
        },
        disabledCondition() {
            if (this.current == 0) {
                if (this.hubInfo.create) {
                    if (this.hubInfo.name == '') return true
                    else return false
                } else {
                    if (this.hubInfo.hubId == '') return true
                    else return false
                }
            } else {
                if (this.roomInfo.name == '') return true
                else return false
            }
        }
    },
    methods:{
        submit() {
            if(this.current == 0) {
                if (this.hubInfo.create) {
                    this.loading = true
                    api().post(`addHub/${this.user.id}/${this.user.uid}`, {name:this.hubInfo.name}).then(({data}) => {
                        if (data.success) {
                            this.$store.commit('UPDATE_ADD_HUB', data.data)
                            this.current++;
                        } else return this.$notification['error']({
                            message: 'Error',
                            description: 'Something went wrong',
                            duration: 4
                        });
                        this.loading = false
                    })
                } else {
                    this.loading = true
                    api().post(`joinHub/${this.hubInfo.hubId}`, {user:{id:this.user.id, uid:this.user.uid}}).then(({data}) => {
                        if (data.success) {
                            this.$store.commit('UPDATE_ADD_HUB', data.data)
                            this.current ++
                        } else return this.$notification['error']({
                            message: 'Error',
                            description: 'Something went wrong',
                            duration: 4
                        });
                        this.loading = false
                    })
                }
            } else {
                this.loading = true
                api().post(`addRoom/${this.user.id}`, {name:this.roomInfo.name, hubId:this.user.hub}).then(({data}) => {
                    if (data.success) {
                        this.$store.commit('UPDATE_ADD_ROOM', data.data)
                        this.$router.push('/')
                    } else return this.$notification['error']({
                        message: 'Error',
                        description: 'Something went wrong',
                        duration: 4
                    });
                    this.loading = false
                })
            }
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
                    if (data.user[0].room == null && data.user[0].hub !=null) this.current = 1
                    if (data.user[0].room != null && data.user[0].hub != null) this.$router.push('/')
                    
                    
                }
            }
            this.loading = false
        })
    }
}
</script>

<style scoped>
@media screen and (min-width:768px) {
    .login-page{
        padding-top:10%;
    }
}
@media screen and (max-width:768px) {
    .login-page{
        padding-top:60px;
    }
}
.select-button{
    padding:10px; 
    border-radius:4px; 
    background-color:var(--blue); 
    color:#FFF;
    cursor: pointer;
    opacity:1;
    transition: opacity 0.3s ease-in-out;
}
.select-button:hover{
    opacity: 0.75;
}
</style>
<style>
.login-button.ant-btn{
    background-color:var(--blue);
    color:#FFF;
    border: none !important;
}
.login-button.ant-btn:hover{
    background-color:var(--blue);
    color:#FFF;
    border: none !important;
    filter:brightness(120%);
}
</style>