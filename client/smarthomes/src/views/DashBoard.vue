<template>
    <div class="lg:flex flex-1 relative">
        <div class="order-2 user-panel" style="background-color:var(--offWhiteLight)">
            <UserPanel />
        </div>
        <div class="flex-1" style="padding:0 20px 20px 20px; background-color:var(--offWhiteLight)">
            <a-row :gutter="[16, 16]">
                <a-col v-for="(mode, modeI) in modes" :key="mode.name+modeI" :xl="{span:8}" :lg="{span:12}" :md="{span:24}">
                    <i v-if="home.deviceMode == mode.name.charAt(0).toLowerCase()" style="color:var(--success); font-size:20px; position:absolute; right:0; top:-5px" class="fas fa-check-circle"></i>
                    <div style="height:132px;" class="display-card" :style="mode.name == 'Power Saving' ? 'background-color:#c94c26' : mode.name == 'Smart Mode'  ? 'background-color:#1e317a' : mode.name == 'Manual Mode' ? 'background-color:#ba435a' : ''">
                        <div class="flex justify-between">
                            <div style="font-size:20px; font-weight:500; color:#FFF">{{mode.name}}</div>
                            <i :style="mode.name == 'Power Saving' ? 'color:#fab24b': mode.name == 'Smart Mode' ? 'color:#3f5ab5' : mode.name == 'Manual Mode' ? 'color:#fb8ca4' : ''" style="font-size:35px;" :class="mode.icon"></i>
                        </div>
                        <div class="mt-3" style="color:#FFF; font-size:15px">{{mode.description}}</div>
                    </div>
                </a-col>
            </a-row>
            <div style="font-size:30px; font-weight:500;" class="my-5">User Preference</div>
            <!-- temperature preference -->
            <a-row class="mt-6" :gutter="[16, 16]"> 
                <a-col :lg="{span:24}">
                    <div class="justify-between" style="background-color:#FFF; border-radius:20px; border:1px solid #f1f2fd; padding:10px; display:flex">
                        <div class="flex">
                            <div style="padding:20px; border-radius:20px; border: 1px solid #f1f2fd;">
                                <i style="font-size:55px; color:var(--orange)" class="fas fa-thermometer-quarter" />
                            </div>
                            <div class="ml-4">
                                <div style="font-size:15px; font-weight:500">Indoor Temperature</div>
                                <div class="flex items-end mt-4">
                                    <div class="flex items-center">
                                        <div style="font-size:25px; font-weight:500; line-height:1">{{home.temperature}}</div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 30 30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle ml-2"><circle cx="12" cy="12" r="10"></circle></svg>
                                    </div>
                                    <div style="font-size:15px; font-weight:500">C</div>
                                </div>
                            </div>
                        </div>
                        <div class="flex-col flex justify-between" style="background-color:#f7f7f9; border-radius:20px; padding:10px 20px">
                            <i @click="increaseTemp" style="cursor:pointer; font-size:20px" class="fas fa-angle-up" />
                            <i @click="decreaseTemp" style="cursor:pointer; font-size:20px" class="fas fa-angle-down" />
                        </div>
                    </div>
                </a-col>
            </a-row>
            <!-- light preference -->
            <a-row class="mt-6" :gutter="[16, 16]">
                <!-- light intensity -->
                <a-col :lg="{span:12}" :md="{span:24}">
                    <div class="flex" style="background-color:#FFF; border-radius:20px; border:1px solid #f1f2fd; padding:10px">
                        <div style="padding:20px; border-radius:20px; border: 1px solid #f1f2fd;">
                            <i style="font-size:40px; color:#fed53b" class="fas fa-lightbulb" />
                        </div>
                        <div class="ml-4 flex-1">
                            <div style="font-size:15px; font-weight:500">Light Intensity</div>
                            <div class="flex items-center">
                                <div style="width:100%" class="flex items-center">
                                    <i :style="home.lightIntensity == 0 ? 'color:#000' : 'color:rgba(0, 0, 0, 0.25);'" style="width:10px" class="far fa-sun" />
                                    <a-slider class="flex-1" v-model="home.lightIntensity" />
                                    <i :style="home.lightIntensity == 100 ? 'color:#000' : 'color:rgba(0, 0, 0, 0.25);'" style="width:10px" class="fas fa-sun" />
                                </div>
                                <div class="ml-2" style="font-size:25px; font-weight:500">{{home.lightIntensity}}%</div>
                            </div>
                        </div> 
                    </div>
                </a-col>
                <!-- light state -->
                <a-col :lg="{span:12}" :md="{span:24}">
                    <div class="flex" style="background-color:#FFF; border-radius:20px; border:1px solid #f1f2fd; padding:10px">
                        <div style="padding:20px; border-radius:20px; border: 1px solid #f1f2fd;">
                            <i style="font-size:40px; color:#fed53b" class="fas fa-lightbulb" />
                        </div>
                        <div class="ml-4 flex-1">
                            <div style="font-size:15px; font-weight:500">Light State</div>
                            <div class="flex items-center mt-3">
                                <a-switch v-model="home.lightState"></a-switch>
                                <div class="ml-2">{{home.lightState ? 'ON':'OFF'}}</div>
                            </div>
                        </div> 
                    </div>
                </a-col>
            </a-row>
            <!-- fan preference -->
            <a-row class="mt-6" :gutter="[16, 16]">
                <!-- fan intensity -->
                <a-col :lg="{span:12}" :md="{span:24}">
                    <div class="flex" style="background-color:#FFF; border-radius:20px; border:1px solid #f1f2fd; padding:10px">
                        <div style="padding:20px; border-radius:20px; border: 1px solid #f1f2fd;">
                            <i style="font-size:40px; color:var(--blue)" class="fas fa-fan" />
                        </div>
                        <div class="ml-4 flex-1">
                            <div style="font-size:15px; font-weight:500">Fan Intensity</div>
                            <div class="flex items-center">
                                <div style="width:100%" class="flex items-center">
                                    <i :style="home.fanIntensity == 0 ? 'color:#000' : 'color:rgba(0, 0, 0, 0.25);'" style="width:10px" class="far fa-fan" />
                                    <a-slider class="flex-1" v-model="home.fanIntensity" />
                                    <i :style="home.fanIntensity == 100 ? 'color:#000' : 'color:rgba(0, 0, 0, 0.25);'" style="width:10px" class="fas fa-fan" />
                                </div>
                                <div class="ml-2" style="font-size:25px; font-weight:500">{{home.fanIntensity}}%</div>
                            </div>
                        </div> 
                    </div>
                </a-col>
                <!-- fan state -->
                <a-col :lg="{span:12}" :md="{span:24}">
                    <div class="flex" style="background-color:#FFF; border-radius:20px; border:1px solid #f1f2fd; padding:10px">
                        <div style="padding:20px; border-radius:20px; border: 1px solid #f1f2fd;">
                            <i style="font-size:40px; color:var(--blue)" class="fas fa-fan" />
                        </div>
                        <div class="ml-4 flex-1">
                            <div style="font-size:15px; font-weight:500">Fan State</div>
                            <div class="flex items-center mt-3">
                                <a-switch v-model="home.fanState"></a-switch>
                                <div class="ml-2">{{home.fanState ? 'ON':'OFF'}}</div>
                            </div>
                        </div> 
                    </div>
                </a-col>
            </a-row>
            <a-row :gutter="[16, 16]">
                <a-col :span="24">
                    <div style="background-color:#FFF; border-radius:20px; border:1px solid #f1f2fd; padding:20px">
                        <div style="font-size:25px; font-weight: 500">Message</div>
                        <a-input class="mt-3" placeholder="Input your message" />
                        <div class="mt-3 flex justify-end">
                            <a-button class="confirm-button">SAVE</a-button>
                        </div>
                    </div>
                </a-col>
            </a-row>
            <a-row :gutter="[16,16]">
                <a-col :span="24">
                    <div style="background-color:#FFF; border-radius:20px; border:1px solid #f1f2fd; padding:20px">
                        <div style="font-size:25px; font-weight: 500">LED Color Settings</div>
                        <a-input class="mt-3" placeholder="Input your message" />
                        <div class="mt-3 flex justify-end">
                            <a-button class="confirm-button">SAVE</a-button>
                        </div>
                    </div>
                </a-col>
            </a-row>
            <!-- <a-row class="mt-6" :gutter="16">
                <a-col :span="24">
                    <div style="background-color:#FFF; border-radius:20px; border: 1px solid #f1f2fd; padding:10px">
                        <div id="chart"></div>
                    </div>
                </a-col>
            </a-row> -->
            <!-- <a-button @click="test">teste</a-button> -->
        </div>
    </div>
