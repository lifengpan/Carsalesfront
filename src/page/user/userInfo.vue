<template>
  <div>
    <p class="title">个人信息</p>
    <hr>
    <a-spin tip="Waiting..." :spinning="wait">
    <a-form
      :form="form"
      @submit="handleMessage">
      <a-form-item
        label = "用户名"
        :label-col = "labelCol"
        :wrapper-col = "wrapperCol"
        style="margin-bottom: 0;">
        {{data.username || '无'}}
      </a-form-item>
      <a-form-item
        label = "余额"
        :label-col = "labelCol"
        :wrapper-col = "wrapperCol"
        style="margin-bottom: 0;">
        {{data.balance}}
      </a-form-item>
      <a-form-item
        label = "姓名"
        :label-col = "labelCol"
        :wrapper-col = "wrapperCol">
        <a-input 
          v-decorator="[
            'firstName', {
              rules:[{
                required: true, message: '请输入你的名字'
              }]
            }
          ]"
          placeholder="Please input your name">
        </a-input>
      </a-form-item>
      <a-form-item
        label = "性别"
        :label-col = "labelCol"
        :wrapper-col = "wrapperCol">
        <a-input 
          v-decorator="[
            'sex', {
              rules:[{
                required: true, message: '请输入你的性别'
              }]
            }
          ]"
          placeholder="Please input your sex">
        </a-input>
      </a-form-item>
      <a-form-item
        label = "电话"
        :label-col = "labelCol"
        :wrapper-col = "wrapperCol">
        <a-input 
          v-decorator="[
            'telephone', {
              rules:[{
                required: true, message: '请输入你的电话'
              }, {
                type: 'string', len: 11, message: 'The phone number entered is invalid'
              }]
            }
          ]"
          placeholder="Please input your mobile phone number">
        </a-input>
      </a-form-item>
      <a-form-item
        label = "地址"
        :label-col = "labelCol"
        :wrapper-col = "wrapperCol">
        <a-input 
          v-decorator="[
            'address', {
              rules:[{
                required: true, message: '请输入你的地址'
              }]
            }
          ]"
          placeholder="Please input your address">
        </a-input>
      </a-form-item>
      <a-col
        :span="8"
        :style="{ textAlign: 'right' }">
        <a-button
          type="primary"
          html-type="submit">修改
        </a-button>
        <a-button 
          :style="{ marginLeft: '8px' }"
          @click="handleClear">重置
        </a-button>
      </a-col>
    </a-form>
    </a-spin>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { EDIT_USER_INFO, GET_PERSONAL_INFO } from '@/store/user'

const getInformation = () => {
  return {
    firstName: '',
    sex: '',
    telephone: '',
    address: ''
  }
}
export default {
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  data () {
    return {
      user: {
        firstName: '',
        sex: '',
        telephone: '',
        address: '',
      },
      data: {},
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 12
      },
      disabled: false,
      wait: true,
      userId: this.$route.query.userId || localStorage.getItem('userId')
    }
  },
  methods: {
    ...mapActions([EDIT_USER_INFO, GET_PERSONAL_INFO]),
    handleMessage (e) {
      this.user = this.form.getFieldsValue()
      this.user.id = this.userId
      this.form.validateFields(async (err, values) => {
        if (err) {
          this.$message.error('请填写正确的信息!')
          return
        }
        this.wait = true
        this.$message.info('正在修改信息')
        try {
          await this[EDIT_USER_INFO](this.user)
          this.$message.success('修改信息成功')
        } catch (e) {
          this.$message.error('修改信息失败')
        } finally {
          this.wait = false
        }
      })
    },
    handleClear () {
      this.user = this.form.getFieldsValue()
      const data = getInformation(this.user)
      this.form.resetFields()
      this.form.setFieldsValue(data)
    },
    async getInfo () {
      try {
        const response = await this[GET_PERSONAL_INFO]({
          id: this.userId
        })
        this.$message.success('获取信息成功')
        this.wait = false
        this.data = response.data
        this.form.setFieldsValue({
          firstName: response.data.firstName,
          sex: response.data.sex,
          telephone: response.data.telephone,
          address: response.data.address
        })
      } catch (e) {
        this.$message.error('获取信息失败')
      }
    }
  },
  mounted: async function () {
    await this.getInfo()
  }
}
</script>

<style>
  .title {
    font-size: 25px;
  }
</style>
