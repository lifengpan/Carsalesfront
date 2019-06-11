<template>
  <div>
    <p class="title">全部订单</p>
    <hr>
    <a-table :columns="columns" :dataSource="data" bordered :pagination="pagination">
      <template v-for="col in ['tableNumber', 'orderStatus']" :slot="col" slot-scope="text, record">
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
            <a @click="() => save(record.key)">Save</a>
            <a-popconfirm title='Sure to cancel?' @confirm="() => cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">Edit</a>
          </span>
        </div>
      </template>
      <template slot="action" slot-scope="text, record">
        <a-popconfirm
          v-if="data.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.key)">
          <a>Delete</a>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script>
import { ALL_ORDER_LIST, EDIT_ORDER, DELETE_ORDER } from '@/store/manager'
import { mapActions } from 'vuex'

const columns = [{
  title: '序号',
  dataIndex: 'key',
  width: '5%',
  scopedSlots: { customRender: 'key' },
}, {
  title: 'createUser',
  dataIndex: 'createUser',
  width: '15%',
  scopedSlots: { customRender: 'createUser' },
}, {
  title: 'createTime',
  dataIndex: 'createtime',
  width: '20%',
  scopedSlots: { customRender: 'createtime' },
}, {
  title: 'tableNumber',
  dataIndex: 'tableNumber',
  width: '15%',
  scopedSlots: { customRender: 'tableNumber' },
}, {
  title: 'orderStatus',
  dataIndex: 'orderStatus',
  width: '15%',
  scopedSlots: { customRender: 'orderStatus' },
}, {
  title: 'details',
  dataIndex: 'details',
  scopedSlots: { customRender: 'details' },
}, {
  title: 'operation',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' },
}, {
  title: 'Action',
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' },
}]

export default {
  data () {
    return {
      data: [],
      tempData: [],
      columns,
      pagination: {
				pageSize: 5, // 默认每页显示数量
				showSizeChanger: true, // 显示可改变每页数量
				pageSizeOptions: ['5', '10', '20', '30'], // 每页数量选项
				showTotal: total => `Total ${total} items`, // 显示总数
				showSizeChange: (current, pageSize) => this.pageSize = pageSize, // 改变每页数量时更新显示
			}
    }
  },
  methods: {
    ...mapActions([ALL_ORDER_LIST, EDIT_ORDER, DELETE_ORDER]),
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
    async save (key) {
      console.log(this.tempData[key])
      console.log(key)
      try {
        let temp = this.tempData[key]
        await this[EDIT_ORDER]({
          id: temp.orderId,
          tableNumber: temp.tableNumber,
          orderStatus: temp.orderStatus,
          money: temp.money
        })
        const newData = [...this.data]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          delete target.editable
          this.data = newData
          this.cacheData = newData.map(item => ({ ...item }))
        }
        this.$message.success('修改成功')
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
    async init () {
      try {
        const info = await this[ALL_ORDER_LIST]()
        this.data = this.adjustData(info.data || []) || []
        this.data.forEach(element => {
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
