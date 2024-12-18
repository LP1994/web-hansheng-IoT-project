/**
 * Project: web-hansheng-IoT-project
 * FileDirPath: webp_tool_by_multi_thread/image_to_webp/WorkerThread.mjs
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2024-11-16 18:21:35 星期六
 */

/**
 * 子线程，专门用于读取图片、转换图片、生成图片。
 */

'use strict';

import {
  execSync,
} from 'node:child_process';

import {
  join,
  parse,
} from 'node:path';

import {
  performance,
} from 'node:perf_hooks';

import {
  isMainThread,
  parentPort,
  threadId,
  workerData,
} from 'node:worker_threads';

import FastEXIF from 'fast-exif';

import {
  MyConsole,
} from '../UniversalToolForNode.esm.mjs';

let startTimer001 = 0,
  resultFilePath = '',
  resultFilePathParseObj = null,
  degree = 0;

parentPort.on( 'close', () => {
  MyConsole.Cyan( `
close event(isMainThread:${ isMainThread }、threadId:${ threadId }、workerInsID:${ workerData.workerInsID })--->Start
该端口已关闭。
close event(isMainThread:${ isMainThread }、threadId:${ threadId }、workerInsID:${ workerData.workerInsID })--->End
` );
} );

parentPort.on( 'messageerror', errorObject => {
  MyConsole.Red( `
反序列化消息失败，messageerror event(isMainThread:${ isMainThread }、threadId:${ threadId }、workerInsID:${ workerData.workerInsID })--->Start
Object.prototype.toString.call( errorObject )--->${ Object.prototype.toString.call( errorObject ) }
${ errorObject }
反序列化消息失败，messageerror event(isMainThread:${ isMainThread }、threadId:${ threadId }、workerInsID:${ workerData.workerInsID })--->End
` );
} );

parentPort.on( 'message', async ( {
  photoPath,
} ) => {
  startTimer001 = performance.now();

  resultFilePath = photoPath.replace( join( workerData.initPath, '/' ), join( workerData.savePath, '/' ) );

  if( !workerData.isNest ){
    resultFilePathParseObj = parse( resultFilePath );

    resultFilePath = join( workerData.savePath, `/${ resultFilePathParseObj.name }_${ Number.parseInt( String( Date.now() ) ) }${ resultFilePathParseObj.ext }` );
  }

  resultFilePath += '.webp';

  const {
    image: {
      Orientation,
    },
  } = await FastEXIF.read( photoPath );

  switch( String( Orientation ) ){
    case '1':
      degree = 0;

      break;
    case '3':
      degree = 180;

      break;
    case '6':
      degree = 90;

      break;
    case '8':
      degree = -90;

      break;
    default:
      degree = 0;

      MyConsole.Red( `
isMainThread:${ isMainThread }、threadId:${ threadId }、workerInsID:${ workerData.workerInsID }--->Start
Orientation属性值“${ Orientation }”不在处理的范畴！
isMainThread:${ isMainThread }、threadId:${ threadId }、workerInsID:${ workerData.workerInsID }--->End
` );

      break;
  }

  execSync( `cwebp -mt -metadata icc -o ${ resultFilePath } -- ${ photoPath }`, {
    cwd: new URL( '../lib_webp/bin', import.meta.url ),
  } );
  execSync( `convert -rotate ${ degree } ${ resultFilePath } ${ resultFilePath }`, {
    cwd: new URL( '../lib_image_magick', import.meta.url ),
  } );

  parentPort.postMessage( {
    photoPath,
    takeUpTime: ( performance.now() - startTimer001 ) / 1000,
  } );
} );
