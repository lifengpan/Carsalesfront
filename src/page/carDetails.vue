<template>
  <div>
    <p class="title">汽车详情</p>
    <hr>
    <a-spin tip="Waiting..." :spinning="wait">
      <div style="padding-left: 4%;">
        <span v-for="(file,index) in prompt" :key="index" style="float: left; width: 25%;margin-top: 20px;margin-right: 7%;">{{file}}：{{data[index]}}</span>
      </div>
    </a-spin>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { USRE_CAR_DETAILS } from '@/store/user'

export default {
  data () {
    return {
      carId: this.$route.query.carId,
      wait: true,
      data: {},
      prompt: {}
    }
  },
  methods: {
    ...mapActions([USRE_CAR_DETAILS]),
    async getInfo () {
      try {
        const response = await this[USRE_CAR_DETAILS]({
          id: this.carId
        })
        this.$message.success('获取详情成功')
        this.wait = false
        this.data = response.data
        this.prompt = response.prompt
      } catch (e) {
        this.$message.error('获取详情失败')
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
