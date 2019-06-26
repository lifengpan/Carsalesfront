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
  url = '/manager/edit/{userId}/Info'
}

export class DELETEUSER extends HttpWithAuth {
  description = '管理员__删除用户'
  version = '1.0'
  methods = 'DELETE'
  url = '/manager/delete/{userId}'
}

export class ALLORDERLIST extends HttpWithAuth {
  description = '管理员__获取所有订单列表'
  version = '1.0'
  methods = 'GET'
  url = '/manager/allorderList'
}

export class ORDERDETAILS extends HttpWithAuth {
  description = '管理员_获取订单详情'
  version = '1.0'
  methods = 'GET'
  url = '/manager/{id}/orderDetails'
}

export class EDITORDER extends HttpWithAuth {
  description = '管理员__编辑订单信息'
  version = '1.0'
  methods = 'PUT'
  url = '/manager/edit/{id}/orderInfo'
}

export class DELETEORDER extends HttpWithAuth {
  description = '管理员__删除订单'
  version = '1.0'
  methods = 'DELETE'
  url = '/manager/delete/{id}/order'
}

export class REFUNDSALES extends HttpWithAuth {
  description = '管理员__退款售后'
  version = '1.0'
  methods = 'PUT'
  url = '/manager/refundSales/{id}'
}

export class ALLCAR extends HttpWithAuth {
  description = '管理员__获取汽车列表'
  version = '1.0'
  methods = 'GET'
  url = '/manager/allCar'
}

export class CARDETAILS extends HttpWithAuth {
  description = '管理员_获取汽车详情'
  version = '1.0'
  methods = 'GET'
  url = '/manager/{id}/carDetails'
}

export class EDITCAR extends HttpWithAuth {
  description = '管理员__编辑汽车信息'
  version = '1.0'
  methods = 'PUT'
  url = '/manager/edit/{id}/carInfo'
}

export class DELETECAR extends HttpWithAuth {
  description = '管理员__删除汽车'
  version = '1.0'
  methods = 'DELETE'
  url = '/manager/delete/{id}/car'
}

export class ADDCAR extends HttpWithAuth {
  description = '管理员__添加汽车'
  version = '1.0'
  methods = 'POST'
  url = '/manager/addCar'
}