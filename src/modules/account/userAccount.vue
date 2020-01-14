<template>
  <div>

    <el-row :gutter="20" class="mt-20">
      <el-col>
        <el-card shadow="hover" class="box-card">
          <div class="text item">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-row :gutter="20">
                  <el-col><span>总资产：</span><span>123123</span></el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10"><span>累计投入：</span><span>123123</span></el-col>
                  <el-col :span="10"><span>累计收益：</span><span>123123</span></el-col>
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
            <span>{{item.accountName }}</span>
            <span style="float:right">
              <el-button size="mini" circle><i class="el-icon-delete"></i></el-button>
              <el-button size="mini" circle><i class="el-icon-edit"></i></el-button>
              <el-button size="mini" circle><i class="el-icon-tickets"></i></el-button>
            </span>
          </div>
          <div class="text item">
            内容
          </div>
        </el-card>
      </el-col>
      <el-col class="mt-20" :span="8">
        <el-card shadow="hover" class="box-card h-300">
          <div style="width:100%;height:260px;">
            <i class="el-icon-plus" style="font-size:80px;margin:80px 150px;" @click="showDialogSaveAccount(null)"></i>
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

  </div>
</template>

<script>
  import EchartsUtil from '../../utils/EchartsUtil'


  export default {
    name: "userAccount",
    data () {
      return {
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
        that.$post("api/account/getUserAccount",{
          "accountName":""
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
        }
      },
      saveUserAccount:function() {
        let that=this;
        that.$post("api/account/saveUserAccount",
          that.saveAccount
        ).then(res => {
          that.getUserAccount();
          that.isShowDialogSaveAccount=false;
        });
      }



    }
  }
</script>



