<template>
  <div id="Login">
    <div class="lifengpan">
      <h2 class="h22">{{ islogin ? '欢迎登录ACM报名系统' : '欢迎注册ACM报名系统' }}</h2>
      <hr>
      <a-spin tip="Loading..." :spinning="loading">
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          @submit="handleSubmit">
          <a-form-item class="user abc">
            <a-input
              v-decorator="[
                'userName',
                {rules: [{required: true, pattern: /^[\w\d_]{6,30}$/i, message: '用户名由字母、数字或 _ 组成,长度6-30位', whitespace:true,}]}
              ]"
              placeholder="Username"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item class="user">
            <a-input
              v-decorator="[
                'password',
                { rules: [{required: true, pattern: /^[\w\d_]{6,30}$/i, message:'密码由字母、数字或 _ 组成,长度6-30位', whitespace:true}]},
              ]"
              type="password"
              placeholder="Password"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item v-if="!islogin" class="user">
            <a-input
              v-decorator="[
                'repassword',
                {rules: [{required: true,validator: validateUserrepassword,whitespace:true}]},
              ]"
              type="password"
              placeholder="Password"
            >
              <a-icon
                slot="prefix"
                type="lock"
                style="color: rgba(0,0,0,.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item v-if="islogin">
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
            >
              登录
            </a-button>
          </a-form-item>
          <a-form-item v-if="!islogin">
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button">
              注册系统
            </a-button>
          </a-form-item>
        </a-form>
        <div class="registered" v-if="islogin" @click="flip">
          注册系统
        </div>
        <div class="returnlogin" v-if="!islogin" @click="flip">
          已有账号,返回登录
        </div>
      </a-spin>
    </div>
  </div>
</template>

<script>
// import { mapState } from "vuex";
import { mapActions } from "vuex";
import { LOGIN_IN, REGISTER } from "../store/login";

export default {
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      islogin: true,
      loading: false,
      repassword: ""
    };
  },
  // computed: {
  //   ...mapState({
  //     auth: state => state.user.auth
  //   })
  // },
  methods: {
    ...mapActions([LOGIN_IN, REGISTER]),
    validateUserrepassword(rule, value, callback) {
      if (value !== this.form.getFieldValue("password")) {
        callback(new Error("两次密码不一致,请重新输入"));
      } else {
        callback();
      }
    },
    flip() {
      this.islogin = !this.islogin;
    },
    async login() {
      try {
        this.$message.success("正在登陆系统中");
        this.loading = true;
        await this[LOGIN_IN](this.user);
        this.$message.success("登陆成功");
        // setTimeout(() => {
        //   console.log(this.auth.Code)
        //   this.$router.replace({ path: !this.auth.Code ? '/Desk/User/Info' : '/Desk/User/Race' })
        // }, 1000)
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
    async register() {
      if (this.repassword !== this.user.password) {
        this.$message.error("两次密码不一致，请重新输入");
        return;
      }
      try {
        this.loading = true;
        this.$message.success("正在注册账号中");
        await this[REGISTER](this.user);
        this.$message.success("注册成功");
        setTimeout(() => {
          this.loading = false;
          this.islogin = !this.islogin;
        }, 1000);
      } catch (e) {
        this.$message.error(e.message);
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }
    },
    handleSubmit(e) {
      this.user.username = this.form.getFieldValue("userName");
      this.user.password = this.form.getFieldValue("password");
      this.repassword = this.form.getFieldValue("repassword");
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (err) return;
        if (this.islogin) {
          // eslint-disable-next-line
          console.log(values)
          this.login();
        } else {
          this.register();
        }
      });
    }
  }
};
</script>
<style>
#components-form-demo-normal-login {
  margin-top: 20px;
  width: 300px;
}
.login-form-button {
  margin-top: 32px;
  width: 250px;
  left: 0;
}
#Login {
  background-image: url("https://file.iviewui.com/iview-admin/login_bg.jpg");
  height: 100%;
  width: 100%;
  position: absolute;
  background-position: center;
}
.lifengpan {
  position: absolute;
  background-color: white;
  border-radius: 10px;
  width: 300px;
  top: 50%;
  transform: translateY(-60%);
  right: 160px;
}
.user {
  margin-top: 28px;
  margin-bottom: 0px;
  left: 8%;
  width: 250px;
  height: 25px;
  border-radius: 5px;
  position: relative;
  display: block;
}
.h22 {
  position: relative;
  margin-top: 20px;
  margin-bottom: 15px;
  text-decoration: none;
  color: cornflowerblue;
}
.registered {
  color: cornflowerblue;
  position: relative;
  width: 65px;
  left: 39%;
  margin-top: 23px;
  cursor: pointer;
  margin-bottom: 15px;
}
.returnlogin {
  color: cornflowerblue;
  position: relative;
  width: 150px;
  left: 30%;
  margin-top: 23px;
  cursor: pointer;
  margin-bottom: 15px;
}
</style>
