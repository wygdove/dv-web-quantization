<template>
  <div>
    <div class="pl-10">
      <el-form :model="query" inline>
        <el-form-item label="日期" size="small">
          <el-date-picker v-model="query.date" type="date" placeholder="选择日期" clearable></el-date-picker>
        </el-form-item>
        <el-form-item size="small">
          <el-button type="primary" @click="getClassData"><i class="el-icon-search"></i></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table :data="data" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column label="日期" prop="date" sortable></el-table-column>
        <el-table-column label="投入" prop="inout" sortable></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

  export default {
    name: "investClass",
    data () {
      return {
        itemConfig:{
          "moduleFlag":"",
          "codeKey":"",
          "codePrefix":"",
          "codeLength":6
        },
        itemData:{},

        query:{},
        data:[]
      }
    },
    mounted() {
      this.initFrame();
    },
    methods:{
      initFrame:function() {
        let that=this;

        that.query.date=that.CommonUtil.getToday();
        that.query["accountCode"]=that.accountCode;
        that.getClassData();
      },
      getClassData() {
        let that=this;
        that.data=[
          {
            date: '2020-01-02 13:30:57',
            objectCode:'123123',
            objectName:'唐人发债',
            buy: '1000',
            className:'可转债'
          },
          {
            date: '2020-01-02 13:30:57',
            objectCode:'123123',
            objectName:'山鹰发债',
            buy: '1000',
            className:'可转债'
          },
          {
            date: '2020-01-02 13:30:57',
            objectCode:'123123',
            objectName:'烽火发债',
            buy: '1000',
            className:'可转债'
          },
          {
            date: '2020-01-02 13:30:57',
            objectCode:'123123',
            objectName:'英联发债',
            buy: '1000',
            className:'可转债'
          }
        ];
        // that.getInvestFilterData();
      },





      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      }
    }
  }
</script>



