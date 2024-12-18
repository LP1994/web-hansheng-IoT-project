/**
 * Project: web-hansheng-IoT-project
 * FileDirPath: file_sri_by_multi_thread/WorkerThread.mjs
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2024-11-16 18:21:35 星期六
 */

/**
 * 子线程，专门用于读取文件、计算文件SRI值。
 */

'use strict';

import {
  createHash,
} from 'node:crypto';

import {
  createReadStream,
} from 'node:fs';

import {
  performance,
} from 'node:perf_hooks';

import {
  isMainThread,
  parentPort,
  threadId,
  workerData,
} from 'node:worker_threads';

import {
  MyConsole,
} from './UniversalToolForNode.esm.mjs';

let startTimer001 = 0,
  obj001 = {
    sha256: {
      hex: '',
      base64: '',
    },
    sha384: {
      hex: '',
      base64: '',
    },
    sha512: {
      hex: '',
      base64: '',
    },
  },
  /**
   * 1、1 * 1024 * 1024 * 1024 = 1GB
   * 2、要是设置了buffer.constants.MAX_LENGTH，不报错、也不执行，直接结束了，奇怪：
   * buffer.constants.MAX_LENGTH = 2GB
   *
   * @type {number}
   */
  bufferSize = 1 * 1024 * 1024 * 1024,
  resultObj = null,
  readStream = null,
  hash2Digest4Keys = [],
  hashArr = [],
  chunk = null,
  chunkBuf = 0,
  readStreamByte = 0;

function FileSRI( filePath ){
  return new Promise( ( resolve = () => {
  }, reject = () => {
  } ) => {
    readStream = createReadStream( filePath, {
      flags: 'r+',
    } );

    // [ 'sha256', 'sha384', 'sha512' ]
    hash2Digest4Keys = Object.keys( obj001 );

    // [ [ createHash( 'sha256' ), createHash( 'sha256' ) ], [ createHash( 'sha384' ), createHash( 'sha384' ) ], [ createHash( 'sha512' ), createHash( 'sha512' ) ] ]
    hashArr = hash2Digest4Keys.map( c => {
      // Object.keys( obj001[ c ] ) ---> [ 'hex', 'base64' ]
      // return [ createHash( 'sha256' ), createHash( 'sha256' ) ]
      return Object.keys( obj001[ c ] ).map( () => createHash( c ) );
    } );

    readStream.on( 'open', fd => {
      MyConsole.Cyan( `
${ filePath }
文件已打开：${ fd }。
` );
    } );

    readStream.on( 'ready', () => {
      MyConsole.Cyan( `
${ filePath }
文件已准备好。
` );
    } );

    readStream.on( 'readable', () => {
      while( null !== ( chunk = readStream.read( bufferSize ) ) ){
        hashArr.flat( Infinity )
          .forEach( c => {
            // createHash( 'sha256' ).update(chunk)
            c[ 'update' ]( chunk );
          } );

        chunkBuf = chunk.length / 1024 / 1024;

        readStreamByte = readStream.bytesRead / 1024 / 1024;

        MyConsole.Cyan( `
${ filePath }
数据块大小(单位：字节)：${ chunk.length }(${ chunkBuf }MB、${ chunkBuf / 1024 }GB)。
数据流大小(单位：字节)：${ readStream.bytesRead }(${ readStreamByte }MB、${ readStreamByte / 1024 }GB)。
` );
      }
    } );

    readStream.on( 'end', () => {
      MyConsole.Blue( `
${ filePath }
文件读取已完成。
` );
    } );

    readStream.on( 'close', () => {
      // [ { hex: '', base64: '' }, { hex: '', base64: '' }, { hex: '', base64: '' } ]
      Object.values( obj001 )
        .forEach( ( c, i, ) => {
          // [ 'hex', 'base64' ]
          Object.keys( c )
            .forEach( ( c1, i1, ) => {
              // createHash( 'sha256' ).digest( 'hex' )
              obj001[ hash2Digest4Keys[ i ] ][ c1 ] = `${ hash2Digest4Keys[ i ] }-${ hashArr[ i ][ i1 ].digest( c1 ) }`;
            } );
        } );

      resolve( obj001 );

      MyConsole.Blue( `
${ filePath }
文件已关闭。
` );
    } );

    readStream.on( 'error', error => {
      resolve( {
        error,
      } );

      MyConsole.Red( `
${ filePath }
文件出错：
${ error }
` );
    } );
  } );
}

parentPort.on( 'close', () => {
  MyConsole.Blue( `
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
  filePath,
} ) => {
  startTimer001 = performance.now();

  resultObj = await FileSRI( filePath );

  parentPort.postMessage( {
    filePath,
    result: resultObj,
    takeUpTime: ( performance.now() - startTimer001 ) / 1000,
  } );
} );
