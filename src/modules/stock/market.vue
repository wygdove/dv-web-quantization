<template>
  <div>
    <el-collapse @change="handleChange" v-model="activeName">
      <el-collapse-item  v-for="(item,index) in collapseData" :name="item.code">
        <template slot="title">
          <div class="ml-10 miw-6p  coll-title-15">{{item.name}}</div>
          <div class="ml-10 miw-10p">收盘点位：<span>{{item.cp}}</span></div>
          <div class="ml-10 miw-13p">PE-TTM 分位点：<span>{{item.pe_ttm.y_10.weightedAvg.latestValPosPer}}%</span></div>
          <div class="ml-10 miw-11p">PB 分位点：<span>{{item.pb.y_10.weightedAvg.latestValPosPer}}%</span></div>
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
        market:{},
        indices:{
          "1000004":"上证指数",
          "399001":"深证成指",
          "399006":"创业板指",
          "000300":"沪深300",
          "000905":"中证500"
        },
        indiceList:["1000004","399001","399006","000300","000905"],
        collapseData:[],
        activeName:[]
      }
    },
    mounted() {
      this.initFrame();
    },
    methods:{
      initFrame:function() {
        var that=this;
        this.initData();
      },
      initData:function() {
        var that=this;
        that.collapseData=[];
        var stockCodes=[];
        for(var indice in that.indices) {
          stockCodes.push(indice);
        }
        // this.$post(this.$api.url.lixinger.astock.fundamental,{
        that.$post("lixinger/a/indice/fundamental",{
          // token:this.$api.url.lixinger.token,
          token:"fca422e3-2818-47d1-b784-62e87d097349",
          date:that.CommonUtil.getLastWorkDay(),
          stockCodes:stockCodes,
          metrics:["pe_ttm.y_10.weightedAvg","pb.y_10.weightedAvg","cp","mc"]
        }).then(res => {
          if(res&&res.code===0&&res.data) {
            var data=res.data;
            var tempdata={}
            for(var i in data) {
              data[i].code=data[i].stockCode;
              data[i].name=that.indices[data[i].stockCode];
              data[i].pe_ttm.y_10.weightedAvg.latestValPosPer=(data[i].pe_ttm.y_10.weightedAvg.latestValPos*100).toFixed(2);
              data[i].pb.y_10.weightedAvg.latestValPosPer=(data[i].pb.y_10.weightedAvg.latestValPos*100).toFixed(2);
              tempdata[data[i].code]=data[i];
            }
            for(var i in that.indiceList) {
              that.collapseData.push(tempdata[that.indiceList[i]]);
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




