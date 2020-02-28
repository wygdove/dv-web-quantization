<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-switch v-model="isDevDb" @change="switchDb" active-text="开发库" inactive-text="正式库"></el-switch>
      </el-col>
      <el-col class="pt-10" :span="24">
        <el-button type="text" @click="getCurrentDb" class="fts-15">查询当前库:</el-button>
        <span class="fts-15">{{currentdb}}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>

  export default {
    name: "dbtest",
    data () {
      return {
        itemConfig:{
          "moduleFlag":"",
          "codeKey":"",
          "codePrefix":"",
          "codeLength":6
        },
        itemData:{},

        isDevDb:true,
        currentdb:''
      }
    },
    mounted() {
      this.initFrame();
    },
    methods:{
      initFrame:function() {
        let that=this;
        that.getCurrentDb();
      },
      getCurrentDb() {
        let that=this;
        that.$post('api/setting/checkdb',{
        }).then(res => {
          that.currentdb=res.result.replace(".ItemTest",'');
          that.isDevDb=that.currentdb.endsWith('dev');
        });
      },
      switchDb() {
        let that=this;
        that.$post('api/setting/switchdb',{
          flag:that.isDevDb?'dev':'pro'
        }).then(res => {
          that.getCurrentDb();
        });
      }

    }
  }
</script>



