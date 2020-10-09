var getRawBody = require('raw-body');
const axios = require('axios');

exports.handler = (req, resp, context) => {

  var params = {
    path: req.path,
    queries: req.queries,
    headers: req.headers,
    method : req.method,
    requestURI : req.url,
    clientIP : req.clientIP,
  }

  getRawBody(req, function(err, body) {
    for (var key in req.queries) {
      var value = req.queries[key];
      resp.setHeader(key, value);
    }

    const bodyString = body.toString() || '{}';
    let bodyObj = {};
    try {
      bodyObj = JSON.parse(bodyString);
    } catch (e) {
      console.log('parse error', e);
    }

    const {
      user: {
        name = '有人'
      } = {},
      project: {
        name: projectName = '项目',
        namespace = '',
        web_url = 'gitlab.beisen.com',
      } = {},
      object_attributes: {
        action = '',
        title = '无标题',
        url = '',
        work_in_progress = false,
      } = {},
    } = bodyObj;

    params.body = bodyString;

    // 从环境变量中匹配仓库到机器人key的映射
    const envKey = `${namespace}_${projectName}`;
    // 由于gitlab支持中横线，而环境变量不支持，所以把中横线转为下划线
    const robotKey = process.env[envKey.replace(/-/g, '_')];
    // 匹配不到直接返回
    if (!robotKey) {
      return resp.send(JSON.stringify(params, null, '    '));
    }

    // WIP 直接 return
    if (work_in_progress) {
      return resp.send(JSON.stringify(params, null, '    '));
    }

    let content = '';
    switch (action) {
      case 'open':
        content = `${name} 提交了一个新的 Merge Request：[${title}]，快去review吧：${url}`;
        break;
      case 'update':
        content = `${name} 提交的 Merge Request：[${title}] 有更新：${url}`;
        break;
      case 'merge':
        content = `[${title}] 已被 ${name} 合并`;
        break;
      default:
        return resp.send(JSON.stringify(params, null, '    '));
    }
    console.log('content', content);

    axios(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${robotKey}`, {
      method: 'post',
      data: {
        "touser" : "@all",
        // "toparty" : "PartyID1|PartyID2",
        // "totag" : "TagID1 | TagID2",
        "msgtype" : "text",
        "agentid" : 1,
        "text" : {
          "content" : content,
        }
      }
    }).then(res => {
      console.log('robo res', res);
      params.robo = res;
      resp.send(JSON.stringify(params, null, '    '));
    }).catch(err => {
      console.log('robo err', err);
      params.robo = err;
      resp.send(JSON.stringify(params, null, '    '));
    })
  });
}
