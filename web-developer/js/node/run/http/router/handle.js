const path = require('path');
const { getFile } = require('../utils/getResource');

const Home = getFile({
  path: path.join(__dirname, '../page/home/index.html'),
  contentType: 'text/html',
});

const User = getFile({
  path: path.join(__dirname, '../page/user/index.html'),
  contentType: 'text/html',
});

// --------------- api ---------------
const getUserList = (request, response, { pathname, params, data }) => {
  console.log('🚀 ~ file: handle.js ~ line 16 ~ getUserList ~ pathname, params', pathname, params);
  response.writeHead(200, {
    'Content-Type': 'application/json',
  });

  const json = [
    {
      name: 'joy',
      age: 20,
    },
    {
      name: 'jane',
      age: 21,
    },
  ];

  response.write(JSON.stringify({ params, pathname, data }));
  response.end();
};
const getUserInfo = (request, response, { pathname, params }) => {
  response.writeHead(200, {
    'Content-Type': 'application/json',
  });

  response.write(JSON.stringify({ pathname, params }));
  response.end();
};

module.exports = {
  // 页面
  '/manage/home': Home,
  '/manage/': Home,
  '/manage': Home,
  '/manage/user': User,

  // 接口
  '/api/v1/user': getUserList,
  '/api/v1/record': getUserList,
  '/api/v1/user/id': getUserInfo,
};
