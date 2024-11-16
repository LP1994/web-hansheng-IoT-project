/**
 * Project: web-hansheng-IoT-project
 * FileDirPath: src/custom_declare_types/vue.d.ts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-01-01 00:00:00 星期六
 */

declare module '*.vue' {
  import {
    type DefineComponent,
  } from 'vue';

  const component: DefineComponent<{}, {}, any>;

  export default component;
}
