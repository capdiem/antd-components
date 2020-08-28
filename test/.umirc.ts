import { resolve } from 'path';
import { defineConfig } from 'umi';

const config = defineConfig({
  antd: {
    // compact: false
  },

  alias: {
    components: resolve(__dirname.replace('\\test', ''), './src'),
  },

  chainWebpack(memo) {
    memo.module.rule('ts-in-node_modules').include.clear();
    return memo;
  },
});

export default config;
