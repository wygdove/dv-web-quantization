<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="14">
        <el-table :data="data" border height="400">
          <el-table-column label="日期" prop="recordDate" resizable sortable width="170"></el-table-column>
          <el-table-column label="当日投入" prop="recordInOutDay" resizable sortable width="105"></el-table-column>
          <el-table-column label="总投入" prop="recordInOutSum" resizable sortable width="105"></el-table-column>
          <el-table-column label="总资产" prop="recordHolding" resizable sortable width="105"></el-table-column>
          <el-table-column label="历史盈利" prop="earnHistory" resizable sortable width="125"></el-table-column>
          <el-table-column label="持有盈利" prop="earnHolding" resizable sortable width="125"></el-table-column>
          <el-table-column label="备注" prop="remark" resizable sortable width="200"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  export default {
    name: "assetRecordEarn",
    props:{
      accountCode:{type:String,default:''}
    },
    data () {
      return {
        itemConfig:{
          "moduleFlag":"AssetRecord",
          "codeKey":"recordCode",
          "codePrefix":"AR",
          "codeLength":12,
        },
        itemData:{
          recordCode:"AR000000000002",
          recordDate:"2019-08-22 13:30:57",
          recordInOut:"0",
          recordHolding:"10000000000",
          accountCode:"UA000031",

          recordInOutDay:'',
          recordInOutSum:'',
          earnHistory:'',
          earnHolding:'',

        },

        query:{dateStart:'',dateEnd:''},
        data:[]
      }
    },
    mounted() {
      this.initFrame();
    },
    methods:{
      initFrame:function() {
        let that=this;
        that.query["accountCode"]=that.accountCode;
        that.getEarnData();
      },
      getEarnData() {
        let that=this;
        that.$post(that.$api.url.common.getItem,{
          itemConfig:that.itemConfig,
          itemData:that.query
        }).then(res => {
          that.data=res.result;
        });
      }

    }
  }
</script>



