/**
 * Project: web-hansheng-IoT-project
 * FileDirPath: simulation_servers/deno/src/services/WebSocketResRoot.esm.mts
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2024-11-16 18:21:35 星期六
 */

/**
 * 用于响应WebSocket服务的根请求，如：“wss://127.0.0.1:9200/”。
 *
 * 更多的对应关系见“src/configures/route_map_config/RouteMapConfig.esm.mts”中的变量“websocketForRouteMapConfig”中的配置。
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
 * 该模块，必须部署一个默认的导出值，且该值的类型必须为可执行的函数，详细见下面的Handle函数注解。
 */

'use strict';

import {
  type T_Response001,

  HttpResponseHeadersFun,
} from 'configures/GlobalParameters.esm.mts';

import {
  MyConsole,
} from 'universal_tool_for_deno/UniversalToolForDeno.esm.mts';

import {
  type T_MyCusDenoFsFile,

  GetLogWriteStreamForSingleton,
  GetErrorWriteStreamForSingleton,
} from 'public/PublicTools.esm.mts';

const logWriteStream: T_MyCusDenoFsFile = await GetLogWriteStreamForSingleton();
const errorWriteStream: T_MyCusDenoFsFile = await GetErrorWriteStreamForSingleton();

/**
 * 响应请求的处理函数。
 *
 * @param {Request} request 请求对象，无默认值，必须。
 *
 * @returns {T_Response001} 返回值类型为Response、Promise<Response>。
 */
function Handle( request: Request ): T_Response001{
  let response: Response,
    wsForServer: WebSocket,
    url: URL,
    pathName: string;

  let result: T_Response001;

  try{
    (
      {
        response,
        socket: wsForServer,
      } = Deno.upgradeWebSocket( request, {
        /**
         * 1、将客户端Web套接字上的“protocol”属性设置为此处提供的值，该值应该是请求Web套接字时在协议参数中指定的字符串之一。<br />
         * 2、这旨在让客户端和服务器指定用于相互通信的子协议。<br />
         * 3、在客户端使用时，需要注意，客户端发出的请求会在请求头增加一个键值对：<br />
         * "Sec-WebSocket-Protocol": "simulation_servers_deno_WebSocket"。<br />
         * 如果客户端发出的请求的请求头没有该键值对，客户端就会连接不上。<br />
         * 例如，在浏览器端的JS代码：<br />
         * new WebSocket( 'wss://127.0.0.1:9200/', 'simulation_servers_deno_WebSocket' );<br />
         * 发出的请求的请求头就会自动加一个键值对：<br />
         * "Sec-WebSocket-Protocol": "simulation_servers_deno_WebSocket"。<br />
         *
         * @type {string}
         */
        protocol: `simulation_servers_deno_WebSocket`,
        /**
         * 1、如果客户端在指定的超时时间内没有用pong响应此帧，则连接被视为不健康并关闭。将发出关闭和错误事件。<br />
         * 2、默认值为120秒。设置为0以禁用超时。<br />
         *
         * @type {number}
         */
        idleTimeout: 0,
      } )
    );

    url = new URL( request.url );
    pathName = url.pathname;

    // @ts-expect-error
    wsForServer.addEventListener( 'open', ( event: Event ): void => {
      logWriteStream.write( `
来自：simulation_servers/deno/src/services/WebSocketResRoot.esm.mts
WebSocket针对“${ pathName }”的服务已打开。
` );
    } );

    // @ts-expect-error
    wsForServer.addEventListener( 'close', ( closeEvent: CloseEvent ): void => {
      logWriteStream.write( `
来自：simulation_servers/deno/src/services/WebSocketResRoot.esm.mts
WebSocket针对“${ pathName }”的服务已关闭。
` );
    } );

    wsForServer.addEventListener( 'error', ( errorEvent: Event | ErrorEvent ): void => {
      MyConsole.Red( `
来自：simulation_servers/deno/src/services/WebSocketResRoot.esm.mts
WebSocket针对“${ pathName }”的服务出现错误。Start

${ ( errorEvent as ErrorEvent ).message }

WebSocket针对“${ pathName }”的服务出现错误。End
` );

      errorWriteStream.write( `
来自：simulation_servers/deno/src/services/WebSocketResRoot.esm.mts
WebSocket针对“${ pathName }”的服务出现错误。Start

${ ( errorEvent as ErrorEvent ).message }

WebSocket针对“${ pathName }”的服务出现错误。End
` );
    } );

    wsForServer.addEventListener( 'message', ( messageEvent: MessageEvent ): void => {
      logWriteStream.write( `
来自：simulation_servers/deno/src/services/WebSocketResRoot.esm.mts
WebSocket收到了来自客户端（${ pathName }）的消息。Start

${ messageEvent.data }

WebSocket收到了来自客户端（${ pathName }）的消息。End
` );

      wsForServer.send( `${ new Date().toString() }：这是WebSocket服务端发给客户端的消息。` );
    } );

    result = response;
  }
  catch( error: unknown ){
    result = new Response( null, {
      status: 500,
      statusText: `${ ( error as Error ).message }`,
      headers: {
        ...HttpResponseHeadersFun( request ),
      },
    } );
  }

  return result;
}

// 必须部署这个默认的导出值。
export default Handle;
