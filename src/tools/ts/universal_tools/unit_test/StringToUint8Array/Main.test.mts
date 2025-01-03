#!/usr/bin/env -S tsx --no-cache

/**
 * Project: web-hansheng-IoT-project
 * FileDirPath: src/tools/ts/universal_tools/unit_test/StringToUint8Array/Main.test.mts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2024-11-16 18:21:35 星期六
 */

/**
 * StringToUint8Array的单元测试。
 */

'use strict';

import {
  Equal001,
  Test001,
} from '../AuxiliaryTool.test.esm.mts';

import {
  StringToUint8Array,
  Uint8ArrayToString,
} from '../../UniversalTools.esm.mts';

Test001( 'StringToUint8Array', (): void => {
  Equal001( Uint8ArrayToString( StringToUint8Array( 'StringToUint8Array' ) ) ).toBe( 'StringToUint8Array' );
} );
