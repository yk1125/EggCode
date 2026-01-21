// test/extend/helper.test.js
// Helper 测试：测试辅助函数

const { app, assert } = require('egg-mock/bootstrap');

describe('test/extend/helper.test.js', () => {

  //  测试 money() 方法 
  describe('money()', () => {
    it('当用户语言是中文时，应该返回人民币格式', () => {
      // 创建一个 ctx，并模拟中文语言环境
      const ctx = app.mockContext({
        headers: {
          'Accept-Language': 'zh-CN,zh;q=0.9',
        },
      });

      // 调用 helper.money()
      // helper 可以通过 ctx.helper 访问
      const result = ctx.helper.money(100);

      // 验证返回格式
      assert(result === '￥ 100');
    });

  });

});
