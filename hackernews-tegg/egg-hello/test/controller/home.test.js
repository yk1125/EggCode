// test/controller/home.test.js
const { app, assert } = require('egg-mock/bootstrap');

describe('test/controller/home.test.js', () => {
  // 测试 GET / 接口
  describe('GET /', () => {
    it('should status 200 and get the body', async () => {
      // 使用 app.httpRequest() 发送请求
      const result = await app.httpRequest()
        .get('/')
        .expect(200);

      // 验证返回内容
      assert(result.text === 'hi, egg');
    });
  });

});
