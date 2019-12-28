<template>
  <div v-model="classConfig">
  </div>
</template>

<script>

  import mongoose from 'mongoose'

  export default {
    name: "classConfig",
    data () {
      return {
        classConfig:[]
      }
    },
    mounted() {
      this.initFrame();
    },
    methods:{
      initFrame:function() {
        this.initData();
      },
      initData:function() {
        mongoose.connect('mongodb://127.0.0.1:37017/quantization');
        // var db=mongoose.connect('mongodb://127.0.0.1:37017/quantization');

      }



    }
  }
</script>

