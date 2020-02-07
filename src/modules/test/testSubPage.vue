<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="subPageOne">
        <SubPageOne :accountCode="accountCode"></SubPageOne>
      </el-tab-pane>
      <el-tab-pane label="subPageTwo">
        <SubPageTwo :accountCode="accountCode"></SubPageTwo>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import subPageOne from "./subPageOne"
  import subPageTwo from "./subPageTwo"

  export default {
    name: "testSubPage",
    components:{
      SubPageOne:subPageOne,
      SubPageTwo:subPageTwo,
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

        accountCode:'123'
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



