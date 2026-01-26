// 插件配置：告诉 Egg.js 我们要使用哪些插件
import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // 启用 sequelize 插件（用于操作数据库）
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // 启用 validate 插件（用于参数验证）
  validate: {
    enable: true,
    package: 'egg-validate',
  },
};

export default plugin;
