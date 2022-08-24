<!--
 * @Author: By
 * @Date: 2022-07-27 19:59:21
 * @LastEditTime: 2022-08-24 18:11:46
 * @LastEditors: By
 * @Description:
 * @FilePath: \big-screen-vue3\src\components\corporatePortrait\enterpriseProducts.vue
 * 可以输入预定的版权声明、个性签名、空行等
-->
<script>
export default {
  data() {
    return {
      enterpriseProductsList: [],
    }
  },
}
</script>

<template>
  <div class="enterprise-products">
    <span class="enterprise-products-title">企业产品</span>
    <div class="enterprise-products-content">
      <div v-for="(item, index) in 6" :key="index" class="image">
        暂无图片
      </div>
    </div>
    <!-- <span class="enterprise-products-remark" cursor-p>上传图片</span> -->
  </div>
</template>

<style lang="scss" scoped>
.enterprise-products {
    width: 100%;
    height: 100%;
    position: relative;
    background-image: url("~/assets/image/corporatePortrait/enterpriseProducts/enterpriseProductsBg.png");
    // background-size: cover;
    background-size: 100% 100%;
    padding: 74px 24px 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .enterprise-products-title {
        position: absolute;
        top: 14px;
        left: 16px;

        font-size: 18px;
        font-family: Kaiti SC;
        font-weight: 900;
        color: #FFFFFF;
    }

    .enterprise-products-content {
        width: 100%;
        height: 80%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .image {
            width: 120px;
            height: 120px;
            background: #0645B9;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #5352ed;

            font-size: 18px;
            font-family: Kaiti SC;
            font-weight: 900;
            color: #FFFFFF;
            line-height: 45px;
        }
    }

    .enterprise-products-remark {
        margin-top: 20px;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #92FCFF;
        // line-height: 70px;
    }
}
</style>
