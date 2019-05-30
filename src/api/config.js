import RESTAPI from './restful';
const HOST = 'http://localhost:8888/api';
class HttpWithAuth extends RESTAPI {}

HttpWithAuth.$baseurl(HOST);
HttpWithAuth.$transformResponse(response => {
  if (typeof response !== 'string' || response === '') {
    throw new Error('服务端格式错误，已拦截');
  }
  let res = JSON.parse(response);
  console.log(res)
  if (!res.success && res.success !== undefined) {
    throw new Error(res.message);
  }
  if (res.success === undefined) {
    return res;
  }
  response = {
    message: res.message || '获取成功',
    data: res.data || {},
    query: res.query || {},
    prompt: res.prompt || {}
  };
  console.log('返回数据')
  // console.log(data)
  return response;
});
export { HttpWithAuth };
