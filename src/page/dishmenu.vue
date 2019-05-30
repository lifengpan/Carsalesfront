<template>
  <div>
    <div style="margin-bottom: 16px">
      <span style="margin-left: 8px">
        <template v-if="hasSelected">
          {{`已点 ${selectedRowKeys.length} 个菜`}}
        </template>
      </span>
      <a-button
        type="primary"
        @click="start"
        :disabled="!hasSelected"
        :loading="loading"
      >
        查看
      </a-button>
    </div>
    <a-table :pagination="pagination" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="data" @change="handleChange">
      <template slot="number" slot-scope="text, record">
        <a-input-number :min="0" :max="10" v-model="record.number" @change="onChangelfp(text, record.key)" />
      </template>
    </a-table>
    <a-drawer
      title="已点菜单"
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
    <div class="dialong-content">
      <span class="dialog-title-dish">菜名</span><span class="dialog-title-price">价格</span>
      <p v-for="(value,key) in alreadyDish" :key="key">
        <span class="dialog-content-name">{{value.name}} * {{value.number}}</span><span class="dialog-content-price">{{value.price}}/份</span>
      </p>
    </div>
    <a-button type="primary" class="dialog-footer-button">提交订单</a-button>
    </a-drawer>
  </div>
</template>
<script>
import { USER_GET_DISH } from '@/store/user'
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
				pageSize: 20, // 默认每页显示数量
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
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filters: [
          { text: 'Joe', value: 'Joe' },
          { text: 'Jim', value: 'Jim' },
        ],
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      }, {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        sorter: (a, b) => a.price - b.price,
        sortOrder: sortedInfo.columnKey === 'price' && sortedInfo.order,
      }, {
        title: 'Number',
        dataIndex: 'number',
        scopedSlots: { customRender: 'number' },
      }];
      return columns;
    }
  },
  methods: {
    ...mapActions([USER_GET_DISH]),
    handleChange (pagination, filters, sorter) {
      this.filteredInfo = filters;
      this.sortedInfo = sorter;
    },
    onChangelfp (value, key) {
      console.log(value)
      console.log(key)
      console.log(this.data)
    },
    start () {
      this.visible = true;
      this.loading = true;
      this.alreadyDish = []
      this.selectedRowKeys.forEach((element,index) => {
        this.alreadyDish[index] = this.tempData[element]
      })
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
      } catch (e) {
        this.$taost.error(e.message)
      }
    }
  },
  mounted: async function () {
    this.init()
  }
}
</script>

<style>
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
