<template>
    <div>
        <a-modal :width="550" :visible="visible" @cancel="cancel" :footer="false" :centered="true">
            <div style="font-size:20px; font-weight:500">Add New User</div>
            <div class="my-3">
                <a-form-model :model="newUser" ref="newUser">
                    <a-row :gutter="16">
                        <a-col :span="12">
                            <a-form-model-item label="First Name" prop="firstName" :rules="req('Please enter First Name')">
                                <a-input v-model="newUser.firstName" placeholder="Please enter First Name" />
                            </a-form-model-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-model-item label="Last Name" prop="lastName" :rules="req('Please enter Last Name')">
                                <a-input v-model="newUser.lastName" placeholder="Please enter Last Name" />
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16">
                        <a-col :span="24">
                            <a-form-model-item label="Choose an avatar" prop="avatar" :rules="req('Please select one')">
                                <div class="flex justify-between">
                                    <div @click="newUser.avatar = 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_1_1a7224e7b1.png'" :style="newUser.avatar == 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_1_1a7224e7b1.png' ? 'border:2px solid var(--orange); border-radius:50%' : ''" style="width:80px; height:80px; cursor:pointer">
                                        <img style="width:100%; height:100%; object-fit:cover" :src="require('@/assets/avatar_1.png')" />
                                    </div>
                                    <div @click="newUser.avatar = 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_2_cf2fd523f6.png'" :style="newUser.avatar == 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_2_cf2fd523f6.png' ? 'border:2px solid var(--orange); border-radius:50%' : ''" style="width:80px; height:80px; cursor:pointer">
                                        <img style="width:100%; height:100%; object-fit:cover" :src="require('@/assets/avatar_2.png')" />
                                    </div>
                                    <div @click="newUser.avatar = 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_3_190bd9ade1.png'" :style="newUser.avatar == 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_3_190bd9ade1.png' ? 'border:2px solid var(--orange); border-radius:50%' : ''" style="width:80px; height:80px; cursor:pointer">
                                        <img style="width:100%; height:100%; object-fit:cover" :src="require('@/assets/avatar_3.png')" />
                                    </div>
                                    <div @click="newUser.avatar = 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_4_725c9baeba.png'" :style="newUser.avatar == 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_4_725c9baeba.png' ? 'border:2px solid var(--orange); border-radius:50%' : ''" style="width:80px; height:80px; cursor:pointer">
                                        <img style="width:100%; height:100%; object-fit:cover" :src="require('@/assets/avatar_4.png')" />
                                    </div>
                                    <div @click="newUser.avatar = 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_5_ec3e719ed3.png'" :style="newUser.avatar == 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_5_ec3e719ed3.png' ? 'border:2px solid var(--orange); border-radius:50%' : ''" style="width:80px; height:80px; cursor:pointer">
                                        <img style="width:100%; height:100%; object-fit:cover" :src="require('@/assets/avatar_5.png')" />
                                    </div>
                                    <div @click="newUser.avatar = 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_6_41378fceef.png'" :style="newUser.avatar == 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_6_41378fceef.png' ? 'border:2px solid var(--orange); border-radius:50%' : ''" style="width:80px; height:80px; cursor:pointer">
                                        <img style="width:100%; height:100%; object-fit:cover" :src="require('@/assets/avatar_6.png')" />
                                    </div>
                                </div>
                                <div class="mt-2 flex justify-between">
                                    <div @click="newUser.avatar = 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_7_f81be2c108.png'" :style="newUser.avatar == 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_7_f81be2c108.png' ? 'border:2px solid var(--orange); border-radius:50%' : ''" style="width:80px; height:80px; cursor:pointer">
                                        <img style="width:100%; height:100%; object-fit:cover" :src="require('@/assets/avatar_7.png')" />
                                    </div>
                                    <div @click="newUser.avatar = 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_8_9fff2fbe73.png'" :style="newUser.avatar == 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_8_9fff2fbe73.png' ? 'border:2px solid var(--orange); border-radius:50%' : ''" style="width:80px; height:80px; cursor:pointer">
                                        <img style="width:100%; height:100%; object-fit:cover" :src="require('@/assets/avatar_8.png')" />
                                    </div>
                                    <div @click="newUser.avatar = 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_9_9b3a936e35.png'" :style="newUser.avatar == 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_9_9b3a936e35.png' ? 'border:2px solid var(--orange); border-radius:50%' : ''" style="width:80px; height:80px; cursor:pointer">
                                        <img style="width:100%; height:100%; object-fit:cover" :src="require('@/assets/avatar_9.png')" />
                                    </div>
                                    <div @click="newUser.avatar = 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_10_a9bce5d5c5.png'" :style="newUser.avatar == 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_10_a9bce5d5c5.png' ? 'border:2px solid var(--orange); border-radius:50%' : ''" style="width:80px; height:80px; cursor:pointer">
                                        <img style="width:100%; height:100%; object-fit:cover" :src="require('@/assets/avatar_10.png')" />
                                    </div>
                                    <div @click="newUser.avatar = 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_11_799a9dc0df.png'" :style="newUser.avatar == 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_11_799a9dc0df.png' ? 'border:2px solid var(--orange); border-radius:50%' : ''" style="width:80px; height:80px; cursor:pointer">
                                        <img style="width:100%; height:100%; object-fit:cover" :src="require('@/assets/avatar_11.png')" />
                                    </div>
                                    <div @click="newUser.avatar = 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_12_71413ef232.png'" :style="newUser.avatar == 'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_12_71413ef232.png' ? 'border:2px solid var(--orange); border-radius:50%' : ''" style="width:80px; height:80px; cursor:pointer">
                                        <img style="width:100%; height:100%; object-fit:cover" :src="require('@/assets/avatar_12.png')" />
                                    </div>
                                </div>
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                </a-form-model>
            </div>
            <div class="justify-end" style="display:flex;">
                <a-button class="cancel-button mr-3" @click="cancel">CANCEL</a-button>
                <a-button @click="addUser" class="confirm-button">ADD USER</a-button>
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
        }
    },
    data() {
        return{
            newUser:{
                firstName:'',
                lastName:'',
                avatar:'',
            }
        }    
    },
    methods:{
        cancel(){
            this.$refs.newUser.resetFields()
            this.$emit('closeModal')
        },
        addUser() {
            this.$refs.newUser.validate(valid => {
                if (valid) {
                    console.log('valid')
                    this.$refs.newUser.resetFields()
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