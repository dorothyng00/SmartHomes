<template>
    <div style="width:100%">
        <div style="padding:0 20px 20px 20px; background-color:var(--offWhiteLight); width:100%; height:100%; min-height:calc(100vh - 80px)">
            <AddRoomModal :visible="addRoom" @closeModal="closeModal" :availDevices="availDevices" />
            <a-row :gutter="[16,16]">
                <a-col :span="24" v-for="room in rooms" :key="room.id">
                    <div style="background-color:#FFF; border-radius:20px; border:1px solid #f1f2fd; padding:10px;">
                        <div class="flex justify-between items-center">
                            <div style="font-weight:500; font-size:18px">{{room.name}}</div>
                            <div class="flex items-center">
                                <a-tooltip placement="bottomRight" class="mr-3">
                                    <template slot="title">Edit Room</template>
                                    <i style="cursor:pointer" class="fas fa-ellipsis-h" />
                                </a-tooltip>
                                <a-tooltip placement="bottomRight">
                                    <template slot="title">Delete Room</template>
                                    <i style="color:var(--danger); cursor:pointer" class="fas fa-trash-alt" />
                                </a-tooltip>
                            </div>
                        </div>
                        <div class="flex mt-3">
                            <div class="mr-5">
                                <div style="font-weight:500">Power Consumption</div>
                                <div>{{room.powerConsumption}}kWh</div>
                            </div>
                            <div class="ml-5">
                                <div style="font-weight:500">Devices</div>
                                <div v-for="device in devices" :key="device.id">
                                    <div v-if="device.room == room.id">{{device.name}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :span="24">
                    <div class="mt-4 add-button" @click="addNewRoom">
                        <div class="flex items-center">
                            <i style="font-size:15px" class="fas fa-plus-circle mr-2" />
                            <div>Add New Room</div>
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import AddRoomModal from '@/components/AddRoomModal.vue' 

export default {
    components:{
        AddRoomModal
    },
    computed:{
        availDevices() {
            let devices = []
            devices = this.devices.filter(x => x.room == '0')
            return devices
        }
    },
    data() {
        return{
            addRoom:false,
            rooms:[
                {
                    name:'Living Room',
                    id:'1',
                    powerConsumption:76,
                    updatedAt:1637087029874,
                },
                {
                    name:'Dinning Room',
                    id:'2',
                    powerConsumption:87,
                    updatedAt:1637087029874,
                },
                {
                    name:'Kitchen',
                    id:'3',
                    powerConsumption:54,
                    updatedAt:1637087029874
                },
                {
                    name:'Study Room',
                    id:'4',
                    powerConsumption:79,
                    updatedAt:1637087029874
                },
                {
                    name:'Bed Room',
                    id:'5',
                    powerConsumption:49,
                    updatedAt:1637087029874
                },
            ],
            devices:[
                {
                    name:'Fan',
                    id:'1',
                    room:'1',
                    editedBy:'1',
                    updatedAt:1637087029874
                },
                {
                    name:'AC',
                    id:'2',
                    room:'1',
                    editedBy:'2',
                    updatedAt:1637087029874
                },
                {
                    name:'Humidifier',
                    id:'3',
                    room:'1',
                    editedBy:'2',
                    updatedAt:1637087029874
                },
                {
                    name:'Fridge',
                    id:'4',
                    room:'3',
                    editedBy:'3',
                    updatedAt:1637087029874
                },
                {
                    name:'Oven',
                    id:'5',
                    room:'3',
                    editedBy:'3',
                    updatedAt:1637087029874
                },
                {
                    name:'Washing Machine',
                    id:'6',
                    room:'3',
                    editedBy:'3',
                    updatedAt:1637087029874
                },
                {
                    name:'Mini Fridge',
                    id:'7',
                    room:'2',
                    editedBy:'4',
                    updatedAt:1637087029874
                },
                {
                    name:'Heater',
                    id:'8',
                    room:'5',
                    editedBy:'4',
                    updatedAt:1637087029874
                },
                {
                    name:'Speaker',
                    id:'9',
                    room:'4',
                    editedBy:'4',
                    updatedAt:1637087029874
                },
                {
                    name:'AC',
                    id:'10',
                    room:'4',
                    editedBy:'4',
                    updatedAt:1637087029874
                },
                {
                    name:'Test',
                    id:'11',
                    room:'0',
                    editedBy:'4',
                    updatedAt:1637087029874
                }
            ]
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
        }
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