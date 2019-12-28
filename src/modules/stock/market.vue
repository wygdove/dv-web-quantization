<template>
  <div>
    <el-collapse @change="handleChange" v-model="activeName">

      <el-collapse-item name="000300">
        <template slot="title">
          <div class="ml-10 coll-title">沪深300</div>
          <div class="ml-10">PE-TTM 分位点：<span>52.26%</span></div>
          <div class="ml-10">PB 分位点：<span>33.80%</span></div>
        </template>
        <div></div>
      </el-collapse-item>
      <el-collapse-item name="000905">
        <template slot="title">
          <div class="ml-10 coll-title">中证500</div>
          <div class="ml-10">PE-TTM 分位点：<span>12.91%</span></div>
          <div class="ml-10">PB 分位点：<span>7.73%</span></div>
        </template>
        <div></div>
      </el-collapse-item>
      <el-collapse-item name="1000004">
        <template slot="title">
          <div class="ml-10 coll-title">上证指数</div>
          <div class="ml-10">PE-TTM 分位点：<span>44.65%</span></div>
          <div class="ml-10">PB 分位点：<span>15.58%</span></div>
        </template>
        <div></div>
      </el-collapse-item>
      <el-collapse-item name="399001">
        <template slot="title">
          <div class="ml-10 coll-title">深证成指</div>
          <div class="ml-10">PE-TTM 分位点：<span>63.73%</span></div>
          <div class="ml-10">PB 分位点：<span>43.54%</span></div>
        </template>
        <div></div>
      </el-collapse-item>
      <el-collapse-item name="399006">
        <template slot="title">
          <div class="ml-10 coll-title">创业板指</div>
          <div class="ml-10">PE-TTM 分位点：<span>48.82%</span></div>
          <div class="ml-10">PB 分位点：<span>65.39%</span></div>
        </template>
        <div></div>
      </el-collapse-item>


    </el-collapse>
  </div>
</template>

<script>


  export default {
    name: "market",
    data () {
      return {
        market:[],
      activeName: ['000300','000905']
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
        this.$post(this.$api.url.require.common.getBusiRegList,{
          type:type,
          code:code
        }).then(res => {
          that.isShowBusiRegFourLoading=false;
          if(!CommonUtil.isNullObj(res)&&!CommonUtil.isNullObj(res.status)
            &&res.status==0&&!CommonUtil.isNullObj(res.obj)) {
            var regData=res.obj;
            if(regData.length>0) {
              if(regData[0].type==that.busiRegTypes[0]) {
                that.setBusiRegData(regData[0].type,regData[0].code,regData[0].name);
              }
              for(var i in regData) {
                regData[i].text=regData[i].name;
                that.busiRegTabData.push(regData[i]);
              }
            }
          }
        });
      },

      handleChange(val) {
        console.log(val);
      }



    }
  }
</script>


<style scoped>
  .ml-5 {
    margin-left:5px;
  }

  .ml-10 {
    margin-left:10px;
  }

  .coll-title {
    font-size:15px;
    color:#409EFF;
  }

</style>

