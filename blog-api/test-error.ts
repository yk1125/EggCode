// 临时测试文件
import { Application } from 'egg';
const app = {} as Application;
app.model.sync(); // TypeScript 会报错
