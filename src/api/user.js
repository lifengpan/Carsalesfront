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
  url = '/user/orderList/{userId}'
}

export class CONFIRMGOODS extends HttpWithAuth {
  description = '用户__确认收货'
  version = '1.0'
  methods = 'PUT'
  url = '/user/orderList/confirmGoods/{orderId}'
}

export class USERREFUND extends HttpWithAuth {
  description = '用户__退款'
  version = '1.0'
  methods = 'PUT'
  url = '/user/orderList/refund/{orderId}'
}

export class EDITUSERINFO extends HttpWithAuth {
  description = '用户__修改个人信息'
  version = '1.0'
  methods = 'PUT'
  url = '/user/editUserInfo/{id}'
}

export class GETPERSONALINFO extends HttpWithAuth {
  description = '用户__获取个人信息'
  version = '1.0'
  methods = 'GET'
  url = '/user/personalInfo/{id}'
}

export class USERCARDETAILS extends HttpWithAuth {
  description = '用户_获取汽车详情'
  version = '1.0'
  methods = 'GET'
  url = '/user/{id}/carDetails'
}
