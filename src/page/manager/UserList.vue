<template>
  <div>
    <a-table :columns="columns" :dataSource="data" bordered :pagination="pagination">
      <template v-for="col in ['password', 'isManage']" :slot="col" slot-scope="text, record">
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
import { USER_LIST, EDIT_USER, DELETE_USER, ADD_DISH } from '@/store/manager'
import { mapActions } from 'vuex'

const columns = [{
  title: 'username',
  dataIndex: 'username',
  width: '25%',
  scopedSlots: { customRender: 'username' },
}, {
  title: 'password',
  dataIndex: 'password',
  width: '25%',
  scopedSlots: { customRender: 'password' },
}, {
  title: 'isManage',
  dataIndex: 'isManage',
  width: '25%',
  scopedSlots: { customRender: 'isManage' },
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
    ...mapActions([USER_LIST, EDIT_USER, DELETE_USER, ADD_DISH]),
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    edit (key) {
      console.log(1231)
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        console.log(1231)
        target.editable = true
        this.data = newData
      }
    },
    async save (key) {
      console.log(this.tempData[key])
      console.log(key)
      try {
        let temp = this.tempData[key]
        await this[EDIT_USER]({
          username: temp.username,
          password: temp.password,
          isManage: temp.isManage
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
        await this[DELETE_USER]({
          username: this.tempData[key].username
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
        arr[i].key = i
      }
      return arr
    },
    async init () {
      try {
        const info = await this[USER_LIST]()
        this.data = this.adjustData(info.data || []) || []
        this.data.forEach(element => {
          this.tempData[element.key] = element
        });
        this.cacheData = this.data.map(item => ({ ...item }))
        this.$message.success('获取用户列表成功')
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
</style>
