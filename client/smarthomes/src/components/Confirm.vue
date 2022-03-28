<template>
    <div>
        <a-modal :centered="true" :visible="visible" @close="$emit('onClose')" :footer="null">
            <h5>{{title}}</h5>
            <div>{{content}}</div>
            <div class="flex justify-end mt-3">
                <a-button @click="$emit('onClose')" class="cancel-button mr-3">{{cancelButton}}</a-button>
                <a-button @click="$emit('ok')" class="confirm-button">{{confirmButton}}</a-button>
            </div>
        </a-modal>
    </div>
</template>

<script>
export default {
    props:{
        title:{
            default:'',
            type:String
        },
        content:{
            default:'',
            type:String
        },
        cancelButton:{
            default:'',
            type:String,
        },
        confirmButton:{
            default:'',
            type:String
        },
        visible:{
            default:false,
            type:Boolean
        }
    }
}
</script>

<style>

</style>