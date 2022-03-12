<template>
  <div>

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" :row-class-name="tableRowClassName" style="width: 100%" border height="250">
      <el-table-column fixed  type="expand">
        <template slot-scope="scope">
          lalala
        </template>
      </el-table-column>
      <el-table-column prop="bond_id" label="代码" fixed></el-table-column>
      <el-table-column prop="bond_nm" label="名称" fixed>
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.bond_nm_tip }}</p>
            <div slot="reference" class="name-wrapper">{{ scope.row.bond_nm }}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="现价">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ scope.row.price_tips }}</p>
            <div slot="reference" class="name-wrapper">{{ scope.row.price }}</div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="increase_rt" label="涨跌幅">
        <template slot-scope="scope">{{ scope.row.increase_rt }}%</template>
      </el-table-column>
      <el-table-column prop="premium_rt" label="溢价率">
        <template slot-scope="scope">{{ scope.row.premium_rt }}%</template>
      </el-table-column>
      <el-table-column prop="rating_cd" label="评级"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "convertible_bond_list",
    data () {
      return {
        tableData: [
          {
            bond_id: '113642',
            bond_nm: '上22转债',
            bond_nm_tip: '最后交易日：2022年3月21日\\r\\n最后转股日：2022年3月21日\\r\\n赎回价：100.004元/张',
            price: '100',
            price_tips: "全价：135.320 最后更新：15:14:03",
            increase_rt: -2.16,
            premium_rt: -0.99,
            rating_cd: "A+",
            detailhtml: ""
          }
        ]
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
      },

      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'row-yellow';
        } else if (rowIndex === 3) {
          return 'row-green';
        }
        return '';
      },

      onSubmit() {
        this.getBondDetail("113642");
      },

      getBondDetail(bondId) {
        let that=this;
        var nowtime=new Date().getTime();
        var url=that.$api.url.jisilu.convertibleBond.bondPageDetail + "/" + bondId;
        that.$post(url ,{
        }).then(res => {
          console.log("lalala");
          console.log(res);
          console.log($res);
        });
      }


    }
  }
</script>

<style>
  .el-table .row-yellow {
    background: oldlace;
  }
  .el-table .row-green {
    background: #f0f9eb;
  }
  .el-table .row-red {
    background: #e68b83;
  }
</style>
