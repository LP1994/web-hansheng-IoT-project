/**
 * Project: web-hansheng-IoT-project
 * FileDirPath: simulation_servers/deno/src/services/upload_resources_service/UploadByBinary.esm.mts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2024-11-16 18:21:35 星期六
 */

/**
 * 该模块，必须部署一个默认的导出值，且该值的类型必须为可执行的函数，详细见下面的Handle函数注解。
 */

/**
 * 1、自建的HTTPS证书，记得要给客户端安装，比如给电脑（除了本机要安装，火狐浏览器也要安装）、手机、平板等安装。
 * 2、安装证书如下：
 * “openssl/HTTPSSL001”文件夹下的3个：
 * 001根CA证书：HTTPSSL001_Root_CA.crt，安装到“受信任的根证书颁发机构”，手机、平板等非电脑的移动设备，只要安装这个“根CA证书”即可。
 * 002服务端CA证书：HTTPSSL001_Servers_CA.crt，安装到“受信任的根证书颁发机构”。
 * 003客户端CA证书：HTTPSSL001_Clients_CA.crt，安装时选择自动识别证书类型，系统会自行将其安装到相应的类型下。
 * 3、遇到HTTPS协议下载文件时出现无法下载的话，就改用HTTP协议，比如迅雷就会遇到这种情况。
 */

/**
 * 单个二进制文件流上传（支持POST请求、PUT请求），客户端上传的body不使用FormData包装，直接就是一个二进制文件流。
 * 上传的“二进制文件流（其实就是数据）”的数据类型只能是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string，
 * 当然也可以先将数据类型不是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string的“文件（其实就是数据）”转换成Blob再上传。
 * 关于如何创建Blob见：
 * https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
 *
 * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=binary&fileName=001.png&isForcedWrite=false
 * 查询参数“isForcedWrite”是可选的，“fileName”也是可选的，但是最好带上“fileName”，“fileName”有没有带扩展名都行（最好带扩展名）。
 * 当客户端发起的请求URL上带有查询参数“isForcedWrite”且值设置为true时，表示无论文件是不是已经存在，都强制写入文件并更新文件的所有信息。
 * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=binary&fileName=001.png&isForcedWrite=true
 *
 * 允许在请求头中携带自定义的请求头标识“deno-custom-file-sri”，其值为使用“SHA-512”计算的文件SRI值，来提前校验上传的文件是否已经存在。
 *
 * 1、客户端上传的body不使用FormData包装，直接就是一个二进制文件流。
 * 上传的“二进制文件流（其实就是数据）”的数据类型只能是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string，
 * 当然也可以先将数据类型不是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string的“文件（其实就是数据）”转换成Blob再上传。
 * 关于如何创建Blob见：
 * https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
 * 2、要求客户端发起的请求url上必须要有查询参数“uploadType=binary”。
 * 3、特别注意！请求头必须包含“content-type”！
 * 有的文件上传，浏览器会自行设置能被识别到的文件的MIME，并自行设置请求头中的“content-type”！
 * 但是对不被浏览器识别的文件的MIME，则不会设置请求头的“content-type”，所以需要手动设置！故而建议，始终手动设置请求头“content-type”！
 */

'use strict';

import {
  toWritableStream,
} from 'deno_std_io/to_writable_stream.ts';

import {
  HttpResponseHeadersFun,
  resMessageStatus,
} from 'configures/GlobalParameters.esm.mts';

import {
  DeleteOne,
} from 'mongo/simulation_servers_deno/upload_file_sri/UploadFileSRI.esm.mts';

import {
  type T_Obj001,
  type I_UploadFileSRISchema,

  GetFileMIME,
  UpdateFileSRI,
} from './UpdateFileSRI.esm.mts';

/**
 * 单个二进制文件流上传（支持POST请求、PUT请求），客户端上传的body不使用FormData包装，直接就是一个二进制文件流。
 * 上传的“二进制文件流（其实就是数据）”的数据类型只能是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string，
 * 当然也可以先将数据类型不是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string的“文件（其实就是数据）”转换成Blob再上传。
 * 关于如何创建Blob见：
 * https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
 *
 * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=binary&fileName=001.png&isForcedWrite=false
 * 查询参数“isForcedWrite”是可选的，“fileName”也是可选的，但是最好带上“fileName”，“fileName”有没有带扩展名都行（最好带扩展名）。
 * 当客户端发起的请求URL上带有查询参数“isForcedWrite”且值设置为true时，表示无论文件是不是已经存在，都强制写入文件并更新文件的所有信息。
 * 例子：https://127.0.0.1:9200/simulation_servers_deno/upload?uploadType=binary&fileName=001.png&isForcedWrite=true
 *
 * 允许在请求头中携带自定义的请求头标识“deno-custom-file-sri”，其值为使用“SHA-512”计算的文件SRI值，来提前校验上传的文件是否已经存在。
 *
 * 1、客户端上传的body不使用FormData包装，直接就是一个二进制文件流。
 * 上传的“二进制文件流（其实就是数据）”的数据类型只能是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string，
 * 当然也可以先将数据类型不是Blob、ArrayBufferView、ArrayBuffer、FormData、URLSearchParams、ReadableStream<Uint8Array>、string的“文件（其实就是数据）”转换成Blob再上传。
 * 关于如何创建Blob见：
 * https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob
 * 2、要求客户端发起的请求url上必须要有查询参数“uploadType=binary”。
 * 3、特别注意！请求头必须包含“content-type”！
 * 有的文件上传，浏览器会自行设置能被识别到的文件的MIME，并自行设置请求头中的“content-type”！
 * 但是对不被浏览器识别的文件的MIME，则不会设置请求头的“content-type”，所以需要手动设置！故而建议，始终手动设置请求头“content-type”！
 *
 * @param {Request} request 请求对象，无默认值，必须。
 *
 * @returns {Promise<Response>} 返回值类型为Promise<Response>。
 */
