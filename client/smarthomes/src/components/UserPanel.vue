<template>  
    <div>
        <AddUserModal :visible="addUser" @closeModal="closeModal" />
        <div class="user-panel" style="background-color: var(--offWhite); border-radius:20px; padding:20px">
            <div style="font-size:22px; font-weight:500">Welcome back {{this.user.firstName}}!</div>
            <div class="mt-5" style="background-color:var(--lightOrange); border-radius:20px; padding:10px">
                <div style="font-size:20px">{{`${shortMonth[new Date().getMonth()]}/${new Date().getDate()}/${new Date().getFullYear()}`}}</div>
            </div>
            <div class="mt-5">
                <div>Members</div>
                <div style="background-color:#FFF; border-radius:20px; padding:10px; display:flex; overflow-x:scroll">
                    <div class="mr-4" v-for="member in members" :key="member.id">
                        <img style="width:40px; height:40px; margin:auto" :src="member.avatar" />
                        <div>{{member.firstName}}</div>
                    </div>
                    <a-tooltip placement="bottomRight">
                        <template slot="title">
                            <span>Add New User</span>
                        </template>
                        <div @click="addNewUser" class="flex items-center" style="border:1px solid #000; border-radius:20px; padding:10px; cursor:pointer">
                            <i style="font-size:20px" class="fas fa-plus" />
                        </div>
                    </a-tooltip>
                </div>
            </div>
            <div class="mt-5">
                <div>Popular Devices</div>
            </div>
        </div>
    </div>
</template>

<script>
import AddUserModal from '@/components/AddUserModal.vue' 
export default {
    components:{
        AddUserModal
    },
    data() {
        return{
            user:{
                firstName:'Dorothy',
                lastName:'Nguyen',
                id:'1',
                avatar:'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_1_1a7224e7b1.png',
            },
            members:[
                {
                    firstName:'Dorothy',
                    lastName:'Nguyen',
                    id:'1',
                    avatar:'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_1_1a7224e7b1.png',
                },
                {
                    firstName:'Leslie',
                    lastName:'Kocsis',
                    id:'2',
                    avatar:'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_2_cf2fd523f6.png',
                },
                {
                    firstName:'Adnan',
                    lastName:'Hossain',
                    id:'3',
                    avatar:'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_3_190bd9ade1.png',
                },
                {
                    firstName:'Kashavan',
                    lastName:'Parameswaran',
                    id:'4',
                    avatar:'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_4_725c9baeba.png',
                },
                {
                    firstName:'Justin',
                    lastName:'Yang',
                    id:'5',
                    avatar:'https://bildhive.nyc3.digitaloceanspaces.com/v3///avatar_5_ec3e719ed3.png',
                }
            ],
            shortMonth:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            addUser:false,
        }
    },
    methods:{
        addNewUser() {
            this.addUser = true
        },
        closeModal() {
            this.addUser = false
        }
    }
}
</script>

<style scoped>
@media (min-width:1024px) {
    .user-panel{
        width:400px;
    }
}
@media (max-width:1024px) {
    .user-panel{
        width:100%;
    }
}
</style>