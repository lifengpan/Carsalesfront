import { HttpWithAuth } from './config'

export class USERGETDISH extends HttpWithAuth {
  description = '用户__获取菜单'
  version = '1.0'
  methods = 'GET'
  url = '/user/menuList'
}
