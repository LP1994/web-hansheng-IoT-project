#!/usr/bin/env -S tsx --no-cache

/**
 * Project: web-hansheng-IoT-project
 * FileDirPath: simulation_servers/node/src/tools/universal_tool_for_node/unit_test/IsString/Main.test.mts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2024-11-16 18:21:35 星期六
 */

/**
 * IsString的单元测试。
 */

'use strict';

import {
  Equal001,
  Test001,
} from '../AuxiliaryTool.test.esm.mts';

import {
  IsString,
} from '../../UniversalToolForNode.esm.mjs';

Test001( 'IsString', (): void => {
  Equal001( IsString( '' ) ).toBe( true );
} );
Test001( 'IsString', (): void => {
  Equal001( IsString( 1 ) ).toBe( false );
} );
Test001( 'IsString', (): void => {
  Equal001( IsString( String( '1' ) ) ).toBe( true );
} );
Test001( 'IsString', (): void => {
  Equal001( IsString( new String( '1' ) ) ).toBe( false );
} );
