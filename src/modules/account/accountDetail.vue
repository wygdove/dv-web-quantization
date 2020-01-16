<template>
  <div>

    <el-card class="box-card">
      <div>内容</div>
    </el-card>

    <el-tabs type="border-card" class="mt-20">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-data"></i>资产记录</span>
        资产记录
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-notebook-2"></i>流水记录</span>
        流水记录
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import EchartsUtil from '../../utils/EchartsUtil'


  export default {
    name: "accountDetail",
    data () {
      return {
        params:{
          accountCode:''
        }
      }
    },
    mounted() {
      console.log("accountDetail");
      this.params=this.CommonUtil.isNullObj(this.$route.params)?this.params:this.$route.query;
      this.initFrame();
    },
    methods:{
      initFrame:function() {
        console.log(this.params);
        this.initData();
      },
      initData:function() {
        let that=this;
        if(that.CommonUtil.isNullStr(that.params.accountCode)) {
          that.$router.go(-1);
        }
      },
    }
  }
</script>



