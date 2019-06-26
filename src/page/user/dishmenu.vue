<template>
  <div>
    <div style="margin-bottom: 16px">
      <a-button
        type="primary"
        @click="start"
        :disabled="!hasSelected"
        :loading="loading"
      >
        查看已选车辆
      </a-button>
    </div>
    <a-table :pagination="pagination" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="data" @change="handleChange">
      <template slot="number" slot-scope="text, record">
        <a-input-number :min="0" :max="10" v-model="record.number" @change="onChangelfp(text, record.key)" />
      </template>
      <template slot="details" slot-scope="text, record">
        <a @click="details(record)">详情</a>
      </template>
    </a-table>
    <a-drawer
      title="已选车辆"
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
    <div class="dialong-content">
      <span class="dialog-title-dish">车型</span><span class="dialog-title-price">价格</span>
      <p v-for="(value,key) in alreadyDish" :key="key">
        <span class="dialog-content-name">{{value.carName}} * {{value.number}}</span><span class="dialog-content-price">{{value.price}}(万元)</span>
      </p>
    </div>
    <a-button type="primary" class="dialog-footer-button" @click="createOrder">提交订单</a-button>
    </a-drawer>
  </div>
</template>
<script>
import { USER_GET_DISH, CREATE_ORDER, ORDER_ADD_DISH } from '@/store/user'
import { mapActions } from 'vuex'

const data = [];
for (let i = 3; i < 30; i++) {
  data.push({
    key: i + 10,
    name: `Edward King ${i}`,
    price: 20 + i,
    number: i
  });
}

export default {
  data() {
    return {
      data: [],
      alreadyDish: [],
      selectedRowKeys: [], // Check here to configure the default column
      tempData: [],
      loading: false,
      visible: false,
      x: 5,
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
    hasSelected() {
      return this.selectedRowKeys.length > 0
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
      }, {
        title: '库存(辆)',
        dataIndex: 'stock',
        key: 'stock',
        sorter: (a, b) => parseInt(a.stock) > parseInt(b.stock),
        sortOrder: sortedInfo.columnKey === 'stock' && sortedInfo.order,
      }, {
        title: '数量',
        dataIndex: 'number',
        scopedSlots: { customRender: 'number' },
      }, {
        title: '详情',
        dataIndex: 'details',
        scopedSlots: { customRender: 'details' },
      }, {
        title: '价格(万元)',
        dataIndex: 'price',
        key: 'price',
        sorter: (a, b) => a.price - b.price,
        sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
      }];
      return columns;
    }
  },
  methods: {
    ...mapActions([USER_GET_DISH, CREATE_ORDER, ORDER_ADD_DISH]),
    handleChange (pagination, filters, sorter) {
      this.filteredInfo = filters;
      this.sortedInfo = sorter;
    },
    onChangelfp (value, key) {
      console.log(value)
      console.log(key)
      console.log(this.data)
    },
    details (record) {
      console.log(record)
      this.$router.push({name: 'carDetails',
        query: {
          carId: record.carId
        }
      })
    },
    start () {
      this.visible = true;
      this.loading = true;
      this.alreadyDish = []
      this.selectedRowKeys.forEach((element,index) => {
        this.alreadyDish[index] = this.tempData[element]
      })
      console.log(this.alreadyDish)
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },
    onClose() {
      this.visible = false
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      for (let i = 0; i < selectedRowKeys.length; i++) {
        if (this.tempData[selectedRowKeys[i]].number === 0) {
          this.tempData[selectedRowKeys[i]].number = 1;
        }
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
        const info = await this[USER_GET_DISH]()
        this.data = this.adjustData(info.data) || []
        this.data.forEach(element => {
          this.tempData[element.key] = element
        });
        this.$message.success('获取商品成功')
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    async createOrder () {
      try {
        let dishList = []
        this.alreadyDish.forEach((element,index) => {
          dishList.push({
            id: element.commodityId,
            number: element.number
          })
        })
        console.log(dishList)
        await this[CREATE_ORDER]({
          dishList: dishList
        })
        this.$message.success('提交订单成功')
        //this.$router.push({name: 'OrderList'})
      } catch (e) {
        console.log(e.message)
        this.$message.error(e.message)
      }
    }
  },
  mounted: async function () {
    this.init()
  }
}
</script>

<style scoped>
  .dialog-title-dish {
    margin-left: 15px;
    font-size: 18px;
    font-weight: 800;
  }
  .dialog-title-price {
    margin-left: 70px;
    font-size: 18px;
    font-weight: 800;
  }
  .dialog-content {
    padding: 150px;
  }
  .dialog-content-name {
    width: 80px !important;
  }
  .dialog-content-price {
    float: right;
    margin-right: 50px;
  }
  .dialog-footer-button {
    width: 100px;
    height: 40px;
    position: fixed;
    bottom: 10px;
  }
</style>
