/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }

  i18n: {
    enable: true,
    package: '@eggjs/i18n',
  },

  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
};
