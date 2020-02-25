<template>
  <div>

  </div>
</template>

<script>

  export default {
    name: "TransactionOverview",
    data () {
      return {
        itemConfig:{
          "moduleFlag":"",
          "codeKey":"",
          "codePrefix":"",
          "codeLength":6
        },
        itemData:{},
      }
    },
    mounted() {
      this.initFrame();
    },
    methods:{
      initFrame:function() {
      }

    }
  }
</script>



