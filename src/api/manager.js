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

export class USERLIST extends HttpWithAuth {
  description = '管理员__获取用户列表'
  version = '1.0'
  methods = 'GET'
  url = '/manager/get/userList'
}

export class EDITUSER extends HttpWithAuth {
  description = '管理员__编辑用户信息'
  version = '1.0'
  methods = 'PUT'
  url = '/manager/edit/{username}/Info'
}

export class DELETEUSER extends HttpWithAuth {
  description = '管理员__删除用户'
  version = '1.0'
  methods = 'DELETE'
  url = '/manager/delete/{username}'
}
