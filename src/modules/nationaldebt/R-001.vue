<template>
  <div>
    <div id="r001Chart-All" style="width:1500px;height:300px;"></div>
    <br/>
    <br/>
    <br/>
    <div id="r001Chart-1000" style="width:1500px;height:300px;"></div>
    <div id="r001Chart-2000" style="width:1500px;height:300px;"></div>
    <div id="r001Chart-3000" style="width:1500px;height:300px;"></div>
    <div id="r001Chart-4000" style="width:1500px;height:300px;"></div>
    <div id="r001Chart-5000" style="width:1500px;height:300px;"></div>
    <div id="r001Chart-6000" style="width:1500px;height:300px;"></div>
    <div id="r001Chart-7000" style="width:1500px;height:300px;"></div>
    <div id="r001Chart-8000" style="width:1500px;height:300px;"></div>
    <div id="r001Chart-9000" style="width:1500px;height:300px;"></div>
    <div id="r001Chart-10000" style="width:1500px;height:300px;"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    name: "R-001",
    data () {
      return {
        xAxisData:[],
        xAxisData2:[],
        yAxisData:[],
        seriesData:[]
      }
    },
    mounted() {
      // this.showR001();
      this.showR001All();
    },
    methods:{
      showR001:function() {
        let that=this;
        var xMax=50*1000;
        var yMax=50;

        for(var i=2600;i<xMax;i++) {
          that.xAxisData.push(i/1000);
        }
        for(var i=1;i<50;i++) {
          that.yAxisData.push(i*1000);
        }
        for(var y=0;y<10;y++) {
          that.xAxisData2=[];
          that.seriesData=[];
          for(var x=0;x<that.xAxisData.length;x++) {
            var svalue=that.yAxisData[y]*that.xAxisData[x]/100*1/365;
            svalue=Math.round(svalue*100)/100;
            var scharge=that.yAxisData[y]*0.001/100;
            scharge=Math.round(scharge*100)/100;
            svalue-=scharge;
            svalue=Math.round(svalue*100)/100;
            if(x!=0&&svalue!=that.seriesData[that.seriesData.length-1]) {
              that.xAxisData2.push(that.xAxisData[x]);
              that.seriesData.push(svalue);
            }
          }
          // console.log(that.yAxisData[y]);
          // console.log(that.xAxisData2);
          // console.log(that.seriesData);
          that.showR001Chart(that.yAxisData[y],that.xAxisData2,that.seriesData)
        }
      },
      showR001Chart:function(htmlId,xAxisData,seriesData) {
        var r001Option={
          tooltip: {
            trigger: 'axis',
            formatter: '{a0}元 年化收益率{b0}% 收益{c0}<br />{a1}元 年化收益率{b1}% 收益{c1}'
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
            }
          },
          xAxis: {
            name: '年化收益率（%）',
            type: 'category',
            data: xAxisData
          },
          yAxis: {
            name: htmlId+'元收益（元）',
            type: 'value'
          },
          series: [{
            data: seriesData,
            type: 'line'
          }]
        };


        let r001Chart=echarts.init(document.getElementById('r001Chart-'+htmlId));
        r001Chart.setOption(r001Option);
      },

      showR001All:function() {
        let that=this;
        var xMax=50*1000;
        var yMax=50;

        for(var i=2600;i<=xMax;i++) {
          that.xAxisData.push(i/1000);
        }
        for(var i=1;i<50;i++) {
          that.yAxisData.push(i*1000);
        }


        var seriesList=[];
        var legendData=[];
        for(var y=0;y<10;y++) {
          that.seriesData=[];
          for(var x=0;x<that.xAxisData.length;x++) {
            var svalue=that.yAxisData[y]*that.xAxisData[x]/100*1/365;
            svalue=Math.round(svalue*100)/100;
            var scharge=that.yAxisData[y]*0.001/100;
            scharge=Math.round(scharge*100)/100;
            svalue-=scharge;
            svalue=Math.round(svalue*100)/100;
            that.seriesData.push(svalue);
          }
          var seriesOne={
            type:'line',
            name:that.yAxisData[y],
            data:that.seriesData,
            itemStyle:{normal:{label:{show:true}}}
          };
          seriesList.push(seriesOne);
          legendData.push(""+that.yAxisData[y]);
        }
        var legendselected={};
        for(var i in legendData) {
          legendselected[legendData[i]]=i<3;
        }

        var r001Option={
          tooltip: {
            trigger: 'axis',
            formatter:function(params) {
              var res="";
              for(var i=params.length-1;i>=0;i--) {
                res+=params[i].seriesName+'元 年化收益率'+params[i].name+'% 收益'+params[i].data+'<br />';
              }
              return res;
            }
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
            }
          },
          legend: {
            data:legendData,
            selected: legendselected
          },
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 0.5,
              end: 1.2
            }
          ],
          xAxis: {
            name: '年化收益率（%）',
            type: 'category',
            data: that.xAxisData
          },
          yAxis: {
            name: '收益（元）',
            type: 'value'
          },
          series: seriesList
        };


        let r001Chart=echarts.init(document.getElementById('r001Chart-All'));
        r001Chart.setOption(r001Option);
      }



    }
  }
</script>

