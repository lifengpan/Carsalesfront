<template>
  <div>
    <a-button class="editable-add-btn" @click="createCar">Add</a-button>
    <a-table :columns="columns" :dataSource="data" bordered :pagination="pagination" @change="handleChanges">
      <template v-for="col in ['carBrand', 'carName', 'energy', 'displacement']" :slot="col" slot-scope="text, record">
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
      <a slot="details" slot-scope="text, record" @click="manageCarDetails(record)">详情</a>
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
import { EDIT_CAR, DELETE_CAR, ALL_CAR } from '@/store/manager'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      data: [],
      tempData: [],
      addDish: false,
      form: this.$form.createForm(this),
      filteredInfo: null,
      sortedInfo: null,
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
    },
    columns () {
      let { sortedInfo, filteredInfo } = this
      sortedInfo = sortedInfo || {};
      filteredInfo = filteredInfo || {};
      const columns = [{
        title: '品牌',
        dataIndex: 'carBrand',
        key: 'carBrand',
        filters: [
          { text: '大众', value: '大众' },
          { text: 'Jim', value: 'Jim' },
        ],
        filteredValue: filteredInfo.carBrand || null,
        onFilter: (value, record) => record.carBrand.includes(value),
        sorter: (a, b) => a.carBrand.length - b.carBrand.length,
        sortOrder: sortedInfo.columnKey === 'carBrand' && sortedInfo.order,
        scopedSlots: { customRender: 'carBrand' },
      }, {
        title: '名称',
        dataIndex: 'carName',
        key: 'carName',
        filters: [
          { text: 'Joe', value: 'Joe' },
          { text: 'Jim', value: 'Jim' },
        ],
        filteredValue: filteredInfo.carName || null,
        onFilter: (value, record) => record.carName.includes(value),
        sorter: (a, b) => a.carName.length - b.carName.length,
        sortOrder: sortedInfo.columnKey === 'carName' && sortedInfo.order,
        scopedSlots: { customRender: 'carName' },
      }, {
        title: '能源',
        dataIndex: 'energy',
        key: 'energy',
        filters: [
          { text: 'Joe', value: 'Joe' },
          { text: 'Jim', value: 'Jim' },
        ],
        filteredValue: filteredInfo.energy || null,
        onFilter: (value, record) => record.energy.includes(value),
        sorter: (a, b) => a.energy.length - b.energy.length,
        sortOrder: sortedInfo.columnKey === 'energy' && sortedInfo.order,
        scopedSlots: { customRender: 'energy' },
      }, {
        title: '排量(L)',
        dataIndex: 'displacement',
        key: 'displacement',
        filters: [
          { text: 'Joe', value: 'Joe' },
          { text: 'Jim', value: 'Jim' },
        ],
        filteredValue: filteredInfo.displacement || null,
        onFilter: (value, record) => record.displacement.includes(value),
        sorter: (a, b) => a.displacement.length - b.displacement.length,
        sortOrder: sortedInfo.columnKey === 'displacement' && sortedInfo.order,
        scopedSlots: { customRender: 'displacement' },
      }, {
        title: '详情',
        dataIndex: 'details',
        width: '10%',
        scopedSlots: { customRender: 'details' },
      }, {
        title: 'operation',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
      }, {
        title: 'Action',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' },
      }];
      return columns;
    }
  },
  methods: {
    ...mapActions([EDIT_CAR, DELETE_CAR, ALL_CAR]),
    filterOption(input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    createCar () {
      this.$router.push({name: 'ManageCarDetails',
        query: {
          create: true
        }
      })
    },
    handleChanges (pagination, filters, sorter) {
      this.filteredInfo = filters;
      this.sortedInfo = sorter;
    },
    manageCarDetails(record) {
      this.$router.push({name: 'ManageCarDetails',
        query: {
          carId: record.carId
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
        await this[EDIT_CAR](temp)
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
        await this[DELETE_CAR]({
          id: this.tempData[key].carId
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
        arr[i].number = 0
      }
      return arr
    },
    async init () {
      try {
        const info = await this[ALL_CAR]()
        this.data = this.adjustData(info.data) || []
        this.data.forEach(element => {
          this.tempData[element.key] = element
        });
        this.cacheData = this.data.map(item => ({ ...item }))
        this.$message.success('获取汽车列表成功')
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
.input-car-name {
  margin-right: 10px;
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