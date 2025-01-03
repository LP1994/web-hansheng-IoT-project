/**
 * Project: web-hansheng-IoT-project
 * FileDirPath: heic_to_any_by_multi_thread/WorkerThread.mjs
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
  readFile,
  writeFile,
} from 'node:fs/promises';

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

import HeicConvert from 'heic-convert';

import {
  MyConsole,
} from './UniversalToolForNode.esm.mjs';

let startTimer001 = 0,
  photoFileStream = null,
  resultBuffer = null,
  resultFilePath = '',
  resultFilePathParseObj = null;

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
typeof errorObject--->${ typeof errorObject }
${ errorObject }
反序列化消息失败，messageerror event(isMainThread:${ isMainThread }、threadId:${ threadId }、workerInsID:${ workerData.workerInsID })--->End
` );
} );

parentPort.on( 'message', async ( {
  photoPath,
} ) => {
  startTimer001 = performance.now();

  // photoFileStream--->Uint8Array   photoFileStream.buffer--->ArrayBuffer
  photoFileStream = await readFile( photoPath );

  // resultBuffer--->Uint8Array
  resultBuffer = await HeicConvert( {
    buffer: photoFileStream,
    format: String( workerData.photoType ),
    quality: Number( workerData.quality ),
  } );

  resultFilePath = photoPath.replace( join( workerData.initPath, '/' ), join( workerData.savePath, '/' ) ) + String( workerData.suffix );

  if( !workerData.isNest ){
    resultFilePathParseObj = parse( resultFilePath );

    resultFilePath = join( workerData.savePath, `/${ resultFilePathParseObj.name }_${ Number.parseInt( String( Date.now() ) ) }${ resultFilePathParseObj.ext }` );
  }

  await writeFile( resultFilePath, resultBuffer );

  parentPort.postMessage( {
    photoPath,
    takeUpTime: ( performance.now() - startTimer001 ) / 1000,
  } );
} );
