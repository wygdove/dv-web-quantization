<template>
  <div>
    <el-timeline>
      <el-timeline-item :type="opportuneMonment.dataPage.type" :icon="opportuneMonment.dataPage.icon" size="large">
        <el-card>
          <div class="pb-15">
            <span class="w-10p fts-18">判断入场时机</span>
            <span>
              <el-tooltip class="item" effect="dark" placement="right-start">
                <i class="el-icon-warning-outline"></i>
                <div slot="content">当沪深300、中证500中任意一个的PE和PB同时满足：<br/>PE处于近十年数值的0-50%区间内；<br/>PB处于近十年数值的0-20%区间内；<br/><br/>则认为沪深300或中证500处于低估状态，此时可以入场投资。</div>
              </el-tooltip>
            </span>
          </div>
          <div>
            <div class="pb-10" v-for="(item,index) in opportuneMonment.data" :name="item.code">
              <span class="ml-10 miw-11p">
                <i v-if="item.isPass" class="el-icon-check fts-18 col-green"></i>
                <i v-else class="el-icon-close fts-18 col-red"></i>
              </span>
              <span class="ml-10 miw-6p">{{item.name}}</span>
              <span class="ml-10 miw-10p">收盘点位：<span>{{item.cp}}</span></span>
              <span class="ml-10 miw-13p">PE-TTM 分位点：<span>{{item.pe_ttm.y_10.weightedAvg.latestValPosPer}}%</span></span>
              <span class="ml-10 miw-11p">PB 分位点：<span>{{item.pb.y_10.weightedAvg.latestValPosPer}}%</span></span>
            </div>
          </div>
          <div class="pt-5 ml-10 fts-15" v-if="opportuneMonment.result!=null">
            <span v-if="opportuneMonment.result" class="col-blue">可以入场投资</span>
            <span v-else class="col-red">不适合入场投资</span>
          </div>
        </el-card>
      </el-timeline-item>

      <el-timeline-item :type="filterStock.dataPage.type" :icon="filterStock.dataPage.icon" size="large">
        <el-card>
          <div class="pb-15">
            <span class="w-10p fts-18">筛选白马股</span>
            <span>
              <el-tooltip class="item" effect="dark" placement="right-start">
                <i class="el-icon-warning-outline"></i>
                <div slot="content"></div>
              </el-tooltip>
            </span>
          </div>
          <div class="ml-10 w-90p">{{filterStock.query}}</div>
        </el-card>
      </el-timeline-item>

      <el-timeline-item :type="filterStock.dataPage.type" :icon="filterStock.dataPage.icon" size="large">
        <el-card>
          <div class="pb-15">
            <span class="w-10p fts-18">白马组合</span>
            <span>
              <el-tooltip class="item" effect="dark" placement="right-start">
                <i class="el-icon-warning-outline"></i>
                <div slot="content">持有4-8只股票，同行业的资金占比不要超过30%</div>
              </el-tooltip>
            </span>
          </div>
          <div></div>
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
        timelineItemConfig:{ // opportune monment data config
          loading:{type:"info",icon:"el-icon-loading"},
          success:{type:"primary",icon:"el-icon-check"},
          fail:{type:"danger",icon:"el-icon-close"},
        },
        opportuneMonment:{
          dataPage:{type:"info",icon:"el-icon-loading"},
          data:[],
          result:null
        },
        filterStock:{
          dataPage:{type:"info",icon:"el-icon-loading"},
          query:""

        }
      }
    },
    mounted() {
      this.initFrame();
    },
    methods:{
      initFrame:function() {
        let that=this;
        that.initData();
      },
      initData:function() {
        let that=this;
        // that._isOpportuneMonment();
        that._getFilterStock();
      },
      _isOpportuneMonment() {
        let that=this;
        var indices={"000300":"沪深300","000905":"中证500"};
        var indiceList=["000300","000905"];
        that.opportuneMonment.data=[];
        that.opportuneMonment.result=false;
        that.$post(that.$api.url.lixinger.aindice.fundamental,{
          token:this.$api.url.lixinger.token,
          date:that.CommonUtil.getLastWorkDay(),
          stockCodes:indiceList,
          metrics:["pe_ttm.y_10.weightedAvg","pb.y_10.weightedAvg","cp","mc"]
        }).then(res => {
          if(res&&res.code===0&&res.data) {
            var data=res.data;
            var tempdata={};
            for(var i in data) {
              data[i].code=data[i].stockCode;
              data[i].name=indices[data[i].stockCode];
              data[i].pe_ttm.y_10.weightedAvg.latestValPosPer=(data[i].pe_ttm.y_10.weightedAvg.latestValPos*100).toFixed(2);
              data[i].pb.y_10.weightedAvg.latestValPosPer=(data[i].pb.y_10.weightedAvg.latestValPos*100).toFixed(2);
              data[i].isPass=data[i].pe_ttm.y_10.weightedAvg.latestValPos>0&&data[i].pe_ttm.y_10.weightedAvg.latestValPos<0.5&&
                data[i].pb.y_10.weightedAvg.latestValPos>0&&data[i].pb.y_10.weightedAvg.latestValPos<0.2;
              tempdata[data[i].code]=data[i];
              that.opportuneMonment.result|=data[i].isPass;
            }
            for(var i in indiceList) {
              that.opportuneMonment.data.push(tempdata[indiceList[i]]);
            }
            that.opportuneMonment.dataPage=that.opportuneMonment.result?that.timelineItemConfig.success:that.timelineItemConfig.fail;
          }
        });
      },
      _getFilterStock() {
        let that=this;
        /*
        （本年-7）年到（本年-1）年ROE>=15%，（本年）年（已过季度最后一天）日ROE>=（3.75%*已过季度数），上市时间早于（本年-5）年

        2012年到2018年ROE>=15%，2019年6月30日ROE>=7.5%，上市时间内早于2014年9月，行业，
        2019年6月30日营收增长率，2019年6月30日净利润增长率，2018年营收增长率，2018年净利润增长率
        */
        var monthSeasonDay={1:"12月31日",2:"12月31日",3:"12月31日",4:"3月31日",5:"3月31日",6:"3月31日",7:"6月30日",8:"6月30日",9:"6月30日",10:"9月30日",11:"9月30日",12:"9月30日"};
        var date=new Date();
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var day=date.getDate();
        var query=(year-7)+"年到"+(year-1)+"年ROE>=15%，";
        query+=month>3?year+"年"+monthSeasonDay[month]+"ROE>="+(3.75*(month%3+1))+"%，":"";
        query+="上市时间早于"+(year-5)+"年，行业，";
        query+=month>3?year+"年"+monthSeasonDay[month]+"营收增长率，"+year+"年"+monthSeasonDay[month]+"净利润增长率，":"";
        query+=(year-1)+"年营收增长率，"+(year-1)+"年净利润增长率";
        that.filterStock.query=query;


        /**
         小熊定理
         小熊定理一：连续2年应收账款上升幅度大于营业收入上升幅度，有收入美化风险。
         小熊定理二：连续2年存货增长大于营业收入的增长，有资产美化风险。
         小熊定理三：企业的流动比率=流动资产/流动负债<1，有破产风险。
         只要有一个不通过就剔除，（银行股除外）。

         小熊定理四：连续3年经营活动产生的现金流量净额远大于净利润的话，公司有隐藏的盈利能力。
         小熊定理五：自由现金流，公司真正能自由运用的资金，比净利润更真实，更难作假。
         */


      }

    }
  }
</script>


<style scoped>


</style>

