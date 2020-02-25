<template>
  <div>

    <!------ invest class start ------>
    <el-card class="box-card">
      <InvestClass :accountCode="params.accountCode"></InvestClass>
    </el-card>
    <!------ invest class end   ------>

    <!------ inout start ------>
    <el-card class="box-card mt-20">
      <el-collapse value="0">
        <el-collapse-item name="0">
          <template slot="title">账本入出</template>
          <div>
            <el-tabs value="1" type="border-card">
              <el-tab-pane>
                <span slot="label"><i class="el-icon-notebook-2"></i>总览</span>
                <AssetRecordOverview :accountCode="params.accountCode"></AssetRecordOverview>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-notebook-2"></i>入账流水</span>
                <AssetRecordInout :accountCode="params.accountCode"></AssetRecordInout>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-s-data"></i>总资产记录</span>
                <AssetRecordEarn :accountCode="params.accountCode"></AssetRecordEarn>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <!------ inout end   ------>

    <!------ invest start ------>
    <el-card class="box-card mt-20">
      <el-collapse>
        <el-collapse-item>
          <template slot="title">投资标的</template>
          <div>
            <el-tabs value="1" type="border-card">
              <el-tab-pane>
                <span slot="label"><i class="el-icon-notebook-2"></i>投资流水</span>
                <TransactionBuysell :accountCode="params.accountCode"></TransactionBuysell>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-s-data"></i>收益记录</span>
                <TransactionEarn :accountCode="params.accountCode"></TransactionEarn>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <!------ invest end   ------>

  </div>
</template>

<script>
  import EchartsUtil from '../../utils/EchartsUtil'

  import assetRecordInout from './accountDetail/assetRecordInout'
  import assetRecordEarn from './accountDetail/assetRecordEarn'
  import AssetRecordOverview from './accountDetail/AssetRecordOverview'
  import transactionBuysell from './accountDetail/transactionBuysell'
  import transactionEarn from './accountDetail/transactionEarn'
  import investClass from './accountDetail/investClass'


  export default {
    name: "accountDetail",
    components: {
      AssetRecordInout:assetRecordInout,
      AssetRecordEarn:assetRecordEarn,
      AssetRecordOverview:AssetRecordOverview,
      TransactionBuysell:transactionBuysell,
      TransactionEarn:transactionEarn,
      InvestClass:investClass
    },
    data () {
      return {
        params:{
          accountCode:'',
        },
        aaaaaa:['1']
      }
    },
    mounted() {
      this.params=this.CommonUtil.isNullObj(this.$route.params)?this.params:this.$route.query;
      this.initFrame();
    },
    methods:{
      initFrame:function() {
        let that=this;
        if(that.CommonUtil.isNullStr(that.params.accountCode)) {
          that.$router.go(-1);
          return;
        }
        this.initData();
      },
      initData:function() {
        let that=this;
      },














    }
  }
</script>


<style>
  .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
