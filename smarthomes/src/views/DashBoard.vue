<template>
    <div class="flex w-full relative">
        <div class="flex-1" style="padding:0 20px 20px 20px; background-color:var(--offWhiteLight)">
            <a-row :gutter="[16, 16]">
                <a-col v-for="room in rooms" :key="room.id" :span="6">
                    <div style="width:auto; border-radius:20px; border:1px solid #f1f2fd; padding:10px; background-color:#FFF">
                        <div class="flex justify-between items-center">
                            <div style="font-weight:500; font-size:15px">{{room.name}}</div>
                            <a-dropdown>
                                <i style="cursor:pointer" class="fas fa-ellipsis-h" />
                                <a-menu slot="overlay">
                                    <a-menu-item>Edit Room</a-menu-item>
                                </a-menu>
                            </a-dropdown>
                        </div>
                        <div class="flex items-center mt-2">
                            <div class="mr-3">
                                <a-progress :strokeColor="room.powerConsumption < 50 ? '#44bba4' : room.powerConsumption < 75 ? '#fed38f' : room.powerConsumption < 100 ? '#dc3545' : ''" type="circle" :percent="room.powerConsumption" />
                            </div>
                            <div>
                                <div style="font-size:25px; font-weight:500">{{room.powerConsumption}}</div>
                                <div>kWh</div>
                            </div>
                        </div>
                    </div>
                </a-col>
            </a-row>
            <a-row class="mt-6" :gutter="16">
                <a-col :span="12">
                    <div class="justify-between" style="background-color:#FFF; border-radius:20px; border:1px solid #f1f2fd; padding:10px; display:flex">
                        <div class="flex">
                            <div style="padding:20px; border-radius:20px; border: 1px solid #f1f2fd;">
                                <i style="font-size:35px" class="fas fa-thermometer-quarter" />
                            </div>
                            <div class="ml-4">
                                <div style="font-size:15px; font-weight:500">Indoor Temperature</div>
                                <div class="flex items-end mt-4">
                                    <div class="flex items-center">
                                        <div style="font-size:25px; font-weight:500; line-height:1">{{home.temperature}}</div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle ml-2"><circle cx="12" cy="12" r="10"></circle></svg>
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
                <a-col :span="12">
                    <div class="flex" style="background-color:#FFF; border-radius:20px; border:1px solid #f1f2fd; padding:10px">
                        <div style="padding:20px; border-radius:20px; border: 1px solid #f1f2fd;">
                            <i style="font-size:35px" class="fas fa-lightbulb" />
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
            </a-row>
            <a-row class="mt-6" :gutter="16">
                <a-col :span="24">
                    <div style="background-color:#FFF; border-radius:20px; border: 1px solid #f1f2fd; padding:10px">
                        <div id="chart"></div>
                    </div>
                </a-col>
            </a-row>
        </div>
        <div style="background-color:var(--offWhiteLight)">
            <UserPanel />
        </div>
    </div>
</template>

<script>
import UserPanel from '@/components/UserPanel.vue'
import ApexCharts from 'apexcharts'
export default {
    components:{
        UserPanel
    },
    data() {
        return{
            options:{},
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
            }
        }
    },
    methods:{
        increaseTemp() {
            this.home.temperature ++
        },
        decreaseTemp() {
            this.home.temperature --
        }
    },
    mounted() {
        var options = {
            series: [{
                name: 'Gas',
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
                }, {
                name: 'Hydro',
                data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
                }, {
                name: 'Power Consumption',
                data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
            }],
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '55%',
                    endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            },
            yaxis: {
                title: {
                    text: '$'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                    return "$ " + val
                    }
                }
            }
        };
        var chart = new ApexCharts(document.querySelector('#chart'), options);

        chart.render()
    }
}
</script>

<style>
.high-percent .ant-progress-inner .ant-progress-circle{
    stroke: var(--danger) !important;
}
</style>