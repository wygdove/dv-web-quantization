import echarts from 'echarts'

export default {

  showLine:function(htmlid,xdata,ydata) {
    var lineChart=echarts.init(document.getElementById(htmlid));
    var option={
      xAxis:{type:'category',data:xdata},
      yAxis:{type:'value'},
      series:[{type:'line',data:ydata}]
    };
    lineChart.setOption(option);
  },











}
