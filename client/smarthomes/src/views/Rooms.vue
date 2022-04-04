<template>
    <div style="width:100%">
        <Loading :show="loading" />
        <div style="padding:0 20px 20px 20px; background-color:var(--offWhiteLight); width:100%; height:100%; min-height:calc(100vh - 80px)">
            <a-row v-if="currentUser.room" :gutter="[16, 16]">
                <a-col :span="24">
                    <div class="shadow" style="border-radius:20px; background-color:#FFF; padding:10px">
                        <div style="font-size:30px; font-weight:500">My Room</div>
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
            this.$store.state.rooms.forEach(room => {
                rooms[room.id] = room
            })
            return rooms
        },
        storeRooms() {
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