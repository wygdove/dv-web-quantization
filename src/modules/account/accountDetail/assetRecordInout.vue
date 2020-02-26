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
      <el-col :span="10">
        <el-button class="fr padding-4" @click="showSaveAssetRecord(null)"><i class="el-icon-plus fts-16"></i></el-button>
        <el-table :data="data" show-summary :summary-method="getInoutRecordSummaries" border height="400">
          <el-table-column label="日期" prop="recordDate" resizable sortable width="180"></el-table-column>
          <el-table-column label="投入" prop="recordInOut" resizable sortable width="120"></el-table-column>
          <el-table-column label="备注" prop="remark" resizable width="220"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="showSaveAssetRecord(scope.row)" icon="el-icon-edit" size="small" style="padding: 5px 8px;"></el-button>
              <el-button @click.native.prevent="deleteAssetRecord(scope.row)" icon="el-icon-delete" size="small" style="padding: 5px 8px;"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="账本入出" :visible.sync="save.isShow">
      <el-form :model="save.data">
        <el-form-item label-width="20%">
          <el-radio-group v-model="save.data.isOut" size="medium">
            <el-radio-button :label="false" icon="el-icon-search">转入</el-radio-button>
            <el-radio-button :label="true" icon="el-icon-search">转出</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="日期" label-width="20%">
          <el-date-picker v-model="save.data.recordDate" type="datetime" placeholder="选择日期" clearable style="width:50%;"></el-date-picker>
        </el-form-item>
        <el-form-item label-width="20%" label="转出资金" v-if="save.data.isOut" >
          <el-input v-model="save.data.recordInOut" placeholder="请输入转出资金" clearable style="width:50%;"></el-input>
        </el-form-item>
        <el-form-item label-width="20%" label="转入资金" v-else>
          <el-input v-model="save.data.recordInOut" placeholder="请输入转入资金" clearable style="width:50%;"></el-input>
        </el-form-item>
        <el-form-item label="备注" label-width="20%">
          <el-input type="textarea" v-model="save.data.remark" placeholder="请输入备注" clearable style="width:80%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="save.isShow=false">取 消</el-button>
        <el-button type="primary" @click="saveAssetRecord">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name: "assetRecordInout",
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
      }
    },
    mounted() {
      this.initFrame();
    },
    methods:{
      initFrame:function() {
        let that=this;
        that.query["accountCode"]=that.accountCode;
        that.save.data.recordDate=that.CommonUtil.getNow();
        that.getInoutData();
      },

      getInoutData() {
        let that=this;
        that.$post(that.$api.url.common.getItem,{
          itemConfig:that.itemConfig,
          itemData:that.query
        }).then(res => {
          that.data=res.result.filter(function(one) {
            return !that.CommonUtil.isNullObj(one.recordInOut)&&one.recordInOut!=0;
          });
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
              },0).toFixed(2);
            }
          }else {
            sums[index]='';
          }
        });
        return sums;
      },

      showSaveAssetRecord(rowdata) {
        let that=this;
        if(!that.CommonUtil.isNullObj(rowdata)) {
          that.save.data={
            isOut:rowdata.recordInOut<0,
            recordCode:rowdata.recordCode,
            recordDate:rowdata.recordDate,
            recordInOut:rowdata.recordInOut,
            remark:rowdata.remark
          };
          if(that.save.data.recordInOut<0) that.save.data.recordInOut=-that.save.data.recordInOut;
        }else {
          that.save.data={isOut:false,recordDate:that.CommonUtil.getNow(),recordInOut:'',remark:''};
        }
        that.save.isShow=true;
      },
      saveAssetRecord() {
        let that=this;
        that.save.data.recordInOut=Number(that.save.data.recordInOut);
        if(isNaN(that.save.data.recordInOut)) {
          console.log(that.save.data);
          that.save.data.recordInOut=0;
          return;
        }
        if(that.save.data.isOut&&that.save.data.recordInOut>0) {
          that.save.data.recordInOut=-that.save.data.recordInOut;
        }
        that.save.data.recordDate=that.save.data.recordDate.replace(/T/g,' ').replace(/.000Z/g,'');
        var saveRecord={
          recordDate:that.save.data.recordDate,
          recordInOut:that.save.data.recordInOut,
          recordHolding:0,
          remark:that.save.data.remark,
          accountCode:that.accountCode
        };
        if(!that.CommonUtil.isNullStr(that.save.data.recordCode)) saveRecord.recordCode=that.save.data.recordCode;
        that.$post(that.$api.url.common.saveItem,{
          itemConfig:that.itemConfig,
          itemData:saveRecord
        }).then(res => {
          that.getInoutData();
          that.save.data={isOut:false,recordDate:that.CommonUtil.getNow(),recordInOut:'',remark:''};
          that.save.isShow=false;
        });
      },
      deleteAssetRecord(rowdata) {
        let that=this;
        if(that.CommonUtil.isNullStr(rowdata.recordCode)) return;
        that.$confirm('确认要删除此记录？','提示',
          {type:'warning',confirmButtonText:'确定',cancelButtonText:'取消'}
        ).then(() => {
          that.$post(that.$api.url.common.deleteItem,{
            itemConfig:that.itemConfig,
            itemData:{recordCode:rowdata.recordCode}
          }).then(res => {
            that.getInoutData();
          });
        });
      },

    }
  }
</script>



