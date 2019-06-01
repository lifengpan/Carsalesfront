import { HttpWithAuth } from './config'

export class USERGETDISH extends HttpWithAuth {
  description = '用户__获取菜单'
  version = '1.0'
  methods = 'GET'
  url = '/user/menuList'
}

export class CREATEORDER extends HttpWithAuth {
  description = '用户__创建订单'
  version = '1.0'
  methods = 'POST'
  url = '/user/createOrder'
}

export class ORDERADDDISH extends HttpWithAuth {
  description = '用户__在订单中添加菜'
  version = '1.0'
  methods = 'PUT'
  url = '/user/createOrder/{id}/addDish'
}

export class ORDERLIST extends HttpWithAuth {
  description = '用户__获取订单列表'
  version = '1.0'
  methods = 'GET'
  url = '/user/orderList/{username}'
}