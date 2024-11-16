#!/usr/bin/env -S tsx --no-cache

/**
 * Project: web-hansheng-IoT-project
 * FileDirPath: simulation_servers/node/src/tools/universal_tool_for_node/unit_test/IsSubsetOf/Main.test.mts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2024-11-16 18:21:35 星期六
 */

/**
 * IsSubsetOf的单元测试。
 */

'use strict';

import {
  Equal001,
  Test001,
} from '../AuxiliaryTool.test.esm.mts';

import {
  IsSubsetOf,
} from '../../UniversalToolForNode.esm.mjs';

Test001( 'IsSubsetOf', (): void => {
  Equal001( IsSubsetOf(
    [
      1,
      2,
      3,
      4,
      3,
      4,
      5,
      6,
      7,
    ],
    [
      2,
      3,
      4,
      5,
      6,
      4,
      5,
      6,
    ]
  ) ).toBe( true );
} );
