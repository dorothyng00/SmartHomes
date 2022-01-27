<template>
    <div style="background-color:var(--green); width: 100%; height:calc(100vh - 80px); overflow:hidden">
        <div class="container mx-auto login-page">
            <div class="flex justify-center" style="margin:0 5%;">
                <div>
                    <div class="text-center" style="color:#FFF; font-weight:600; font-size:30px">Welcome to SmartHomes</div>
                    <div class="mt-3" style="background-color:#FFF; padding:20px; border-radius:4px">
                        <a-form-model ref="loginInfo" :model="loginInfo">
                            <a-row :gutter="16">
                                <a-col :span="24">
                                    <a-form-model-item prop="email" required label="Email Address" :rules="{required:true, message:'Please enter the email address'}">
                                        <a-input placeholder="Email Address" v-model="loginInfo.email" />
                                    </a-form-model-item>
                                </a-col>
                                <a-col :span="24">
                                    <a-form-model-item prop="password" required label="Password" :rules="{required:true, message:'Please enter the password'}">
                                        <a-input-password placeholder="Password" v-model="loginInfo.password" />
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                        </a-form-model>
                        <div class="flex items-center">
                            <div style="color:var(--lightWord)">Do not have an account?</div> &nbsp;
                            <div @click="register" class="register-link">Register a new account</div>
                        </div>
                        <div class="mt-3" style="width:100%">
                            <a-button @click="login" style="width:100%" class="login-button">LOG IN</a-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            loginInfo:{
                email:'',
                password:''
            }
        }
    },
    methods:{
        register() {
            if(!this.$route.path.includes('register')) this.$router.push('/register')
        },
        login() {
            this.$refs.loginInfo.validate(valid => {
                if(valid) {
                    console.log('login')
                }
            })
        }
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
.register-link{
    color:var(--lightWord);
}
.register-link:hover{
    color:var(--blue);
    cursor: pointer;
    text-decoration: underline;
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