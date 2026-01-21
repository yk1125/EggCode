// test/service/user.test.js
// Service 测试：不需要发送 HTTP 请求，直接调用 Service 方法

const { app, assert } = require('egg-mock/bootstrap');

describe('test/service/user.test.js', () => {

  // ============ 测试 get() 方法 ============
  describe('get()', () => {
    it('应该获取已存在的用户', async () => {
      // 1. 创建一个 ctx（上下文对象）
      // 为什么需要 ctx？因为 Service 是通过 ctx.service.user 访问的
      const ctx = app.mockContext();

      // 2. 调用 Service 方法
      const user = await ctx.service.user.get('fengmk2');

      // 3. 验证返回结果
      assert(user);
      assert(user.name === 'fengmk2');
      assert(user.age === 30);
    });

    it('当用户不存在时应返回 null', async () => {
      const ctx = app.mockContext();

      // 获取一个不存在的用户
      const user = await ctx.service.user.get('notexist');

      // 应该返回 null
      assert(user === null);
    });
  });

});
