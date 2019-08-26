<template>
  <div id="app" class="banner">
    <div class="headContainer">
      <div class="headCont">
        <div class="headLogo">Quantization</div>
        <div class="headBanner">
          <li v-for="item in banners" v-on:click="selected(item.name)">
            <router-link class="listItem"  :class="{active:curBanner == item.name}"  :to="{name: item.name}" exact>{{item.title}}</router-link>
          </li>
        </div>
      </div>
    </div>
    <div class="bodyContainer">
      <div class="bodyCont">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    components:{
    },
    name:'app',
    data:function(){
      return{
        banners:[
          {
            id:"Home",
            name:"R_001",
            title:"首页"
          },
          {
            id:"Home",
            name:"R_001",
            title:"首页"
          },
          {
            id:"Home",
            name:"R_001",
            title:"首页"
          },
          {
            id:"Home",
            name:"R_001",
            title:"首页"
          },
          {
            id:"Home",
            name:"R_001",
            title:"首页"
          },
          {
            id:"Home",
            name:"R_001",
            title:"首页"
          },
          {
            id:"Home",
            name:"R_001",
            title:"首页"
          },
          {
            id:"Home",
            name:"R_001",
            title:"首页"
          },
          {
            id:"Home",
            name:"R_001",
            title:"首页"
          },
          {
            id:"Home",
            name:"R_001",
            title:"首页"
          },
          {
            id:"Home",
            name:"R_001",
            title:"首页"
          }
        ],
        curBanner:"Home"
      }
    },
    methods:{
      selected:function(seclctedName){
        this.curBanner= seclctedName;
      }
    }
  }
</script>

<style scoped>
  .banner{
    height:100%;
    display: block;
  }
  .headContainer{
    height: 50px;
    background-color:#333;
  }
  .headCont{
    height: 50px;
  }
  .headContainer .headLogo{
    width: 30%;
    height: 50px;
    float: left;
    display: inline-block;
    font-size: 34px;
    padding-left: 20px;
    text-align: left;
    vertical-align: top;
    color: #fff;
    text-shadow: 4px 3px 3px #fa0;
    line-height: 50px;
    font-family: "Lucida Calligraphy";
  }
  .headBanner li{
    float: right;
    display: table;
  }

  .headContainer .headBanner{
    width: 65%;
    float: right;
    padding-right: 30px;
    display: inline-block;
    text-align: right;
    height: 50px;
    line-height: 50px;
  }
  a{
    text-decoration: none;
  }
  .listItem{
    font-size: 14px;
    color: #fff;
    height: 30px;
    line-height: 30px;
    padding: 4px 10px;
    margin: 0 6px;
    cursor: pointer;
  }
  .listItem:hover{
    font-size: 16px;
  }
  .headBanner li a:hover{
    font-size: 16px;
    /*background:#00aaff;*/
  }
  .headBanner li a:active{
    background:#00aaff;
  }

  .active{
    /*background:#00aaff;*/
    color: #fa0;
  }

  .bodyContainer{
    height: calc(100% - 50px);
  }

  .bodyCont{
    background: #fff;
    height: 100%;
  }
  /*.router-link-active{*/
  /*!*background:#00aaff;*!*/
  /*color: #fa0;*/
  /*}*/
  .fade-enter-active, .fade-leave-active {
    transition: all 0.3s ease
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
