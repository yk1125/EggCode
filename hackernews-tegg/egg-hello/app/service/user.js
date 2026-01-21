// app/service/user.js
// Service 层：处理业务逻辑，比如数据库操作、调用其他服务等

const { Service } = require('egg');

class UserService extends Service {
  /**
   * 根据用户名获取用户信息
   * @param {string} name - 用户名
   * @return {object|null} 用户信息，不存在则返回 null
   */
  async get(name) {
    // 这里模拟从数据库获取用户
    // 实际项目中会调用 this.app.mysql.get() 之类的方法
    const users = {
      fengmk2: { id: 1, name: 'fengmk2', age: 30 },
      admin: { id: 2, name: 'admin', age: 25 },
    };

    return users[name] || null;
  }

  /**
   * 创建用户
   * @param {object} user - 用户信息 { name, age }
   * @return {object} 创建的用户（带 id）
   */
  async create(user) {
    // 模拟创建用户，生成一个随机 id
    const newUser = {
      id: Math.floor(Math.random() * 1000),
      ...user,
    };

    this.ctx.logger.info('创建用户:', newUser);
    return newUser;
  }

  /**
   * 获取所有用户列表
   * @return {array} 用户列表
   */
  async list() {
    // 模拟获取用户列表
    return [
      { id: 1, name: 'fengmk2', age: 30 },
      { id: 2, name: 'admin', age: 25 },
    ];
  }
}

module.exports = UserService;
