<template>
  <div>
    <p class="title">全部订单</p>
    <hr>
    <a-table :columns="columns" :dataSource="data" bordered :pagination="pagination" @change="handleChanges">
      <template v-for="col in ['orderStatus', 'adress', 'totalPrice']" :slot="col" slot-scope="text, record">
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{text}}</template>
        </div>
      </template>
      <a slot="details" slot-scope="text, record" @click="jumpDetails(record.key)">详情</a>
      <template slot="operation" slot-scope="text, record">
        <div class='editable-row-operations'>
          <span v-if="record.editable">
            <a-popconfirm title='确定保存?' @confirm="() => save(record.key)">
              <a>save</a>
            </a-popconfirm>
            <a @click="() => cancel(record.key)">Cancel</a>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">Edit</a>
          </span>
        </div>
      </template>
      <template slot="action" slot-scope="text, record">
        <a-popconfirm
          v-if="data.length"
          title="确定发货?"
          @confirm="() => save(record.key, '待收货')">
          <a-button v-if="record.orderStatus === '已付款'">发货</a-button>
        </a-popconfirm>
        <a-button v-if="record.orderStatus === '退款中'" @click="showModal(record)">售后</a-button>
      </template>
    </a-table>
    <div>
      <a-modal
        v-model="visible"
        title="商家回复"
        onOk="handleOk"
      >
        <template slot="footer">
          <a-button key="back" @click="handleOk('拒绝退款')">拒绝退款</a-button>
          <a-button key="submit" type="primary" :loading="loading" @click="handleOk('已退款')">
            同意退款
          </a-button>
        </template>
        <span>退款说明：{{currentRefund}}</span>
        <a-textarea v-model="currentReply" placeholder="回复" :rows="4"/>
      </a-modal>
    </div>
  </div>
</template>
<script>
import { ALL_ORDER_LIST, EDIT_ORDER, DELETE_ORDER, REFUND_SALES } from '@/store/manager'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      data: [],
      tempData: [],
      filteredInfo: null,
      sortedInfo: null,
      currentRefund: '',
      currentReply: '',
      visible: false,
      loading: false,
      pagination: {
				pageSize: 5, // 默认每页显示数量
				showSizeChanger: true, // 显示可改变每页数量
				pageSizeOptions: ['5', '10', '20', '30'], // 每页数量选项
				showTotal: total => `Total ${total} items`, // 显示总数
				showSizeChange: (current, pageSize) => this.pageSize = pageSize, // 改变每页数量时更新显示
			}
    }
  },
  computed: {
    columns () {
      let { sortedInfo, filteredInfo } = this
      sortedInfo = sortedInfo || {};
      filteredInfo = filteredInfo || {};
      const columns = [{
        title: '序号',
        dataIndex: 'key',
        width: '5%',
        scopedSlots: { customRender: 'key' }
      }, {
        title: '创建用户',
        dataIndex: 'username',
        scopedSlots: { customRender: 'username' },
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        width: '15%',
        scopedSlots: { customRender: 'createTime' }
      }, {
        title: '收货地址',
        dataIndex: 'adress',
        width: '20%',
        scopedSlots: { customRender: 'adress' }
      },{
        title: '订单状态',
        dataIndex: 'orderStatus',
        width: '15%',
        filters: [
          { text: '已付款', value: '已付款' },
          { text: '待收货', value: '待收货' },
          { text: '已收货', value: '已收货' },
          { text: '退款中', value: '退款中' },
          { text: '已退款', value: '已退款' },
          { text: '拒绝退款', value: '拒绝退款' }
        ],
        filteredValue: filteredInfo.orderStatus || null,
        onFilter: (value, record) => record.orderStatus.includes(value),
        sorter: (a, b) => a.orderStatus.length - b.orderStatus.length,
        sortOrder: sortedInfo.columnKey === 'orderStatus' && sortedInfo.order,
        scopedSlots: { customRender: 'orderStatus' }
      },  {
        title: '总金额(万元)',
        dataIndex: 'totalPrice',
        width: '10%',
        scopedSlots: { customRender: 'totalPrice' }
      }, {
        title: '详情',
        dataIndex: 'details',
        scopedSlots: { customRender: 'details' }
      }, {
        title: '编辑',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
      }, {
        title: '交易操作',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' }
      }];
      return columns;
    }
  },
  methods: {
    ...mapActions([ALL_ORDER_LIST, EDIT_ORDER, DELETE_ORDER, REFUND_SALES]),
    handleChanges (pagination, filters, sorter) {
      this.filteredInfo = filters;
      this.sortedInfo = sorter;
    },
    showModal(record) {
      this.visible = true
      this.currentOrderId = record.orderId
      this.currentRefund = record.refundInstructions || '无'
      console.log(this.currentOrderId)
    },
    async handleOk(orderStatus) {
      console.log(orderStatus)
      try {
        this.loading = true;
        await this[REFUND_SALES]({
          id: this.currentOrderId,
          orderStatus: orderStatus,
          refundReply: this.currentReply
        })
        this.visible = false;
        this.$message.success('操作成功')
        await this.init()
      } catch (e) {
        this.$message.error(e.message)
      } finally {
        this.loading = false;
      }
    },
    jumpDetails (key) {
      let temp = this.tempData[key]
      this.$router.push({name: 'OrderDetails',
        query: {
          id: temp.orderId
        }
      })
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    async save (key, orderStatus) {
      try {
        let temp = this.tempData[key]
        await this[EDIT_ORDER]({
          id: temp.orderId,
          adress: temp.adress,
          orderStatus: orderStatus || temp.orderStatus,
          totalPrice: temp.totalPrice
        })
        const newData = [...this.data]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          delete target.editable
          this.data = newData
          this.cacheData = newData.map(item => ({ ...item }))
        }
        this.$message.success('修改成功')
        this.init()
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    async onDelete (key) {
      try {
        await this[DELETE_ORDER]({
          id: this.tempData[key].orderId
        })
        const data = [...this.data]
        this.data = data.filter(item => item.key !== key)
        this.$message.success('删除成功')
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    cancel (key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.data = newData
      }
    },
    adjustData (arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].key = i + 1
      }
      return arr
    },
    tranformTime (Time) {
      var tempTime = new Date(Time)
      return `${tempTime.getFullYear()}-
      ${(tempTime.getMonth()+1) < 10 ? '0'+(tempTime.getMonth()+1) : (tempTime.getMonth()+1)}-
      ${(tempTime.getDate()) < 10 ? '0'+(tempTime.getDate()) : (tempTime.getDate())} 
      ${(tempTime.getHours()) < 10 ? '0'+(tempTime.getHours()) : (tempTime.getHours())}:${(tempTime.getMinutes()) < 10 ? '0'+(tempTime.getMinutes()) : (tempTime.getMinutes())}:${(tempTime.getSeconds()) < 10 ? '0'+(tempTime.getSeconds()) : (tempTime.getSeconds())}`
    },
    async init () {
      try {
        const info = await this[ALL_ORDER_LIST]()
        this.data = this.adjustData(info.data || []) || []
        this.data.forEach(element => {
          element.createTime = this.tranformTime(element.createTime)
          this.tempData[element.key] = element
        });
        this.cacheData = this.data.map(item => ({ ...item }))
        this.$message.success('获取订单列表成功')
      } catch (e) {
        this.$message.error(e.message)
      }
    }
  },
  mounted: async function () {
    await this.init()
  }
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
.title {
  font-size: 25px;
}
</style>
