import { user } from '@/api'

export const USER_GET_DISH = 'USER_GET_DISH'
export const CREATE_ORDER = 'CREATE_ORDER'
export const ORDER_ADD_DISH = 'ORDER_ADD_DISH'

const USER_GET_DISH_HTTP = new user.USERGETDISH()
const CREATE_ORDER_HTTP = new user.CREATEORDER()

export default {
  state: {},
  actions: {
    async [USER_GET_DISH] ({commit}, data) {
      const info = await USER_GET_DISH_HTTP.get()
      console.log(info)
      return {
        data: info.data,
        prompt: info.prompt
      }
    },
    async [CREATE_ORDER] ({commit}, data) {
      const info = await CREATE_ORDER_HTTP.create({
        username: data.username,
        tableNumber: data.tableNumber
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
  }
}