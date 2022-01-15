<template>
    <div style="background-color:var(--offWhiteLight)">
        <div class="flex-col flex left-col-width" :style="resize ? 'width:65px':'width:200px'" style="justify-content:space-between; min-height:calc(100vh - 80px); height:100%; background-color:var(--green); border-radius:0 50px 0 0; overflow:hidden">
            <div>    
                <div style="padding:15px 20px; border-bottom:1px solid #FFF; display:flex; align-items: center; color:#FFF">
                    <i @click="resize = !resize" style="font-size:20px; cursor:pointer" class="fas fa-bars mr-3" />
                    <div v-if="!resize">SmartHomes</div>
                </div>
                <div @click="$router.push('/')" class="nav-el" :class="selectedNav == '/' ? 'selected-nav':''">
                    <i style="font-size:20px" class="fas fa-tachometer-alt" :class="resize ? '' :' mr-3'" :style="selectedNav == '/' ? 'color:var(--orange)':''"></i>
                    <div v-if="!resize" :style="selectedNav == '/' ? 'color:#000':''">Dashboard</div>
                </div>
                <div @click="$router.push('/rooms')" class="nav-el" :class="selectedNav == '/rooms' ? 'selected-nav':''">
                    <i style="font-size:20px" class="fas fa-home" :class="resize ? '' :' mr-3'" :style="selectedNav == '/rooms' ? 'color:var(--orange)':''"></i>
                    <div v-show="!resize" :style="selectedNav == '/rooms' ? 'color:#000':''">Rooms</div>
                </div>
                <div @click="$router.push('/devices')" class="nav-el">
                    <i style="font-size:20px" class="fas fa-tablet-alt" :class="resize ? '' :' mr-3'" />
                    <div v-if="!resize" :style="resize ? 'opacity: 0;' : 'opacity: 1;'">Devices</div>
                </div>
                <div class="nav-el">
                    <i style="font-size:20px" class="fas fa-lock" :class="resize ? '' :' mr-3'" />
                    <div v-if="!resize">Security</div>
                </div>
                <div class="nav-el">
                    <i style="font-size:20px" class="fas fa-signal" :class="resize ? '' :' mr-3'" />
                    <div v-if="!resize">Statisics</div>
                </div>
                <div class="nav-el">
                    <i style="font-size:20px" class="fas fa-users" :class="resize ? '' :' mr-3'" />
                    <div v-if="!resize">Members</div>
                </div>
            </div>
            <div>
                <div class="nav-el logout">
                    <i style="font-size:20px" class="fas fa-power-off" :class="resize ? '' :' mr-3'" />
                    <div v-if="!resize">Logout</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            resize:false,
            selectedNav:'/'
        }
    },
    watch:{
        '$route':{
            handler(val) {
                console.log('rounter', val)
                this.selectedNav = val.path
            }
        }
    },
    methods:{

    },
    created() {
        
    },
    mounted() {
        let iconScript = document.createElement('script')
        iconScript.setAttribute('src', 'https://kit.fontawesome.com/f086bec7e5.js')
        document.head.appendChild(iconScript)
    }
}
</script>

<style scoped>

.left-col-width{
    width:200px;
    transition:width .3s ease-in-out;
}
.nav-el{
    display:flex;
    padding:15px 20px;
    align-items: center;
    color:#FFF;
    cursor: pointer;
}
.logout:hover{
    color:var(--danger) !important;
}
.nav-el:hover{
    background-color:var(--offWhite);
    color:#000;
    border-radius:30px 0 0 30px;
}
.selected-nav{
    background-color: #FFF !important;
    border-radius: 30px 0 0 30px;
}
</style>