<template>
  <div>
    <div class="pl-10">
      <el-form :model="query" inline>
        <el-form-item label="日期">
          <el-date-picker v-model="query.dateStart" type="daterange" range-separator="-" unlink-panels start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item size="small">
          <el-button type="primary" @click="getEarnData"><i class="el-icon-search"></i></el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row :gutter="20">
      <el-col :span="20">
        <el-button class="fr padding-4" @click="showSaveAssetRecord(null)"><i class="el-icon-plus fts-16"></i></el-button>
        <el-table :data="data" border height="400">
          <el-table-column label="日期" prop="recordDate" resizable sortable width="200"></el-table-column>
          <el-table-column label="总资产" prop="recordHolding" resizable sortable width="150"></el-table-column>
          <el-table-column label="备注" prop="remark" resizable min-width="220"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="showSaveAssetRecord(scope.row)" icon="el-icon-edit" size="small" style="padding:5px 8px;"></el-button>
              <el-button @click.native.prevent="deleteAssetRecord(scope.row)" icon="el-icon-delete" size="small" style="padding:5px 8px;"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="总资产记录" :visible.sync="save.isShow">
      <el-form :model="save.data">
        <el-form-item label="日期" label-width="20%">
          <el-date-picker v-model="save.data.recordDate" type="datetime" placeholder="选择日期" clearable style="width:50%;"></el-date-picker>
        </el-form-item>
        <el-form-item label-width="20%" label="总资产">
          <el-input v-model="save.data.recordHolding" placeholder="请输入总资产" clearable style="width:50%;"></el-input>
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

  import CommonUtil from "../../../utils/CommonUtil";

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
          "sortField":"recordDate",
          "sortType":"desc",
        },
        itemData:{
          recordCode:"AR000000000002",
          recordDate:"2019-08-22 13:30:57",
          recordInOut:"0",
          recordHolding:"10000000000",
          accountCode:"UA000031",
        },

        query:{"recordHolding":{"$ne":0},dateStart:'',dateEnd:''},
        save:{
          isShow:false,
          data:{recordDate:'',recordHolding:'',remark:''}
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
        that.getEarnData();
      },
      getEarnData() {
        let that=this;
        that.data=[];
        that.query={"recordHolding":{"$ne":0}};
        that.$post(that.$api.url.common.getItem,{
          itemConfig:that.itemConfig,
          itemData:that.query
        }).then(res => {
          that.data=res.result;
        });
      },

      showSaveAssetRecord(rowdata) {
        let that=this;
        if(!that.CommonUtil.isNullObj(rowdata)) {
          that.save.data={
            recordCode:rowdata.recordCode,
            recordDate:rowdata.recordDate,
            recordHolding:rowdata.recordHolding,
            remark:rowdata.remark
          };
        }else {
          that.save.data={isOut:false,recordDate:that.CommonUtil.getNow(),recordHolding:'',remark:''};
        }
        that.save.isShow=true;
      },
      saveAssetRecord() {
        let that=this;
        that.save.data.recordHolding=Number(that.save.data.recordHolding);
        if(isNaN(that.save.data.recordHolding)) {
          console.log(that.save.data);
          that.save.data.recordHolding=0;
          return;
        }
        if(typeof(that.save.data.recordDate)==='string') {
          that.save.data.recordDate=that.save.data.recordDate.replace(/T/g,' ').replace(/.000Z/g,'');
        }else if(typeof(that.save.data.recordDate)==='object'&&(that.save.data.recordDate instanceof Date)) {
          that.save.data.recordDate=that.CommonUtil.formatDate(that.save.data.recordDate);
        }else {
          return;
        }
        var saveRecord={
          recordDate:that.save.data.recordDate,
          recordInOut:0,
          recordHolding:that.save.data.recordHolding,
          remark:that.save.data.remark,
          accountCode:that.accountCode
        };
        if(!that.CommonUtil.isNullStr(that.save.data.recordCode)) saveRecord.recordCode=that.save.data.recordCode;
        that.$post(that.$api.url.common.saveItem,{
          itemConfig:that.itemConfig,
          itemData:saveRecord
        }).then(res => {
          that.getEarnData();
          that.save.data={isOut:false,recordDate:that.CommonUtil.getNow(),recordHolding:'',remark:''};
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
            that.getEarnData();
          });
        });
      },

    }
  }
</script>



