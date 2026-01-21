// Mock 方法示例

const { app, mock, assert } = require('egg-mock/bootstrap');

describe('test/mock-example.test.js', () => {

  // 每个测试用例结束后，自动清理 mock
  // egg-mock/bootstrap 已经自动帮我们做了这件事
  // 所以不需要手动写 afterEach(mock.restore)

  // ============ Mock Service ============
  describe('Mock Service', () => {
    it('应该能 mock Service 的返回值', async () => {
      // 场景：想测试"当 user service 返回特定数据时，controller 的行为"
      // 但不想真的调用 service（可能涉及数据库操作）

      // mockService 的参数：
      // 1. service 名称（不包含 'service.' 前缀）
      // 2. 方法名
      // 3. 返回值（可以是固定值或函数）
      app.mockService('user', 'get', () => {
        return {
          id: 999,
          name: 'mock-user',
          age: 18,
        };
      });

      // 现在调用 ctx.service.user.get() 会返回上面的数据
      const ctx = app.mockContext();
      const user = await ctx.service.user.get('any-name');

      assert(user.id === 999);
      assert(user.name === 'mock-user');
    });

    it('应该能 mock Service 抛出错误', async () => {
      // 场景：测试当 service 出错时，controller 的错误处理

      // mockServiceError 的参数：
      // 1. service 名称
      // 2. 方法名
      // 3. 错误信息或 Error 对象
      app.mockServiceError('user', 'get', 'database connection failed');

      const ctx = app.mockContext();

      // 调用 service 应该抛出错误
      try {
        await ctx.service.user.get('test');
        assert.fail('should throw error');
      } catch (err) {
        assert(err.message === 'database connection failed');
      }
    });
  });

  // ============ Mock Context ============
  describe('Mock Context', () => {
    it('应该能 mock ctx 的属性', () => {
      // 场景：模拟已登录用户

      const ctx = app.mockContext({
        // 模拟请求头
        headers: {
          'User-Agent': 'MockedBrowser/1.0',
        },
        // 模拟当前用户
        user: {
          id: 123,
          name: 'test-user',
        },
      });

      assert(ctx.user.id === 123);
      assert(ctx.get('User-Agent') === 'MockedBrowser/1.0');
    });

    it('应该能 mock session', () => {
      // 场景：测试需要登录的功能

      // mockSession 用于模拟用户的 session 数据
      app.mockSession({
        userId: 456,
        username: 'admin',
      });

      return app.httpRequest()
        .get('/')
        .expect(200);

      // 注意：这个例子只是演示语法
      // 实际项目中，你的 controller 会读取 ctx.session.userId
    });
  });

  // ============ Mock HttpClient（外部 API 调用）============
  describe('Mock HttpClient', () => {
    it('应该能 mock 外部 HTTP 请求', async () => {
      // 场景：你的应用需要调用第三方 API
      // 但测试时不想真的去请求外部服务

      // mockHttpclient 的参数：
      // 1. URL（支持正则）
      // 2. 返回的数据
      app.mockHttpclient('https://api.github.com/users/fengmk2', {
        data: {
          login: 'fengmk2',
          id: 156269,
          name: 'fengmk2',
        },
      });

      const ctx = app.mockContext();

      // 当代码调用 ctx.curl('https://api.github.com/users/fengmk2')
      // 会返回上面 mock 的数据，而不是真的发起网络请求
      const result = await ctx.curl('https://api.github.com/users/fengmk2', {
        dataType: 'json',
      });

      assert(result.data.login === 'fengmk2');
    });
  });

  // ============ Mock 普通对象的方法 ============
  describe('Mock Object Method', () => {
    it('应该能 mock 任意对象的方法', () => {
      // 场景：想临时修改某个对象的行为

      // 比如 mock app.config 的某个配置
      mock(app.config, 'env', 'prod');

      assert(app.config.env === 'prod');

      // 测试结束后会自动恢复原值
    });
  });

  // ============ Mock CSRF（用于 POST 请求测试）============
  describe('Mock CSRF', () => {
    it('应该能绕过 CSRF 校验', async () => {
      // 场景：测试 POST 请求，但不想处理 CSRF token

      // mockCsrf() 会自动模拟 CSRF token
      app.mockCsrf();

      const result = await app.httpRequest()
        .post('/config')
        .send({ server: 'test' })
        .expect(200);

      assert(result.body.success === true);
    });
  });
});
