<template>
<div>
  <div>
    <p class="title">汽车参数 <a-button type="primary" style="float: right; width: 80px; margin-right: 4%;" @click="handleMessage">{{create ? '确认创建' : '修改'}}</a-button> </p>
    <hr>
    <a-spin tip="Waiting..." :spinning="wait">
      <a-form
        :form="form">
        <a-form-item
          label = "品牌"
          :label-col = "labelCol"
          :wrapper-col = "wrapperCol"
          class="form-item">
          <a-input 
            v-decorator="[
              'carBrand', {
                rules:[{
                  required: true, message: '请输入'
                }]
              }
            ]"
            placeholder="Please input">
          </a-input>
        </a-form-item>
        <a-form-item
          label = "型号"
          :label-col = "labelCol"
          :wrapper-col = "wrapperCol"
          class="form-item">
          <a-input 
            v-decorator="[
              'carName', {
                rules:[{
                  required: true, message: '请输入'
                }]
              }
            ]"
            placeholder="Please input">
          </a-input>
        </a-form-item>
        <a-form-item
          label = "能源"
          :label-col = "labelCol"
          :wrapper-col = "wrapperCol"
          class="form-item">
          <a-input 
            v-decorator="[
              'energy', {
                rules:[{
                  required: true, message: '请输入'
                }]
              }
            ]"
            placeholder="Please input">
          </a-input>
        </a-form-item>
        <a-form-item
          label = "排量"
          :label-col = "labelCol"
          :wrapper-col = "wrapperCol"
          class="form-item">
          <a-input 
            v-decorator="[
              'displacement', {
                rules:[{
                  required: true, message: '请输入你的地址'
                }]
              }
            ]"
            placeholder="Please input">
          </a-input>
        </a-form-item>
      </a-form>
    </a-spin>
  </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { CAR_DETAILS, EDIT_CAR, ADD_CAR } from '@/store/manager'

const tranfromBool = {
  'true': true,
  'false': false
}

export default {
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  data () {
    return {
      car: {
        carBrand: '',
        carName: '',
        enery: '',
        displacement: ''
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
      carId: this.$route.query.carId || localStorage.getItem('carId'),
      create: tranfromBool[this.$route.query.create] || false
    }
  },
  methods: {
    ...mapActions([CAR_DETAILS, EDIT_CAR, ADD_CAR]),
    handleMessage (e) {
      this.car = this.form.getFieldsValue()
      this.car.carId = this.carId
      this.form.validateFields(async (err, values) => {
        if (err) {
          this.$message.error('请填写正确的信息!')
          return
        }
        this.wait = true
        this.$message.info(this.create ? '正在创建' : '正在修改')
        try {
          let request = this.create ? ADD_CAR : EDIT_CAR
          await this[request](this.car)
          this.$message.success(this.create ? '创建成功' : '修改成功')
          if (this.create) {
            this.$router.push({name: 'ManageCar'})
          }
        } catch (e) {
          this.$message.error(e.message)
        } finally {
          this.wait = false
        }
      })
    },
    async getInfo () {
      try {
        const response = await this[CAR_DETAILS]({
          id: this.carId
        })
        this.$message.success('获取信息成功')
        this.wait = false
        this.data = response.data
        this.form.setFieldsValue(this.data)
      } catch (e) {
        this.$message.error('获取信息失败')
      }
    }
  },
  mounted: async function () {
    if (!this.create) {
      await this.getInfo()
    }
    this.wait = false
  }
}
</script>

<style>
  .title {
    font-size: 25px;
  }
  .form-item {
    margin-top: 20px;
    float: left;
    width: 30%;
  }
</style>