</template>

<script>
import UserPanel from '@/components/UserPanel.vue'
// import ApexCharts from 'apexcharts'
export default {
    components:{
        UserPanel
    },
    data() {
        return{
            options:{},
            modes:[
                {
                    name:"Power Saving",
                    description:"Turns off all devices",
                    icon:"fas fa-power-off"
                },
                {
                    name:"Smart Mode",
                    description:"Automatically adjusts hardware to user preferences",
                    icon:"fas fa-magic"
                },
                {
                    name:"Manual Mode",
                    description:"Manually sets the hardware settings",
                    icon:"fas fa-cog"
                }
            ],
            rooms:[
                {
                    name:'Living Room',
                    id:'1',
                    powerConsumption:76
                },
                {
                    name:'Dinning Room',
                    id:'2',
                    powerConsumption:87
                },
                {
                    name:'Kitchen',
                    id:'3',
                    powerConsumption:54
                },
                {
                    name:'Study Room',
                    id:'4',
                    powerConsumption:79
                },
                {
                    name:'Bed Room',
                    id:'5',
                    powerConsumption:49
                },
            ],
            home:{
                id:'1',
                temperature:25,
                lightIntensity:70,
                lightState:false,
                fanIntensity:70,
                fanState:false,
                deviceMode:'m'
            }
        }
    },
    methods:{
        // test() {
        //     this.$http.post('https://capstone-database2-default-rtdb.firebaseio.com').then(({data}) => {
        //         console.log('dataa', data)
        //     })
        // },
        increaseTemp() {
            if (this.home.temperature < 40) this.home.temperature ++
            else return this.$notification['error']({
                message: 'Error',
                description: 'Room temperature cannot be over 40',
                duration: 4
            });
        },
        decreaseTemp() {
            if (this.home.temperature > 15) this.home.temperature --
            else return this.$notification['error']({
                message: 'Error',
                description: 'Room temperature cannot be below 15',
                duration: 4
            });
        }
    },
    // mounted() {
    //     var options = {
    //         series: [{
    //             name: 'Gas',
    //             data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    //             }, {
    //             name: 'Hydro',
    //             data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    //             }, {
    //             name: 'Power Consumption',
    //             data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    //         }],
    //         chart: {
    //             type: 'bar',
    //             height: 350
    //         },
    //         plotOptions: {
    //             bar: {
    //                 horizontal: false,
    //                 columnWidth: '55%',
    //                 endingShape: 'rounded'
    //             },
    //         },
    //         dataLabels: {
    //             enabled: false
    //         },
    //         stroke: {
    //             show: true,
    //             width: 2,
    //             colors: ['transparent']
    //         },
    //         xaxis: {
    //             categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    //         },
    //         yaxis: {
    //             title: {
    //                 text: '$'
    //             }
    //         },
    //         fill: {
    //             opacity: 1
    //         },
    //         tooltip: {
    //             y: {
    //                 formatter: function (val) {
    //                 return "$ " + val
    //                 }
    //             }
    //         }
    //     };
    //     var chart = new ApexCharts(document.querySelector('#chart'), options);

    //     chart.render()
    // }
}
</script>

<style>
.high-percent .ant-progress-inner .ant-progress-circle{
    stroke: var(--danger) !important;
}
.display-card{
    border-radius: 10px;
    border-color:rgba(63,63,63,.15);
    -webkit-box-shadow: 0 1px 3px rgb(63 63 68 / 15%);
    border:none;
    background-color:#FFF;
    padding:20px 15px;
}
</style>
<style scoped>
@media (max-width:1024px) {
    .user-panel{
        padding:0 20px 20px 20px;
    }
}

</style>