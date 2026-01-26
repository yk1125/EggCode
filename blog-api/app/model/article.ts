// 文章数据模型
export default (app: any) => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const Article = app.model.define('article', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING(200),
      allowNull: false,
    },
    content: {
      type: TEXT,              // TEXT 类型可以存储长文本
      allowNull: false,
    },
    author_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'users',        // 外键：关联到 users 表
        key: 'id',
      },
    },
    view_count: {
      type: INTEGER,
      defaultValue: 0,         // 默认值为 0
    },
    created_at: DATE,
    updated_at: DATE,
  });

  // 定义关联关系：一个文章属于一个用户
  Article.associate = function() {
    app.model.Article.belongsTo(app.model.User, {
      foreignKey: 'author_id',
      as: 'author',
    });
  };

  return Article;
};
