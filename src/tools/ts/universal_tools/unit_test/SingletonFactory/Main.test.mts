#!/usr/bin/env -S tsx --no-cache

/**
 * Project: web-hansheng-IoT-project
 * FileDirPath: src/tools/ts/universal_tools/unit_test/SingletonFactory/Main.test.mts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2022-01-01 00:00:00 星期六
 */

/**
 * SingletonFactory的单元测试。
 */

'use strict';

import {
  Equal001,
  Test001,
} from '../AuxiliaryTool.test.esm.mts';

import {
  type T_Singleton,

  SingletonFactory,
} from '../../UniversalTools.esm.mts';

const obj001: {
  a: number;
} = {
  a: 0,
};

const fun001: () => T_Singleton<{
  a: number;
}> = SingletonFactory<{
  a: number;
}>( (): {
  a: number;
} => obj001 );

const {
  singleton: singleton001,
  // @ts-expect-error
  clear: clear001,
}: T_Singleton<{
  a: number;
}> = fun001();

++singleton001.a;

const {
  singleton: singleton002,
  // @ts-expect-error
  clear: clear002,
}: T_Singleton<{
  a: number;
}> = fun001();

++singleton002.a;
++singleton002.a;
++singleton002.a;

Test001( 'SingletonFactory', (): void => {
  Equal001( singleton002.a ).toBe( singleton001.a );
} );
