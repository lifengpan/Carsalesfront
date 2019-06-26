<template>
  <div>
    <a-tabs @change="allOrder" v-model="activeKey">
      <a-tab-pane tab="所有订单" key="1" @click="allOrder"></a-tab-pane>
      <a-tab-pane tab="待付款" key="2" @click="obligation"></a-tab-pane>
      <a-tab-pane tab="待发货" key="3"></a-tab-pane>
      <a-tab-pane tab="待收货" key="4"></a-tab-pane>
      <a-button slot="tabBarExtraContent">Extra Action</a-button>
    </a-tabs>
    <a-spin tip="Waiting..." :spinning="waithing">
      <div class="card-container">
        <div style="background: rgba(219, 219, 219, 0.12); padding:30px;"  class="card">
          <table class="bought-table-mod__table___3u4gN table-head-mod__table___17eFg">
            <tbody>
              <tr class="qqq">
                <th style="margin-left: 90px;">宝贝</th>
                <th style="margin-left: 145px;">单价</th>
                <th style="margin-left: 110px;">数量</th>
                <th style="margin-left: 100px;">商品操作</th>
                <th style="margin-left: 30px;">实付款</th>
                <th style="margin-right: 30px;">交易操作</th>
              </tr>
            </tbody>
          </table>
          <a-card :title="order.createTime || '无'" :bordered="true" class="card1" v-for="(order, key) of orderList" :key="key">
            <div class="a-div-card">
              <div class="dish-list">
                <p v-if="order.orderDetails && order.orderDetails.length<=0" style="text-align: center; font-size: 18px; font-weight: 500;">无数据</p>
                <p v-for="(dish,index) in order.orderDetails" :key="index">
                  <span style="margin-left: 13%;">{{dish.carName || '无'}}</span>
                  <span style="margin-left: 20%;">{{dish.price || '无'}}</span>
                  <span style="margin-left: 16%;">{{dish.number || '0'}}</span>
                </p>
              </div>
              <p class="total-price">
                <a v-if="(order.orderStatus !== '未付款' && order.orderStatus !== '退款中' && order.orderStatus !== '已退款')" @click="showModal(order.orderId)">退款/退货</a>
              </p>
              <p class="total-price">
                ￥{{order.totalPrice || 0}}
              </p>
              <p class="total-price" v-if="order.orderStatus==='待收货'">
                <a-button style="display: flex;" @click="confirmGoods(order.orderId, '待收货')">
                  确认收货
                </a-button>
              </p>
              <p class="total-price" v-else>
                {{order.orderStatus}}
              </p>
            </div>
            <div class="refund-instruction" v-if="order.orderStatus==='退款中'">
              退款说明：{{order.refundInstructions}}
            </div>
            <div class="refund-instruction" v-if="order.orderStatus==='已退款' && order.orderStatus==='拒接退款'">
              退款说明：{{order.refundInstructions}}
              商家回复：{{order.refundReply}}
            </div>
          </a-card>
        </div>
      </div>
    </a-spin>
    <div>
      <a-modal
        v-model="visible"
        title="退款/退货"
        onOk="handleOk"
      >
        <template slot="footer">
          <a-button key="back" @click="handleCancel">取消</a-button>
          <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
            确认提交
          </a-button>
        </template>
        <a-textarea v-model="refundExplain" placeholder="退款说明" :rows="4"/>
      </a-modal>
    </div>
  </div>
</template>
<script>
import { USER_ORDER_LIST, CONFIRM_GOODS, USER_REFUND } from '@/store/user'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      orderList: [],
      waithing: false,
      signupStatus: false,
      activeKey: 1,
      visible: false,
      loading: false,
      refundExplain: '',
      currentOrderId: '',
    }
  },
  methods: {
    ...mapActions([USER_ORDER_LIST, CONFIRM_GOODS, USER_REFUND]),
    showModal(orderId) {
      this.visible = true
      this.currentOrderId = orderId
      console.log(this.currentOrderId)
    },
    async handleOk(e) {
      console.log(this.refundExplain)
      try {
        this.loading = true;
        await this[USER_REFUND]({
          orderId: this.currentOrderId,
          refundInstructions: this.refundExplain
        })
        await this.getOrderList()
        this.visible = false;
      } catch (e) {
        this.$message.error(e.message)
      } finally {
        this.loading = false;
      }
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false
    },
    allOrder() {
      console.log('allorder')
      console.log(this.activeKey)
    },
    obligation () {
      console.log('obligation')
    },
    tranformTime (Time) {
      var tempTime = new Date(Time)
      return `${tempTime.getFullYear()}-${(tempTime.getMonth()+1) < 10 ? '0'+(tempTime.getMonth()+1) : (tempTime.getMonth()+1)}-${(tempTime.getDate()) < 10 ? '0'+(tempTime.getDate()) : (tempTime.getDate())} 
      ${(tempTime.getHours()) < 10 ? '0'+(tempTime.getHours()) : (tempTime.getHours())}:${(tempTime.getMinutes()) < 10 ? '0'+(tempTime.getMinutes()) : (tempTime.getMinutes())}:${(tempTime.getSeconds()) < 10 ? '0'+(tempTime.getSeconds()) : (tempTime.getSeconds())}`
    },
    async getOrderList () {
      try {
        const info = await this[USER_ORDER_LIST]({
          userId: 1
        })
        this.orderList = info.data
        let length = this.orderList.length
        let arr = this.orderList
        for (let i=0;i<length;i++) {
          arr[i].createTime = this.tranformTime(arr[i].createTime)
        }
        this.$message.success('获取历史订单成功')
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    async confirmGoods (orderId) {
      try {
        await this[CONFIRM_GOODS]({
          orderId: orderId
        })
        this.$message.success('收货成功')
        await this.getOrderList()
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
.a-div-card {
  display: flex;
  width: 100%;
}
.ant-card-body {
  display: block !important;
}
.user-order-details {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.qqq {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.refund-instruction {
  width: 70%;
  margin-top: 15px;
  margin-left: 3%;
  font-weight: 400;
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
  width: 72%;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding-top: 0;
  padding-left: 0;
  color: black;
}
.total-price {
  width: 12%;
  padding: 0;
  padding-top: 10px;
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
  border: 1px solid #0000004a;
  margin-top: 30px;
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
.dish-list P {
  padding: 20px;
  margin-bottom: 0;
  border-bottom: 1px solid #eee;
}
.dish-list span {
  width: 15%;
  float: left;
}
.table-head-mod__table___17eFg {
    margin: 10px 0;
    background-color: #f5f5f5;
    border: 1px solid #e8e8e8;
    text-align: center;
}
.bought-table-mod__table___3u4gN {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    color: #3c3c3c;
    table-layout: fixed;
}
</style>
