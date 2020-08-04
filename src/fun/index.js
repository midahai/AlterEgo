const getRawBody = require('raw-body');
const OSS = require('ali-oss').Wrapper;

const { secrets } = require('./secrets');

module.exports.putOSS = async (request, response, context) => {

  // get request body
  let buf;
  try {
    buf = await getRawBody(request);
  } catch (e) {
    console.log('ERROR:GET_ERROR', context, e);
  }
  console.log('buf:::', request);

  const OSSOptions = { bucket: 'basic-179012' };
  const secretString = process.env.local ? secrets : process.env.OSS_SECRETS;
  const [region, accessKeyId, accessKeySecret] = secretString.split(';');
  Object.assign(OSSOptions, { accessKeyId, accessKeySecret, region });

  const O = new OSS(OSSOptions);

  let OSSRes;
  // try {
  //   OSSRes = await O.put('testDir/imgTest/img.gif', buf)
  // } catch (e) {
  //   console.log('OSSError', e);
  // }
  // console.log('OSSRESSS', OSSRes);

  const respBody = {
    headers: request.headers,
    url: request.url,
    path: request.path,
    queries: request.queries,
    method: request.method,
    clientIP: request.clientIP,
  };

  respBody.body = OSSRes;
  response.setStatusCode(200);
  response.setHeader('content-type', 'application/json');
  response.send(JSON.stringify(respBody, null, 4));
};

module.exports.getOSS = async (request, response, context) => {
  console.log('event', request.queries);
  const OSSOptions = { bucket: 'basic-179012' };
  const secretString = process.env.local ? secrets : process.env.OSS_SECRETS;
  const [region, accessKeyId, accessKeySecret] = secretString.split(';');
  Object.assign(OSSOptions, { accessKeyId, accessKeySecret, region });

  const O = new OSS(OSSOptions);

  let res;
  try {
    res = await O.get('testDir/test1.json');
  } catch (e) {
    console.log('get error', e);
  }
  const respBody = {
    data: res.content.toString(),
  };
  response.setStatusCode(200);
  response.setHeader('content-type', 'application/json');
  response.send(JSON.stringify(respBody, null, 4));
};
