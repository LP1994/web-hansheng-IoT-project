#!/usr/bin/env -S tsx --no-cache

/**
 * Project: web-hansheng-IoT-project
 * FileDirPath: simulation_servers/node/src/tools/universal_tool_for_node/unit_test/DateFormatForObject/Main.test.mts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2024-11-16 18:21:35 星期六
 */

/**
 * DateFormatForObject的单元测试。
 */

'use strict';

import {
  Equal001,
  Test001,
} from '../AuxiliaryTool.test.esm.mts';

import {
  DateFormatForObject,
} from '../../UniversalToolForNode.esm.mjs';

Test001( 'DateFormatForObject', (): void => {
  Equal001( JSON.stringify( DateFormatForObject( new Date( 1670010887679 ) ) ) ).toBe( JSON.stringify( {
    year: '2022',
    month: '12',
    date: '03',
    hours: '03',
    minutes: '54',
    seconds: '47',
    day: '6'
  } ) );
} );
