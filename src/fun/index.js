const getRawBody = require('raw-body');
const FunctionComputeClient = require('@alicloud/fc2');

module.exports.handler = (request, response, context) => {
  const {
    credentials: {
      accessKeyId,
      accessKeySecret,
    },
    accountId,
    region,
  } = context;
  const client = new FunctionComputeClient(accountId, {
    accessKeyID: accessKeyId,
    accessKeySecret: accessKeySecret,
    region: region
  });
  // get request body
  getRawBody(request)
    .then((buf) => {
      console.log('bufbufbuf', buf);
      const respBody = {
        headers: request.headers,
        url: request.url,
        path: request.path,
        queries: request.queries,
        method: request.method,
        clientIP: request.clientIP,
        body: buf.toString()
      };

      response.setStatusCode(200);
      response.setHeader('content-type', 'application/json');
      response.send(JSON.stringify(respBody, null, 4));
    })
    .catch(err => {
      response.setStatusCode(err.statusCode);
    })
  ;
};
