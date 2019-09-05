<template>
  <div style="height:1000px;">
    <el-container style="height:90%;border:1px solid #eee;">
      <el-aside width="200px">
        <div class="headLogo bg headHeight" @click="dealCollapse()">Quantization</div>
        <div style="margin-top:46px;">
          <el-menu :unique-opened="qmenu.uniqueOpened" :router="qmenu.isRouterModel" :collapse="qmenu.isCollapse" background-color="rgb(238,241,246)">
            <el-submenu v-for="(item,i) in qmenu.banners" v-if="'false'!=item.show" v-bind:key="item.name" :index="'menu'+(i+1)+''">
              <template slot="title"><i class="el-icon-menu"></i>{{item.title}}</template>
              <el-menu-item-group>
                <el-menu-item v-for="(subitem,j) in item.children" :route="subitem" v-bind:key="subitem.name"
                              :index="'menu'+(i+1)+'-'+(j+1)">{{subitem.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>

      <el-container>
        <el-header class="headHeight bg" style="height:46px;">
          <el-row style="padding:14px;">
            <el-col :span="20">
              <div class="grid-content">
                <!--<el-breadcrumb  v-for="item in qbreadcrumb" separator-class="el-icon-arrow-right" style="font-size:13px;">-->
                  <!--<el-breadcrumb-item :to="{path:item.path}">{{item.title}}</el-breadcrumb-item>-->
                <!--</el-breadcrumb>-->
                <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size:13px;">
                  <el-breadcrumb-item :to="{path: '/'}">首页</el-breadcrumb-item>
                  <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                  <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                  <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="grid-content" style="float:right;">
                <el-dropdown>
                  <i class="el-icon-setting" style="margin-right:15px"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>查看</el-dropdown-item>
                    <el-dropdown-item>新增</el-dropdown-item>
                    <el-dropdown-item>删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <span>王小虎</span>
              </div>
            </el-col>
          </el-row>
        </el-header>

        <el-main>
          <transition name="fade"><router-view></router-view></transition>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
  import menu_config from "./config/menu_config.js"

  export default{
    components:{
    },
    name:'app',
    data:function() {
      return{
        qmenu: {
          banners:[],
          curBanner:"",
          isCollapse: false,
          uniqueOpened: true,
          isRouterModel: true,
        },
        qbreadcrumb: []
      }
    },
    mounted() {
      this.initMenu();
    },
    methods:{
      initMenu:function () {
        let that=this;
        that.qmenu.banners=menu_config;
      },
      dealCollapse:function() {
        let that=this;
        that.qmenu.isCollapse=!that.qmenu.isCollapse;
      }


    },
  }
</script>



<style scoped>
  .headLogo{
    width: 200px;
    float: left;
    display: inline-block;
    font-size: 30px;
    padding-left: 10px;
    text-align: left;
    vertical-align: top;
    color: #409EFF;
    /*text-shadow: 4px 3px 8px #409EFF;*/
    line-height: 50px;
    font-family: "Lucida Calligraphy";
  }
  .headHeight {
    height: 46px;
  }
  .bg {
    background-color:rgb(238,241,246)
  }
</style>

