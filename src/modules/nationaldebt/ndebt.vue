<template>
  <div>
    <div id="info" style="width:1500px;height:300px;" v-bind="infodata"></div>
    <br/>
    <br/>
    <br/>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import axios from 'axios'

  export default {
    name: "ndebt",
    data () {
      return {
        infodata:''
      }
    },
    mounted() {
      this.init();
    },
    methods:{
      init:function() {
        // this.initData();

      },
      initData:function() {
        let that=this;
        var url="/ndebtdata?pair_id=29227&pair_id_for_news=29227&chart_type=area&pair_interval=900&candle_count=120&events=yes&volume_series=yes";

        axios.get(url, {
          headers: {
            // "Referer": " https://cn.investing.com/rates-bonds/china-10-year-bond-yield",
            "Access-Control-Allow-Origin": "true",
            "Accept": "application/json",
            // "Sec-Fetch-Mode": " cors",
            // "Sec-Fetch-Site": "  same-origin",
            "X-Requested-With": "XMLHttpRequest"
          }
        }).then(res=>{
          console.log(res);
          that.infodata=res;
        });

      }



    }
  }
</script>

