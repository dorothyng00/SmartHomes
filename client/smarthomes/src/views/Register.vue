<template>
    <div style="background-color:var(--green); width: 100%; height:calc(100vh - 80px);">
        <div class="container mx-auto login-page">
            <div class="flex justify-center" style="margin:0 5%;">
                <div>
                    <div class="text-center" style="color:#FFF; font-size:30px">Create New Account</div>
                    <div class="mt-3" style="background-color:#FFF; padding:20px; border-radius:4px">
                        <a-form-model ref="register" :model="register">
                            <a-row :gutter="16">
                                <a-col :span="24">
                                    <a-form-model-item prop="email" required label="Email Address" :rules="{required:true, message:'Please enter the email address'}">
                                        <a-input placeholder="Email Address" v-model="register.email" />
                                        <div v-if="register.email != ''" >
                                            <div class="flex items-center" style="color:var(--success)" v-if="register.email.includes('@') && register.email.includes('.')"><a-icon class="mr-2" type="check" /><div>Valid Email</div></div>
                                            <div class="flex items-center" style="color:var(--danger)" v-if="!register.email.includes('@') || !register.email.includes('.')"><a-icon class="mr-2" type="close" /><div>Invalid Email</div></div>
                                        </div>
                                    </a-form-model-item>
                                </a-col>
                                <a-col :span="24">
                                    <a-form-model-item prop="password" required label="Password" :rules="{required:true, message:'Please enter the password'}">
                                        <a-input-password placeholder="Password" v-model="register.password" />
                                        <div v-if="register.password != ''" >
                                            <div class="flex items-center" style="color:var(--success)" v-if="register.email.includes('@') && register.email.includes('.')"><a-icon class="mr-2" type="check" /><div>Valid Email</div></div>
                                            <div class="flex items-center" style="color:var(--danger)" v-if="!register.email.includes('@') || !register.email.includes('.')"><a-icon class="mr-2" type="close" /><div>Invalid Email</div></div>
                                        </div>
                                    </a-form-model-item>
                                </a-col>
                                <a-col :span="24">
                                    <a-form-model-item prop="password" required label="Confirm Password" :rules="{required:true, message:'Please re-enter the password'}">
                                        <a-input placeholder="Password" v-model="register.confirmPassword" />
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                        </a-form-model>
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
            register:{
                email:'',
                password:'',
                confirmPassword:''
            }
        }
    }
}
</script>

<style scoped>
@media screen and (min-width:768px) {
    .login-page{
        padding-top:8%;
    }
}
@media screen and (max-width:768px) {
    .login-page{
        padding-top:50px;
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