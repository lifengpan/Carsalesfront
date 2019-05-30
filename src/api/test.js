import { HttpWithAuth } from './config';

export class GETDATA extends HttpWithAuth {
  description = '使用get请求数据';
  version = '1.0';
  url = '/manage/{username}/details';
}

export class POSTDATA extends HttpWithAuth {
  description = '使用post发送数据';
  version = '1.0';
  url = '/Login';
}

export class PUTDATA extends HttpWithAuth {
  description = '使用PUT修改数据';
  version = '1.0';
  url = '/manage/addDishes';
}

export class DELETEDATA extends HttpWithAuth {
  description = '使用delete修改数据';
  version = '1.0';
  url = '/Manager/Appraisal/{id}/{year}/{user}/Standard';
}
