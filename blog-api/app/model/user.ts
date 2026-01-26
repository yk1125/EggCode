// 用户数据模型：定义数据库中 users 表的结构
export default (app: any) => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  // 定义 User 模型（对应数据库的 users 表）
  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,        // 主键
      autoIncrement: true,     // 自动递增
    },
    username: {
      type: STRING(50),
      allowNull: false,        // 不允许为空
      unique: true,            // 唯一约束（用户名不能重复）
    },
    password: {
      type: STRING(200),
      allowNull: false,
    },
    email: {
      type: STRING(100),
      allowNull: true,
    },
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};
