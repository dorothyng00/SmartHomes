<template>
    <div>
        <a-modal :width="550" :visible="visible" @cancel="cancel" :footer="false" :centered="true">
            <div style="font-size:20px; font-weight:500">Add New User</div>
            <div class="my-3">
                <a-form-model ref="newRoom" :model="newRoom">
                    <a-row :gutter="16">
                        <a-col :span="24">
                            <a-form-model-item prop="name" label="Room Name" :rules="req('Please enter Room Name')">
                                <a-input v-model="newRoom.name" placeholder="Please enter Room Name" />
                            </a-form-model-item>
                        </a-col>
                        <a-col :span="24">
                            <a-form-model-item prop="devices" label="Add Devices" :rules="req('Please select device(s) for this room')">
                                <a-select mode="multiple" v-model="newRoom.devices">
                                    <a-select-option v-for="device in availDevices" :key="device.id">{{device.name}}</a-select-option>
                                </a-select>
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                </a-form-model>
            </div>
            <div class="justify-end" style="display:flex;">
                <a-button class="cancel-button mr-3" @click="cancel">CANCEL</a-button>
                <a-button @click="addRoom" class="confirm-button">ADD USER</a-button>
            </div>
        </a-modal>
    </div>
</template>

<script>
export default {
    props:{
        visible:{
            type:Boolean,
            default:false
        },
        availDevices:{
            type:Array,
            default:() => []
        }
    },
    data() {
        return{
            newRoom:{
                name:'',
                devices:[]
            }
        }
    },
    methods:{
        cancel(){
            this.$refs.newRoom.resetFields()
            this.$emit('closeModal')
        },
        addRoom() {
            this.$refs.newRoom.validate(valid => {
                if(valid) {
                    this.cancel()
                }
            })
        },
        req:msg=>({required:true,message:msg}),
    }
}
</script>

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