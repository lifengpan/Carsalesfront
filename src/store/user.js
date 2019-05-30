import { user } from '@/api'

export const USER_GET_DISH = 'USER_GET_DISH'

const USER_GET_DISH_HTTP = new user.USERGETDISH()

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
    }
  }
}