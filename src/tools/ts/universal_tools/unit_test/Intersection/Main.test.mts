#!/usr/bin/env -S tsx --no-cache

/**
 * Project: web-hansheng-IoT-project
 * FileDirPath: src/tools/ts/universal_tools/unit_test/Intersection/Main.test.mts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2024-11-16 18:21:35 星期六
 */

/**
 * Intersection的单元测试。
 */

'use strict';

import {
  Equal001,
  Test001,
} from '../AuxiliaryTool.test.esm.mts';

import {
  Intersection,
} from '../../UniversalTools.esm.mts';

Test001( 'Intersection', (): void => {
  Equal001( JSON.stringify( Intersection(
    [
      1,
      2,
      3,
      3,
      4,
    ],
    [
      2,
      3,
      4,
      5,
      6,
    ]
  ) ) ).toBe( JSON.stringify( [
    2,
    3,
    4,
  ] ) );
} );
