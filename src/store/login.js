import { testRequest } from '../api'
import { login } from '../api'
export const GET_DATA = 'GET_DATA'
export const POST_DATA = 'POST_DATA'
export const PUT_DATA = 'PUT_DATA'
export const DELETE_DATA = 'DELETE_DATA'
export const LOGIN_IN = 'LOGIN_IN'
export const REGISTER = 'REGISTER'
export default {
  state: {},
  actions: {
    async [GET_DATA]() {
      console.log('store')
      const GETDATA_HTTP = new testRequest.GETDATA({
        username: '2240661275'
      })
      const info = await GETDATA_HTTP.get()
      console.log(info.data)
    },
    async [POST_DATA]() {
      console.log('store')
      const POSTDATA_HTTP = new testRequest.POSTDATA();
      await POSTDATA_HTTP.create({
        username: '2240661275',
        password: '123456'
      })
    },
    async [PUT_DATA]() {
      const POSTDATA_HTTP = new testRequest.PUTDATA();
      await POSTDATA_HTTP.put('', {
        name: '剁椒鱼头',
        price: 38
      })
    },
    async [DELETE_DATA]() {
      const DELETE_DATA_HTTP = new testRequest.DELETEDATA({
        year: 2018,
        id: 1003,
        user: 'lifengpan'
      })
      await DELETE_DATA_HTTP.delete();
    },
    async [LOGIN_IN]({ commit }, data) {
      console.log('jing')
      const LOGIN_IN_HTTP = new login.LOGIN_IN();
      console.log('jing')
      await LOGIN_IN_HTTP.create({
        username: data.username,
        password: data.password
      })
    },
    async [REGISTER]({ commit }, data) {
      const LOGIN_IN_HTTP = new login.REGISTER();
      await LOGIN_IN_HTTP.create({
        username: data.username,
        password: data.password
      })
    }
  }
};
