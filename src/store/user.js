import { user } from '@/api'

export const USER_GET_DISH = 'USER_GET_DISH'
export const CREATE_ORDER = 'CREATE_ORDER'
export const ORDER_ADD_DISH = 'ORDER_ADD_DISH'
export const USER_ORDER_LIST = 'USER_ORDER_LIST'
export const CONFIRM_GOODS = 'CONFIRM_GOODS'
export const USER_REFUND = 'USER_REFUND'
export const EDIT_USER_INFO = 'EDIT_USER_INFO'
export const GET_PERSONAL_INFO = 'GET_PERSONAL_INFO'
export const USRE_CAR_DETAILS = 'USRE_CAR_DETAILS'

const USER_GET_DISH_HTTP = new user.USERGETDISH()
const CREATE_ORDER_HTTP = new user.CREATEORDER()

export default {
  state: {},
  actions: {
    async [USER_GET_DISH] ({commit}, data) {
      const info = await USER_GET_DISH_HTTP.get()
      return {
        data: info.data,
        prompt: info.prompt
      }
    },
    async [CREATE_ORDER] ({state, commit}, data) {
      const info = await CREATE_ORDER_HTTP.create({
        userId: localStorage.getItem('userId'),
        dishList: data.dishList,
        adress: '湖南文理学院第三实验楼'
      })
      return {
        data: info.data,
        prompt: info.prompt
      }
    },
    async [ORDER_ADD_DISH] ({commit}, data) {
      const ORDER_ADD_DISH_HTTP = new user.ORDERADDDISH({
        id: data.id
      })
      const info = await ORDER_ADD_DISH_HTTP.put('', {
        dish: data.dish
      })
      return {
        data: info.data,
        prompt: info.prompt
      }
    },
    async [USER_ORDER_LIST] ({commit}, data) {
      const USER_ORDER_LIST_HTTP = new user.ORDERLIST({
        userId: localStorage.getItem('userId')
      })
      const info = await USER_ORDER_LIST_HTTP.get()
      return {
        data: info.data,
        prompt: info.prompt
      }
    },
    async [CONFIRM_GOODS] ({commit}, data) {
      const CONFIRM_GOODS_HTTP = new user.CONFIRMGOODS({
        orderId: data.orderId
      })
      await CONFIRM_GOODS_HTTP.put()
    },
    async [USER_REFUND] ({commit}, data) {
      const USER_REFUND_HTTP = new user.USERREFUND({
        orderId: data.orderId
      })
      await USER_REFUND_HTTP.put('', {
        refundInstructions: data.refundInstructions
      })
    },
    async [EDIT_USER_INFO] ({commit}, data) {
      const EDIT_USER_INFO_HTTP = new user.EDITUSERINFO({
        id: data.id
      })
      await EDIT_USER_INFO_HTTP.put('', {
        firstName: data.firstName,
        sex: data.sex,
        telephone: data.telephone,
        address: data.address
      })
    },
    async [GET_PERSONAL_INFO] ({commit}, data) {
      const GET_PERSONAL_INFO_HTTP = new user.GETPERSONALINFO({
        id: data.id
      })
      const info = await GET_PERSONAL_INFO_HTTP.get()
      return {
        data: info.data,
        prompt: info.prompt
      }
    },
    async [USRE_CAR_DETAILS] ({commit}, data) {
      const USRE_CAR_DETAILS_HTTP = new user.USERCARDETAILS({
        id: data.id
      })
      const info = await USRE_CAR_DETAILS_HTTP.get()
      return {
        data: info.data,
        prompt: info.prompt
      }
    },
  }
}