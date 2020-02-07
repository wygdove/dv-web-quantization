<template>
  <div>

    <el-card class="box-card">
      <div class="pl-10">
        <el-form :model="investClass.query" inline>
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

    <!------ inout start ------>
    <el-card class="box-card mt-20">
      <el-collapse value="0">
        <el-collapse-item name="0">
          <template slot="title">账本入出</template>
          <div>
            <el-tabs value="0" type="border-card">
              <el-tab-pane>
                <span slot="label"><i class="el-icon-notebook-2"></i>入账流水</span>
                <div class="pl-10">
                  <el-form :model="inout.query" inline>
                    <el-form-item label="日期">
                      <el-date-picker v-model="inout.query.dateStart" type="daterange" range-separator="-" unlink-panels start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item size="small">
                      <el-button type="primary" @click="getClassData"><i class="el-icon-search"></i></el-button>
                    </el-form-item>
                  </el-form>
                </div>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-button class="fr padding-4" @click="showSaveAssetRecord(null)"><i class="el-icon-plus fts-16"></i></el-button>
                    <el-table :data="inout.data" show-summary :summary-method="getInoutRecordSummaries" border height="400">
                      <el-table-column label="日期" prop="recordDate" resizable sortable min-width="122"></el-table-column>
                      <el-table-column label="投入" prop="recordInOut" resizable sortable min-width="100"></el-table-column>
                      <el-table-column label="备注" prop="remark" resizable sortable min-width="100"></el-table-column>
                      <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                          <el-button @click.native.prevent="showSaveAssetRecord(scope.row)" icon="el-icon-edit" size="small" style="padding: 5px 8px;"></el-button>
                          <el-button @click.native.prevent="deleteAssetRecord(scope.row)" icon="el-icon-delete" size="small" style="padding: 5px 8px;"></el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-s-data"></i>总资产记录</span>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-table :data="investObject.data" show-summary :summary-method="getinvestSummaries" border>
                      <el-table-column label="日期" prop="date" sortable></el-table-column>
                      <el-table-column label="投入总额" prop="objectCode" sortable></el-table-column>
                      <el-table-column label="总资产记录" prop="objectName" sortable></el-table-column>
                      <el-table-column label="盈利" prop="buy" sortable></el-table-column>
                      <el-table-column label="收益率" prop="className" sortable></el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-collapse-item>
      </el-collapse>
      <el-dialog title="账本入出" :visible.sync="inout.save.isShow">
        <el-form :model="inout.save.data">
          <el-form-item label-width="20%">
            <el-radio-group v-model="inout.save.data.isOut" size="medium">
              <el-radio-button :label="false" icon="el-icon-search">转入</el-radio-button>
              <el-radio-button :label="true" icon="el-icon-search">转出</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="日期" label-width="20%">
            <el-date-picker v-model="inout.save.data.recordDate" type="datetime" placeholder="选择日期" clearable style="width:50%;"></el-date-picker>
          </el-form-item>
          <el-form-item label-width="20%" label="转出资金" v-if="inout.save.data.isOut" >
            <el-input v-model="inout.save.data.recordInOut" placeholder="请输入转出资金" clearable style="width:50%;"></el-input>
          </el-form-item>
          <el-form-item label-width="20%" label="转入资金" v-else>
            <el-input v-model="inout.save.data.recordInOut" placeholder="请输入转入资金" clearable style="width:50%;"></el-input>
          </el-form-item>
          <el-form-item label="备注" label-width="20%">
            <el-input type="textarea" v-model="inout.save.data.remark" placeholder="请输入备注" clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="inout.save.isShow=false">取 消</el-button>
          <el-button type="primary" @click="saveAssetRecord">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="总资产记录" :visible.sync="inout.save.isShow">
        <el-form :model="inout.save.data">
          <el-form-item label-width="20%">
            <el-radio-group v-model="inout.save.data.isOut" size="medium">
              <el-radio-button :label="false" icon="el-icon-search">转入</el-radio-button>
              <el-radio-button :label="true" icon="el-icon-search">转出</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="日期" label-width="20%">
            <el-date-picker v-model="inout.save.data.recordDate" type="datetime" placeholder="选择日期" clearable style="width:50%;"></el-date-picker>
          </el-form-item>
          <el-form-item label-width="20%" label="转出资金" v-if="inout.save.data.isOut" >
            <el-input v-model="inout.save.data.recordInOut" placeholder="请输入转出资金" clearable style="width:50%;"></el-input>
          </el-form-item>
          <el-form-item label-width="20%" label="转入资金" v-else>
            <el-input v-model="inout.save.data.recordInOut" placeholder="请输入转入资金" clearable style="width:50%;"></el-input>
          </el-form-item>
          <el-form-item label="备注" label-width="20%">
            <el-input type="textarea" v-model="inout.save.data.remark" placeholder="请输入备注" clearable></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="inout.save.isShow=false">取 消</el-button>
          <el-button type="primary" @click="saveAssetRecord">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
    <!------ inout end   ------>

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
        aaaaaa:['1'],
        inout:{
          itemConfig:{
            "moduleFlag":"AssetRecord",
            "codeKey":"recordCode",
            "codePrefix":"AR",
            "codeLength":12,
          },
          itemData:{
            recordCode:"AR000000000002",
            recordDate:"2019-08-22 13:30:57",
            recordInOut:"10000000",
            recordHolding:"0",
            accountCode:"UA000031",
          },

          query:{dateStart:'',dateEnd:''},
          save:{
            isShow:false,
            data:{isOut:false,recordDate:'',recordInOut:'',remark:''}
          },
          data:[]
        },
        investObject:{
          itemConfig:{
            "moduleFlag":"Transaction",
            "codeKey":"transactionCode",
            "codePrefix":"TR",
            "codeLength":12,
          },

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
        that.initInout();

        that.investObject.query["accountCode"]=that.params.accountCode;
        that.getInvestData();

        that.investClass.query.date=that.CommonUtil.getToday();
        that.investClass.query["accountCode"]=that.params.accountCode;
        that.getClassData();
      },


      /******** inout start ********/
      initInout() {
        let that=this;
        that.inout.query["accountCode"]=that.params.accountCode;
        that.inout.save.data.recordDate=that.CommonUtil.getNow();
        that.getInoutData();
      },
      getInoutData() {
        let that=this;
        that.$post(that.$api.url.common.getItem,{
          itemConfig:that.inout.itemConfig,
          itemData:that.inout.query
        }).then(res => {
          that.inout.data=res.result;
        });
      },
      getInoutRecordSummaries(param) {
        var sums=[];
        param.columns.forEach((column,index) => {
          if(index===0) {
            sums[index]='合计';
          }else if(index===1) {
            const values=param.data.map(item => Number(item[column.property]));
            if(!values.every(value => isNaN(value))) {
              sums[index]=values.reduce((prev,curr) => {
                return !isNaN(Number(curr))?prev+curr:prev;
              },0);
            }
          }else {
            sums[index]='';
          }
        });
        return sums;
      },
      showSaveAssetRecord(ardata) {
        let that=this;
        if(!that.CommonUtil.isNullObj(ardata)) {
          that.inout.save.data={
            isOut:ardata.recordInOut<0,
            recordCode:ardata.recordCode,
            recordDate:ardata.recordDate,
            recordInOut:ardata.recordInOut,
            remark:ardata.remark
          };
          if(that.inout.save.data.recordInOut<0) that.inout.save.data.recordInOut=-that.inout.save.data.recordInOut;
        }else {
          that.inout.save.data={isOut:false,recordDate:new Date(),recordInOut:'',remark:''};
        }
        that.inout.save.isShow=true;
        console.log(that.inout.save.data);
      },
      saveAssetRecord() {
        let that=this;
        that.inout.save.data.recordInOut=Number(that.inout.save.data.recordInOut);
        if(isNaN(that.inout.save.data.recordInOut)) that.inout.save.data.recordInOut=0;
        if(that.inout.save.data.isOut&&that.inout.save.data.recordInOut>0) {
          that.inout.save.data.recordInOut=-that.inout.save.data.recordInOut;
        }
        var saveRecord={
          recordDate:that.CommonUtil.formatDate(that.inout.save.data.recordDate),
          recordInOut:that.inout.save.data.recordInOut,
          recordHolding:0,
          remark:that.inout.save.data.remark,
          accountCode:that.params.accountCode
        };
        if(!that.CommonUtil.isNullStr(that.inout.save.data.recordCode)) saveRecord.recordCode=that.inout.save.data.recordCode;
        that.$post(that.$api.url.common.saveItem,{
          itemConfig:that.inout.itemConfig,
          itemData:saveRecord
        }).then(res => {
          that.getInoutData();
          that.inout.save.data={isOut:false,recordDate:that.CommonUtil.getNow(),recordInOut:'',remark:''};
          that.inout.save.isShow=false;
        });
      },
      deleteAssetRecord(ardata) {
        let that=this;
        if(that.CommonUtil.isNullStr(ardata.recordCode)) return;
        that.$confirm('确认要删除此记录？','提示',
          {type:'warning',confirmButtonText:'确定',cancelButtonText:'取消'}
          ).then(() => {
          that.$post(that.$api.url.common.deleteItem,{
            itemConfig:that.inout.itemConfig,
            itemData:{recordCode:ardata.recordCode}
          }).then(res => {
            that.getInoutData();
          });
        });
      },
      /******** inout end   ********/







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


<style>
  .el-input-number .el-input__inner {
    text-align: left;
  }
</style>
