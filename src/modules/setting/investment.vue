<template>
  <div>
    <div class="pl-10">
      <el-form :model="query" inline>
        <el-form-item label="标的编码">
          <el-input v-model="query.investmentCode" clearable></el-input>
        </el-form-item>
        <el-form-item size="small">
          <el-button type="primary" @click="getTableData"><i class="el-icon-search"></i></el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-button class="fr padding-4" @click="showSaveItem(null)"><i class="el-icon-plus fts-16"></i></el-button>
        <el-table :data="data" border height="400">
          <el-table-column label="ID" prop="investmentIdCode" resizable sortable min-width="120"></el-table-column>
          <el-table-column label="标的编码" prop="investmentCode" resizable sortable min-width="150"></el-table-column>
          <el-table-column label="标的名称" prop="investmentName" resizable sortable min-width="150"></el-table-column>
          <el-table-column label="标的类别" prop="investClassName" resizable sortable min-width="150"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="showSaveItem(scope.row)" icon="el-icon-edit" size="small" style="padding: 5px 8px;"></el-button>
              <el-button @click.native.prevent="deleteItem(scope.row)" icon="el-icon-delete" size="small" style="padding: 5px 8px;"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="投资标的" :visible.sync="save.isShow">
      <el-form :model="save.data">
        <el-form-item label-width="20%" label="标的编码">
          <el-input v-model="save.data.investmentCode" placeholder="请输入" clearable style="width:50%;"></el-input>
        </el-form-item>
        <el-form-item label-width="20%" label="标的名称">
          <el-input v-model="save.data.investmentName" placeholder="请输入" clearable style="width:50%;"></el-input>
        </el-form-item>
        <el-form-item label-width="20%" label="标的类别">
          <el-select v-model="save.data.investClassCode" placeholder="请选择" clearable style="width:50%;">
            <el-option v-for="item in investClassData" :key="item.investClassCode" :value="item.investClassCode" :label="item.investClassName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clearSaveData">取 消</el-button>
        <el-button type="primary" @click="saveItem">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  export default {
    investmentName: "investment",
    data () {
      return {
        itemConfig:{
          "moduleFlag":"Investment",
          "codeKey":"investmentIdCode",
          "codePrefix":"IV",
          "codeLength":6,
        },
        itemData:{
          "investmentCode":"510500",
          "investmentName":"500ETF",
          "investClassCode":"IndiceFund",
          "investClassName":"指数基金",
        },

        save:{
          isShow:false,
          data:{investmentCode:'',investmentName:''}
        },

        query:{investmentCode:''},
        data:[],

        investClassData:{
        }
      }
    },
    mounted() {
      this.initFrame();
    },
    methods:{
      initFrame:function() {
        let that=this;
        that.clearSaveData();
        that.getTableData();
        that.getInvestClass();
      },
      clearSaveData() {
        this.save.data={investmentCode:'',investmentName:''};
        this.save.isShow=false;
      },

      getTableData() {
        let that=this;
        that.$post(that.$api.url.common.getItem,{
          itemConfig:that.itemConfig,
          itemData:that.query
        }).then(res => {
          that.data=res.result;
        });
      },

      showSaveItem(rowdata) {
        let that=this;
        if(!that.CommonUtil.isNullObj(rowdata)) {
          that.save.data.investmentIdCode=rowdata.investmentIdCode;
          that.save.data.investmentCode=rowdata.investmentCode;
          that.save.data.investmentName=rowdata.investmentName;
          that.save.data.investClassCode=rowdata.investClassCode;
        }else {
          that.clearSaveData();
        }
        that.save.isShow=true;
      },
      saveItem() {
        let that=this;
        var investClass=that.investClassData[that.save.data.investClassCode];
        if(that.CommonUtil.isNullObj(investClass)) {
          console.log(that.save.data);
          console.log(investClass);
          return;
        }
        var saveRecord={
          investmentCode:that.save.data.investmentCode,
          investmentName:that.save.data.investmentName,
          investClassCode:that.save.data.investClassCode,
          investClassName:investClass.investClassName
        };
        if(!that.CommonUtil.isNullStr(that.save.data.investmentIdCode)) {
          saveRecord.investmentIdCode=that.save.data.investmentIdCode;
        }
        that.$post(that.$api.url.common.saveItem,{
          itemConfig:that.itemConfig,
          itemData:saveRecord
        }).then(res => {
          that.getTableData();
          that.clearSaveData();
        });
      },
      deleteItem(rowdata) {
        let that=this;
        if(that.CommonUtil.isNullStr(rowdata.investmentIdCode)) return;
        that.$confirm('确认要删除此记录？','提示',
          {type:'warning',confirmButtonText:'确定',cancelButtonText:'取消'}
        ).then(() => {
          that.$post(that.$api.url.common.deleteItem,{
            itemConfig:that.itemConfig,
            itemData:{investmentIdCode:rowdata.investmentIdCode}
          }).then(res => {
            that.getTableData();
          });
        });
      },


      getInvestClass() {
        let that=this;
        that.$post(that.$api.url.common.getItem,{
          itemConfig:{"moduleFlag":"InvestClass","codeKey":"investClassIdCode"},
          itemData:{}
        }).then(res => {
          that.investClassData={};
          var icdata=res.result;
          for(var i in icdata) {
            that.investClassData[icdata[i].investClassCode]=icdata[i]
          }
        });
      }

    }
  }
</script>



