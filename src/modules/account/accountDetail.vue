<template>
  <div>

    <el-card class="box-card">
      <div class="pl-10">
        <el-form :inline="true" :model="investClass.query" class="demo-form-inline">
          <el-form-item label="日期" size="small">
            <el-date-picker v-model="investClass.query.date" type="date" placeholder="选择日期" clearable></el-date-picker>
          </el-form-item>
          <el-form-item size="small">
            <el-button type="primary" @click="getClassData"><i class="el-icon-search"></i></el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table :data="investClass.data" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column label="日期" prop="date" sortable></el-table-column>
          <el-table-column label="投入" prop="inout" sortable></el-table-column>
        </el-table>
      </div>
    </el-card>

    <el-card class="box-card mt-20">
      <el-collapse>
        <el-collapse-item>
          <template slot="title">账本入出</template>
          <div>
            <el-tabs value="1" type="border-card">
              <el-tab-pane>
                <span slot="label"><i class="el-icon-notebook-2"></i>入账流水</span>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-table :data="inout.data" show-summary border>
                      <el-table-column label="日期" prop="date" sortable></el-table-column>
                      <el-table-column label="投入" prop="inout" sortable></el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-s-data"></i>收益记录</span>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-table :data="investObject.data" show-summary :summary-method="getinvestSummaries" border>
                      <el-table-column label="日期" prop="date" sortable></el-table-column>
                      <el-table-column label="标的代码" prop="objectCode" sortable></el-table-column>
                      <el-table-column label="标的名称" prop="objectName" sortable
                                       :filters="investObject.filterObject" :filter-method="filterHandler" filter-placement="bottom-end"></el-table-column>
                      <el-table-column label="买入/卖出" prop="buy" sortable></el-table-column>
                      <el-table-column label="标的类别名称" prop="className" sortable></el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <el-card class="box-card mt-20">
      <el-collapse>
        <el-collapse-item>
          <template slot="title">投资标的</template>
          <div>
            <el-tabs value="1" type="border-card">
              <el-tab-pane>
                <span slot="label"><i class="el-icon-notebook-2"></i>投资流水</span>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <el-table :data="inout.data" show-summary border>
                      <el-table-column label="日期" prop="date" sortable></el-table-column>
                      <el-table-column label="投入" prop="inout" sortable></el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-s-data"></i>收益记录</span>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-table :data="investObject.data" show-summary :summary-method="getinvestSummaries" border>
                      <el-table-column label="日期" prop="date" sortable></el-table-column>
                      <el-table-column label="标的代码" prop="objectCode" sortable></el-table-column>
                      <el-table-column label="标的名称" prop="objectName" sortable
                                       :filters="investObject.filterObject" :filter-method="filterHandler" filter-placement="bottom-end"></el-table-column>
                      <el-table-column label="买入/卖出" prop="buy" sortable></el-table-column>
                      <el-table-column label="标的类别名称" prop="className" sortable></el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>

  </div>
</template>

<script>
  import EchartsUtil from '../../utils/EchartsUtil'


  export default {
    name: "accountDetail",
    data () {
      return {
        params:{
          accountCode:'',
        },
        inout:{
          query:{date:''},
          data:[]
        },
        investObject:{
          query:{},
          data:[],
          filterObject:[]
        },
        investClass:{
          query:{},
          data:[]
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
        this.initData();
      },
      initData:function() {
        let that=this;
        if(that.CommonUtil.isNullStr(that.params.accountCode)) {
          that.$router.go(-1);
          return;
        }
        that.inout.query["accountCode"]=that.params.accountCode;
        that.getInoutData();
        that.investObject.query["accountCode"]=that.params.accountCode;
        that.getInvestData();

        that.investClass.query.date=that.CommonUtil.getToday();
        that.investClass.query["accountCode"]=that.params.accountCode;
        that.getClassData();
      },

      getInoutData() {
        let that=this;
        that.inout.data=[
          {
            date: '2019/8/22 13:30:57',
            inout: '1000'
          },
          {
            date: '2019/8/22 13:30:57',
            inout: '1000'
          },
          {
            date: '2019/8/22 13:30:57',
            inout: '1000'
          },
          {
            date: '2019/8/22 13:30:57',
            inout: '1000'
          }
        ];
      },

      getInvestData() {
        let that=this;
        that.investObject.data=[
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

      getClassData() {
        let that=this;
        that.investObject.data=[
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
        that.investObject.filterObject=[];
        for(var i=0;i<that.investObject.data.length;i++) {
          if(!that.investObject.filterObject.includes(that.investObject.data[i].objectName)){
            that.investObject.filterObject.push({text:that.investObject.data[i].objectName,value:that.investObject.data[i].objectName});
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
      }



    }
  }
</script>



