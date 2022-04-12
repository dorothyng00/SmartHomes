<template>
    <div style="width:100%">
        <Loading :show="loading" />
        <div style="padding:0 20px 20px 20px; background-color:var(--offWhiteLight); width:100%; height:100%; min-height:calc(100vh - 80px)">
            <div class="flex justify-between">
                <a-button class="mb-5" type="primary" @click="refresh">REFRESH</a-button>
                <a-dropdown>
                    <a-button>{{`Security Pictures from ${display == 'day' ? 'today':display == 'week'? 'this week':'this month'}`}}</a-button>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item @click="display = 'day'">Today</a-menu-item>
                            <a-menu-item @click="display = 'week'">This Week</a-menu-item>
                            <a-menu-item  @click="display = 'month'">This Month</a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
            <template v-if="displayedImages.length">
                <a-collapse>
                    <a-collapse-panel v-for="(image, imageI) in displayedImages" :key="imageI" :header="image.time">
                        <img style="max-width:400px; object-fit:cover" :src="image.photo" />
                        <div class="flex items-center mt-3">
                            <a-button type="primary" class="mr-3">DOWNLOAD</a-button>
                            <a-button @click="deleteImage(image.id)" class="cancel-button">DELETE</a-button>
                        </div>
                    </a-collapse-panel>
                </a-collapse>
            </template>
            <template v-else>
                <div class="shadow-ml rounded" style="background-color:#FFF; padding:10px">{{`You do not have any security pictures ${display == 'day' ? 'today' : display == 'week' ? 'this week':'this month'}...`}}</div>
            </template>
            <!-- <img src="data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEAAAAAAAD%2F2wBDAAoHCAkIBgoJCAkLCwoMDxkQDw4ODx8WFxIZJCAmJiQgIyIoLToxKCs2KyIjMkQzNjs9QEFAJzBHTEY%2FSzo%2FQD7%2F2wBDAQsLCw8NDx0QEB0%2BKSMpPj4%2BPj4%2BPj4%2BPj4%2BPj4%2BPj4%2BPj4%2BPj4%2BPj4%2BPj4%2BPj4%2BPj4%2BPj4%2BPj4%2BPj4%2BPj4%2BPj7%2FxAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv%2FxAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5%2Bjp6vHy8%2FT19vf4%2Bfr%2FxAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv%2FxAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4%2BTl5ufo6ery8%2FT19vf4%2Bfr%2FwAARCAB4AKADASEAAhEBAxEB%2F9oADAMBAAIRAxEAPwDi3s8Nwopgj2%2Fw%2FpUaIqJMsgH8K%2FlViOdM%2FcX8qg6FqaEFzF%2FcT8q1beaP%2B4n5VPKuxEompbyRf3E%2FKtS3eL%2B4n%2FfNPlXYwcTUg8r%2FAJ5x%2FwDfIq%2FGkR%2F5Zx%2F98CjlRk0WFii%2F55R%2F98CpBFF%2Fzyj%2FAO%2BRRyomw7yov%2BeUf%2FfIpjRRf88o%2FwDvgU%2BVCsQOkf8Azyj%2FAO%2BBVWRI%2FwDnlH%2F3wKfKhWKkkcf%2FADzj%2FwC%2BRVZ0T%2Fnmn%2FfIp2QWKzon%2FPNP%2B%2Baz9QkgggLyCNQO%2BKfKmRY517MelVnsR6UHVFlWSxqq9oymg6YSIsOlWYbtk61J0LU17XUPeti1vh61JjKBs2t571ppqMcf33xTOZxNK2v4ZOjVfVgelFzJoUmo2NMkgc1VkNMCq9VXpiMfVdVt7BTvYb%2F7ted69rUt653n5ewrSKLjHqd20FRm2rMERta%2B1QSWWe1BomVZNPHpVCXTsdKR0U6hUe3kiPSpYbuSPrUnUveNa11P3qWW%2FLt1poz9nqT2upMjg7q7PTNS8yJTmoZy1oG1HOGFKTVnMQuaqvTEVpDXH%2BIPEotmaG1PzDgtVxQ0rnBXt9JPIWdsmse6kzVmp7VtpfLrIyQvk0n2egoY1rUD2XtUlplSXTge1Z9xpWc8UG0KljLnsXhGV6VWWcqeaR2wlzIsJcZrotGv9qYLUMivDQ6i0v8AOOa1YroMKDzZIeWzUEhpmZxPibxGsYa2tG5%2FiavPLqcsTW8dDWKKLtVR%2BWpDPbhNH61IJo%2FU%2FlXNKtFOxkTxyRt6%2FlUymPGc8Uvaook2xn%2BKl8uP1%2FSnzoY026ev6VXe0Q96XOhnOeI3tbOD52OW6YFcbJd2e5gJH%2BX%2FAGK2j8J2UXZEH2%2B2H3Xk%2FwC%2BKs2%2BtQw9Gl%2F74qDpupaG7Z%2BJLXzNvmP9dtdJY63byAbZt3GeKj2iRyTovdGzBqULReZ5g2AZLdq5LxJ4ztGLWtpMSvRnVetaQkmc3JqcJdahDI3Lv%2F3zVFrqE93%2FAO%2Ba1uMgeaHH3m%2FKod8WfvN%2F3zQJntq20IH3BUq20fp2x1Nc7oQuZosLCmd3f1qdYV9%2FzqfYRHcsJAmc1YWMUvZRC5KIVoNqppeyQjhPF6pJP5WW2dxmuJuNPtj%2FAHvzrrjSUVodMHoVGsoucNJz9K3tO8NW89gHZX%2Bb%2FarCroa8%2FKVr3w6se4p5lQwgW8n7zfn1zipcVLQ3hO5alulaDyoywGOT3NY9xaxPk5fOcnmqjTUdiJRKMtpHnq%2F51Xa3T1eug45Iia3T1aovLGeppknu4qVazMydKsLSAnWp1qQJ1olfZCx9qQjzHXLjzbyQ571zs710s6Y6IbZQPe30dvGOXbH0r1W20xYbVIwOgrlrP3rETZT1CyjjiZ5OAK4HV%2BZidu1e1XEuizJLYpC2RVHZcheqkvFNGFRFc1CetWc7Pch1qVagxJ1qdKkZYU1MpqQJ1NUtbuvs%2BnO1OK1A8tvZN0jVky81uzoOh8CW3m6y0n9xa9Fu9Vs7GP8AfSLu%2Fu5rjk71DJq7OH1%2FxWJ8rCvTp6VxtxevO5LVvHY2XulVpKTfTNFIM0xxQUytItVnqkc00e1wyrINyHNWVNSYEymp1NSMnVqnU0hkqtXIeMNRy4t1bheTVU9wRxE0maqMao6C3Y31zaxOttIY9%2FXFV5ppG5kdm%2BtZW1NNkVGbIqs3BrUyY00zfimK4u6l3UiuYY9V5BTQSOus9QvNEufKutzQ%2BtdnYX8N3GGjYGk0cxooanU1AyZWqZWpCC5uBBbPIewrzHUroz3DO3UmtYbGkEZchqs7VJoThlWAbeWppbjmoRoVpcdqrOa0MmRbqjamSMzS76AHbs0EZpFXPU7q0hu02yoprnZtMvdJm82w3NF%2FdoOdGtpXiWOQ%2BVcgxOPWulhnSRcqwqBllWqZWpDKGvP%2FAMSx688uPvGto%2FCXAoyVXIzSNCeObyo9o71WklrMors%2BajNWQyE03NMkaaaaBCBqlRqAPS9OlucbrrgN0rUHzDmh6mJnajodterkDY%2FqKwjHq%2Biyfut00P8AKpLNnTPF1vJhLk%2BW%2FwDtV00F5FMoKOOakCLVv3lg%2FwBK8%2Fm61pH4TSBRfk1G1JmhC1QNQSyImmE0EjO1MpgNNNoASkB5oA70zI1zueRy7HCQg4HStm31KJuJDsPv3peRgaKPxxRLNFjbJzSKMXUNFs70swi2P9eaxXsNV0ti1pKSnXGaZRPH4ruUQxXkP4ist76OUk5FNaaFRImlU9KhZ6TNLkRNRsaQiEmmGqJG0ygQUygBKWgLnoK%2FZoR5UQiLMPmcvWhbNaQfMkkMeOSYiMVTsc6G3Go26K22RMem8c1Rhv4Zp2YMv1paF6mxAbXbzKmT23jFPe8tEh2%2BamP9%2BloBkagdOuQ27YSed26uamsbfzP3ciY%2F3qei2NY6lRodv3XU%2FjUe7HpSuOwnnJ3FJ5sXpSC4hkipu6GmIYWippaKgBu5KbuWgQ3OamW1kPTFAGoZjJ8m47d33a0bf96MfKNvU0PczGy2%2FmMyKeBSBFhIzztqhkn20hf8KqzXPzHH3akCq8%2BT1NRl%2BaGjWJGzVGTSsVcippxTJGUmKBCYpMUAJigDJoA6DStJATzrkcn7q1o%2BTEP4akzcj%2F%2FZ" /> -->
        </div>
    </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import moment from 'moment'
