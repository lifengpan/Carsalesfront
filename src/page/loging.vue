<template>
  <div id="Login">
    <div class="Login-backgorund"></div>
    <div class="lifengpan">
      <a-spin tip="Loading..." :spinning="loading">
        <h2 class="h22">{{ islogin ? 'Welcome' : 'Welcome' }}</h2>
        <hr>
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          @submit="handleSubmit">
          <a-form-item class="user abc">
            <a-input
              class="lfp-input"
              v-decorator="[
                'userName',
                {rules: [{required: true, pattern: /^[\w\d_]{6,30}$/i, message: '用户名由字母、数字或_组成长度6-30', whitespace:true,}]}
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
              html-type="submit"
              class="login-form-button"
              :ghost="true"
            >
              登录
            </a-button>
          </a-form-item>
          <a-form-item v-if="!islogin">
            <a-button
              html-type="submit"
              :ghost="true"
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
  color: white;
  left: 0;
}
#Login {
  height: 100%;
  width: 100%;
}
.Login-backgorund {
  background-image: url("../assets/bejin3.jpg");
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  position: absolute;
  background-position: center;
  background-size: cover;
  filter: blur(3px);
}
.lifengpan {
  position: absolute;
  background: rgba(216, 216, 216, 0.3); 
  border-radius: 10px;
  width: 300px;
  top: 50%;
  transform: translateY(-60%);
  right: 40%;
}
p {
  filter:alpha(opacity=60);
  opacity:0.6;
}
.ant-input {
  background-color: rgba(216, 216, 216, 0.3);
  color: white;
  background: rgba(216, 216, 216, 0.3)
}
.ant-btn {
  background-color: #1890ff1a;
  border-color: #1890ffa3;
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
  font-size: 40px;
  color: white;
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
  left: 26%;
  margin-top: 23px;
  cursor: pointer;
  margin-bottom: 15px;
}
</style>
