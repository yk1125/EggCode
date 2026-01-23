// app/extend/helper.js
// Helper：辅助函数，用于格式化、转换等操作

module.exports = {
  /**
   * 格式化时间
   * @param {Date|string|number} time - 时间
   * @return {string} 格式化后的时间字符串
   */
  formatTime(time) {
    return new Date(time).toLocaleString();
  },

  /**
   * 格式化货币
   * 根据用户的语言偏好，显示不同的货币符号
   * @param {number} val - 金额
   * @return {string} 格式化后的货币字符串
   */
  money(val) {
    // 从请求头中获取用户的语言偏好
    const lang = this.ctx.get('Accept-Language') || '';

    // 如果是中文环境，显示人民币
    if (lang.includes('zh-CN')) {
      return `￥ ${val}`;
    }

    // 默认显示美元
    return `$ ${val}`;
  },

  /**
   * 格式化文件大小
   * @param {number} bytes - 字节数
   * @return {string} 格式化后的文件大小
   */
  formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + ' MB';
    return (bytes / 1024 / 1024 / 1024).toFixed(2) + ' GB';
  },

  /**
   * 将字符串首字母转为小写
   * @param {string} str - 字符串
   * @return {string} 首字母小写的字符串
   */
  lowercaseFirst(str) {
    if (!str) return '';
    return str[0].toLowerCase() + str.substring(1);
  },
};
