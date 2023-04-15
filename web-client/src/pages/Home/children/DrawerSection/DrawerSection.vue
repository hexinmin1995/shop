<template>
  <!--首页右侧微型购物车区域-->
  <div id="meg">
    <div class="meg_nav" @click="drawer = true;queryCartInfo()">
      <div class="meg_shoppingbag">
        <img src="../../img/meg_showcar.png" />
        <p>购物车</p>
        <div>
          <span>{{ cartgoods.length }}</span>
        </div>
      </div>
      <a class="meg_top" @click.stop="scrollToTop">
        <img src="../../img/meg_top.png" />
      </a>
    </div>
    <el-drawer title="购物车" :visible.sync="drawer" :direction="direction">
      <div class="meg_show">
        <div class="toolbar_header">
          <div class="pro_Chk">
            <input
              id="pro_ChkAll"
              type="checkbox"
              :checked="isSelectedAll"
              @click="selectedAll"
            />
            <label for="pro_ChkAll">全选</label>
          </div>
          <a @click.prevent="goToShop">全屏查看</a>
        </div>
        <div class="meg_content" v-if="userInfo && userInfo.id">
          <DrawerItem
            v-for="goods in cartgoods"
            :key="goods.goods_id"
            :goods="goods"
            @computeShopCar="computeShopCar"
          />
        </div>
        <div class="meg_noLogin" v-else>请先登录~</div>
        <div class="toolbar_footer">
          <div class="pro_total">
            <h3>
              <span>已选</span>
              <strong class="total_count">{{ totalAmount }}</strong>
              <span>件</span>
            </h3>
            <span>
              <strong class="total_price">{{
                (totalPrice / 100) | moneyFormat
              }}</strong>
            </span>
          </div>
          <div class="pro_cashier">
            <el-button type="danger" :disabled="!totalAmount || totalPrice<= 0" @click="order">结算</el-button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
// 引入处理返回顶部的函数
import { animate } from "@/config/utils";
import DrawerItem from "./children/DrawerItem";
import { mapState } from "vuex";
import { getCartsGoods } from "../../../../api/index";

export default {
  data() {
    return {
      drawer: false,
      direction: "rtl",
      totalPrice: 0,
      totalAmount: 0,
      isSelectedAll: false,
      cartgoods: []
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    setTimeout(() => {
      this.queryCartInfo()
    },1000)
  },
  methods: {
    scrollToTop() {
      // 做缓动动画返回顶部
      let docB = document.documentElement || document.body;
      animate(docB, { scrollTop: "0" }, 400, "ease-out");
    },
    goToShop() {
      this.$emit("goShopCar");
    },
    // 是否选中所有商品
    selectedAll(isSelectedAll) {
      this.isSelectedAll = !this.isSelectedAll;
      this.$store.dispatch("selectedAll", { isSelectedAll });
      if(this.isSelectedAll) {
        this.cartgoods.forEach(ol => {
          ol.checked = true
        })
        this.$store.dispatch("setCartsGoods", { arr: this.cartgoods});
      }else {
        this.cartgoods.forEach(ol => {
          ol.checked = false
        })
        this.$store.dispatch("setCartsGoods", { arr: this.cartgoods});
      }
      this.$forceUpdate()
      this.computeShopCar();
    },
    computeShopCar() {
      this.totalPrice = 0;
      this.totalAmount = 0;
      let flag = true;
      this.cartgoods.forEach(goods => {
        if (goods.checked) {
          this.totalPrice += goods.buy_count * goods.price;
          this.totalAmount++;
        } else {
          flag = false;
        }
      });
      this.isSelectedAll = flag;
    },
    //获取购物车信息
    async queryCartInfo() {
      if(!this.userInfo || !this.userInfo.id) {
        return
      }
      // 请求商品数据
      const result = await getCartsGoods({ user_id: this.userInfo.id });
      if (result.success_code === 200) {
        (result.message || []).forEach(ol => {
          ol.checked = false
        })
        this.cartgoods = result.message;
        this.$store.dispatch("setCartsGoods", { arr: result.message });
        this.computeShopCar();
      }
    },
    // 跳转至下单
    order() {
      if (this.totalAmount && this.totalPrice > 0) {
        var selectedGoods = this.cartgoods;
        this.$store.dispatch("selectedGoods2Order", selectedGoods);
        this.$router.push("/order");
      }
    },
  },
  components: {
    DrawerItem
  }
};
</script>

<style scoped>
/*首页的右侧固定栏，查看购物车详情*/
#meg {
  position: fixed;
  right: 0px;
  top: 0;
  height: 100%;
  width: 35px;
  cursor: pointer;
}
#meg > .meg_nav {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: #000000;
}
.meg_nav > .meg_shoppingbag {
  margin-top: 100px;
  width: 100%;
  height: 135px;
}
.meg_shoppingbag > img {
  width: 35px;
  height: 35px;
}
.meg_shoppingbag > p {
  margin: 5px auto;
  width: 16px;
  height: 48px;
  line-height: 16px;
  text-align: center;
  color: white;
}
.meg_shoppingbag > div {
  margin: 10px auto;
  width: 18px;
  height: 18px;
}
.meg_shoppingbag > div > span {
  display: inline-block;
  width: 18px;
  height: 18px;
  line-height: 18px;
  border-radius: 50%;
  background: #ff0018;
  color: white;
  text-align: center;
  font-size: 14px;
}
.meg_nav > .meg_top {
  display: block;
  position: absolute;
  bottom: 50px;
  width: 100%;
  height: 30px;
  cursor: pointer;
}
.meg_show > .toolbar_header {
  margin-bottom: 10px;
  width: 100%;
  height: 35px;

  display: flex;
  align-items: center;
  justify-content: space-between;
}
.meg_show .toolbar_header .pro_Chk {
  padding-left: 10px;
  width: 60px;

  display: flex;
  align-items: center;
}
.pro_Chk #pro_ChkAll {
  width: 12px;
  height: 12px;
}
.pro_Chk label {
  margin-left: 5px;
  margin-bottom: 0;
  font-size: 12px;
  color: gray;
  cursor: pointer;
}
.meg_show .toolbar_header a {
  width: 60px;
  font-size: 12px;
  color: gray;
  cursor: pointer;
}
.toolbar_footer {
  position: absolute;
  bottom: 0;
  padding: 0 16px;
  width: 100%;
  background: #eaeaea;
  z-index: 99999;
}
.toolbar_footer > .pro_total {
  width: 100%;
  height: 30px;
  background: #eceaea;
  color: #333;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pro_total > h3 {
  margin-bottom: 0;
  color: #000;
  font-weight: 400;
  font-size: 12px;
}
.pro_total > span > .total_price {
  font-weight: 600;
  color: #ff0036;
  font-size: 12px;
}
.pro_cashier {
  padding: 0 0 10px;
  width: 100%;
  text-align: center;
}
.pro_cashier button {
  width: 160px;
}
.meg_content {
  padding-bottom: 80px;
  width: 100%;
  overflow: auto;
}
.meg_noLogin {
  height: 100%;
  text-align: center;
  vertical-align: middle;
  color: #666;
}
</style>