export default {
    components:{
        Loading
    },
    data(){
        return{
            loading:false,
            file:{},
            files:[],
            display:'day',
        }
    },
    computed:{
        displayedImages() {
            let files = []
            let now = moment()
            if (this.files.length) {
                let store = []
                this.files.forEach(file => {
                    let obj = {}
                    obj = file
                    obj.date = moment(file.time).format('X')*1000
                    store.push(obj)
                })
                if(this.display == 'day'){
                    let start = now.startOf('day').format('X')*1000
                    let end = now.endOf('day').format('X')*1000
                    files = store.filter(x => x.date<= end && x.date >= start)
                }
                if (this.display == 'month') {
                    let start = now.startOf('month').format('X')*1000
                    let end = now.endOf('month').format('X')*1000
                    files = store.filter(x => x.date<= end && x.date >= start)
                }
                if (this.display == 'week') {
                    let start = now.startOf('week').format('X')*1000
                    let end = now.endOf('week').format('X')*1000
                    files = store.filter(x => x.date<= end && x.date >= start)
                }
            }
            return files
        }
    },
    methods:{
        moment,
        deleteImage(id) {
            this.loading = true
            this.$http.delete(`https://capstone-database2-default-rtdb.firebaseio.com/esp32-cam/${id}.json`).then(() => {
                let index = this.files.findIndex(x => x.id == id) 
                this.files.splice(index, 1)
                this.loading = false
            })
        },
        refresh() {
            this.loading=true
            this.$http.get('https://capstone-database2-default-rtdb.firebaseio.com/esp32-cam.json').then(({data}) => {
                if (data != null) {
                    let list = []
                    Object.keys(data).forEach(key => {
                        let obj = {}
                        obj = data[key]
                        obj.id = key
                        list.push(obj)
                    })
                    this.files = list
                }
                this.loading = false
            })
        },
        dataURLtoFile(dataurl, filename) { 
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), 
                n = bstr.length, 
                u8arr = new Uint8Array(n);
                
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            
            return new File([u8arr], filename, {type:mime});
        }
    },
    created() {
        this.loading=true
        this.$http.get('https://capstone-database2-default-rtdb.firebaseio.com/esp32-cam.json').then(({data}) => {
            if (data != null) {
                let list = []
                Object.keys(data).forEach(key => {
                    let obj = {}
                    obj = data[key]
                    obj.id = key
                    list.push(obj)
                })
                this.files = list
            }
            this.loading = false
        })
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
</style>