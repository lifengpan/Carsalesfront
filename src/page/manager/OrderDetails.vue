<template>
  <div>
    <div class="order-details-hearder">
      <div>
        <p>订单状态</p>
        <p class="font-design" v-if="data.orderStatus">已付款</p>
        <a-button v-else type="primary" @click="confirmPay">确认付款</a-button>
      </div>
      <div>
        <p>创建用户</p><p class="font-design">{{data.createUser}}</p>
      </div>
      <div class="create-time">
        <p>创建时间</p><p class="font-design">{{data.createtime}}</p>
      </div>
      <div class="total">
        <p style="text-align: right">总价</p><p class="order-total-price">￥{{data.money}}</p>
      </div>
    </div>
    <div class="total-line"></div>
    <p class="content-heard">
      <span>Description</span>
      <span>Unit Cost</span>
      <span>Number</span>
      <span>Amount</span>
    </p>
    <div class="content-order-content">
      <div class="content-order-div">
        <span v-for="(dish,index) in dishList" :key="index" class="dish-span">{{dish.name || '无'}}</span>
      </div>
      <div class="content-order-div">
        <span  v-for="(dish,index) in dishList" :key="index" class="dish-span">{{dish.unitPrice || '无'}}</span>
      </div>
      <div class="content-order-div">
        <span v-for="(dish,index) in dishList" :key="index" class="dish-span">{{dish.number || 0}}</span>
      </div>
      <div class="content-order-div">
        <span v-for="(dish,index) in dishList" :key="index" class="dish-span">{{Amount(dish.unitPrice, dish.number)}}</span>
      </div>
    </div>
    <p class="no-data" v-if="dishList.length <= 0">无数据</p>
  </div>
</template>

<script>
import { ORDER_DETAILS, EDIT_ORDER } from '@/store/manager'
import { mapActions } from 'vuex'

const tranfromTime = (str) => {
  let rex = /T/g
  str = str.replace(rex,' ')
  rex = /.000Z/
  str = str.replace(rex,' ')
  return str
}
export default {
  data () {
    return {
      id: this.$route.query.id,
      data: {},
      dishList: []
    }
  },
  methods: {
    ...mapActions([ORDER_DETAILS, EDIT_ORDER]),
    async confirmPay () {
      try {
        await this[EDIT_ORDER]({
          id: this.data.orderId,
          tableNumber: this.data.tableNumber,
          orderStatus: 1,
          money: this.data.money
        })
        this.data.orderStatus = 1
        this.$message.success('付款成功')
      } catch(e) {
        this.$message.error(e.message)
      }
    },
    async init () {
      try {
        const info = await this[ORDER_DETAILS]({
          id: this.id
        })
        this.dishList = info.data.orderDetails
        this.data = info.data
        this.data.createtime = tranfromTime(this.data.createtime)
        this.$message.success('获取订单详情成功')
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    Amount(unit, number) {
      return parseInt(unit) * parseInt(number)
    }
  },
  mounted: async function () {
    await this.init()
  }
}
</script>

<style>
.order-details-hearder {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.order-total-price {
  font-size: 30px;
  font-weight: 800;
  color: #da5a86;
  width: auto;
}
.total {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.total-line {
  background-color: gray;
  width: 100%;
  border-bottom: 3px solid #da5a86;
  margin: auto;
}
.font-design {
  font-size: 18px;
  font-weight: 700;
}
.content-heard {
  font-size: 16px;
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  color: #da5a86;
}
.content-order-content {
  font-size: 16px;
  display: flex;
  font-weight: 500;
  justify-content: space-between;
  color: black;
}
.dish-span {
  margin-bottom: 10px;

}
.content-order-div {
  display: flex;
  flex-direction: column;
}
.no-data {
  font-size: 16px;
  text-align: center;
}
</style>

