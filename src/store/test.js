import { testRequest } from "../api";
export const GET_DATA = "GET_DATA";
export default {
  state: {},
  actions: {
    async [GET_DATA]() {
      // eslint-disable-next-line
      console.log("store")
      const GETDATA_HTTP = new testRequest.GETDATA();
      await GETDATA_HTTP.get();
    }
  }
};
