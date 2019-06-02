import { manager } from '@/api'

export const MANAGER_MENU_LIST = 'MANAGER_MENU_LIST'
export const EDIT_DISH = 'EDIT_DISH'
export const DELETE_DISH = 'DELETE_DISH'
export const ADD_DISH = 'ADD_DISH'
export const USER_LIST = 'USER_LIST'
export const EDIT_USER = 'EDIT_USER'
export const DELETE_USER = 'DELETE_USER'

const MANAGER_MENU_LIST_HTTP = new manager.MENULIST()
const ADD_DISH_HTTP = new manager.ADDDISH()
const USER_LIST_HTTP = new manager.USERLIST()

export default {
  state: {},
  actions: {
    async [MANAGER_MENU_LIST] ({commit}, data) {
      const info = await MANAGER_MENU_LIST_HTTP.get()
      return {
        data: info.data,
        prompt: info.prompt
      }
    },
    async [EDIT_DISH] ({commit}, data) {
      const EDIT_DISH_HTTP = new manager.EDITDISH({
        id: data.id
      })
      const info = await EDIT_DISH_HTTP.put('', {
        name: data.name,
        price: data.price
      })
      return {
        data: info.data,
        prompt: info.prompt
      }
    },
    async [DELETE_DISH] ({commit}, data) {
      const DELETE_DISH_HTTP = new manager.DELETEDISH({
        id: data.id
      })
      await DELETE_DISH_HTTP.delete()
    },
    async [ADD_DISH] ({commit}, data) {
      const info = await ADD_DISH_HTTP.put('',{
        name: data.name,
        price: data.price
      })
      return {
        data: info.data,
        prompt: info.prompt
      }
    },
    async [USER_LIST] ({commit}, data) {
      const info = await USER_LIST_HTTP.get()
      return {
        data: info.data,
        prompt: info.prompt
      }
    },
    async [EDIT_USER] ({commit}, data) {
      const EDIT_USER_HTTP = new manager.EDITUSER({
        username: data.username
      })
      const info = await EDIT_USER_HTTP.put('', {
        password: data.password,
        isManage: data.isManage
      })
      return {
        data: info.data,
        prompt: info.prompt
      }
    },
    async [DELETE_USER] ({commit}, data) {
      const DELETE_USER_HTTP = new manager.DELETEUSER({
        username: data.username
      })
      await DELETE_USER_HTTP.delete()
    }
  }
}