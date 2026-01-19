// egg-hello/app/extend/helper.js
module.exports = {
  // 扩展工具函数：格式化时间
  formatTime(time) {
    return new Date(time).toLocaleString();
  }
};
