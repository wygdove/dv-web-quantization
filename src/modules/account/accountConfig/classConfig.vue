<template>
  <div v-model="classConfig">
  </div>
</template>

<script>


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

      }



    }
  }
</script>

