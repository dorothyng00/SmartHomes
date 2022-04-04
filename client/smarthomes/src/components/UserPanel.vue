<template>  
    <div>
        <a-modal :visible="visible" @cancel="onClose" :footer="null" :centered="true">
            <h3>Copy the code below and share it with your new member</h3>
            <strong>{{hubId}}</strong>
            <div class="flex justify-end">
                <a-button type="primary" @click="onClose">DONE</a-button>
            </div>
        </a-modal>
        <Loading :show="loading" />
        <AddUserModal :visible="addUser" @closeModal="closeModal" />
        <div class="user-panel" style="background-color: var(--offWhite); border-radius:20px; padding:20px">
            <div style="font-size:22px; font-weight:500">Welcome back {{this.user.firstName}}!</div>
            <div class="mt-5" style="background-color:var(--lightOrange); border-radius:20px; padding:10px">
                <div style="font-size:20px">{{`${shortMonth[new Date().getMonth()]}/${new Date().getDate()}/${new Date().getFullYear()}`}}</div>
            </div>
            <div class="mt-5">
                <div>Members</div>
                <div style="background-color:#FFF; border-radius:20px; padding:10px; display:flex; overflow-x:scroll">
                    <div class="mr-4" v-for="member in users" :key="member.id">
                        <img v-if="member.avatar && member.avatar != ''" style="width:40px; height:40px; margin:auto" :src="member.avatar" />
                        <a-avatar v-else :size="40">{{`${member.firstName.charAt(0).toUpperCase()}${member.lastName.charAt(0).toUpperCase()}`}}</a-avatar>
                        <div>{{member.firstName}}</div>
                    </div>
                    <a-tooltip placement="bottomRight">
                        <template slot="title">
                            <span>Add New User</span>
                        </template>
                        <!-- <div @click="addNewUser" class="flex items-center" style="border:1px solid #000; border-radius:20px; padding:10px; cursor:pointer">
                            <i style="font-size:20px" class="fas fa-plus" />
                        </div> -->
                    </a-tooltip>
                </div>
            </div>
            <div class="mt-5">
                <div>Invite New User</div>
                <a-button @click="shareInfo" class="mt-3" type="primary">GET HUB INFO</a-button>
            </div>
        </div>
    </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import api from '@/services/api'
import AddUserModal from '@/components/AddUserModal.vue' 
export default {
    components:{
        AddUserModal,Loading
    },
    computed:{
        user(){
            return this.$store.state.user
        },
        users() {
            return this.$store.state.users
        }
    },
    data() {
        return{
            loading:false,
            shortMonth:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            addUser:false,
            visible:false,
            hubId:''
        }
    },
    methods:{
        onClose() {
            this.visible = false
            this.hubId = ''
        },
        shareInfo() {
            this.loading = true
            api().get(`/getHub/${this.user.id}`).then(({data}) => {
                this.hubId = data.hubId
                this.loading = false
                this.visible = true
            })
        },
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