async function UploadByBinary( request: Request ): Promise<Response>{
  const _request: Request = request.clone();

  let result001: string = JSON.stringify( {
    data: {
      success: false,
      message: `body为空，未上传任何数据。`,
    },
    messageStatus: resMessageStatus[ 1000 ],
  } );

  let contentType: string = ( _request.headers.get( 'content-type' ) ?? '' ).trim().toLowerCase(),
    contentLength: string = ( _request.headers.get( 'content-length' ) ?? '' ).trim().toLowerCase(),
    fileName: string = decodeURI( ( new URL( _request.url ).searchParams.get( 'fileName' ) ?? '' ).trim() );

  if( fileName.length === 0 ){
    fileName = `BinaryFile`;
  }

  ( _request.body && contentType.length === 0 ) && ( contentType = await GetFileMIME( await request.clone().blob(), fileName ) );

  if( _request.body && contentType.length !== 0 ){
    try{
      const {
        isWriteFile,
        fileInfo,
      }: T_Obj001 = await UpdateFileSRI( _request, {
        [ Symbol.toStringTag ]: 'Blob',
        stream: (): ReadableStream<Uint8Array> => request.clone().body as ReadableStream<Uint8Array>,
        arrayBuffer: (): Promise<ArrayBuffer> => request.clone().arrayBuffer(),
        blob: (): Promise<Blob> => request.clone().blob(),
        slice: async ( start?: number, end?: number, contentType?: string ): Promise<Blob> => {
          const blob: Blob = await request.clone().blob();

          let result: Blob;

          if( start !== null && start !== undefined && end !== null && end !== undefined && contentType !== null && contentType !== undefined ){
            result = blob.slice( start, end, contentType );
          }
          else if( start !== null && start !== undefined && end !== null && end !== undefined ){
            result = blob.slice( start, end );
          }
          else if( start !== null && start !== undefined ){
            result = blob.slice( start );
          }
          else{
            result = blob.slice();
          }

          return result;
        },
        formData: (): Promise<FormData> => request.clone().formData(),
        json: (): Promise<any> => request.clone().json(),
        text: (): Promise<string> => request.clone().text(),
        lastModified: String( Date.now() ),
        type: String( contentType ),
        size: String( contentLength ),
        name: fileName,
      }, fileName );

      const {
        savePath,
        filePath,
        fileType,
        sri,
        fileName: fileName001,
      }: I_UploadFileSRISchema = fileInfo;

      if( !isWriteFile ){
        result001 = JSON.stringify( {
          data: {
            // true表示上传成功，反之，表示失败。
            success: true,
            // 描述性说明。
            message: `已存在跟此文件（${ fileName001 }，文件类型：${ fileType }）的SRI值一致的文件，故本次上传不写入此文件。`,
            // 该属性值可供客户端再次获取上传到服务器的文件，值格式为“/simulation_servers_deno/upload/json/XXXXXX.json”，使用时直接发起GET请求“https://127.0.0.1:9200/simulation_servers_deno/upload/json/XXXXXX.json”即可获取到。
            filePath: `${ filePath }`,
          },
          messageStatus: resMessageStatus[ 200 ],
        } );
      }
      else{
        try{
          const file001: Deno.FsFile = await Deno.open( new URL( savePath ), {
            write: true,
            create: true,
          } );

          await _request.body.pipeTo( toWritableStream( file001 ) );

          result001 = JSON.stringify( {
            data: {
              // true表示上传成功，反之，表示失败。
              success: true,
              // 描述性说明。
              message: `文件（${ fileName001 }，文件类型：${ fileType }）上传成功。`,
              // 该属性值可供客户端再次获取上传到服务器的文件，值格式为“/simulation_servers_deno/upload/json/XXXXXX.json”，使用时直接发起GET请求“https://127.0.0.1:9200/simulation_servers_deno/upload/json/XXXXXX.json”即可获取到。
              filePath: `${ filePath }`,
            },
            messageStatus: resMessageStatus[ 200 ],
          } );
        }
        catch( error: unknown ){
          await DeleteOne( sri );

          result001 = JSON.stringify( {
            data: {
              success: false,
              message: `${ ( error as Error ).message }`,
            },
            messageStatus: resMessageStatus[ 9999 ],
          } );
        }
      }
    }
    catch( error: unknown ){
      result001 = JSON.stringify( {
        data: {
          success: false,
          message: `${ ( error as Error ).message }`,
        },
        messageStatus: resMessageStatus[ 9999 ],
      } );
    }
  }
  else if( _request.body && contentType.length === 0 ){
    result001 = JSON.stringify( {
      data: {
        success: false,
        message: `请求头中的“content-type”的值不能为空。`,
      },
      messageStatus: resMessageStatus[ 1001 ],
    } );
  }

  return new Response( result001, {
    status: 200,
    statusText: 'OK',
    headers: {
      ...HttpResponseHeadersFun( request ),
      'content-type': 'application/json; charset=utf-8',
    },
  } );
}

// 必须部署这个默认的导出值。
export default UploadByBinary;
