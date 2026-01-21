const {app , assert } = require('egg-mock/bootstrap');

describe('controller/config.js', () => {
    it('应该返回配置数据', async()=>{
        const result = await app.httpRequest()
        .get('/config')
        .expect(200);

        assert(result.body.success === true);
        assert(typeof result.body.pid === 'number');
        assert(Array.isArray(result.body.data));
    })
    it('应该发布配置并返回成功', async()=>{
        const result = await app.httpRequest()
        .post('/config')
        .send({
            server: 'test-server-001',
        })
        .expect(200);

        assert(result.body.success === true);
        assert(typeof result.body.pid === 'number');
        assert(result.body.message.includes('已发布配置'));
    })
})