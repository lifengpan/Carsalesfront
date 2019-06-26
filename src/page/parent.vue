<template>
  <a-layout id="components-layout-custom-trigger">
    <a-layout-sider
      :trigger="null"
      collapsible
      v-model="collapsed">
    <a-menu
      :defaultSelectedKeys="['1']"
      :defaultOpenKeys="['sub1']"
      mode="inline"
      theme="dark"
      :inlineCollapsed="collapsed"
    >
      <a-menu-item key="1">
        <router-link to="/DESK/User/dishmenu"></router-link>
        <a-icon type="pie-chart" />
        <span>商品</span>
      </a-menu-item>
      <a-menu-item key="2">
        <router-link to="/DESK/User/orderList"></router-link>
        <a-icon type="desktop" />
        <span>订单</span>
      </a-menu-item>
      <a-menu-item key="3">
        <router-link to="/DESK/user/userInfo"></router-link>
        <a-icon type="desktop" />
        <span>个人信息</span>
      </a-menu-item>
      <a-sub-menu key="sub1" v-if="isManage">
        <span slot="title"><a-icon type="mail" /><span>管理员</span></span>
        <a-menu-item key="4">
          <router-link to="/DESK/manager/dishList"></router-link>
          <a-icon type="pie-chart" />
          <span>商品管理</span>
        </a-menu-item>
        <a-menu-item key="5">
          <router-link to="/DESK/manager/userList"></router-link>
          <a-icon type="solution" />
          <span>用户管理</span>
        </a-menu-item>
        <a-menu-item key="6">
          <router-link to="/DESK/manager/manageOrder"></router-link>
          <a-icon type="snippets" />
          <span>订单管理</span>
        </a-menu-item>
        <a-menu-item key="7">
          <router-link to="/DESK/manager/manageCar"></router-link>
          <a-icon type="snippets" />
          <span>汽车管理</span>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <a-icon
          class="trigger"
          :type="hiddensider"
          @click="flipcollapsed"/>
        <span>汽车4s销售系统</span>
        <span class="safetyExit" @click="safetyExit"><a>安全退出</a></span>
      </a-layout-header>
      <div class="line"></div>
      <a-layout-content>
        <div :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }" class="content">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
export default {
  data() {
    return {
      collapsed: false,
      isManage: parseInt(localStorage.getItem('isManage'))
    }
  },
  computed: {
    hiddensider() {
      return this.collapsed ? 'menu-unfold' : 'menu-fold'
    }
  },
  methods: {
    flipcollapsed() {
      this.collapsed = !this.collapsed
    },
    jumpRouter () {
      this.$router.push({name: 'dishmenu'})
    },
    safetyExit () {
      localStorage.clear();
      this.$store.replaceState({
        Test: {
          auth: {}
        },
        User: {},
        Manager: {},
      }); 
      console.log(this.$store)
      this.$router.push({name: 'lfpRestaurant'})
    }
  }
};
</script>
<style>
#app {
  text-align: left;
}
#components-layout-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-custom-trigger {
  height: 100%;
}
.line {
  border: 10px solid #8080802b;
}
.menu {
  height: 100%;
}
.header {
  background: #fff;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  height: 70px;
  min-width: 600px;
}
.content {
  min-width: 500px;
  height: 100%;
}
.safetyExit {
  float: right;
  font-size: 18px;
  margin-right: 20px;
}
.ant-layout {
  background: #fff;
}
</style>
