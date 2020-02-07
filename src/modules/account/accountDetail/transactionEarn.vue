<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-table :data="data" show-summary :summary-method="getinvestSummaries" border>
          <el-table-column label="日期" prop="date" sortable></el-table-column>
          <el-table-column label="标的代码" prop="objectCode" sortable></el-table-column>
          <el-table-column label="标的名称" prop="objectName" sortable
                           :filters="filterObject" :filter-method="filterHandler" filter-placement="bottom-end"></el-table-column>
          <el-table-column label="买入/卖出" prop="buy" sortable></el-table-column>
          <el-table-column label="标的类别名称" prop="className" sortable></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  export default {
    name: "transactionEarn",
    data () {
      return {
        itemConfig:{
          "moduleFlag":"Transaction",
          "codeKey":"transactionCode",
          "codePrefix":"TR",
          "codeLength":12,
        },

        query:{},
        data:[],
        filterObject:[]
      }
    },
    mounted() {
      this.initFrame();
    },
    methods:{
      initFrame:function() {
        let that=this;
        that.query["accountCode"]=that.accountCode;
        that.getInvestData();
      },
      getInvestData() {
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
        that.getInvestFilterData();
      },
      getInvestFilterData() {
        let that=this;
        that.filterObject=[];
        for(var i=0;i<that.data.length;i++) {
          if(!that.filterObject.includes(that.data[i].objectName)){
            that.filterObject.push({text:that.data[i].objectName,value:that.data[i].objectName});
          }
        }
      },

      getinvestSummaries(param) {
        var sums=[];
        param.columns.forEach((column,index) => {
          if(index===0) {
            sums[index]='合计';
            return;
          }else if(index===3) {
            const values=param.data.map(item => Number(item[column.property]));
            if(!values.every(value => isNaN(value))) {
              sums[index]=values.reduce((prev,curr) => {
                if(!isNaN(Number(curr))) {
                  return prev+curr;
                } else {
                  return prev;
                }
              },0);
            }
          }
        });
        return sums;
      },

      filterHandler(value,row,column) {
        return row[column['property']]===value;
      },


    }
  }
</script>



