// 文章控制器:处理文章相关的 HTTP 请求
import { Controller } from 'egg';

// 定义创建文章的验证规则
const createRule = {
  title: { type: 'string', min: 1, max: 200 },
  content: { type: 'string', min: 1 },
  author_id: { type: 'number' },
};

// 定义更新文章的验证规则
const updateRule = {
  title: { type: 'string', min: 1, max: 200 },
  content: { type: 'string', min: 1 },
  author_id: { type: 'number' },
};

// 定义删除文章的验证规则
const deleteRule = {
  author_id: { type: 'number' },
};

export default class ArticleController extends Controller {
  // POST /api/articles - 创建文章
  public async create() {
    const { ctx } = this;

    // 使用 egg-validate 验证请求参数
    ctx.validate(createRule, ctx.request.body);

    const { title, content, author_id } = ctx.request.body;
    const article = await ctx.service.article.create(title, content, author_id);

    ctx.body = article;
    ctx.status = 201;
  }

  // GET /api/articles - 获取文章列表
  public async index() {
    const { ctx } = this;
    const { page = 1, pageSize = 10 } = ctx.query;

    const result = await ctx.service.article.list(
      parseInt(page as string),
      parseInt(pageSize as string),
    );

    ctx.body = result;
  }

  // GET /api/articles/:id - 获取文章详情
  public async show() {
    const { ctx } = this;
    const id = parseInt(ctx.params.id);

    const article = await ctx.service.article.findById(id);

    ctx.body = article;
  }

  // PUT /api/articles/:id - 更新文章
  public async update() {
    const { ctx } = this;
    const id = parseInt(ctx.params.id);

    // 使用 egg-validate 验证请求参数
    ctx.validate(updateRule, ctx.request.body);

    const { title, content, author_id } = ctx.request.body;
    const article = await ctx.service.article.update(id, title, content, author_id);

    ctx.body = article;
  }

  // DELETE /api/articles/:id - 删除文章
  public async destroy() {
    const { ctx } = this;
    const id = parseInt(ctx.params.id);

    // 使用 egg-validate 验证请求参数
    ctx.validate(deleteRule, ctx.request.body);

    const { author_id } = ctx.request.body;
    await ctx.service.article.delete(id, author_id);

    ctx.status = 204;
  }
}
