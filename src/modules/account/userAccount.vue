<template>
  <div>

    <el-row :gutter="20" class="mt-20">
      <el-col>
        <el-card shadow="hover" class="box-card">
          <div class="text item">
            <el-row :gutter="20">
              <el-col :span="7">
                <el-divider content-position="left">汇总</el-divider>
                <el-row :gutter="20" class="pb-10">
                  <el-col :span="6" class="coll-title-18">总资产</el-col>
                  <el-col :span="6" class="fts-18">123456</el-col>
                </el-row>
                <el-row :gutter="20" class="pb-10">
                  <el-col :span="6" class="coll-title-15">累计收益</el-col>
                  <el-col :span="6" class="fts-15">123123</el-col>
                  <el-col :span="6" class="coll-title-15">累计投入</el-col>
                  <el-col :span="6" class="fts-15">123123</el-col>
                </el-row>
                <el-row :gutter="20" class="pb-10">
                  <el-col :span="6" class="coll-title-15">累计收益率</el-col>
                  <el-col :span="6" class="fts-15">9.90%</el-col>
                  <el-col :span="6" class="coll-title-15">年化收益率</el-col>
                  <el-col :span="6" class="fts-15">61.64%</el-col>
                </el-row>
              </el-col>
              <el-col :span="16"><div id="allMoneyChart" style="width:100%;height:250px;"></div></el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col class="mt-20" :span="8" v-for="(item,index) in accountList" :key="index">
        <el-card shadow="hover" class="box-card h-300">
          <div slot="header" class="clearfix">
            <span class="coll-title-16">{{item.accountName }}</span>
            <span style="float:right">
              <el-button size="mini" circle @click="deleteUserAccount(item.accountCode)"><i class="el-icon-delete"></i></el-button>
              <el-button size="mini" circle @click="showDialogSaveAccount(item)"><i class="el-icon-edit"></i></el-button>
              <el-button size="mini" circle @click="toAccountDetail(item.accountCode)"><i class="el-icon-arrow-right"></i></el-button>
            </span>
          </div>
          <div class="text item">
            内容
          </div>
        </el-card>
      </el-col>
      <el-col class="mt-20" :span="7">
        <el-card shadow="hover" class="box-card h-300">
          <div style="width:100%;height:260px;" @click="showDialogSaveAccount(null)">
            <i class="el-icon-plus" style="font-size:80px;margin:28% 38%;"></i>
          </div>
        </el-card>
      </el-col>
    </el-row>


    <el-dialog title="个人账本" :visible.sync="isShowDialogSaveAccount">
      <el-form :model="saveAccount">
        <el-form-item label="账本名称" label-width="20%">
          <el-input v-model="saveAccount.accountName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否计入汇总" label-width="20%">
          <el-select v-model="saveAccount.isIntoSummary" placeholder="是否计入汇总" value="">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="币种" label-width="20%">
          <el-select v-model="saveAccount.currency" placeholder="请选择币种" value="">
            <el-option label="人民币" value="CNY"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDialogSaveAccount=false">取 消</el-button>
        <el-button type="primary" @click="saveUserAccount">确 定</el-button>
      </div>
    </el-dialog>

    <!--<router-view></router-view>-->
  </div>
</template>

<script>
  import EchartsUtil from '../../utils/EchartsUtil'


  export default {
    name: "userAccount",
    data () {
      return {
        itemConfig:{
          "moduleFlag":"UserAccount",
          "codeKey":"accountCode",
          "codePrefix":"UA",
          "codeLength":6
        },
        itemData:{},

        accountList:[],
        isShowDialogSaveAccount:false,
        saveAccount:{
          accountCode:"",
          accountName:"",
          isIntoSummary:"",
          currency:""
        }
      }
    },
    mounted() {
      this.initFrame();
    },
    methods:{
      initFrame:function() {
        this.initData();
      },
      initData:function() {
        let that=this;
        that.getAllMoney();
        that.getUserAccount();
      },
      getUserAccount:function() {
        let that=this;
        that.$post(that.$api.url.common.getItem,{
          itemConfig:that.itemConfig,
          itemData:{}
        }).then(res => {
          that.accountList=res.result;
        });
      },
      getAllMoney:function() {
        var xdata=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
        var ydata=[820,932,901,934,1290,1330,1320];
        EchartsUtil.showLine("allMoneyChart",xdata,ydata);
      },



      showDialogSaveAccount:function(data) {
        let that=this;
        that.isShowDialogSaveAccount=true;
        if(that.CommonUtil.isNullObj(data)) {
          that.saveAccount={
            accountCode:"",
            accountName:"",
            isIntoSummary:"",
            currency:""
          };
        }else {
          that.saveAccount=data;
        }
      },
      saveUserAccount:function() {
        let that=this;
        that.$post(that.$api.url.common.saveItem,{
          itemConfig:that.itemConfig,
          itemData:that.saveAccount
        }).then(res => {
          that.getUserAccount();
          that.isShowDialogSaveAccount=false;
        });
      },
      deleteUserAccount:function(accountCode) {
        let that=this;
        this.$confirm('确认要删除此账本？','提示',{
          type:'warning',
          confirmButtonText:'确定',
          cancelButtonText:'取消'
        }).then(() => {
          that.$post(that.$api.url.common.deleteItem,{
            itemConfig:that.itemConfig,
            itemData:{"accountCode":accountCode}
          }).then(res => {
            that.getUserAccount();
            that.CommonUtil.showSuccess('账本已删除！')
          });
        }).catch(() => {
        });
      },

      toAccountDetail(accountCode) {
        let that=this;
        var params={"accountCode":accountCode}
        that.$router.push({path:'/account/userAccount/accountDetail',query:params});
      }


    }
  }
</script>



