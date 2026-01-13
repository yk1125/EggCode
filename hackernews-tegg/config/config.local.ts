import { defineConfigFactory } from 'egg';

export default defineConfigFactory(() => {
  return {
    security: {
      csrf: {
        enable: false,  // 开发环境禁用 CSRF
      },
    },
  };
});
