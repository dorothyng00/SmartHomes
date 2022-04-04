<template>
    <div style="background-color:var(--green); width: 100%; height:100%; padding-bottom:20px; overflow-y:scroll">
        <Loading :show="loading" />
        <div class="container mx-auto login-page">
            <div class="flex justify-center" style="margin:0 5%;">
                <div>
                    <div class="text-center" style="color:#FFF; font-size:30px">Create New Account</div>
                    <div class="mt-3" style="background-color:#FFF; padding:20px; border-radius:4px">
                        <a-form-model ref="register" :model="register">
                            <a-row :gutter="16">
                                <a-col :span="12">
                                    <a-form-model-item prop="firstName" required label="First Name" :rules="{required:true, message:'Please enter the first name'}">
                                        <a-input placeholder="First Name" v-model="register.firstName" />
                                    </a-form-model-item>
                                </a-col>
                                <a-col :span="12">
                                    <a-form-model-item prop="lastName" required label="Last Name" :rules="{required:true, message:'Please enter the last name'}">
                                        <a-input placeholder="Last Name" v-model="register.lastName" />
                                    </a-form-model-item>
                                </a-col>
                                <a-col :span="24">
                                    <a-form-model-item prop="email" required label="Email Address" :rules="{required:true, message:'Please enter the email address'}">
                                        <a-input placeholder="Email Address" v-model="register.email" />
                                        <div v-if="register.email != ''" >
                                            <div class="flex items-center" style="color:var(--success)" v-if="emailRequirements(register.email)"><a-icon class="mr-2" type="check" /><div>Valid Email</div></div>
                                            <div class="flex items-center" style="color:var(--danger)" v-else><a-icon class="mr-2" type="close" /><div>Invalid Email</div></div>
                                        </div>
                                    </a-form-model-item>
                                </a-col>
                                <a-col :span="24">
                                    <a-form-model-item prop="password" required label="Password" :rules="{required:true, message:'Please enter the password'}">
                                        <a-input-password placeholder="Password" v-model="register.password" />
                                        <div v-if="getTotalPoints(register.password) <= 1">
                                            <p style="text-align: left; margin-bottom: 0px !important;">Very weak</p>
                                            <div class="mb-3" style="width: 50px; border: 1px solid red;"></div>
                                        </div>
                                        <div v-else-if="getTotalPoints(register.password) == 2">
                                            <p style="text-align: left; margin-bottom: 0px !important;">Weak</p>
                                            <div class="mb-3" style="width: 100px; border: 1px solid red;"></div>
                                        </div>
                                        <div v-else-if="getTotalPoints(register.password) == 3">
                                            <p style="text-align: left; margin-bottom: 0px !important;">Medium</p>
                                            <div class="mb-3" style="width: 150px; border: 1px solid orange;"></div>
                                        </div>
                                        <div v-else-if="getTotalPoints(register.password) == 4">
                                            <p style="text-align: left; margin-bottom: 0px !important;">Good</p>
                                            <div class="mb-3" style="width: 200px; border: 1px solid blue;"></div>
                                        </div>
                                        <div v-else>
                                            <p style="text-align: left; margin-bottom: 0px !important;">Strong</p>
                                            <div class="mb-3" style="width: 250px; border: 1px solid green;"></div>
                                        </div>
                                        <h3 class="font-size-16 text-left">Create a password that:</h3>
                                        <ul class="text-left" :style="[register.password.length>2 ? {'padding-inline-start':'0px !important'} : {'padding-inline-start':'22px !important'}]">
                                            <li :style="[register.password.length>2 ? {'list-style-type': 'none'} : {'': ''}]">
                                                <a-icon v-if="getEightCharacter(register.password) && register.password.length > 2" type="check" style="color: green; padding-right: 8px;" />
                                                <a-icon v-else-if="getEightCharacter(register.password) == false && register.password.length > 2" type="close" style="color: red; padding-right: 8px;" />contains at least 8 characters
                                            </li>
                                            <li :style="[register.password.length>2 ? {'list-style-type': 'none'} : {'': ''}]">
                                                <a-icon v-if="getLowerAndUpper(register.password) && register.password.length > 2" type="check" style="color: green; padding-right: 8px;" />
                                                <a-icon v-else-if="getLowerAndUpper(register.password) == false && register.password.length > 2" type="close" style="color: red; padding-right: 8px;" />contains both lower (a-z) and uppercase letters (A-Z)
                                            </li>
                                            <li :style="[register.password.length>2 ? {'list-style-type': 'none'} : {'': ''}]">
                                                <a-icon v-if="getNumberOrSymbol(register.password) && register.password.length > 2" type="check" style="color: green; padding-right: 8px;" />
                                                <a-icon v-else-if="getNumberOrSymbol(register.password) == false && register.password.length > 2" type="close" style="color: red; padding-right: 8px;" />contains at least one number (0-9) or a symbol
                                            </li>
                                            <li :style="[register.password.length>2 ? {'list-style-type': 'none'} : {'': ''}]">
                                                <a-icon v-if="getNameEmail(register.firstName, register.lastName, register.email, register.password) && register.password.length > 2" type="check" style="color: green; padding-right: 8px;" />
                                                <a-icon v-else-if="getNameEmail(register.firstName, register.lastName, register.email, register.password) == false && register.password.length > 2" type="close" style="color: red; padding-right: 8px;" />does not contain your name or email address
                                            </li>
                                        </ul>
                                    </a-form-model-item>
                                </a-col>
                                <a-col :span="24">
                                    <a-form-model-item prop="confirmPassword" required label="Confirm Password" :rules="{required:true, message:'Please re-enter the password'}">
                                        <a-input-password placeholder="Password" v-model="register.confirmPassword" />
                                        <div v-if="register.password.length">
                                            <div class="flex items-center" style="color:var(--success)" v-if="register.password == register.confirmPassword"><a-icon class="mr-2" type="check" /><div>Password matches</div></div>
                                            <div class="flex items-center" style="color:var(--danger)" v-else><a-icon class="mr-2" type="close" /><div>Password does not match</div></div>
                                        </div>
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                        </a-form-model>
                        <div class="flex items-center">
                            <div style="color:var(--lightWord)">Already have an account?</div> &nbsp;
                            <div @click="login" class="login-link">Log in</div>  
                        </div>
                        <div class="mt-3" style="width:100%">
                            <a-button @click="submit" style="width:100%" class="login-button">CREATE ACCOUNT</a-button>
                        </div>
                        <div class="mt-2" style="color:var(--danger)" v-if="errorMessage != ''">{{errorMessage}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/services/api'
import Loading from '@/components/Loading.vue'
export default {
    components:{
        Loading
    },
    data() {
        return{
            register:{
                email:'',
                password:'',
                confirmPassword:'',
                firstName:'',
                lastName:''
            },
            loading:false,
            errorMessage:''
        }
    },
    methods:{
        login() {
            if (!this.$route.path.includes('login')) this.$router.push('/login')
        },
        submit() {
            this.$refs.register.validate(valid => {
                if (valid) {
                    console.log('register', this.register)
                    api().post('/register', this.register).then(({data}) => {
                        console.log('dataa', data)
                        if (data.success)this.$router.push('/login')
                        else if (data.error) {
                            this.errorMessage = data.error.message
                        }
                    })
                }  
            })
        },
        emailRequirements(email){
            let requirements = true;
            if ((email.match(/[@]+/) == null || email.match(/[.]+/) == null) && email.length > 4){
                requirements = false
            }
            return requirements
		},
		getEightCharacter(pass){
            let eightCharacter = false
            if (pass.length >= 8){
                eightCharacter = true
            }
            return eightCharacter
		},
		getLowerAndUpper(pass){
            let lowerAndUpper = false;
            if (pass.match(/[a-z]+/) != null && pass.match(/[A-Z]+/) != null){
                lowerAndUpper = true
            }
            return lowerAndUpper
		},
		getNumberOrSymbol(pass){
            let numberOrSymbol = false;
            if (pass.match(/[0-9]+/) != null || pass.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)){
                numberOrSymbol = true
            }
            return numberOrSymbol
		},
		getNameEmail(firstName, lastName, email, password){
            let noNameEmail = true;
            if (firstName != '' && lastName != '' && email != ''){
                if (password.match(new RegExp(firstName, "i")) != null || password.match(new RegExp(lastName, "i")) != null || password.match(new RegExp(email, "i")) != null){
                    noNameEmail = false
                }
            }
            return noNameEmail
		},
        getTotalPoints(password) {
            var points = 0;

            if (password >= 4) points++;
            if ((password.match(/[a-z]/)) && (password.match(/[A-Z]/))) points++;
            if (password.match(/\d+/)) points++;
            if (password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/)) points++;
            if (password.length >= 8) points++;
            if (password.length >= 12) points++;

            return points
		}
    }
}
</script>

<style scoped>
.login-link{
    color:var(--lightWord);
}
.login-link:hover{
    color:var(--blue);
    cursor: pointer;
    text-decoration: underline;
}
@media screen and (min-width:768px) {
    .login-page{
        padding-top:8%;
    }
}
@media screen and (max-width:768px) {
    .login-page{
        padding-top:10px;
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