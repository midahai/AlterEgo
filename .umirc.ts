import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  devServer: {
    port: 2881,
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/admin', component: '@/pages/admin' },
  ],
});
