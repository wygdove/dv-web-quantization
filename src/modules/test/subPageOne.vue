<template>
  <div>
lalala
  </div>
</template>

<script>

  export default {
    name: "subPageOne",
    props:{
      accountCode:{type:String,default:''}
    },
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
      console.log(this.accountCode);
      this.initFrame();
    },
    methods:{
      initFrame:function() {
      }

    }
  }
</script>



