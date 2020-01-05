<template>
  <div>
    <el-timeline>
      <el-timeline-item type="success" icon="el-icon-check" size="large">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item type="danger" icon="el-icon-close" size="large">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/3 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>


  export default {
    name: "whiteHorse",
    data () {
      return {
      }
    },
    mounted() {
      this.initFrame();
    },
    methods:{
      initFrame:function() {
        var that=this;
        // this.initData();
      },
      initData:function() {
        var that=this;
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
            for(var i in data) {
              data[i].code=data[i].stockCode;
              data[i].name=that.indices[data[i].stockCode];
              data[i].pe_ttm.y_10.weightedAvg.latestValPosPer=(data[i].pe_ttm.y_10.weightedAvg.latestValPos*100).toFixed(2);
              data[i].pb.y_10.weightedAvg.latestValPosPer=(data[i].pb.y_10.weightedAvg.latestValPos*100).toFixed(2);
              that.collapseData.push(data[i]);
            }
          }
        });
      }


    }
  }
</script>


<style scoped>


</style>

