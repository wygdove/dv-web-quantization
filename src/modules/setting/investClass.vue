<template>
  <div>
    <div class="pl-10">
      <el-form :model="query" inline>
        <el-form-item label="编码">
          <el-input v-model="query.investClassCode" clearable></el-input>
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
          <el-table-column label="ID" prop="investClassIdCode" resizable sortable min-width="120"></el-table-column>
          <el-table-column label="编码" prop="investClassCode" resizable sortable min-width="150"></el-table-column>
          <el-table-column label="名称" prop="investClassName" resizable sortable min-width="150"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="showSaveItem(scope.row)" icon="el-icon-edit" size="small" style="padding: 5px 8px;"></el-button>
              <el-button @click.native.prevent="deleteItem(scope.row)" icon="el-icon-delete" size="small" style="padding: 5px 8px;"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="投资类别" :visible.sync="save.isShow">
      <el-form :model="save.data">
        <el-form-item label-width="20%" label="编码">
          <el-input v-model="save.data.investClassCode" placeholder="请输入" clearable style="width:50%;"></el-input>
        </el-form-item>
        <el-form-item label-width="20%" label="名称">
          <el-input v-model="save.data.investClassName" placeholder="请输入" clearable style="width:50%;"></el-input>
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
    investClassName: "itemTest",
    data () {
      return {
        itemConfig:{
          "moduleFlag":"InvestClass",
          "codeKey":"investClassIdCode",
          "codePrefix":"IC",
          "codeLength":6,
        },
        itemData:{
          "investClassCode":"",
          "investClassName":"",
        },

        save:{
          isShow:false,
          data:{investClassCode:'',investClassName:''}
        },

        query:{investClassCode:''},
        data:[]
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
      },
      clearSaveData() {
        this.save.data={investClassCode:'',investClassName:''};
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
          that.save.data.investClassIdCode=rowdata.investClassIdCode;
          that.save.data.investClassCode=rowdata.investClassCode;
          that.save.data.investClassName=rowdata.investClassName;
        }else {
          that.clearSaveData();
        }
        that.save.isShow=true;
      },
      saveItem() {
        let that=this;
        var saveRecord={
          investClassCode:that.save.data.investClassCode,
          investClassName:that.save.data.investClassName
        };
        if(!that.CommonUtil.isNullStr(that.save.data.investClassIdCode)) {
          saveRecord.investClassIdCode=that.save.data.investClassIdCode;
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
        if(that.CommonUtil.isNullStr(rowdata.investClassIdCode)) return;
        that.$confirm('确认要删除此记录？','提示',
          {type:'warning',confirmButtonText:'确定',cancelButtonText:'取消'}
        ).then(() => {
          that.$post(that.$api.url.common.deleteItem,{
            itemConfig:that.itemConfig,
            itemData:{investClassIdCode:rowdata.investClassIdCode}
          }).then(res => {
            that.getTableData();
          });
        });
      },

    }
  }
</script>



