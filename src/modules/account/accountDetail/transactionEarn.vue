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
        <el-table :data="data" border height="400">
          <el-table-column label="日期" prop="transactionDate" resizable sortable width="180"></el-table-column>
          <el-table-column label="标的" prop="investmentName" resizable sortable width="120"></el-table-column>
          <el-table-column label="持有" prop="investmentHolding" resizable sortable width="120"></el-table-column>
          <el-table-column label="备注" prop="remark" resizable width="280"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="showSaveTransaction(scope.row)" icon="el-icon-edit" size="small" style="padding: 5px 8px;"></el-button>
              <el-button @click.native.prevent="deleteTransaction(scope.row)" icon="el-icon-delete" size="small" style="padding: 5px 8px;"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="持有记录" :visible.sync="save.isShow">
      <el-form :model="save.data">
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
        <el-form-item label-width="20%" label="持有金额">
          <el-input v-model="save.data.investmentHolding" placeholder="请输入持有金额" clearable style="width:50%;"></el-input>
        </el-form-item>
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
    name: "transactionEarn",
    props:{
      accountCode:{type:String,default:''}
    },
    data () {
      return {
        itemConfig:{
          "moduleFlag":"Transaction",
          "codeKey":"transactionCode",
          "codePrefix":"TR",
          "codeLength":12,
          "sortField":"transactionDate",
          "sortType":"desc",
        },
        itemData:{
          transactionCode:"TR000000000001",
          transactionDate:"2019-08-22 13:30:57",
          investmentCode:'',
          investmentName:'',
          investClassCode:'',
          investClassName:'',
          investmentBuysell:0,
          investmentEarnHistory:0,
          investmentHolding:0,
          remark:"",
          accountCode:"UA000031",
        },

        query:{dateStart:'',dateEnd:''},
        save:{
          isShow:false,
          data:{transactionDate:'',investmentCode:'',investmentHolding:'',remark:''}
        },
        data:[],
        filterObject:[],

        investmentData:{},
        holdingInvestmentCodes:[]

      }
    },
    mounted() {
      this.initFrame();
    },
    methods:{
      initFrame:function() {
        let that=this;
        that.query["accountCode"]=that.accountCode;
        that.clearSaveData();
        that.getInvestHoldingData();
        // that.getInvestHoldingment();
        // that.getHoldingInvestHoldingment();
      },
      clearSaveData() {
        this.save.data={transactionDate:this.CommonUtil.getNow(),investmentCode:'',investmentHolding:'',remark:''};
        this.save.isShow=false;
      },

      getInvestHoldingData() {
        let that=this;
        that.query={"investmentHolding":{"$ne":0}};
        that.$post(that.$api.url.common.getItem,{
          itemConfig:that.itemConfig,
          itemData:that.query
        }).then(res => {
          that.data=res.result;
          that.getInvestHoldingFilterData();
        });
      },
      getInvestHoldingFilterData() {
        let that=this;
        that.filterObject=[];
        for(var i=0;i<that.data.length;i++) {
          if(!that.filterObject.includes(that.data[i].objectName)){
            that.filterObject.push({text:that.data[i].objectName,value:that.data[i].objectName});
          }
        }
      },

      showSaveTransaction(rowdata) {
        let that=this;
        if(!that.CommonUtil.isNullObj(rowdata)) {
          that.save.data={
            transactionCode:rowdata.transactionCode,
            transactionDate:rowdata.transactionDate,
            investmentCode:rowdata.investmentCode,
            investmentHolding:rowdata.investmentHolding,
            remark:rowdata.remark
          };
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
        that.save.data.investmentHolding=Number(that.save.data.investmentHolding);
        if(isNaN(that.save.data.investmentHolding)) {
          console.log(that.save.data);
          that.save.data.investmentHolding=0;
          return;
        }
        that.save.data.transactionDate=that.save.data.transactionDate.replace(/T/g,' ').replace(/.000Z/g,'');
        var saveRecord={
          transactionDate:that.save.data.transactionDate,
          investmentCode:that.save.data.investmentCode,
          investmentName:investment.investmentName,
          investClassCode:investment.investClassCode,
          investClassName:investment.investClassName,
          investmentBuysell:0,
          investmentEarnHistory:0,
          investmentHolding:that.save.data.investmentHolding,
          remark:that.save.data.remark,
          accountCode:that.accountCode
        };
        if(!that.CommonUtil.isNullStr(that.save.data.transactionCode)) saveRecord.transactionCode=that.save.data.transactionCode;
        that.$post(that.$api.url.common.saveItem,{
          itemConfig:that.itemConfig,
          itemData:saveRecord
        }).then(res => {
          that.getInvestHoldingData();
          that.clearSaveData();
          that.save.isShow=false;
        });
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
            that.getInvestHoldingData();
          });
        });
      },


      getInvestHoldingment() {
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
      },
      getHoldingInvestHoldingment() {
        let that=this;
        that.$post(that.$api.url.transaction.getHoldingInvestment,{
          itemConfig:{"moduleFlag":"Transaction","codeKey":"transactionCode"},
          itemData:{}
        }).then(res => {
          that.holdingInvestmentCodes=res.result;
        });
      }

    }
  }
</script>



