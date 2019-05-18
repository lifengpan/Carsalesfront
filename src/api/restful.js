import axios from "axios";

export const AXIOS_HTTP = axios.create({
  timeout: 15000
});
class RESTAPI {
  constructor(variable) {
    this.variable = variable || {};
  }
  static $baseurl(url) {
    if (!url) {
      throw new Error("请使用正确的url,当前传入的为：" + url || "未知参数");
    }
    AXIOS_HTTP.defaults.baseURL = url;
  }
  static $transformResponse(fun) {
    if (!(typeof fun === "function")) {
      throw new Error("请传入正确的fun, d当前传入的为" + fun || "未知参数");
    }
    AXIOS_HTTP.defaults.transformResponse = fun;
  }
  async ajax(config) {
    this.matchURL(this.variable);
    this.preConfig = Object.assign({}, this.preConfig, config);
    this.preConfig.url = this.url;
    if (config && config.query) {
      this.preConfig.url = this.preConfig.url + "/" + config.query;
    }
    // eslint-disable-next-line
    console.log(this.preConfig)
    // Object.assign(this.preConfig, this.config.transformRequest)
    return await AXIOS_HTTP(this.preConfig);
  }
  matchURL(variable) {
    var q = /{([^}]+)}/g;
    var m;
    var Count = 0;
    var url = this.url;
    while ((m = q.exec(this.url)) && Count < 30) {
      url = url.replace(m[0], variable[m[1]]);
      Count = Count + 1;
    }
    this.url = url;
  }
  async get(query, params) {
    const method = "GET";
    this.method = method;
    query = query || "";
    params = params || {};
    return await this.ajax({
      query,
      params,
      method
    });
  }
  async create(data) {
    const method = "POST";
    this.method = method;
    data = data || {};
    return await this.ajax({
      data,
      method
    });
  }
  async put(query, data) {
    const method = "PUT";
    this.method = method;
    query = query || "";
    data = data || {};
    return await this.ajax({
      query,
      data,
      method
    });
  }
  async delete() {
    const method = "DELETE";
    this.method = method;
    return await this.ajax({
      method
    });
  }
}

export default RESTAPI;
