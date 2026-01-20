// test/controller/config.test.js
const { app, assert } = require('egg-mock/bootstrap');

describe('test/controller/config.test.js', () => {
  // 测试 GET /config 接口
  describe('GET /config', () => {
    it('should status 200 and get config data', async () => {
      // 发送 GET 请求
      const result = await app.httpRequest()
        .get('/config')
        .expect(200);

      // 验证返回的数据结构
      assert(result.body.success === true);
      assert(typeof result.body.pid === 'number');
      assert(Array.isArray(result.body.data));
    });
  });

  // 测试 POST /config 接口
  describe('POST /config', () => {
    it('should status 200 and publish config', async () => {
      // 发送 POST 请求（注意参数名是 server）
      const result = await app.httpRequest()
        .post('/config') 
        .send({
          server: 'test-server-001',
        })
        .expect(200);

      // 验证返回结果
      assert(result.body.success === true);
      assert(typeof result.body.pid === 'number');
      assert(result.body.message.includes('已发布配置'));
    });

    it('should publish and get new config', async () => {
      // 先发布一个配置
      await app.httpRequest()
        .post('/config')
        .send({
          server: 'test-server-999',
        })
        .expect(200);

      // 等待一小段时间确保配置已经更新
      await new Promise(resolve => setTimeout(resolve, 100));

      // 再获取配置，应该包含刚才发布的数据
      const result = await app.httpRequest()
        .get('/config')
        .expect(200);

      assert(result.body.success === true);
      assert(Array.isArray(result.body.data));
      // 验证刚才发布的数据在列表中
      assert(result.body.data.includes('test-server-999'));
    });

    it('should return error when server is missing', async () => {
      // 不传 server 参数
      const result = await app.httpRequest()
        .post('/config')
        .send({})
        .expect(200);

      // 应该返回错误
      assert(result.body.success === false);
      assert(result.body.message === '请提供 server 参数');
    });
  });
});
