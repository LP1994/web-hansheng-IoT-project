#!/usr/bin/env -S tsx --no-cache

/**
 * Project: web-hansheng-IoT-project
 * FileDirPath: src/tools/ts/universal_tools/unit_test/IsDisjointFrom/Main.test.mts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2024-11-16 18:21:35 星期六
 */

/**
 * IsDisjointFrom的单元测试。
 */

'use strict';

import {
  Equal001,
  Test001,
} from '../AuxiliaryTool.test.esm.mts';

import {
  IsDisjointFrom,
} from '../../UniversalTools.esm.mts';

Test001( 'IsDisjointFrom', (): void => {
  Equal001( IsDisjointFrom(
    [
      1,
      2,
      3,
      4,
      3,
      4,
    ],
    [
      2,
      3,
      4,
      5,
      4,
      5,
      6,
    ]
  ) ).toBe( false );
} );
