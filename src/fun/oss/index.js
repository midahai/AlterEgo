const OSS = require('ali-oss');
const getRawBody = require('raw-body');

module.exports.ossHandler = (event, context, callback) => {
  const client = new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: 'LTAI4FyNF4Zgkkxy91DXnwC9',
    accessKeySecret: 'oMvkHMcff7gFjNtTu1S6fAUB2IsVPU',
    bucket: 'basic-179012'
  });
  return 'oss handler returned!';
};
