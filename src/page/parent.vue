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
        <span>Option 1</span>
      </a-menu-item>
      <a-menu-item key="2">
        <router-link to="/DESK/User/orderList"></router-link>
        <a-icon type="desktop" />
        <span>Option 2</span>
      </a-menu-item>
      <a-menu-item key="3">
        <router-link to="/DESK/manager/dishList"></router-link>
        <a-icon type="inbox" />
        <span>Option 3</span>
      </a-menu-item>
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="mail" /><span>Navigation One</span></span>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title"><a-icon type="appstore" /><span>Navigation Two</span></span>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11">Option 11</a-menu-item>
          <a-menu-item key="12">Option 12</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="header">
        <a-icon
          class="trigger"
          :type="hiddensider"
          @click="flipcollapsed"/>
        <span></span>
        <span class="safetyExit"><a>安全退出</a></span>
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
      collapsed: false
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
