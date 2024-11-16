#!/usr/bin/env -S tsx --no-cache

/**
 * Project: web-hansheng-IoT-project
 * FileDirPath: simulation_servers/node/src/tools/universal_tool_for_node/unit_test/Get__dirname/Main.test.mts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2024-11-16 18:21:35 星期六
 */

/**
 * Get__dirname的单元测试。
 */

'use strict';

import {
  Equal001,
  Test001,
} from '../AuxiliaryTool.test.esm.mts';

import {
  Get__dirname,
} from '../../UniversalToolForNode.esm.mjs';

Test001( 'Get__dirname', () => {
  Equal001( Get__dirname( import.meta.url ) ).toBe( 'G:\\WebStormWS\\web-hansheng-IoT-project\\simulation_servers\\node\\src\\tools\\universal_tool_for_node\\unit_test\\Get__dirname' );
} );
