export default {
  url:{
    common: {
    },

    // 个人账户
    account:{
      getUserAccount:'api/account/getUserAccount',
      saveUserAccount:'api/account/saveUserAccount',
      deleteUserAccount:'api/account/deleteUserAccount',

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
    }






  }
}
