export default {
  url:{

    common: {
      getItem:'api/common/getItem',
      saveItem:'api/common/saveItem',
      deleteItem:'api/common/deleteItem'
    },
    transaction: {
      getHoldingInvestment:'api/transaction/getHoldingInvestment',
    },





    // 理杏仁
    lixinger:{
      token:'fca422e3-2818-47d1-b784-62e87d097349',
      // A股指数
      aindice:{
        // 基本面数据
        fundamental: 'lixinger/a/indice/fundamental',

      },
      // A股股票
      astock:{
        // 基本面数据
        fundamental: 'lixinger/a/stock/fundamental',

      }
    },





    // 集思录
    jisilu:{
      convertibleBond:{
        bondDetail: 'jisilu/data/cbnew/detail_hist',
        bondPageDetail: 'jisilu/data/convert_bond_detail',

      },
    }






  }
}
