// 文章服务：处理文章相关的业务逻辑
import { Service } from 'egg';

export default class ArticleService extends Service {
  // 创建文章（Create）
  public async create(title: string, content: string, authorId: number) {
    const { ctx } = this;

    const article = await ctx.model.Article.create({
      title,
      content,
      author_id: authorId,
    });

    return article;
  }

  // 获取文章列表（Read - 列表）
  public async list(page = 1, pageSize = 10) {
    const { ctx } = this;

    const offset = (page - 1) * pageSize;

    // 分页查询，并包含作者信息
    const { count, rows } = await ctx.model.Article.findAndCountAll({
      limit: pageSize,
      offset,
      order: [['created_at', 'DESC']],  // 按创建时间倒序
      include: [{
        model: ctx.model.User,
        as: 'author',
        attributes: ['id', 'username'],  // 只返回用户的 id 和 username
      }],
    });

    return {
      total: count,
      page,
      pageSize,
      articles: rows,
    };
  }

  // 获取单篇文章（Read - 详情）
  public async findById(id: number) {
    const { ctx } = this;

    const article = await ctx.model.Article.findByPk(id, {
      include: [{
        model: ctx.model.User,
        as: 'author',
        attributes: ['id', 'username'],
      }],
    });

    if (!article) {
      ctx.throw(404, '文章不存在');
    }

    // 增加阅读数
    await article.increment('view_count');

    return article;
  }

  // 更新文章（Update）
  public async update(id: number, title: string, content: string, authorId: number) {
    const { ctx } = this;

    const article = await ctx.model.Article.findByPk(id);

    if (!article) {
      ctx.throw(404, '文章不存在');
    }

    // 检查权限：只有作者本人可以修改
    if (article.author_id !== authorId) {
      ctx.throw(403, '无权修改此文章');
    }

    // 更新文章
    await article.update({ title, content });

    return article;
  }

  // 删除文章（Delete）
  public async delete(id: number, authorId: number) {
    const { ctx } = this;

    const article = await ctx.model.Article.findByPk(id);

    if (!article) {
      ctx.throw(404, '文章不存在');
    }

    // 检查权限
    if (article.author_id !== authorId) {
      ctx.throw(403, '无权删除此文章');
    }

    // 删除文章
    await article.destroy();

    return { message: '删除成功' };
  }
}
