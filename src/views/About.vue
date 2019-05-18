<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="clickGET">发送GET请求</button>
    <button @click="clickPOST">发送POST请求</button>
    <button @click="clickPUT">发送PUT请求</button>
    <button @click="clickDELETE">发送delete请求</button>
  </div>
</template>

<script>
import { GET_DATA, POST_DATA, PUT_DATA, DELETE_DATA } from "@/store/test";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      s: 1
    };
  },
  methods: {
    ...mapActions([GET_DATA, POST_DATA, PUT_DATA, DELETE_DATA]),
    async clickGET() {
      try {
        await this[GET_DATA]();
      } catch (e) {
        this.$toast.error(e.message);
      }
    },
    async clickPOST() {
      try {
        await this[POST_DATA]();
      } catch (e) {
        this.$toast.error(e.message);
      }
    },
    async clickPUT() {
      try {
        await this[PUT_DATA]();
      } catch (e) {
        this.$toast.error(e.message);
      }
    },
    async clickDELETE() {
      try {
        await this[DELETE_DATA]()
      } catch (e) {
        this.$toast.error(e.message)
      }
    }
  }
};
</script>
