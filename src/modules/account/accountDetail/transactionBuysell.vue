<template>
  <div>
    <div class="pl-10">
      <el-form :model="query" inline>
        <el-form-item label="日期">
          <el-date-picker v-model="query.dateStart" type="daterange" range-separator="-" unlink-panels start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item size="small">
          <el-button type="primary"><i class="el-icon-search"></i></el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row :gutter="20">
      <el-col :span="15">
        <el-button class="fr padding-4" @click="showSaveTransaction(null)"><i class="el-icon-plus fts-16"></i></el-button>
        <el-table :data="data" show-summary :summary-method="getInvestSummaries" border height="400">
          <el-table-column label="日期" prop="transactionDate" resizable sortable width="180"></el-table-column>
          <el-table-column label="标的" prop="investmentName" resizable sortable width="120"></el-table-column>
          <el-table-column label="投资" prop="investmentBuysell" resizable sortable width="120"></el-table-column>
          <el-table-column label="历史盈利" prop="investmentEarnHistory" resizable sortable width="120"></el-table-column>
          <el-table-column label="备注" prop="remark" resizable width="250"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="showSaveTransaction(scope.row)" icon="el-icon-edit" size="small" style="padding: 5px 8px;"></el-button>
              <el-button @click.native.prevent="deleteTransaction(scope.row)" icon="el-icon-delete" size="small" style="padding: 5px 8px;"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="账本入出" :visible.sync="save.isShow">
      <el-form :model="save.data">
        <el-form-item label-width="20%">
          <el-radio-group v-model="save.data.isBuy" size="medium">
            <el-radio-button :label="true" icon="el-icon-search">买入</el-radio-button>
            <el-radio-button :label="false" icon="el-icon-search">卖出</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="日期" label-width="20%">
          <el-date-picker v-model="save.data.transactionDate" type="datetime" placeholder="选择日期" clearable style="width:50%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="投资标的" label-width="20%">
          <el-select v-model="save.data.investmentCode" placeholder="请选择投资标的" clearable style="width:50%;">
            <el-option v-for="item in investmentData" :key="item.investmentCode" :label="item.investmentName" :value="item.investmentCode">
              <span class="fl">{{item.investmentCode}}&nbsp;&nbsp;{{item.investmentName}}</span>
              <span class="fr fts-13" style="color:#8492a6;">{{item.investClassName}}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <div v-if="save.data.isBuy">
          <el-form-item label-width="20%" label="买入资金">
            <el-input v-model="save.data.investmentBuysell" placeholder="请输入买入资金" clearable style="width:50%;"></el-input>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label-width="20%" label="卖出资金">
            <el-input v-model="save.data.investmentBuysell" placeholder="请输入卖出资金" clearable style="width:50%;"></el-input>
          </el-form-item>
          <el-form-item label-width="20%" label="历史盈利">
            <el-input v-model="save.data.investmentEarnHistory" placeholder="请输入历史盈利" clearable style="width:50%;"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="备注" label-width="20%">
          <el-input type="textarea" v-model="save.data.remark" placeholder="请输入备注" clearable style="width:80%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="save.isShow=false">取 消</el-button>
        <el-button type="primary" @click="saveTransaction">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  export default {
    name: "transactionBuysell",
    data () {
      return {
        itemConfig:{
          "moduleFlag":"Transaction",
          "codeKey":"transactionCode",
          "codePrefix":"TR",
          "codeLength":12,
        },
        itemData:{
          transactionCode:"TR000000000001",
          transactionDate:"2019-08-22 13:30:57",
          investmentCode:'',
          investmentName:'',
          investClassCode:'',
          investClassName:'',
          investmentBuysell:"0",
          investmentHolding:"0",
          investmentEarnHistory:"0",
          remark:"",
          accountCode:"UA000031",
        },

        query:{dateStart:'',dateEnd:''},
        save:{
          isShow:false,
          data:{isBuy:true,transactionDate:'',investmentCode:'',investmentBuysell:'',investmentEarnHistory:'',remark:''}
        },
        data:[],
        filterObject:[],

        investmentData:{},

      }
    },
    mounted() {
      this.initFrame();
    },
    methods:{
      initFrame:function() {
        let that=this;
        that.query["accountCode"]=that.accountCode;
        that.save.data.transactionDate=that.CommonUtil.getNow();
        that.getInvestData();
        that.getInvestment();
      },

      getInvestData() {
        let that=this;
        that.$post(that.$api.url.common.getItem,{
          itemConfig:that.itemConfig,
          itemData:that.query
        }).then(res => {
          that.data=res.result.filter(function(one) {
            return !that.CommonUtil.isNullObj(one.investmentBuysell)&&one.investmentBuysell!=0;
          });
          that.getInvestFilterData();
        });
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
      getInvestSummaries(param) {
        var sums=[];
        param.columns.forEach((column,index) => {
          if(index===0) {
            sums[index]='合计';
          }else if(index===2) {
            const values=param.data.map(item => Number(item[column.property]));
            if(!values.every(value => isNaN(value))) {
              sums[index]=values.reduce((prev,curr) => {
                return !isNaN(Number(curr))?prev+curr:prev;
              },0);
            }
          }else if(index===3) {
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

      showSaveTransaction(rowdata) {
        let that=this;
        if(!that.CommonUtil.isNullObj(rowdata)) {
          that.save.data={
            isBuy:rowdata.recordInOut<0,
            transactionCode:rowdata.transactionCode,
            transactionDate:rowdata.transactionDate,
            investmentBuysell:rowdata.investmentBuysell,
            investmentEarnHistory:rowdata.investmentEarnHistory,
            remark:rowdata.remark
          };
          if(that.save.data.investmentBuysell<0) that.save.data.investmentBuysell=-that.save.data.investmentBuysell;
        }else {
          that.clearSaveData();
        }
        that.save.isShow=true;
      },
      saveTransaction() {
        let that=this;
        var investment=that.investmentData[that.save.data.investmentCode];
        if(that.CommonUtil.isNullObj(investment)) {
          console.log(that.save.data);
          console.log(investment);
          return;
        }
        that.save.data.investmentBuysell=Number(that.save.data.investmentBuysell);
        if(isNaN(that.save.data.investmentBuysell)) {
          console.log(that.save.data);
          that.save.data.investmentBuysell=0;
          return;
        }
        if(that.save.data.isBuy&&that.save.data.investmentBuysell>0) {
          that.save.data.investmentBuysell=-that.save.data.investmentBuysell;
        }
        that.save.data.investmentEarnHistory=Number(that.save.data.investmentEarnHistory);
        if(isNaN(that.save.data.investmentEarnHistory)) that.save.data.investmentEarnHistory=0;
        that.save.data.transactionDate=that.save.data.transactionDate.replace(/T/g,' ').replace(/.000Z/g,'');
        var saveRecord={
          transactionDate:that.save.data.transactionDate,
          recordInOut:that.save.data.recordInOut,
          investmentCode:that.save.data.investmentCode,
          investmentName:investment.investmentName,
          investClassCode:investment.investClassCode,
          investClassName:investment.investClassName,
          investmentBuysell:that.save.data.investmentBuysell,
          investmentHolding:0,
          investmentEarnHistory:that.save.data.investmentEarnHistory,
          remark:that.save.data.remark,
          accountCode:that.accountCode
        };
        if(!that.CommonUtil.isNullStr(that.save.data.transactionCode)) saveRecord.transactionCode=that.save.data.transactionCode;
        that.$post(that.$api.url.common.saveItem,{
          itemConfig:that.itemConfig,
          itemData:saveRecord
        }).then(res => {
          that.getInvestData();
          that.clearSaveData();
          that.save.isShow=false;
        });
      },
      clearSaveData() {
        this.save.data={isBuy:true,transactionDate:this.CommonUtil.getNow(),investmentCode:'',investmentBuysell:'',investmentEarnHistory:'',remark:''};
      },
      deleteTransaction(rowdata) {
        let that=this;
        if(that.CommonUtil.isNullStr(rowdata.transactionCode)) return;
        that.$confirm('确认要删除此记录？','提示',
          {type:'warning',confirmButtonText:'确定',cancelButtonText:'取消'}
        ).then(() => {
          that.$post(that.$api.url.common.deleteItem,{
            itemConfig:that.itemConfig,
            itemData:{transactionCode:rowdata.transactionCode}
          }).then(res => {
            that.getInvestData();
          });
        });
      },


      getInvestment() {
        let that=this;
        that.$post(that.$api.url.common.getItem,{
          itemConfig:{"moduleFlag":"Investment","codeKey":"investmentIdCode"},
          itemData:{}
        }).then(res => {
          that.investmentData={};
          var ivdata=res.result;
          for(var i in ivdata) {
            that.investmentData[ivdata[i].investmentCode]=ivdata[i]
          }
        });
      }

    }
  }
</script>



