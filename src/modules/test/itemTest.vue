<template>
  <div>
    <div class="pl-10">
      <el-form :model="query" inline>
        <el-form-item label="编码">
          <el-input v-model="query.code" clearable></el-input>
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
          <el-table-column label="ID" prop="idCode" resizable sortable min-width="120"></el-table-column>
          <el-table-column label="编码" prop="code" resizable sortable min-width="150"></el-table-column>
          <el-table-column label="名称" prop="name" resizable sortable min-width="150"></el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="showSaveItem(scope.row)" icon="el-icon-edit" size="small" style="padding: 5px 8px;"></el-button>
              <el-button @click.native.prevent="deleteItem(scope.row)" icon="el-icon-delete" size="small" style="padding: 5px 8px;"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-dialog title="标题" :visible.sync="save.isShow">
      <el-form :model="save.data">
        <el-form-item label-width="20%" label="编码">
          <el-input v-model="save.data.code" placeholder="请输入" clearable style="width:50%;"></el-input>
        </el-form-item>
        <el-form-item label-width="20%" label="名称">
          <el-input v-model="save.data.name" placeholder="请输入" clearable style="width:50%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="save.isShow=false">取 消</el-button>
        <el-button type="primary" @click="saveItem">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

  export default {
    name: "itemTest",
    data () {
      return {
        itemConfig:{
          "moduleFlag":"ItemTest",
          "codeKey":"idCode",
          "codePrefix":"IT",
          "codeLength":6,
        },
        itemData:{
          "code":"",
          "name":"",
        },

        save:{
          isShow:false,
          data:{code:'',name:''}
        },

        query:{code:''},
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
        this.save.data={code:'',name:''};
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
          that.save.data.idCode=rowdata.idCode;
          that.save.data.code=rowdata.code;
          that.save.data.name=rowdata.name;
        }else {
          that.clearSaveData();
        }
        that.save.isShow=true;
      },
      saveItem() {
        let that=this;
        var saveRecord={
          code:that.save.data.code,
          name:that.save.data.name
        };
        if(!that.CommonUtil.isNullStr(that.save.data.idCode)) saveRecord.idCode=that.save.data.idCode;
        that.$post(that.$api.url.common.saveItem,{
          itemConfig:that.itemConfig,
          itemData:saveRecord
        }).then(res => {
          that.getTableData();
          that.clearSaveData();
          that.save.isShow=false;
        });
      },
      deleteItem(rowdata) {
        let that=this;
        if(that.CommonUtil.isNullStr(rowdata.idCode)) return;
        that.$confirm('确认要删除此记录？','提示',
          {type:'warning',confirmButtonText:'确定',cancelButtonText:'取消'}
        ).then(() => {
          that.$post(that.$api.url.common.deleteItem,{
            itemConfig:that.itemConfig,
            itemData:{idCode:rowdata.idCode}
          }).then(res => {
            that.getTableData();
          });
        });
      },

    }
  }
</script>



