<template>
  <div>
    <a-button class="editable-add-btn" @click="addDish = !addDish">Add</a-button>
    <a-form v-if="addDish" :form="form" @submit="confirm" class="components-input-demo-size">
      <a-form-item class="input-dish-name">
        <a-input
          addonBefore="菜名"
          placeholder="dish name"
          v-decorator="[
            'dishName',
            {rules: [{ required: true, message: 'Please input your dish name!' }]}
          ]"/>
      </a-form-item>
      <a-form-item>
        <a-input
          addonBefore="价格"
          placeholder="dish price"
          v-decorator="[
            'dishPrice',
            {rules: [{ required: true, message: 'Please input your dish price!' }]}
          ]"/>
      </a-form-item>
      <a-button @click="confirm">确认</a-button>
    </a-form>
    <a-table :columns="columns" :dataSource="data" bordered :pagination="pagination">
      <template v-for="col in ['name', 'price']" :slot="col" slot-scope="text, record">
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
import { MANAGER_MENU_LIST, EDIT_DISH, DELETE_DISH, ADD_DISH } from '@/store/manager'
import { mapActions } from 'vuex'

const columns = [{
  title: 'name',
  dataIndex: 'name',
  width: '25%',
  scopedSlots: { customRender: 'name' },
}, {
  title: 'price',
  dataIndex: 'price',
  width: '25%',
  scopedSlots: { customRender: 'price' },
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
      addDish: false,
      form: this.$form.createForm(this),
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
    count: {
      get: function () {
        return this.data.length
      }
    }
  },
  methods: {
    ...mapActions([MANAGER_MENU_LIST, EDIT_DISH, DELETE_DISH, ADD_DISH]),
    async confirm () {
      try {
        this.form.validateFields((err) => {
          if (err) return
        })
        let dishName = this.form.getFieldValue('dishName')
        let dishPrice = this.form.getFieldValue('dishPrice')
        await this[ADD_DISH]({
          name: dishName,
          price: dishPrice
        })
        this.addDish = false
        this.$message.success('添加成功')
        await this.init()
      } catch (e) {
        this.$message.error(e.message)
      }
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
        await this[EDIT_DISH]({
          id: temp.dishesId,
          name: temp.name,
          price: temp.price
        })
        const newData = [...this.data]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          delete target.editable
          this.data = newData
          this.cacheData = newData.map(item => ({ ...item }))
        }
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    async onDelete (key) {
      try {
        await this[DELETE_DISH]({
          id: this.tempData[key].dishesId
        })
        const data = [...this.data]
        this.data = data.filter(item => item.key !== key)
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
        arr[i].number = 0
      }
      return arr
    },
    async init () {
      try {
        const info = await this[MANAGER_MENU_LIST]()
        this.data = this.adjustData(info.data) || []
        this.data.forEach(element => {
          this.tempData[element.key] = element
        });
        this.cacheData = this.data.map(item => ({ ...item }))
        this.$message.success('获取菜单成功')
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
.editable-add-btn {
  margin-bottom: 8px;
}
.ant-input-group-wrapper {
  width: 200px;
  margin: 0 14px 14px 0;
}
.components-input-demo-size {
  display: flex;
  flex-direction: row;
}
</style>
