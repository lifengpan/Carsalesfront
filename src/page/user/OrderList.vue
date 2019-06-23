<template>
  <div>
    <p class="title">历史订单</p>
    <hr>
    <a-spin tip="Waiting..." :spinning="waithing">
      <div class="card-container">
        <div style="background: rgba(219, 219, 219, 0.28); padding:30px;"  class="card">
          <a-card :title="order.createTime || '无'" :bordered="false" class="card1" v-for="(order, key) of orderList" :key="key">
            <div class="dish-list">
              <p v-if="order.dishDetails && order.dishDetails.length<=0" style="text-align: center; font-size: 18px; font-weight: 500;">无数据</p>
              <p v-for="(dish,index) in order.dishDetails" :key="index">
                <span>{{dish.name || '无'}}</span>
                <span>{{dish.unitPrice || '无'}}/份</span>
                <span>*{{dish.number || '0'}}</span>
              </p>
            </div>
            <p class="total-price">
              ￥{{total(order.dishDetails || [])}}
            </p>
            <p class="total-price">
              {{order.orderStatus ? '已付款' : '待付款'}}
            </p>
          </a-card>
        </div>
      </div>
    </a-spin>
  </div>
</template>
<script>
import { USER_ORDER_LIST } from '@/store/user'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      orderList: [],
      waithing: false,
      signupStatus: false
    }
  },
  methods: {
    ...mapActions([USER_ORDER_LIST]),
    total (arr) {
      let sum = 0
      for (let i = 0; i < arr.length; i++) {
        sum = sum + parseInt(arr[i].unitPrice) * parseInt(arr[i].number)
      }
      return sum;
    },
    async getOrderList () {
      try {
        const info = await this[USER_ORDER_LIST]({
          username: 'lifengpan'
        })
        this.orderList = info.data
        this.$message.success('获取历史订单成功')
      } catch (e) {
        this.$message.error(e.message)
      }
    }
  },
  mounted () {
    this.getOrderList()
  }
}
</script>
<style>
#x {
  background-color: red;
}
.title {
  font-size: 25px;
}
.card {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
.dish-list {
  width: 80%;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding-top: 0;
  padding-left: 0;
  color: black;
}
.total-price {
  width: 10%;
  padding: 0;
  margin: 0;
  text-align: center;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.card-container {
  display: flex;
  justify-content: center;
  width: 100%;
}
.card1 {
  margin-left: 3%;
  margin-top: 20px;
  width: 100%;
}
.ant-card-wider-padding .ant-card-body {
  padding-top: 0;
  padding-left: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.ant-card-body {
  padding-top: 0;
  padding-left: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.proportion {
  background-color: #33BAFF;
}
.card1 P {
  padding-top: 20px;
  margin-bottom: 0;
  border-bottom: 1px solid #eee;
}
.dish-list span {
  margin-right: 30%;
  margin-left: 5%;
}
</style>
