#!/usr/bin/env -S tsx --no-cache

/**
 * Project: web-hansheng-IoT-project
 * FileDirPath: src/tools/ts/universal_tools/unit_test/SingletonFactoryByGlobal/Main.test.mts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2024-11-16 18:21:35 星期六
 */

/**
 * SingletonFactoryByGlobal的单元测试。
 */

'use strict';

import {
  Equal001,
  Test001,
} from '../AuxiliaryTool.test.esm.mts';

import {
  type T_SingletonByGlobal,

  SingletonFactoryByGlobal,
} from '../../UniversalTools.esm.mts';

const obj001: {
  a: number;
} = {
  a: 0,
};

const fun001: () => T_SingletonByGlobal<{
  a: number;
}> = SingletonFactoryByGlobal<{
  a: number;
}>( (): {
  a: number;
} => obj001 );

const {
  singletonByGlobal: singletonByGlobal001,
  // @ts-expect-error
  clear: clear001,
}: T_SingletonByGlobal<{
  a: number;
}> = fun001();
++singletonByGlobal001.a;

const {
  SingletonFactoryByGlobal: SingletonFactoryByGlobal002,
}: {
  [ key: string ]: any;
} = await import( '../../UniversalTools.esm.mts' );

const fun002: () => T_SingletonByGlobal<{
  a: number;
}> = SingletonFactoryByGlobal002( (): {
  a: number;
} => obj001 );

const {
  singletonByGlobal: singletonByGlobal002,
  // @ts-expect-error
  clear: clear002,
}: T_SingletonByGlobal<{
  a: number;
}> = fun002();
++singletonByGlobal002.a;
++singletonByGlobal002.a;
++singletonByGlobal002.a;

Test001( 'SingletonFactoryByGlobal', (): void => {
  Equal001( singletonByGlobal001.a ).toBe( singletonByGlobal002.a );
} );
