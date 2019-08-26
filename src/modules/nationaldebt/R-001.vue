<template>
  <div>
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
      this.showR001();
    },
    methods:{
      showR001:function() {
        let that=this;
        var xMax=20*1000;
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
            if(x!=0&&svalue!=that.seriesData[that.seriesData.length-1]) {
              that.xAxisData2.push(that.xAxisData[x]);
              that.seriesData.push(svalue);
            }
          }
          that.showR001Chart(that.yAxisData[y],that.xAxisData2,that.seriesData)
        }
      },
      showR001Chart:function(htmlId,xAxisData,seriesData) {
        var r001Option={
          tooltip: {
            trigger: 'axis'
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
      }
    }
  }
</script>

