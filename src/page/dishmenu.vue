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
    <a-table :pagination="pagination" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns="columns" :dataSource="data"/>
    <a-drawer
      title="Basic Drawer"
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
    >
      <p v-for="(value,key) in arr2" :key="key">{{value.name}}</p>
    </a-drawer>
  </div>
</template>
<script>
const columns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 30; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

export default {
  data() {
    return {
      data,
      arr2: [],
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      visible: false,
      x: 5,
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
    }
  },
  methods: {
    start () {
      this.visible = true;
      this.loading = true;
      console.log(data)
      console.log(this.data)
      var arr = []
      this.data.forEach(element => {
        arr[element.key] = element
      });
      this.selectedRowKeys.forEach((element,index) => {
        this.arr2[index] = arr[element]
      })
      console.log(this.arr2)
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
        this.arr2 = []
      }, 5000);
    },
    onClose() {
      this.visible = false
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys
      console.log(data[selectedRowKeys])
    }
  },
}
</script>


