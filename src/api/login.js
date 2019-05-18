import { HttpWithAuth } from "./config";

export class LOGIN_IN extends HttpWithAuth {
  description = "登录";
  version = "1.0";
  method = "POST";
  url = "/Login";
}

export class REGISTER extends HttpWithAuth {
  description = "注册";
  version = "1.0";
  url = "/Register";
}
