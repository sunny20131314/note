const path = require('path');
const url = require('url');
// 处理post请求参数
const querystring = require('querystring');

const { getFile } = require('../utils/getResource');

// todo: 找不到接口 505，找不到页面 404
const router = (handle, request, response) => {
  // todo: params 支持地址中带有 变量
  const pathname = url.parse(request.url).pathname;
  // parse 的第2个参数： true: 解析为对象，false 不解析
  const params = url.parse(request.url, true).query;

  // post 请求
  // let data = '';
  let data = [];
  request
    .on('error', (err) => {
      console.log(err);
    })
    .on('data', (chunk) => {
      data.push(chunk);
      // data += chunk;
    })
    .on('end', (chunk) => {
      if (typeof handle[pathname] === 'function') {
        // note: 请求方法的判断
        if (request.method === 'GET') {
          handle[pathname](request, response, { pathname, params });
        } else {
          // POST UPDATE DELETE PUT
          // 数据量太大的时候，直接销毁该请求
          if (data.length > 1e6) {
            request.connection.destory();
          }
          data = Buffer.concat(data).toString();
          handle[pathname](request, response, {
            pathname,
            params,
            data: querystring.parse(data),
          });
        }
      } else {
        getFile({
          path: path.join(__dirname, '../page/404/index.html'),
          contentType: 'text/html',
        })(request, response);
      }
    });
};
module.exports = router;
