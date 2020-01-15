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
        let that=this;
        // this.initData();
      },
      initData:function() {
        let that=this;

      },
      _getOveriewData() {
        let that=this;
        that.collapseData=[];
        that.$post(that.$api.url.lixinger.aindice.fundamental,{
          token:this.$api.url.lixinger.token,
          date:that.CommonUtil.getLastWorkDay(),
          stockCodes:that.indiceList,
          metrics:["pe_ttm.y_10.weightedAvg","pb.y_10.weightedAvg","cp","mc"]
        }).then(res => {
          if(res&&res.code===0&&res.data) {
            var data=res.data;
            var tempdata={};
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


    }
  }
</script>


<style scoped>


</style>

