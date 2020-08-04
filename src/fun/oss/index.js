const OSS = require('ali-oss').Wrapper;
const { secrets } = require('../secrets');

// 初始化OSS连接
module.exports.init = options => {
  // 本地调试需要用文件模拟
  const secretString = process.env.local ? secrets : process.env.OSS_SECRETS;
  const [region, accessKeyId, accessKeySecret] = secretString.split(';');

  return new OSS({
    ...options,
    accessKeyId,
    accessKeySecret,
    region
  });
};

// 获取
module.exports.get = O => O;

// 上传
module.exports.put = (fileName, file, options) => O => O;
