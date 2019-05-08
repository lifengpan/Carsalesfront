<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="click">发送请求</button>
  </div>
</template>

<script>
import { GET_DATA } from "@/store/test";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      s: 1
    };
  },
  methods: {
    ...mapActions([GET_DATA]),
    async click() {
      try {
        console.log('123')
        await this[GET_DATA]();
      } catch (e) {
        this.$toast.error(e.message);
      }
    }
  }
};
</script>
