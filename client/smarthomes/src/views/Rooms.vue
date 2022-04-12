<template>
    <div style="width:100%">
        <Loading :show="loading" />
        <div style="padding:0 20px 20px 20px; background-color:var(--offWhiteLight); width:100%; height:100%; min-height:calc(100vh - 80px)">
            <a-modal :visible="edit.visible" :centered="true" :footer="null" @cancel="cancel">
                <h3>Change Room Name</h3>
                <a-form>
                    <a-form-item label="Room Name">
                        <a-input placeholder="Enter New Room Name" v-model="edit.name"></a-input>
                    </a-form-item>
                </a-form>
                <div class="justify-end" style="display:flex;">
                    <a-button class="cancel-button mr-3" @click="cancel">CANCEL</a-button>
                    <a-button @click="submit" class="confirm-button">SAVE</a-button>
                </div>
            </a-modal>
            <a-button class="mb-5" type="primary" @click="refresh">REFRESH</a-button>
            <a-row v-if="currentUser.room" :gutter="[16, 16]">
                <a-col :span="24">
                    <div class="shadow" style="border-radius:20px; background-color:#FFF; padding:10px">
                        <div class="flex justify-between">
                            <div style="font-size:30px; font-weight:500">My Room</div>
                            <a-tooltip>
                                <template #title>Edit Room Name</template>
                                <i @click="editRoom" style="font-size:15px; cursor:pointer" class="fa fa-edit"></i>
                            </a-tooltip>
                        </div>
                        <div class="mt-3">
                            <h2 style="font-size:20px">{{rooms[currentUser.room].name}}</h2>
                            <div class="grid grid-cols-3 gap-5">
                                <div>
                                    <div class="text-black">Room Power</div>
                                    <div style="color:#718096">{{rooms[currentUser.room].pow}}</div>
                                </div>
                                <div>
                                    <div class="text-black">Room Activity</div>
                                    <div style="color:#718096">{{rooms[currentUser.room].ra}}</div>
                                </div>
                                <div>
                                    <div class="text-black">Room Brightness</div>
                                    <div style="color:#718096">{{rooms[currentUser.room].rb}}</div>
                                </div>
                                <div>
                                    <div class="text-black">Room Humidity</div>
                                    <div style="color:#718096">{{rooms[currentUser.room].rh}}</div>
                                </div>
                                <div>
                                    <div class="text-black">Room Temperature</div>
                                    <div style="color:#718096">{{rooms[currentUser.room].rt}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a-col>
            </a-row>
            <hr style="margin-top:20px" />
            <div style="font-size:20px;" class="text-black my-3">Other rooms in this hub</div>
            <a-row :gutter="[16,16]" v-if="otherRooms.length">
                <a-col :span="24" v-for="room in otherRooms" :key="room.id">
                    <div style="background-color:#FFF; border-radius:20px; border:1px solid #f1f2fd; padding:10px;">
                        <div class="flex justify-between items-center">
                            <div style="font-weight:500; font-size:18px">{{room.name}}</div>
                        </div>
                        <div class="grid grid-cols-3 gap-5">
                            <div>
                                <div class="text-black">Room Power</div>
                                <div style="color:#718096">{{room.pow}}</div>
                            </div>
                            <div>
                                <div class="text-black">Room Activity</div>
                                <div style="color:#718096">{{room.ra}}</div>
                            </div>
                            <div>
                                <div class="text-black">Room Brightness</div>
                                <div style="color:#718096">{{room.rb}}</div>
                            </div>
                            <div>
                                <div class="text-black">Room Humidity</div>
                                <div style="color:#718096">{{room.rh}}</div>
                            </div>
                            <div>
                                <div class="text-black">Room Temperature</div>
                                <div style="color:#718096">{{room.rt}}</div>
                            </div>
                            <div>
                                <div class="text-black">Room Owner</div>
                                <div style="color:#718096">{{`${storeUsers[room.user].firstName} ${storeUsers[room.user].lastName}`}}</div>
                            </div>
                        </div>
                    </div>
                </a-col>
            </a-row>
            <div v-else style="background-color:#FFF; border-radius:20px; border:1px solid #f1f2fd; padding:10px;">
                You do not have any other room in this hub...
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
            edit:{
                visible:false,
                name:''
            },
            update:0,
            loading:false,
            addRoom:false,
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
        storeUsers() {
            let users = {}
            this.users.forEach(user => {
                users[user.id] = user
            })
            return users
        },
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
            let rooms = {}
            this.storeRooms.forEach(room => {
                rooms[room.id] = room
            })
            return rooms
        },
        storeRooms() {
            let time = this.update
            console.log(time)
            return this.$store.state.rooms
        },
        otherRooms() {
            let rooms = []
            if (this.user && this.user.room) {
                this.storeRooms.forEach(room => {
                    if (room.id != this.user.room) rooms.push(room)
                })
            }
            return rooms
        }
    },
    methods:{
        cancel() {
            this.edit.visible = false
            this.edit.name = ''
        },
        submit() {
            if (this.currentUser.room && this.currentUser.room != '') {
                api().put(`/rooms/${this.currentUser.room}`, {name:this.edit.name}).then(({data}) => {
                    if (data.success) {
                        let obj = JSON.parse(JSON.stringify(this.rooms[this.currentUser.room]))
                        obj.name = this.edit.name

                        this.$store.commit('UPDATE_ROOMS', obj)
                        this.update = Date.now()
                        this.cancel()
                    }
                })
            }
        },
        editRoom() {
            this.edit.visible = true
            this.edit.name = ''
        },
        refresh() {
            if (this.currentUser.room && this.currentUser.room != '') {
                api().get(`/rooms/${this.currentUser.room}`).then(({data}) => {
                    this.$store.commit('UPDATE_ROOMS', data.data)
                    this.update = Date.now()
                })
            }
        },
        closeModal() {
            this.addRoom = false
        },
        addNewRoom() {
            this.addRoom = true
        },
        getRooms() {
            let rooms = []
            rooms = this.rooms.filter(x => x.room == '0')
            return rooms
        },
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
                    this.currentUser = data.user[0]
                }
            }
            this.loading = false
        })
    }
}
</script>

<style scoped>
.add-button{
    cursor:pointer; 
    display:inline-block;
    border-radius:20px;
    padding:5px 10px;
    background-color:var(--blue);
    color:#FFF
}
</style>
<style>
.cancel-button.ant-btn{
    background-color:var(--danger);
    color:#FFF;
    border: none !important;
}
.cancel-button.ant-btn:hover{
    background-color:var(--danger);
    color:#FFF;
    border: none !important;
    filter:brightness(120%);
}
.confirm-button.ant-btn{
    background-color:var(--green);
    color:#FFF;
    border: none !important;
}
.confirm-button.ant-btn:hover{
    background-color:var(--green);
    color:#FFF;
    border: none !important;
    filter:brightness(120%);
}
</style>