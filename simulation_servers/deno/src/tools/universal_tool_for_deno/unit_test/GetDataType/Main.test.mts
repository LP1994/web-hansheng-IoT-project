#!/usr/bin/env -S deno run -A --config=../../../../../deno.json --check --v8-flags=--max-old-space-size=1024000 --reload --watch-hmr --env-file=../../../../../.env.deno

/**
 * Project: web-hansheng-IoT-project
 * FileDirPath: simulation_servers/deno/src/tools/universal_tool_for_deno/unit_test/GetDataType/Main.test.mts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2024-11-16 18:21:35 星期六
 */

/**
 * GetDataType的单元测试。
 */

'use strict';

import {
  Equal001,
  Test001,
} from '../AuxiliaryTool.test.esm.mts';

import {
  GetDataType,
} from '../../UniversalToolForDeno.esm.mts';

Test001( 'GetDataType', (): void => {
  Equal001( GetDataType( [] ) ).toBe( '[object Array]' );
} );
Test001( 'GetDataType', (): void => {
  Equal001( GetDataType( Array( 2 ) ) ).toBe( '[object Array]' );
} );
Test001( 'GetDataType', (): void => {
  Equal001( GetDataType( new Array( 3 ) ) ).toBe( '[object Array]' );
} );
