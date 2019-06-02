import { HttpWithAuth } from './config'

export class MENULIST extends HttpWithAuth {
  description = '管理员__获取菜单'
  version = '1.0'
  methods = 'GET'
  url = '/manager/menuList'
}

export class EDITDISH extends HttpWithAuth {
  description = '管理员__编辑菜'
  version = '1.0'
  methods = 'PUT'
  url = '/manager/edit/dish/{id}'
}

export class DELETEDISH extends HttpWithAuth {
  description = '管理员__删除菜'
  version = '1.0'
  methods = 'DELETE'
  url = '/manager/delete/dish/{id}'
}

export class ADDDISH extends HttpWithAuth {
  description = '管理员__添加菜'
  version = '1.0'
  methods = 'put'
  url = '/manager/addDishes'
}
