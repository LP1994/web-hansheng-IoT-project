#!/usr/bin/env -S deno run -A --config=../../../../../deno.json --check --v8-flags=--max-old-space-size=1024000 --reload --watch-hmr --env-file=../../../../../.env.deno

/**
 * Project: web-hansheng-IoT-project
 * FileDirPath: simulation_servers/deno/src/tools/universal_tool_for_deno/unit_test/Union/Main.test.mts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2024-11-16 18:21:35 星期六
 */

/**
 * Union的单元测试。
 */

'use strict';

import {
  Equal001,
  Test001,
} from '../AuxiliaryTool.test.esm.mts';

import {
  Union,
} from '../../UniversalToolForDeno.esm.mts';

Test001( 'Union', (): void => {
  Equal001( JSON.stringify( Union(
    [
      1,
      2,
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
    1,
    2,
    3,
    4,
    5,
    6,
  ] ) );
} );
