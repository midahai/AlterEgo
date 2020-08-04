import React, {useState} from 'react';
import styles from './index.less';
import axios from 'axios';

const LOCAL = 'http://localhost:8000';
const REMOTE = 'https://1726221267515682.cn-hangzhou.fc.aliyuncs.com';

export default () => {
  const [value, setValue] = useState('');

  const handleClick = () => {
    axios.post(`${LOCAL}/2016-08-15/proxy/oss-manager/put`, {
      data: value,
    });
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleGet = () => {
    axios.get(`${LOCAL}/2016-08-15/proxy/oss-manager/get`, {
      params: { test: 1 },
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('img1', file);
    console.log(data);
    axios(`${LOCAL}/2016-08-15/proxy/oss-manager/put`, {
      method: 'post',
      data
    }).then(res => {
      console.log('file upload res', res);
    }).catch(err => {
      console.log('load err', err);
    });
  };

  const handleRobotClick = () => {
    axios(`${REMOTE}/2016-08-15/proxy/beisen-githook/post`, {
      method: 'post',
      data: {"object_kind":"push","event_name":"push","before":"9450cb8102841200e817e01bfaab43cbf146ea0f","after":"c81d946441a893644086f1c7d0f0eba424c9431c","ref":"refs/heads/master","checkout_sha":"c81d946441a893644086f1c7d0f0eba424c9431c","message":null,"user_id":716,"user_name":"michuo","user_email":"michuo@beisen.com","user_avatar":"http://gitlab.beisencorp.com/uploads/user/avatar/716/avatar.png","project_id":6421,"project":{"name":"ux-p-attendance-schedule","description":"排班管理（承载页）","web_url":"http://gitlab.beisencorp.com/ux-pps-project/ux-p-attendance-schedule","avatar_url":null,"git_ssh_url":"git@gitlab.beisencorp.com:ux-pps-project/ux-p-attendance-schedule.git","git_http_url":"http://gitlab.beisencorp.com/ux-pps-project/ux-p-attendance-schedule.git","namespace":"ux-pps-project","visibility_level":20,"path_with_namespace":"ux-pps-project/ux-p-attendance-schedule","default_branch":"master","homepage":"http://gitlab.beisencorp.com/ux-pps-project/ux-p-attendance-schedule","url":"git@gitlab.beisencorp.com:ux-pps-project/ux-p-attendance-schedule.git","ssh_url":"git@gitlab.beisencorp.com:ux-pps-project/ux-p-attendance-schedule.git","http_url":"http://gitlab.beisencorp.com/ux-pps-project/ux-p-attendance-schedule.git"},"commits":[{"id":"c81d946441a893644086f1c7d0f0eba424c9431c","message":"Merge branch 'dev-hd' into 'master'\r\n\r\n修改返回工作台\r\n\r\nSee merge request !98","timestamp":"2020-07-31T13:40:17+08:00","url":"http://gitlab.beisencorp.com/ux-pps-project/ux-p-attendance-schedule/commit/c81d946441a893644086f1c7d0f0eba424c9431c","author":{"name":"洪丹","email":"hongdan@beisen.com"},"added":[],"modified":["package.json","src/pages/home/page-view.js","src/utils/commonFunc.js","src/utils/getParamsByKey.js"],"removed":[]},{"id":"a64f7d90decff0aebbbbfb4f9b1afbb2444c72b9","message":"shadowcontext修改g\n","timestamp":"2020-07-31T11:16:53+08:00","url":"http://gitlab.beisencorp.com/ux-pps-project/ux-p-attendance-schedule/commit/a64f7d90decff0aebbbbfb4f9b1afbb2444c72b9","author":{"name":"hongdan","email":"hongdan@beisen.com"},"added":[],"modified":["src/pages/home/page-view.js","src/utils/getParamsByKey.js"],"removed":[]},{"id":"9450cb8102841200e817e01bfaab43cbf146ea0f","message":"shandowcontext\n","timestamp":"2020-07-31T10:57:28+08:00","url":"http://gitlab.beisencorp.com/ux-pps-project/ux-p-attendance-schedule/commit/9450cb8102841200e817e01bfaab43cbf146ea0f","author":{"name":"hongdan","email":"hongdan@beisen.com"},"added":[],"modified":["src/pages/home/page-view.js"],"removed":[]}],"total_commits_count":3,"repository":{"name":"ux-p-attendance-schedule","url":"git@gitlab.beisencorp.com:ux-pps-project/ux-p-attendance-schedule.git","description":"排班管理（承载页）","homepage":"http://gitlab.beisencorp.com/ux-pps-project/ux-p-attendance-schedule","git_http_url":"http://gitlab.beisencorp.com/ux-pps-project/ux-p-attendance-schedule.git","git_ssh_url":"git@gitlab.beisencorp.com:ux-pps-project/ux-p-attendance-schedule.git","visibility_level":20}}
    }).then(res => {
      console.log('handleRobotClick err', res);
    }).catch(err => {
      console.log('handleRobotClick err', err);
    });
  }

  return (
    <div>
      <h1 onClick={handleClick} className={styles.title}>Page index</h1>
      <input type="text" value={value} onChange={handleChange}/>
      <input type="file" onChange={handleFile}/>
      <h2 onClick={handleGet}>get back here</h2>
      <h2 onClick={handleRobotClick}>test githook</h2>
    </div>
  );
}
