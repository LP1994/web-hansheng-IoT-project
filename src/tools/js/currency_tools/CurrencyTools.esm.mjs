/**
 * Project: web-hansheng-IoT-project
 * FileDirPath: src/tools/js/currency_tools/CurrencyTools.esm.mjs
 * Author: 12278
 * Email: 1227839175@qq.com
 * IDE: WebStorm
 * CreateDate: 2024-11-16 18:21:35 星期六
 */

/**
 * 该工具库是使用“JavaScript”编写的公共的、通用的、不特定于某个项目使用的脚本工具库。
 * 其支持在浏览器（需要转码成JavaScript）、Node、Deno等多种支持JavaScript的宿主环境中使用，并且不是特定于某个项目才能使用的，使用“ECMAScript modules(ECMAScript模块)”写法。
 *
 *
 *
 * 编写原则：
 * 1、能用模块化的API尽量用模块化的，少用或者不用全局的，目的是为了让“编码风格”尽量符合“模块化”的理念。
 *
 * 2、只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。
 *
 * 3、注意函数尾调用、算法时间复杂度、算法空间复杂度等优化。
 *
 * 4、那些不被导出供外部调用使用的、属于内部7788的处理函数、类等等，要以“HandleBy”打头命名。
 *
 * 5、那些需要被导出供外部调用使用的函数、类等等，一定要记得也要同时部署在“默认导出”中。
 *
 * 6、编程范式使用“函数式编程”，结合“JavaScript”编写，这样更好得便于被Webpack等工具进行“Tree-shaking”，只打包那些被使用的。
 *
 * 7、那些用于限定、描述数据类型的类型声明也要记得导出，以便供外部使用，如：export type T_MyString001 = string。
 *
 *
 *
 * 关于“严格模式”的注意事项：
 * 1、'use strict'严格模式会在函数内部自动深度的传递严格模式的效果。
 * 如：
 * ```ts
 * function Fun1( x ){
 * 'use strict';
 *
 * function Fun2( y = 1 ){
 * console.log( y );
 *
 * console.log( this );
 * }
 *
 * Fun2();
 * }
 * ```
 * 说明：
 * Fun1里的'use strict'严格模式的效果会传递到Fun2内部！
 * 但是，Fun1里的'use strict'严格模式却不会作用于Fun2的默认函数参数，但是Fun2里的this还是会为undefined！
 * 所以，Fun1不可以设置默认函数参数，但是Fun2可以设置默认函数参数！
 *
 * 2、只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。
 *
 * 3、webpack编译后的JS代码会去掉多余的'use strict'，只保留编译前每个文件的顶级'use strict'。
 *
 * 4、class内部的方法中存在的'use strict'，在webpack编译后会被删除。
 *
 * 5、严格模式下的this还是可以通过apply、bind、call来设置的，否则还是undefined。
 * 如：
 * ```ts
 * 'use strict';
 *
 * function Fun1(){
 * 'use strict';
 *
 * console.dir( this );
 * }
 *
 * Fun1.call( { a: 1, } ); // 输出：{ a: 1, }，而不是undefined。
 * ```
 *
 *
 *
 * 该工具经过了如下优化(以后的代码添加、修改都应该尽量遵循如下的优化标准)：
 * PS：
 * 只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。
 *
 * 1、函数尾调用优化；
 * 2、算法时间复杂度优化；
 * 3、算法空间复杂度优化；
 */

'use strict';

function AllEStop( event ){
  event.stopPropagation();
  event.stopImmediatePropagation();
  event.preventDefault();
  return event.currentTarget;
}

function CAnimationFFun( id_num ){
  'use strict';

  if( globalThis.cancelAnimationFrame ){
    return globalThis.cancelAnimationFrame( id_num );
  }
  else if( globalThis.webkitCancelAnimationFrame ){
    return globalThis.webkitCancelAnimationFrame( id_num );
  }
  return globalThis.clearTimeout( id_num );
}

function CopyProperties( target, source ){
  let desc;
  for( let key of
    Reflect.ownKeys( source ) ){
    if( key !== 'constructor' && key !== 'prototype' && key !== 'name' ){
      desc = Object.getOwnPropertyDescriptor( source, key );
      Object.defineProperty( target, key, desc );
    }
  }
}

/**
 * 自定义抛出错误、异常信息
 *
 * @param info_str 字符串，错误、异常信息，必须！
 */
function GetError( info_str ){
  console.error( 'GetError函数--->Start' );
  throw new Error( info_str );
}

function Init( _this, isSupportBrowser ){
  if( isSupportBrowser ){
    globalThis.requestAnimationFrame = globalThis[ 'requestAnimationFrame' ] || globalThis[ 'webkitRequestAnimationFrame' ] || globalThis[ 'mozRequestAnimationFrame' ] || globalThis[ 'msRequestAnimationFrame' ] || globalThis[ 'oRequestAnimationFrame' ] || globalThis[ 'khtmlRequestAnimationFrame' ];
    globalThis.cancelAnimationFrame = globalThis[ 'cancelAnimationFrame' ] || globalThis[ 'webkitCancelAnimationFrame' ] || globalThis[ 'mozCancelAnimationFrame' ] || globalThis[ 'msCancelAnimationFrame' ] || globalThis[ 'oCancelAnimationFrame' ] || globalThis[ 'khtmlCancelAnimationFrame' ];

    // 触摸事件初始化，因为在touch()内部做了判断，所以，不管new CT多少次或调用touch()多少次，都只会执行一次触摸事件初始化！！！避免了重复注册触摸事件！！！
    _this.isTouch() && _this.touch();
  }

  // 函数，将浮点数四舍五入到指定的长度(小数点之后的长度)
  // 会在“Number”的原型上添加这个函数
  // 注：
  // 1、'.123'会转为'0.123'
  // @param len number，范围是0到20(包括0和20)，默认为6
  // @returns {Number} number
  Number.prototype.ctoToFixed = function ( len = 6 ){
    let padNum = num => {
      let dotPos = num.indexOf( '.' );
      if( dotPos === -1 ){
        num += '.';
        for(
          let i = 0;
          i < len;
          ++i
        ){
          num += '0';
        }
        return Number( num );
      }
      else{
        let need = len - ( num.length - dotPos - 1 );
        for(
          let j = 0;
          j < need;
          ++j
        ){
          num += '0';
        }
        return Number( num );
      }
    };
    if( len > 20 || len < 0 ){
      GetError( '范围是0到20(包括0和20)' );
      return;
    }
    let number = Number( this );
    if( isNaN( number ) || number >= Math.pow( 10, 21 ) ){
      return Number( number.toString() );
    }
    if( typeof ( len ) === 'undefined' || len === 0 ){
      return Number( ( Math.round( number ) ).toString() );
    }
    let result = number.toString(),
      numberArr = result.split( '.' );
    if( numberArr.length < 2 ){
      return Number( padNum( result ) );
    }
    let intNum = numberArr[ 0 ],
      deciNum = numberArr[ 1 ],
      lastNum = deciNum.substr( len, 1 );
    if( deciNum.length === len ){
      return Number( result );
    }
    if( deciNum.length < len ){
      return Number( padNum( result ) );
    }
    result = intNum + '.' + deciNum.substr( 0, len );
    if( parseInt( lastNum, 10 ) >= 5 ){
      let times = Math.pow( 10, len ),
        changedInt = Number( result.replace( '.', '' ) );
      changedInt++;
      changedInt /= times;
      result = padNum( changedInt + '' );
    }
    return Number( result );
  };

  // 四个函数，解决JS在“加减乘除”计算时出现的精度丢失问题
  // 会在“Number”的原型上添加这四个函数
  // ctoAdd(加)
  // ctoSub(减)
  // ctoMul(乘)
  // ctoDiv(除)
  {
    let isInteger = obj => ( Math.floor( obj ) === obj ),
      toInteger = floatNum => {
        let ret = {
          times: 1,
          num: 0
        };
        if( isInteger( floatNum ) ){
          ret.num = floatNum;
          return ret;
        }
        let strfi = floatNum + '',
          dotPos = strfi.indexOf( '.' ),
          len = strfi.substr( dotPos + 1 ).length,
          times = Math.pow( 10, len ),
          intNum = Number( floatNum.toString()
            .replace( '.', '' ) );
        ret.times = times;
        ret.num = intNum;
        return ret;
      },
      operation = ( a, b, digits, op ) => {
        let o1 = toInteger( a ),
          o2 = toInteger( b ),
          n1 = o1.num,
          n2 = o2.num,
          t1 = o1.times,
          t2 = o2.times,
          max = t1 > t2
                ? t1
                : t2,
          result = null;
        switch( op ){
          case 'add':
            if( t1 === t2 ){
              result = n1 + n2;
            }
            else if( t1 > t2 ){
              result = n1 + n2 * ( t1 / t2 );
            }
            else{
              result = n1 * ( t2 / t1 ) + n2;
            }
            return result / max;
          case 'subtract':
            if( t1 === t2 ){
              result = n1 - n2;
            }
            else if( t1 > t2 ){
              result = n1 - n2 * ( t1 / t2 );
            }
            else{
              result = n1 * ( t2 / t1 ) - n2;
            }
            return result / max;
          case 'multiply':
            result = ( n1 * n2 ) / ( t1 * t2 );
            return result;
          case 'divide':
            result = ( n1 / n2 ) * ( t2 / t1 );
            return result;
        }
      },
      /**
       * 加法，a + b<br />
       * 注：<br />
       * 这四个方法也被挂载在了Number对象上，所以，这种情况下a，就是加数B，<br />
       * 调用它的就是加数A，<br />
       * b就是digits(number，保留的小数点数，比如2，即保留为两位小数，默认为6)
       *
       * @param a 加数A，number
       *
       * @param b 加数B，number
       *
       * @param digits number，保留的小数点数，比如2，即保留为两位小数，默认为6
       *
       * @returns {Number} number
       */
      ctoAdd = function ( a, b = 6, digits = 6 ){
        if( this[ 'name' ] === 'CT' ){
          return operation( a, b, digits, 'add' )
            .ctoToFixed( digits );
        }
        else if( ( typeof this === 'number' ) || IsHandle1.call( _this, this, 'Number' ) ){
          return operation( this, a, b, 'add' )
            .ctoToFixed( b );
        }
      },
      /**
       * 减法，a - b<br />
       * 注：<br />
       * 这四个方法也被挂载在了Number对象上，所以，这种情况下a，就是减数B，<br />
       * 调用它的就是减数A，<br />
       * b就是digits(number，保留的小数点数，比如2，即保留为两位小数，默认为6)
       *
       * @param a 减数A，number
       *
       * @param b 减数B，number
       *
       * @param digits number，保留的小数点数，比如2，即保留为两位小数，默认为6
       *
       * @returns {Number} number
       */
      ctoSub = function ( a, b = 6, digits = 6 ){
        if( this[ 'name' ] === 'CT' ){
          return operation( a, b, digits, 'subtract' )
            .ctoToFixed( digits );
        }
        else if( ( typeof this === 'number' ) || IsHandle1.call( _this, this, 'Number' ) ){
          return operation( this, a, b, 'subtract' )
            .ctoToFixed( b );
        }
      },
      /**
       * 乘法，a * b<br />
       * 注：<br />
       * 这四个方法也被挂载在了Number对象上，所以，这种情况下a，就是乘数B，<br />
       * 调用它的就是乘数A，<br />
       * b就是digits(number，保留的小数点数，比如2，即保留为两位小数，默认为6)
       *
       * @param a 乘数A，number
       *
       * @param b 乘数B，number
       *
       * @param digits number，保留的小数点数，比如2，即保留为两位小数，默认为6
       *
       * @returns {Number} number
       */
      ctoMul = function ( a, b = 6, digits = 6 ){
        if( this[ 'name' ] === 'CT' ){
          return operation( a, b, digits, 'multiply' )
            .ctoToFixed( digits );
        }
        else if( ( typeof this === 'number' ) || IsHandle1.call( _this, this, 'Number' ) ){
          return operation( this, a, b, 'multiply' )
            .ctoToFixed( b );
        }
      },
      /**
       * 除法，a / b<br />
       * 注：<br />
       * 这四个方法也被挂载在了Number对象上，所以，这种情况下a，就是除数B，<br />
       * 调用它的就是除数A，<br />
       * b就是digits(number，保留的小数点数，比如2，即保留为两位小数，默认为6)
       *
       * @param a 除数A，number
       *
       * @param b 除数B，number
       *
       * @param digits number，保留的小数点数，比如2，即保留为两位小数，默认为6
       *
       * @returns {Number} number
       */
      ctoDiv = function ( a, b = 6, digits = 6 ){
        if( this[ 'name' ] === 'CT' ){
          return operation( a, b, digits, 'divide' )
            .ctoToFixed( digits );
        }
        else if( ( typeof this === 'number' ) || IsHandle1.call( _this, this, 'Number' ) ){
          return operation( this, a, b, 'divide' )
            .ctoToFixed( b );
        }
      },
      obj1 = {
        ctoAdd,
        ctoSub,
        ctoMul,
        ctoDiv
      };
    for( let key in
      obj1 ){
      Number.prototype[ key ] = obj1[ key ];
      _this[ key ] = obj1[ key ];
    }
  }
}

/**
 * @return {boolean}
 */
function IsHandle1( arg1, arg2 ){
  if( 'Element' === arg2 ){
    return this.dataT( arg1 )
      .includes( arg2 );
  }

  return this.dataT( arg1 )
    .slice( 8, -1 ) === arg2;
}

function IsHandle2( arg, regStr ){
  'use strict';

  return IsHandle7.call( this, arg, a1 => this.remOfPat( a1, regStr ), this.remOfPat( arg, regStr ) );
}

function IsHandle3( arg1, regStr ){
  'use strict';

  return regStr.test( this.trim( arg1 ) );
}

function IsHandle4( o, f ){
  'use strict';

  return f( o );
}

function IsHandle5( o, s, f ){
  let result = Object[ s ]( o ),
    prop;
  Reflect.ownKeys( o )
    .forEach( currentValue => {
      prop = o[ currentValue ];
      ( this.isArray( prop ) || this.isObject( prop ) ) && f( prop );
    } );
  return result;
}

function IsHandle6( elem, classN, type ){
  'use strict';

  return IsHandle10.call( this, elem, elemO => {
    this.remSpace( classN )
      .split( ',' )
      .forEach( currentValue => {
        if( currentValue.length !== 0 && ( this.isDocument( elemO ) || this.isWindow( elemO ) ) ){
          document[ 'documentElement' ][ 'classList' ][ type ]( currentValue );
        }
        else if( currentValue.length !== 0 && !( this.isDocument( elemO ) || this.isWindow( elemO ) ) ){
          elemO.classList[ type ]( currentValue );
        }
      } );
    if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
      return document.documentElement.classList;
    }
    return elemO.classList;
  } );
}

function IsHandle7( arg1, f, arg2 ){
  let isA = this.isArray( arg1 );
  if( isA && arg1.length !== 0 ){
    let result = [];
    arg1.forEach( currentValue => void ( result.push( f( currentValue ) ) ) );
    return result;
  }
  else if( !isA ){
    return arg2;
  }
}

function IsHandle8( ar1, f, seN, rootE ){
  let aLen = ar1.length,
    handle = f,
    handle1 = ( seN, rootE ) => {
      if( this.isString( seN ) && this.trim( seN ).length !== 0 ){
        return handle( seN, rootE );
      }
      else if( this.isArray( seN ) && seN.length !== 0 ){
        let result = [];
        this.dataRemRe( seN )
          .forEach( currentValue => void ( ( this.isString( currentValue ) && this.trim( currentValue ).length !== 0 ) && result.push( handle( currentValue, rootE ) ) ) );
        if( result.length !== 0 ){
          return result;
        }
      }
    };
  if( aLen === 1 ){
    return handle1( seN, rootE );
  }
  else{
    let rootP = ar1[ 1 ];
    if( this.isString( rootP ) && this.trim( rootP ).length !== 0 ){
      let [ rootO ] = [ this.gBySe( this.trim( rootP ) ) ];
      if( !this.isNull( rootO ) ){
        return handle1( seN, rootO );
      }
    }
    else if( this.isElement( rootP ) ){
      return handle1( seN, rootP );
    }
    else if( this.isElemList( rootP ) && rootP.length !== 0 ){
      return handle1( seN, rootP[ 0 ] );
    }
  }
}

function IsHandle9( arg, f ){
  let handle = f;
  if( this.isString( arg ) && this.trim( arg ).length !== 0 ){
    return handle( arg );
  }
  else if( this.isArray( arg ) && arg.length !== 0 ){
    let result = [];
    this.dataRemRe( arg )
      .forEach( currentValue => void ( ( this.isString( currentValue ) && this.trim( currentValue ).length !== 0 ) && result.push( handle( currentValue ) ) ) );
    if( result.length !== 0 ){
      return result;
    }
  }
}

/**
 * 查找所有节点，处理所有节点，有返回值(存放在数组里)
 *
 * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
 * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
 *
 * @param fun 需要执行的函数，会传入一个Element参数，必需
 *
 * @returns {Array} 数组[*]
 */
function IsHandle10( elem, fun ){
  let handle = fun,
    handle1 = arg => {
      let result = [];
      Array.from( arg )
        .forEach( currentValue => void ( result.push( handle( currentValue ) ) ) );
      return result;
    },
    handle2 = elem => {
      if( this.isString( elem ) && this.trim( elem ).length !== 0 ){
        return handle1( this.gBySeAll( this.trim( elem ) ) );
      }
      else if( this.isElement( elem ) ){
        return [ handle( elem ) ];
      }
      else if( this.isElemList( elem ) && elem.length !== 0 ){
        return handle1( elem );
      }
      else{
        return [ handle( elem ) ];
      }
    };
  if( !this.isArray( elem ) ){
    return handle2( elem );
  }
  else if( this.isArray( elem ) && elem.length !== 0 ){
    let result = [];
    elem.forEach( currentValue => void ( result.push( handle2( currentValue ) ) ) );
    return result;
  }
}

function IsHandle11( elem, lenI, type ){
  let fun = e => {
    let _elem = e.currentTarget,
      val = this[ type ]( _elem.value );
    _elem.value = this.isUndefined( lenI )
                  ? val
                  : val.slice( 0, lenI );
  };
  this.inputE( elem, fun );
  return fun;
}

function IsHandle12( elem, f, type, e ){
  'use strict';

  return IsHandle10.call( this, elem, elemO => {
    elemO[ type ]( e, f, false );
    return elemO;
  } );
}

/**
 * 查找节点，但只处理第一个节点，有返回值(任何类型数据)
 *
 * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
 * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需，但只处理第一个节点
 *
 * @param fun 需要执行的函数，会传入一个Element参数，必需
 *
 * @returns {*} 任何类型数据
 */
function IsHandle13( elem, fun ){
  let handle = fun,
    handle1 = arg => {
      const is = this.isElemList( arg );
      if( this.isString( arg ) && this.trim( arg ).length !== 0 ){
        return handle( this.gBySe( this.trim( arg ) ) );
      }
      else if( this.isElement( arg ) ){
        return handle( arg );
      }
      else if( is && arg.length !== 0 ){
        return handle( arg[ 0 ] );
      }
      else{
        return handle( arg );
      }
    };
  if( this.isArray( elem ) && elem.length !== 0 ){
    let result = [];
    elem.forEach( currentValue => void ( result.push( handle1( currentValue ) ) ) );
    return result;
  }
  else{
    return handle1( elem );
  }
}

function IsHandle14( sT ){
  /**
   * 获取第numI个的键名，不存在，会返回null值
   *
   * @param numI 大于等于0的number类型
   *
   * @returns {String} 第numI个的键名，字符串
   */
  const getKN = numI => sT.key( numI );
  /**
   * 总共有几个键值对
   *
   * @returns {Number} 大于等于0的number类型
   */
  const sTL = () => sT.length;
  /**
   * 根据指定的键名获取键值，不存在的时候，会返回null值
   *
   * @param kn 键名(String)
   *
   * @returns {String} 键值，数据类型可以是JS支持的任何数据类型，但都是被字符串化了，所以需要用JSON.parse()转化一下，<br />
   * 如果原始值本来就是字符串就不需要JSON.parse()转化了！也不能转换，会出问题！
   */
  const getD = kn => sT.getItem( kn );
  /**
   *
   * @param kn 键名，String
   *
   * @param kv 键值，数据类型可以是JS支持的任何数据类型，但都是被字符串化了，使用JSON.stringify()处理一下，<br />
   * 如果原始值本来就是字符串就不需要JSON.stringify()处理！
   */
  const setD = ( kn, kv ) => void ( sT.setItem( kn, kv ) );
  /**
   * 根据指定的键名移除键值对
   *
   * @param kn 键名，String
   */
  const remD = kn => void ( sT.removeItem( kn ) );
  /**
   * 清空所有数据
   */
  const cD = () => void ( sT.clear() );
  /**
   * 判断本地存储中是否存在指定的键名
   *
   * @param kn 键名，字符串
   *
   * @returns {Boolean} false表示不存在，true表示存在
   */
  const isKN = kn => {
    let result = false;
    for(
      let i = 0;
      i < sTL();
      ++i
    ){
      if( getKN( i ) === kn ){
        result = true;
        break;
      }
    }
    return result;
  };

  return {
    /**
     * 增加键值对
     *
     * @param jsonO JSON对象，里头存放着数据
     *
     * @param isC 布尔值，true表示强制添加(会覆盖同名的)，false反之，默认为true
     */
    aD: ( jsonO, isC = true ) => {
      const is = !this.isEmpty( jsonO );
      let n,
        v;
      if( is && isC ){
        for( let key in
          jsonO ){
          v = jsonO[ key ];
          setD( this.trim( key ), this.isString( v )
                                  ? v
                                  : JSON.stringify( v ) );
        }
      }
      else if( is && !isC ){
        for( let key in
          jsonO ){
          n = this.trim( key );
          v = jsonO[ key ];
          !isKN( n ) && setD( n, this.isString( v )
                                 ? v
                                 : JSON.stringify( v ) );
        }
      }
    },
    /**
     * 根据指定的键名移除键值对
     *
     * @param kn 键名，String
     */
    dD: kn => {
      const n = this.trim( kn );
      ( this.isString( kn ) && !this.isEmpty( n ) ) && remD( n );
    },
    /**
     * 更新键值对
     *
     * @param jsonO 键名，JSON对象，所要更新的数据
     *
     * @param isC 不存在该键名的时候如何处理，默认true，true添加为新的键值对，反之，本次更新未进行
     */
    uD: ( jsonO, isC = true ) => {
      const is = !this.isEmpty( jsonO );
      let n,
        v;
      if( is && isC ){
        for( let key in
          jsonO ){
          v = jsonO[ key ];
          setD( this.trim( key ), this.isString( v )
                                  ? v
                                  : JSON.stringify( v ) );
        }
      }
      else if( is && !isC ){
        for( let key in
          jsonO ){
          n = this.trim( key );
          v = jsonO[ key ];
          isKN( n ) && setD( n, this.isString( v )
                                ? v
                                : JSON.stringify( v ) );
        }
      }
    },
    /**
     * 根据键名查询键值，不存在的时候，会返回null值
     *
     * @param kn 键名，string
     *
     * @returns {String} 键值
     */
    qD: kn => {
      const n = this.trim( kn ),
        result = getD( n ),
        isS = this.isString( kn ) && !this.isEmpty( n );
      if( isS && !this.isNull( result ) ){
        return result;
      }
      else if( isS && this.isNull( result ) ){
        return null;
      }
    },
    /**
     * 清空所有数据
     */
    cD,
    /**
     * 判断本地存储中是否存在指定的键名
     *
     * @param kn 键名，字符串
     *
     * @returns {Boolean} false表示不存在，true表示存在
     */
    isKN,
    /**
     * 当Storage发生变化的时候，会触发storage事件<br />
     * PS：同一个页面要是既执行了这个事件，又发生了localStorage变化，那么这个事件不会被这个页面所触发，<br />
     * 但是会被同源下的那些有执行这个事件的其他页面或者iframe所触发。
     *
     * @param f 函数，会传入一个event<br />
     * event.target        事件目标（DOM树中最顶端的目标）<br />
     * event.type          事件的类型<br />
     * event.bubbles       事件是否正常起泡<br />
     * event.cancelable    事件是否可以取消<br />
     * event.key           键值发生改变的键名<br />
     * event.oldValue      被改变的键名的旧的键值<br />
     * event.newValue      被改变的键名的新的键值<br />
     * event.url           Storage发生变动的页面的URL<br />
     * event.storageArea   发生变动的Storage对象<br />
     *
     * @returns {function} function，返回一个函数，用于解除给“window”绑定的“storage”事件，如：window.removeEventListener( 'storage', f, false )
     */
    storageCE: f => {
      globalThis.addEventListener( 'storage', f, false );
      return f;
    },
  };
}

function IsHandle15( f ){
  let ticking = false,
    id = undefined;
  !ticking && ( id = globalThis.requestAnimationFrame( () => void ( f(), ticking = false ) ) );
  ticking = true;
  return id;
}

function IsHandle16( elem, data, type, text ){
  'use strict';

  return IsHandle10.call( this, elem, elemO => {
    if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
      return elemO;
    }
    let where = '';
    switch( type ){
      case 'prepend':
        where = 'afterbegin';
        break;
      case 'append':
        where = 'beforeend';
        break;
      case 'before':
        where = 'beforebegin';
        break;
      case 'after':
        where = 'afterend';
        break;
    }
    let handle = data => {
      if( this.isElement( data ) ){
        elemO[ type ]( data.cloneNode( true ) );
      }
      else if( this.isElemList( data ) ){
        let elemA = Array.from( data );
        ( type === 'prepend' || type === 'after' ) && elemA.reverse();
        elemA.forEach( currentValue => void ( elemO[ type ]( currentValue.cloneNode( true ) ) ) );
      }
      else if( this.isString( data ) && text ){
        elemO.insertAdjacentText( where, data );
      }
      else if( this.isString( data ) && !text ){
        elemO.insertAdjacentHTML( where, data );
      }
      else if( this.isFunction( data ) ){
        elemO[ type ]( data.toString() );
      }
      else{
        elemO[ type ]( JSON.stringify( data ) );
      }
    };
    this.isArray( data )
    ? ( data.forEach( currentValue => void ( handle( currentValue ) ) ) )
    : ( handle( data ) );
    return elemO;
  } );
}

function IsHandle17( arr, selectorElems ){
  if( selectorElems.length === 0 ){
    return arr;
  }
  let result = [];
  arr.forEach( currentValue => void ( Array.from( selectorElems )
    .forEach( c => void ( currentValue === c && result.push( currentValue ) ) ) ) );
  if( result.length === 0 ){
    return null;
  }
  return result;
}

function IsHandle18( newURLStr, searchObj, stateData, type ){
  let str1 = '',
    str2 = '&',
    arr1 = Object.keys( searchObj ),
    l1 = arr1.length;
  if( l1 === 1 && arr1[ 0 ] === '#' ){
    str1 = '#' + searchObj[ '#' ];
  }
  else if( l1 >= 1 ){
    str1 = '?';
    arr1.forEach( ( c, i, a ) => void ( str1 += c + '=' + searchObj[ c ], i !== ( a.length - 1 ) && ( str1 += str2 ) ) );
  }
  globalThis.history[ type ]( stateData, '', newURLStr + str1 );
  return newURLStr + str1;
}

function IsHandle19( _this, elemO ){
  let [
    opacity,
    // fontSize,
    width,
    height,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    borderTopWidth,
    borderRightWidth,
    borderBottomWidth,
    borderLeftWidth,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    outlineWidth,
  ] = _this.gStyle( elemO, [
    'opacity',
    // 'fontSize',
    'width',
    'height',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'borderTopWidth',
    'borderRightWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'marginTop',
    'marginRight',
    'marginBottom',
    'marginLeft',
    'outlineWidth',
  ] );
  _this.data( elemO, {
    style3Obj: {
      opacity,
      // 'font-size': fontSize,
      width,
      height,
      'padding-top': paddingTop,
      'padding-right': paddingRight,
      'padding-bottom': paddingBottom,
      'padding-left': paddingLeft,
      'border-top-width': borderTopWidth,
      'border-right-width': borderRightWidth,
      'border-bottom-width': borderBottomWidth,
      'border-left-width': borderLeftWidth,
      'margin-top': marginTop,
      'margin-right': marginRight,
      'margin-bottom': marginBottom,
      'margin-left': marginLeft,
      'outline-width': outlineWidth,
    }
  } );
}

function MixinHandle( ...mixin_classArr ){
  class Mix {
    constructor(){
      for( let mixin_class of
        mixin_classArr ){
        CopyProperties( this, new mixin_class() );
      }
    }
  }

  for( let mixin_class of
    mixin_classArr ){
    CopyProperties( Mix, mixin_class );
    CopyProperties( Mix.prototype, mixin_class.prototype );
  }
  return Mix;
}

/**
 * 主要用于调试提示的“alert”提示框！
 *
 * @param info 字符串，调试信息，必须
 */
function Prompt( info ){
  // alert( info );
}

/**
 * @return {number}
 */
function RAnimationFFun( callback_fun ){
  'use strict';

  if( globalThis.requestAnimationFrame ){
    return globalThis.requestAnimationFrame( callback_fun );
  }
  else if( globalThis.webkitRequestAnimationFrame ){
    return globalThis.webkitRequestAnimationFrame( callback_fun );
  }
  return globalThis.setTimeout( callback_fun, 1000 / 60 );
}

/**
 * 操作Cookie的工具类
 */
export class CookieTool {

  /**
   * 获取字符串形式的浏览器cookie
   *
   * @returns {String} 返回字符串形式的浏览器cookie
   */
  static GetCookie2String(){
    return globalThis.document.cookie;
  }

  /**
   * 获取一个对象，里头都是键值对形式的浏览器cookie
   *
   * @returns {Object} 返回一个对象，里头都是键值对形式的浏览器cookie
   */
  static GetCookie2Object(){
    const result = {};

    let arr1 = [];

    globalThis.document.cookie.split( '; ' )
      .forEach( ( c, i, a ) => {
        arr1 = c.split( '=' );

        result[ arr1[ 0 ] ] = arr1[ 1 ];
      } );

    return result;
  }

}

/**
 * 服务器发送事件(Server-Sent Event)客户端类
 */
export class SSE4Client {

  /**
   * SSE客户端实例
   */
  sse4Client;

  #onError;

  #onMessage;

  #onOpen;

  /**
   * 构造函数<br />
   * PS:<br />
   * 1、EventSource实例打开到HTTP服务器的持久连接，该服务器以“text/event-stream”格式发送事件。<br />
   * 2、连接打开后，来自服务器的传入消息将以事件的形式传递到代码中。如果传入消息中有事件字段，则触发的事件与事件字段值相同。如果不存在事件字段，则会触发一般消息事件。<br />
   * 3、例如，EventSource是一种有用的方法，用于处理社交媒体状态更新、新闻源或将数据传递到客户端存储机制（如IndexedDB或web存储）中。<br />
   * 4、当不在HTTP/2上使用时，SSE会受到最大打开连接数的限制，这在打开各种选项卡时会特别痛苦，因为每个浏览器的限制是非常低的（6）。<br />
   * 这个问题在Chrome和Firefox中被标记为“无法修复”。这个限制是针对每个浏览器+域的，<br />
   * 这意味着您可以在所有选项卡上打开6个SSE连接www.example1.com网站还有6个SSE连接到www.example2.com。（从Stackoverflow）。<br />
   * 使用HTTP/2时，服务器和客户端之间协商的同时HTTP流的最大数量（默认为100）。<br />
   * 5、不是所有主流浏览器均支持Server-Sent Event，如Edge(旧版的，基于KHTML的那个Edge)、Internet Explorer不支持的。
   *
   * @param url 字符串，它表示服务事件/消息的远程资源的位置，必须
   *
   * @param opt JSON配置对象<br />
   * {<br />
   * withCredentials: true，布尔值，默认值是true，指示是否应将CORS设置为包括凭据，可选<br />
   * PS:<br />
   * 关于跨域请求头。<br />
   *   1)当Access-Control-Allow-Origin:*时，不允许使用凭证（即不能设置诸如withCredentials:true、credentials:"include"之类），即不能携带上诸如Cookie之类的凭证。<br />
   *   2)当Access-Control-Allow-Origin:*时，只需确保客户端在发出CORS请求时凭据标志的值为false就可以了：<br />
   *     如果请求使用XMLHttpRequest发出，请确保withCredentials为false。<br />
   *     如果使用服务器发送事件，确保EventSource.withCredentials是false（这是默认值）。<br />
   *     如果使用Fetch API，请确保Request.credentials是"omit"，"omit"表示忽略诸如Cookie之类的凭证。<br />
   *   3)要想客户端既能发起跨域请求，又想将客户端携带的凭证（诸如Cookie之类的凭证）附加到跨域请求上传给服务端，<br />
   *     那么服务端的响应头得如下设置：<br />
   *     'Access-Control-Allow-Credentials': true、<br />
   *     'Access-Control-Allow-Origin': '允许发起跨域请求的客户端的Origin（如：https://localhost:8100），就是不可以是通配符“*”'、<br />
   *     'Vary': 'Origin' <br />
   *     客户端也得如下设置：<br />
   *     确保客户端在发出CORS请求时凭据标志的值为true就可以了：<br />
   *     如果请求使用XMLHttpRequest发出，请确保withCredentials为true。<br />
   *     如果使用服务器发送事件，确保EventSource.withCredentials是true。<br />
   *     如果使用Fetch API，请确保Request.credentials是"include"。<br />
   *
   * onError: ( sse4Client, event ) => {}，是在发生错误并且在EventSource对象上分派error事件时调用的EventHandler，可选。<br /><br />
   *
   * onMessage: ( sse4Client, event, data ) => {}，是在收到消息事件（即消息来自源）时调用的EventHandler，可选。<br /><br />
   *
   * onOpen: ( sse4Client, event ) => {}，是在接收到打开事件（即刚打开连接时）时调用的EventHandler，可选。
   */
  constructor( url, {
    withCredentials = true,
    onError = ( sse4Client, event ) => {
    },
    onMessage = ( sse4Client, event, data ) => {
    },
    onOpen = ( sse4Client, event ) => {
    },
  } = {} ){
    this.sse4Client = new EventSource( url, { withCredentials } );

    this.#onError = onError;
    this.#onMessage = onMessage;
    this.#onOpen = onOpen;

    this.sse4Client.onerror = ( ...rest ) => {
      this.#onError( this.sse4Client, ...rest );
    };
    this.sse4Client.onmessage = event => {
      this.#onMessage( this.sse4Client, event, event.data );
    };
    this.sse4Client.onopen = ( ...rest ) => {
      this.#onOpen( this.sse4Client, ...rest );
    };
  }

  /**
   * 关闭连接（如果建立了连接），并设置EventSource.readyState属性为2（closed）。如果连接已经关闭，则该方法不执行任何操作。
   */
  close(){
    this.sse4Client.close();
  }

  /**
   * 是在发生错误并且在EventSource对象上分派error事件时调用的EventHandler。
   *
   * @param eventFun 函数，该事件函数有两个参数(sse4Client, event)，可选
   */
  setOnError( eventFun = ( sse4Client, event ) => {
  } ){
    this.#onError = eventFun;
  }

  /**
   * 是在收到消息事件（即消息来自源）时调用的EventHandler。
   *
   * @param eventFun 函数，该事件函数有三个参数(sse4Client, event, data)，可选
   */
  setOnMessage( eventFun = ( sse4Client, event, data ) => {
  } ){
    this.#onMessage = eventFun;
  }

  /**
   * 是在接收到打开事件（即刚打开连接时）时调用的EventHandler。
   *
   * @param eventFun 函数，该事件函数有两个参数(sse4Client, event)，可选
   */
  setOnOpen( eventFun = ( sse4Client, event ) => {
  } ){
    this.#onOpen = eventFun;
  }

  /**
   * 一次性只设置一个自定义监听的事件<br />
   * PS:<br />
   * 1、如：这将只监听与以下类似的事件(this.sse4Client.addEventListener( 'notice', e => {}, false ))<br />
   * event: notice<br />
   * data: useful data<br />
   * id: someid<br />
   * 2、<br />
   * 事件“message”是一种特殊情况，因为它将捕获“没有事件字段”的事件以及具有特定类型“event:message”的事件，它不会在“任何其他事件类型”上触发。
   *
   * @param eventName 字符串，自定义的事件名，必须
   *
   * @param fun 函数，处理事件的函数，有一个参数event，可选
   *
   * @param opt 布尔值，事件的配置参数，默认值是false，可选
   */
  setEvent( eventName, fun = event => {
  }, opt = false ){
    this.sse4Client.addEventListener( eventName, fun, opt );
  }

  /**
   * 一次性设置多个自定义监听的事件<br />
   * PS:<br />
   * 1、如：这将只监听与以下类似的事件(this.sse4Client.addEventListener( 'notice', e => {}, false ))<br />
   * event: notice<br />
   * data: useful data<br />
   * id: someid<br />
   * 2、<br />
   * 事件“message”是一种特殊情况，因为它将捕获“没有事件字段”的事件以及具有特定类型“event:message”的事件，它不会在“任何其他事件类型”上触发。
   *
   * @param eventArr 数组，自定义的事件数组(成员都是一个个对象)，可选<br />
   * PS:该数组的格式如下<br />
   * [<br />
   * {<br />
   * eventName: 字符串，自定义的事件名，必须<br /><br />
   *
   * eventFun: 函数，处理事件的函数，有一个参数event，可选<br /><br />
   *
   * eventOpt: 布尔值，事件的配置参数，默认值是false，可选
   * ]
   */
  setEvents( eventArr = [] ){
    eventArr.forEach( ( {
      eventName,
      eventFun = event => {
      },
      eventOpt = false,
    }, i, a ) => void ( this.setEvent( eventName, eventFun, eventOpt ) ) );
  }

  /**
   * 只读属性返回一个表示连接状态的数字。<br />
   * PS:<br />
   * 1、代表连接状态的数字。可能的值为：<br />
   * 0 — connecting<br />
   * 1 — open<br />
   * 2 — closed<br />
   *
   * @returns {Number} Number
   */
  getReadyState(){
    return this.sse4Client.readyState;
  }

  /**
   * 只读属性返回表示源URL
   *
   * @returns {String} String
   */
  getURL(){
    return this.sse4Client.url;
  }

  /**
   * 只读属性返回一个布尔值，该布尔值指示是否使用CORS凭据集实例化了EventSource对象。<br />
   * PS:<br />
   * 1、一个布尔值，指示是否使用CORS凭据集实例化了EventSource对象（为true）（默认为false）。
   *
   * @returns {Boolean} 一个布尔值，指示是否使用CORS凭据集实例化了EventSource对象（为true）（默认为false）。
   */
  getWithCredentials(){
    return this.sse4Client.withCredentials;
  }

}

/**
 * 用于GraphQL的各种资源上传请求的工具类
 */
export class Upload4GraphQL {

  #ctIns = null;

  #getErrorStrA = ( arg1, arg2 ) => {
    return `FormData中的第${ arg1 }个的数据类型(${ arg2 })不在这三者之中：File、Blob、ArrayBuffer！请自行转换为这三者之一的数据类型！`;
  };

  /**
   * 本类的构造函数
   *
   * @param ctIns 一个CT类的实例(new CT())，必须的
   */
  constructor( ctIns ){
    this.#ctIns = ctIns;
  }

  #handleA( {
    operationName = null,
    query = null,
    variables = null,
    file4KeyName = null,
    isSingleFile = true,
  } = {} ){
    if( query === null ){
      throw new Error( 'query参数必须！' );
    }
    if( variables === null ){
      throw new Error( 'variables参数必须！' );
    }
    if( file4KeyName === null ){
      throw new Error( 'file4KeyName参数必须！' );
    }

    let formData = new FormData(),
      operations_obj = {},
      map_obj = {},
      file4KeyName2Value = null,
      arr1 = null;

    ( this.#ctIns.isString( operationName ) && !this.#ctIns.isEmpty( operationName ) ) && ( operations_obj[ 'operationName' ] = operationName );

    operations_obj[ 'query' ] = query;

    if( !( file4KeyName in variables ) ){
      throw new Error( '“file4KeyName”参数的值不在“variables”参数的各个属性名之中！' );
    }

    file4KeyName2Value = variables[ file4KeyName ];

    if( !this.#ctIns.isFormData( file4KeyName2Value ) ){
      throw new Error( `variables中的“${ file4KeyName }”的属性值的数据类型必须是“FormData”类型！` );
    }

    if( isSingleFile ){
      variables[ file4KeyName ] = null;
    }
    else{
      variables[ file4KeyName ] = [];
    }

    arr1 = Array.from( file4KeyName2Value.keys() );

    if( arr1.length === 0 ){
      throw new Error( `variables中的“${ file4KeyName }”的属性值中至少要有一个文件，也就是说FormData中至少有一个文件！` );
    }

    let source = null;

    if( isSingleFile ){
      source = file4KeyName2Value.get( arr1[ 0 ] );

      if( !( this.#ctIns.isFile( source ) || this.#ctIns.isBlob( source ) || this.#ctIns.isArrayBuffer( source ) ) ){
        throw new Error( this.#getErrorStrA( 1, this.#ctIns.dataT( source ) ) );
      }

      formData.append( arr1[ 0 ], source );
      map_obj[ arr1[ 0 ] ] = [ `variables.${ file4KeyName }`, ];
    }
    else{
      arr1.forEach( ( c, i, a ) => {
        source = file4KeyName2Value.get( c );

        if( !( this.#ctIns.isFile( source ) || this.#ctIns.isBlob( source ) || this.#ctIns.isArrayBuffer( source ) ) ){
          throw new Error( this.#getErrorStrA( i + 1, this.#ctIns.dataT( source ) ) );
        }

        variables[ file4KeyName ].push( null );
        formData.append( c, source );
        map_obj[ c ] = [ `variables.${ file4KeyName }.${ i }`, ];
      } );
    }

    operations_obj[ 'variables' ] = variables;

    formData.append( 'operations', JSON.stringify( operations_obj ) );
    formData.append( 'map', JSON.stringify( map_obj ) );

    return {
      formData,
      operations: operations_obj,
      map: map_obj,
    };
  }

  /**
   * 单文件上传<br />
   * PS:<br />
   * 1、GraphQL上传请求(单文件)的规范<br />
   * https://github.com/jaydenseric/graphql-multipart-request-spec#single-file
   *
   * @param operationName 字符串，默认值null(表示不传)，可选，这个字段的使用遵循GraphQL中的“operationName”的使用方法
   *
   * @param query 字符串，字符串形式的GraphQL语句，必传
   *
   * @param variables 对象，里头的数据格式是key-value形式的，其中涉及用于存放文件的那个key所对应的值必须是FormData的数据类型，<br />
   * 该FormData里头只允许接受三种数据类型的值：File、Blob、ArrayBuffer，必传。<br />
   * 如：<br />
   * variables: {<br />
   * filesA: formData,<br />
   * <br />
   * PS：该工具在处理“formData”过程中的规范说明！请使用者注意看说明再使用！<br />
   * 1、在“单文件上传”的操作中，只取“formData”中第一个文件，其他都不取。<br />
   * 2、在“formData”中的各个“key”都必须是唯一的！<br />
   * 3、在“formData”中，如果同一个“key”存放了多个文件，那也只取其第一个文件。<br />
   *
   * @param file4KeyName 字符串，用于说明在上面“variables”字段中用于存放文件的那个key的名字，必传
   *
   * @returns {FormData} FormData，该FormData已经封装好了请求所需要的所有数据，可以直接使用在具体请求中了。<br />
   * 主要有两个规范必须要传的字段：operations、map，以及要上传的文件。
   */
  singleFile( {
    operationName = null,
    query = null,
    variables = null,
    file4KeyName = null,
  } = {} ){
    if( query === null ){
      throw new Error( 'query参数必须！' );
    }
    if( variables === null ){
      throw new Error( 'variables参数必须！' );
    }
    if( file4KeyName === null ){
      throw new Error( 'file4KeyName参数必须！' );
    }

    return this.#handleA( {
      operationName,
      query,
      variables,
      file4KeyName,
      isSingleFile: true,
    } ).formData;
  }

  /**
   * 多文件上传<br />
   * PS:<br />
   * 1、GraphQL上传请求(多文件)的规范<br />
   * https://github.com/jaydenseric/graphql-multipart-request-spec#file-list
   *
   * @param operationName 字符串，默认值null(表示不传)，可选，这个字段的使用遵循GraphQL中的“operationName”的使用方法
   *
   * @param query 字符串，字符串形式的GraphQL语句，必传
   *
   * @param variables 对象，里头的数据格式是key-value形式的，其中涉及用于存放文件的那个key所对应的值必须是FormData的数据类型，<br />
   * 该FormData里头只允许接受三种数据类型的值：File、Blob、ArrayBuffer，必传。<br />
   * 如：<br />
   * variables: {<br />
   * filesA: formData,<br />
   * <br />
   * PS：该工具在处理“formData”过程中的规范说明！请使用者注意看说明再使用！<br />
   * 1、在“formData”中的各个“key”都必须是唯一的！<br />
   * 3、在“formData”中，如果同一个“key”存放了多个文件，那也只取其第一个文件。<br />
   *
   * @param file4KeyName 字符串，用于说明在上面“variables”字段中用于存放文件的那个key的名字，必传
   *
   * @returns {FormData} FormData，该FormData已经封装好了请求所需要的所有数据，可以直接使用在具体请求中了。<br />
   * 主要有两个规范必须要传的字段：operations、map，以及要上传的各个文件。
   */
  multipleFiles( {
    operationName = null,
    query = null,
    variables = null,
    file4KeyName = null,
  } = {} ){
    if( query === null ){
      throw new Error( 'query参数必须！' );
    }
    if( variables === null ){
      throw new Error( 'variables参数必须！' );
    }
    if( file4KeyName === null ){
      throw new Error( 'file4KeyName参数必须！' );
    }

    return this.#handleA( {
      operationName,
      query,
      variables,
      file4KeyName,
      isSingleFile: false,
    } ).formData;
  }

  /**
   * 文件上传的“批操作”，不同于“多文件上传”，具体请看下面的规范说明地址<br />
   * PS:<br />
   * 1、GraphQL上传请求(批操作)的规范<br />
   * https://github.com/jaydenseric/graphql-multipart-request-spec#batching
   *
   * @param opeArr 数组，必须，里头的成员都是一个个对象，对象里头的具体字段如下：<br />
   * {<br />
   * operationName,<br />
   * query,<br />
   * variables,<br />
   * file4KeyName,<br />
   * // 默认值是true，必须，布尔值，用于说明该操作是单文件操作还是多文件操作，默认是单文件操作。<br />
   * isSingleFile,<br />
   * <br />
   * PS：<br />
   * 1、“isSingleFile”为true时，表示该操作是单文件操作，那么其他字段的说明请查阅“singleFile”函数的说明。<br />
   * 2、“isSingleFile”为false时，表示该操作是多文件操作，那么其他字段的说明请查阅“multipleFiles”函数的说明。<br />
   *
   * @returns {FormData} FormData，该FormData已经封装好了请求所需要的所有数据，可以直接使用在具体请求中了。<br />
   * 主要有两个规范必须要传的字段：operations、map，以及要上传的各个文件。
   */
  batching( opeArr = null ){
    if( opeArr === null ){
      throw new Error( '参数必须！' );
    }

    let operationsAll_arr = [],
      mapAll_arr = [],
      formDataAll = new FormData(),
      arr1 = [],
      index_num = 0;

    opeArr.forEach( ( {
      operationName = null,
      query = null,
      variables = null,
      file4KeyName = null,
      isSingleFile = true,
    }, i, a ) => {
      if( query === null ){
        throw new Error( 'query参数必须！' );
      }
      if( variables === null ){
        throw new Error( 'variables参数必须！' );
      }
      if( file4KeyName === null ){
        throw new Error( 'file4KeyName参数必须！' );
      }

      let {
        formData,
        operations,
        map,
      } = this.#handleA( {
        operationName,
        query,
        variables,
        file4KeyName,
        isSingleFile,
      } );

      operationsAll_arr.push( operations );

      if( isSingleFile ){
        mapAll_arr.push( [
          index_num,
          [
            `${ i }.${ Array.from( Object.values( map ) )
              .flat( Infinity )[ 0 ] }`,
          ],
        ] );

        ++index_num;
      }
      else{
        Array.from( Object.values( map ) )
          .flat( Infinity )
          .forEach( ( c1, i1, a1 ) => {
            mapAll_arr.push( [
              index_num,
              [
                `${ i }.${ c1 }`,
              ],
            ] );

            ++index_num;
          } );
      }

      let formData4KeyNames = Array.from( formData.keys() );

      formData4KeyNames.splice( formData4KeyNames.indexOf( 'operations' ), 1, );
      formData4KeyNames.splice( formData4KeyNames.indexOf( 'map' ), 1, );

      formData4KeyNames.forEach( ( c, i, a ) => void ( arr1.push( formData.get( c ) ) ) );
    } );

    formDataAll.append( 'operations', JSON.stringify( operationsAll_arr ) );
    formDataAll.append( 'map', JSON.stringify( Object.fromEntries( mapAll_arr ) ) );

    arr1.forEach( ( c, i, a ) => void ( formDataAll.append( i, c ) ) );

    return formDataAll;
  }

}

/**
 * 基于“Proxy”编写的“Web服务器客户端”
 */
export class WebService4Proxy {

  /**
   * 字符串，具体请求URL的公共头部分，如：http://192.168.1.2:9999/SimServer/，必须
   */
  baseUrl;

  /**
   * 一个CT类的实例(new CT())，必须的
   */
  ctIns;

  /**
   * 处理数据的类型
   */
  type4ResponseData = [
    'arrayBuffer',
    'blob',
    'formData',
    'json',
    'text',
  ];

  /**
   * 本类的构造函数
   *
   * @param ctIns 一个CT类的实例(new CT())，必须的
   *
   * @param baseUrl 字符串，具体请求URL的公共头部分，如：http://192.168.1.2:9999/SimServer/，必须
   */
  constructor( ctIns, baseUrl ){
    this.baseUrl = baseUrl;
    this.ctIns = ctIns;
  }

  /**
   * 创建具体请求并使用具体请求<br />
   * PS:<br />
   * 1、跨域情况下，会先发出OPTIONS请求，其响应成功后才会去请求真正的post、delete、put请求。
   *
   * @param baseUrl 字符串，具体请求URL的公共头部分，如：http://192.168.1.2:9999/SimServer/，默认就行，可选<br />
   * PS：<br />
   * 1、默认就行(默认值取得是类的构造函数的第一个参数值)。<br />
   * 2、传的话会取代上面调用类的构造参数。<br />
   *
   * @param type 字符串，响应回来的数据的预处理类型('arrayBuffer'、'blob'、'formData'、'json'、'text')，可选<br />
   * PS：<br />
   * 1、不传的话，响应回来的数据将是原样的！<br />
   * 2、如果传的话，也只能传上面提到的5种！否则，响应回来的数据将是原样的！<br />
   *
   * @returns {Proxy} Proxy实例
   */
  create( {
    baseUrl = this.baseUrl,
    type,
  } = {} ){
    let _this = this;

    return new Proxy( {}, {
      get( target, propKey, receiver ){
        return ( {
          // 这里的url参数可传可不传！！！传的话最终完整的请求URL会被拼接成：最终的baseUrl的值 + 具体方法名(也就是指propKey的值) + url
          url = '',
          // 该参数的具体信息看CT的fetch()的第二个参数描述
          events = {},
          // 该参数的具体信息看CT的fetch()的第三个参数描述
          options = {},
        } = {} ) => _this.ctIns.fetch( `${ baseUrl }${ propKey }${ url }`, events, options )
          .then( response => {
            if( _this.type4ResponseData.includes( type ) && response && response.ok && response.status === 200 ){
              return response.clone()[ type ]();
            }
            else{
              return response;
            }
          } );
      },
      set( target, propKey, value, receiver ){
        return Reflect.set( target, propKey, value, receiver );
      },
    } );
  }

  /**
   * 创建具体请求并使用具体请求(响应到客户端的数据会被预先处理成“arrayBuffer”类型的数据)
   *
   * @param baseUrl 字符串，具体请求URL的公共头部分，如：http://192.168.1.2:9999/SimServer/，默认就行，可选<br />
   * PS：<br />
   * 1、默认就行(默认值取得是类的构造函数的第一个参数值)。<br />
   * 2、传的话会取代上面调用类的构造参数。<br />
   *
   * @returns {Proxy} Proxy实例
   */
  arrayBuffer( baseUrl ){
    'use strict';

    return this.create( {
      baseUrl,
      type: 'arrayBuffer',
    } );
  }

  /**
   * 创建具体请求并使用具体请求(响应到客户端的数据会被预先处理成“blob”类型的数据)
   *
   * @param baseUrl 字符串，具体请求URL的公共头部分，如：http://192.168.1.2:9999/SimServer/，默认就行，可选<br />
   * PS：<br />
   * 1、默认就行(默认值取得是类的构造函数的第一个参数值)。<br />
   * 2、传的话会取代上面调用类的构造参数。<br />
   *
   * @returns {Proxy} Proxy实例
   */
  blob( baseUrl ){
    'use strict';

    return this.create( {
      baseUrl,
      type: 'blob',
    } );
  }

  /**
   * 创建具体请求并使用具体请求(响应到客户端的数据会被预先处理成“formData”类型的数据)
   *
   * @param baseUrl 字符串，具体请求URL的公共头部分，如：http://192.168.1.2:9999/SimServer/，默认就行，可选<br />
   * PS：<br />
   * 1、默认就行(默认值取得是类的构造函数的第一个参数值)。<br />
   * 2、传的话会取代上面调用类的构造参数。<br />
   *
   * @returns {Proxy} Proxy实例
   */
  formData( baseUrl ){
    'use strict';

    return this.create( {
      baseUrl,
      type: 'formData',
    } );
  }

  /**
   * 创建具体请求并使用具体请求(响应到客户端的数据会被预先处理成“json”类型的数据)
   *
   * @param baseUrl 字符串，具体请求URL的公共头部分，如：http://192.168.1.2:9999/SimServer/，默认就行，可选<br />
   * PS：<br />
   * 1、默认就行(默认值取得是类的构造函数的第一个参数值)。<br />
   * 2、传的话会取代上面调用类的构造参数。<br />
   *
   * @returns {Proxy} Proxy实例
   */
  json( baseUrl ){
    'use strict';

    return this.create( {
      baseUrl,
      type: 'json',
    } );
  }

  /**
   * 创建具体请求并使用具体请求(响应到客户端的数据会被预先处理成“text”类型的数据)
   *
   * @param baseUrl 字符串，具体请求URL的公共头部分，如：http://192.168.1.2:9999/SimServer/，默认就行，可选<br />
   * PS：<br />
   * 1、默认就行(默认值取得是类的构造函数的第一个参数值)。<br />
   * 2、传的话会取代上面调用类的构造参数。<br />
   *
   * @returns {Proxy} Proxy实例
   */
  text( baseUrl ){
    'use strict';

    return this.create( {
      baseUrl,
      type: 'text',
    } );
  }

  /**
   * 创建"post"类型的具体请求并使用具体请求<br />
   * PS:<br />
   * 1、跨域情况下，会先发出OPTIONS请求，其响应成功后才会去请求真正的post请求。
   *
   * @param baseUrl 字符串，具体请求URL的公共头部分，如：http://192.168.1.2:9999/SimServer/，默认就行，可选<br />
   * PS：<br />
   * 1、默认就行(默认值取得是类的构造函数的第一个参数值)。<br />
   * 2、传的话会取代上面调用类的构造参数。<br />
   *
   * @param type 字符串，响应回来的数据的预处理类型('arrayBuffer'、'blob'、'formData'、'json'、'text')，可选<br />
   * PS：<br />
   * 1、不传的话，响应回来的数据将是原样的！<br />
   * 2、如果传的话，也只能传上面提到的5种！否则，响应回来的数据将是原样的！<br />
   *
   * @returns {Proxy} Proxy实例
   */
  post( {
    baseUrl = this.baseUrl,
    type,
  } = {} ){
    let _this = this;

    return new Proxy( {}, {
      get( target, propKey, receiver ){
        return ( {
          // 这里的url参数可传可不传！！！传的话最终完整的请求URL会被拼接成：最终的baseUrl的值 + 具体方法名(也就是指propKey的值) + url
          url = '',
          // 该参数的具体信息看CT的fetch()的第二个参数描述
          events = {},
          // 该参数的具体信息看CT的fetch()的第三个参数描述
          options = {},
        } = {} ) => _this.ctIns.fetch( `${ baseUrl }${ propKey }${ url }`, events, Object.assign( options, {
          method: 'POST',
        } ) )
          .then( response => {
            if( _this.type4ResponseData.includes( type ) && response && response.ok && response.status === 200 ){
              return response.clone()[ type ]();
            }
            else{
              return response;
            }
          } );
      },
      set( target, propKey, value, receiver ){
        return Reflect.set( target, propKey, value, receiver );
      },
    } );
  }

  /**
   * 创建"delete"类型的具体请求并使用具体请求<br />
   * PS:<br />
   * 1、跨域情况下，会先发出OPTIONS请求，其响应成功后才会去请求真正的delete请求。
   *
   * @param baseUrl 字符串，具体请求URL的公共头部分，如：http://192.168.1.2:9999/SimServer/，默认就行，可选<br />
   * PS：<br />
   * 1、默认就行(默认值取得是类的构造函数的第一个参数值)。<br />
   * 2、传的话会取代上面调用类的构造参数。<br />
   *
   * @param type 字符串，响应回来的数据的预处理类型('arrayBuffer'、'blob'、'formData'、'json'、'text')，可选<br />
   * PS：<br />
   * 1、不传的话，响应回来的数据将是原样的！<br />
   * 2、如果传的话，也只能传上面提到的5种！否则，响应回来的数据将是原样的！<br />
   *
   * @returns {Proxy} Proxy实例
   */
  delete( {
    baseUrl = this.baseUrl,
    type,
  } = {} ){
    let _this = this;

    return new Proxy( {}, {
      get( target, propKey, receiver ){
        return ( {
          // 这里的url参数可传可不传！！！传的话最终完整的请求URL会被拼接成：最终的baseUrl的值 + 具体方法名(也就是指propKey的值) + url
          url = '',
          // 该参数的具体信息看CT的fetch()的第二个参数描述
          events = {},
          // 该参数的具体信息看CT的fetch()的第三个参数描述
          options = {},
        } = {} ) => _this.ctIns.fetch( `${ baseUrl }${ propKey }${ url }`, events, Object.assign( options, {
          method: 'DELETE',
        } ) )
          .then( response => {
            if( _this.type4ResponseData.includes( type ) && response && response.ok && response.status === 200 ){
              return response.clone()[ type ]();
            }
            else{
              return response;
            }
          } );
      },
      set( target, propKey, value, receiver ){
        return Reflect.set( target, propKey, value, receiver );
      },
    } );
  }

  /**
   * 创建"put"类型的具体请求并使用具体请求<br />
   * PS:<br />
   * 1、跨域情况下，会先发出OPTIONS请求，其响应成功后才会去请求真正的put请求。
   *
   * @param baseUrl 字符串，具体请求URL的公共头部分，如：http://192.168.1.2:9999/SimServer/，默认就行，可选<br />
   * PS：<br />
   * 1、默认就行(默认值取得是类的构造函数的第一个参数值)。<br />
   * 2、传的话会取代上面调用类的构造参数。<br />
   *
   * @param type 字符串，响应回来的数据的预处理类型('arrayBuffer'、'blob'、'formData'、'json'、'text')，可选<br />
   * PS：<br />
   * 1、不传的话，响应回来的数据将是原样的！<br />
   * 2、如果传的话，也只能传上面提到的5种！否则，响应回来的数据将是原样的！<br />
   *
   * @returns {Proxy} Proxy实例
   */
  put( {
    baseUrl = this.baseUrl,
    type,
  } = {} ){
    let _this = this;

    return new Proxy( {}, {
      get( target, propKey, receiver ){
        return ( {
          // 这里的url参数可传可不传！！！传的话最终完整的请求URL会被拼接成：最终的baseUrl的值 + 具体方法名(也就是指propKey的值) + url
          url = '',
          // 该参数的具体信息看CT的fetch()的第二个参数描述
          events = {},
          // 该参数的具体信息看CT的fetch()的第三个参数描述
          options = {},
        } = {} ) => _this.ctIns.fetch( `${ baseUrl }${ propKey }${ url }`, events, Object.assign( options, {
          method: 'PUT',
        } ) )
          .then( response => {
            if( _this.type4ResponseData.includes( type ) && response && response.ok && response.status === 200 ){
              return response.clone()[ type ]();
            }
            else{
              return response;
            }
          } );
      },
      set( target, propKey, value, receiver ){
        return Reflect.set( target, propKey, value, receiver );
      },
    } );
  }

  /**
   * 创建"get"类型的具体请求并使用具体请求
   *
   * @param baseUrl 字符串，具体请求URL的公共头部分，如：http://192.168.1.2:9999/SimServer/，默认就行，可选<br />
   * PS：<br />
   * 1、默认就行(默认值取得是类的构造函数的第一个参数值)。<br />
   * 2、传的话会取代上面调用类的构造参数。<br />
   *
   * @param type 字符串，响应回来的数据的预处理类型('arrayBuffer'、'blob'、'formData'、'json'、'text')，可选<br />
   * PS：<br />
   * 1、不传的话，响应回来的数据将是原样的！<br />
   * 2、如果传的话，也只能传上面提到的5种！否则，响应回来的数据将是原样的！<br />
   *
   * @returns {Proxy} Proxy实例
   */
  get( {
    baseUrl = this.baseUrl,
    type,
  } = {} ){
    let _this = this;

    return new Proxy( {}, {
      get( target, propKey, receiver ){
        return ( {
          // 这里的url参数可传可不传！！！传的话最终完整的请求URL会被拼接成：最终的baseUrl的值 + 具体方法名(也就是指propKey的值) + url
          url = '',
          // 该参数的具体信息看CT的fetch()的第二个参数描述
          events = {},
          // 该参数的具体信息看CT的fetch()的第三个参数描述
          options = {},
        } = {} ) => _this.ctIns.fetch( `${ baseUrl }${ propKey }${ url }`, events, Object.assign( options, {
          method: 'GET',
        } ) )
          .then( response => {
            if( _this.type4ResponseData.includes( type ) && response && response.ok && response.status === 200 ){
              return response.clone()[ type ]();
            }
            else{
              return response;
            }
          } );
      },
      set( target, propKey, value, receiver ){
        return Reflect.set( target, propKey, value, receiver );
      },
    } );
  }

}

/**
 * WebSocket客户端类
 */
export class WebSocket4Client {

  /**
   * WebSocket客户端实例
   */
  ws4Client;

  #onClose;

  #onError;

  #onMessage;

  #onOpen;

  /**
   * WebSocket客户端类的构造函数<br />
   * PS:<br />
   * 1、异常说明：<br />
   * SECURITY_ERR：尝试连接的端口被阻止。<br />
   *
   * @param url 字符串，要连接的URL；这应该是WebSocket服务器将响应的URL。必须
   *
   * @param opt JSON配置对象，可选<br />
   * {<br />
   * protocols: String|[ String ] 单个协议字符串或协议字符串数组。这些字符串用于指示子协议，以便单个服务器可以实现多个WebSocket子协议<br />
   * （例如，您可能希望一个服务器能够根据指定的协议处理不同类型的交互）。如果不指定协议字符串，则假定为空字符串。<br />
   * 默认值是null，undefined、null、''都表示不传这个参数，所以，不传就别设置任何参数了。<br /><br />
   *
   * onClose: ( ws, event ) => {}，当与WebSocket的连接关闭时触发，该事件有两个参数(ws, event)，可选。<br /><br />
   *
   * onError: ( ws, event ) => {}，当由于错误而关闭与WebSocket的连接时触发，例如无法发送某些数据时触发，该事件有两个参数(ws, event)，可选。<br /><br />
   *
   * onMessage: ( ws, event, data ) => {}，通过WebSocket接收数据时激发，该事件有三个参数(ws, event, data)，可选。<br /><br />
   *
   * onOpen: ( ws, event ) => {}，打开与WebSocket的连接时激发，该事件有两个参数(ws, event)，可选。<br /><br />
   */
  constructor( url, {
    protocols = null,
    onClose = ( ws, event ) => {
    },
    onError = ( ws, event ) => {
    },
    onMessage = ( ws, event, data ) => {
    },
    onOpen = ( ws, event ) => {
    },
  } = {} ){
    !protocols
    ? ( this.ws4Client = new WebSocket( url ) )
    : ( this.ws4Client = new WebSocket( url, protocols ) );

    this.#onClose = onClose;
    this.#onError = onError;
    this.#onMessage = onMessage;
    this.#onOpen = onOpen;

    this.ws4Client.onclose = ( ...rest ) => {
      this.#onClose( this.ws4Client, ...rest );
    };

    this.ws4Client.onerror = ( ...rest ) => {
      this.#onError( this.ws4Client, ...rest );
    };

    this.ws4Client.onmessage = event => {
      this.#onMessage( this.ws4Client, event, event.data );
    };

    this.ws4Client.onopen = ( ...rest ) => {
      this.#onOpen( this.ws4Client, ...rest );
    };
  }

  /**
   * 关闭WebSocket连接<br />
   * PS:<br />
   * 1、异常说明：<br />
   * INVALID_ACCESS_ERR：指定了无效的code。<br />
   * SYNTAX_ERR：“reason”字符串太长或包含未配对的代理项。<br />
   *
   * @param code 数字，默认值为1000(正常关闭；连接成功完成了创建目的。)，可选，指示状态代码的数字值，用于解释为什么关闭连接。如果未指定此参数，则默认值为1005。<br />
   * 有关允许的值，请参见CloseEvent的状态代码列表。<br />
   * https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent#Status_codes<br />
   * PS:<br />
   * 代码必须是1000或介于3000和4999之间。
   *
   * @param reason 字符串，默认值为字符串: '手动关闭！'，可选，易于理解的字符串，说明连接为何关闭。该字符串不得超过123个字节的UTF-8文本（非字符）。
   */
  close( code = 1000, reason = '手动关闭！' ){
    this.ws4Client.close( code, reason );
  }

  /**
   * 往服务器发送数据<br />
   * PS:<br />
   * 1、这个WebSocket.send()方法将要通过WebSocket连接传输到服务器的指定数据排队，将“bufferedAmount”的值增加包含数据所需的字节数。<br />
   * 如果数据无法发送（例如，因为它需要缓冲，但缓冲区已满），套接字将自动关闭。<br />
   * 2、异常说明:<br />
   * INVALID_STATE_ERR：该连接当前未打开。<br />
   * SYNTAX_ERR：数据是具有未配对替代的字符串。<br />
   *
   * @param data 数据发送到服务器。必须，它可能是下列类型之一：<br />
   * 1、String<br />
   * 文本字符串。字符串以UTF-8格式添加到缓冲区中，“bufferedAmount”的值将增加表示UTF-8字符串所需的字节数。<br /><br />
   *
   * 2、ArrayBuffer<br />
   * 您可以发送类型化数组对象使用的基础二进制数据。它的二进制数据内容在缓冲区中排队，从而将bufferedAmount的值增加了必需的字节数。<br /><br />
   *
   * 3、Blob<br />
   * 指定“Blob”会将Blob的原始数据排队，以便在二进制帧中传输。“bufferedAmount”的值随原始数据的字节大小而增加。<br /><br />
   *
   * 4、ArrayBufferView<br />
   * 可以将任何JavaScript类型的数组对象作为二进制帧发送；它的二进制数据内容在缓冲区中排队，从而将“bufferedAmount”的值增加所需的字节数。
   */
  send( data = null ){
    if( data === null ){
      throw new Error( '必须传一个参数给send方法！' );
    }

    this.ws4Client.send( data );
  }

  /**
   * 当与WebSocket的连接关闭时触发。
   *
   * @param eventFun 函数，该事件有两个参数(ws, event)，必须
   */
  setOnClose( eventFun = ( ws, event ) => {
  } ){
    this.#onClose = eventFun;
  }

  /**
   * 当由于错误而关闭与WebSocket的连接时触发，例如无法发送某些数据时触发。
   *
   * @param eventFun 函数，该事件有两个参数(ws, event)，必须
   */
  setOnError( eventFun = ( ws, event ) => {
  } ){
    this.#onError = eventFun;
  }

  /**
   * 通过WebSocket接收数据时激发。
   *
   * @param eventFun 函数，该事件有三个参数(ws, event, data)，必须
   */
  setOnMessage( eventFun = ( ws, event, data ) => {
  } ){
    this.#onMessage = eventFun;
  }

  /**
   * 打开与WebSocket的连接时激发。
   *
   * @param eventFun 函数，该事件有两个参数(ws, event)，必须
   */
  setOnOpen( eventFun = ( ws, event ) => {
  } ){
    this.#onOpen = eventFun;
  }

  /**
   * 只读属性返回连接正在传输的二进制数据的类型。<br />
   * PS:返回如下几个字符串<br />
   * 1、blob：如果使用Blob对象。<br />
   * 2、arraybuffer：如果使用ArrayBuffer对象。<br />
   *
   * @returns {String} String
   */
  getBType(){
    return this.ws4Client.binaryType;
  }

  /**
   * 只读属性返回已使用send()调用排队但尚未传输到网络的数据字节数。一旦发送完所有排队数据，此值将重置为零。<br />
   * 当连接关闭时，此值不会重置为零；<br />
   * 如果继续调用send()，则此值将继续攀升。
   *
   * @returns {Number} Number
   */
  getBufAmount(){
    return this.ws4Client.bufferedAmount;
  }

  /**
   * 只读属性返回服务器选择的扩展。当前这只是空字符串或由连接协商的扩展名列表。
   *
   * @returns {String} String
   */
  getExtensions(){
    return this.ws4Client.extensions;
  }

  /**
   * 只读属性返回服务器选择的子协议的名称；这将是创建WebSocket对象时在protocols参数中指定的字符串之一，如果未建立连接，则为空字符串。
   *
   * @returns {String} String
   */
  getProtocol(){
    return this.ws4Client.protocol;
  }

  /**
   * 只读属性返回WebSocket连接的当前状态。<br />
   * 返回以下无符号整数值之一：<br />
   * 0    CONNECTING    套接字已创建。连接尚未打开。Socket has been created. The connection is not yet open.<br />
   * 1    OPEN        连接已打开，可以进行通讯了。The connection is open and ready to communicate.<br />
   * 2    CLOSING        连接正在关闭中。The connection is in the process of closing.<br />
   * 3    CLOSED        连接已关闭或无法打开。The connection is closed or couldn't be opened.<br />
   *
   * @returns {Number} Number
   */
  getReadyState(){
    return this.ws4Client.readyState;
  }

  /**
   * 只读属性返回由构造函数解析的WebSocket的绝对URL。
   *
   * @returns {String} String
   */
  getURL(){
    return this.ws4Client.url;
  }

}

// 为了方便管理，以后只要是给CT类增加的工具类，只要把这个类添加到toolsClass_objC中就行！
// 这个对象的每一个键名是具体的工具类名，键值是具体的工具类！
// new CT().getClass()返回的就是toolsClass_objC！
const toolsClass_objC = {
  CookieTool,
  // 服务器发送事件(Server-Sent Event)客户端类
  SSE4Client,
  // 用于GraphQL的各种资源上传请求的工具类
  Upload4GraphQL,
  // WebService4Proxy类
  WebService4Proxy,
  // WebSocket客户端类
  WebSocket4Client,
};

/**
 * JS工具，其中的代码都是无关任何项目的代码(ES6，ESM模块写法)。<br />
 * 注：<br />
 * 1、都是在当时最新的谷歌浏览器PC版上测试。<br />
 * 2、注意默认的初始化操作带来的影响<br />
 * 3、该工具支持在浏览器、Node、Deno等多种支持JS的宿主环境中使用！<br />
 */
export class CT {

  // 类实例属性 Start

  /**
   * 查找所有节点，处理所有节点，有返回值(存放在数组里)
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param fun 需要执行的函数，会传入一个Element参数，必需
   *
   * @returns {Array} 数组[*]
   */
  allElemHan;

  /**
   * 停止所有类型的传播(捕获和冒泡)，禁止默认事件
   *
   * @param event 事件对象，必需
   *
   * @returns {Element} Element节点
   */
  allEStop;

  /**
   * 查找节点，但只处理第一个节点，有返回值(任何类型数据)
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需，但只处理第一个节点
   *
   * @param fun 需要执行的函数，会传入一个Element参数，必需
   *
   * @returns {*} 任何类型数据
   */
  firstElemHan;

  /**
   * 自定义抛出错误、异常信息
   *
   * @param info_str 字符串，错误、异常信息，默认值'默认错误信息！'，必须！
   */
  gError;

  /**
   * 操作localStorage的工具<br />
   * 使用方法：<br />
   * new CT().ls.aD()<br />
   * {aD, dD, uD, qD, cD, isKN, storageCE等7个方法}
   */
  ls;

  name = '';

  /**
   * ready加强版
   *
   * @returns {Function} 函数，有一个f参数(所要执行的函数)，必需
   */
  readyS;

  /**
   * 操作sessionStorage的工具<br />
   * 使用方法：<br />
   * new CT().ss.aD()<br />
   * {aD, dD, uD, qD, cD, isKN, storageCE等7个方法}
   */
  ss;

  /**
   * 本类的版本号，如：2024.01.01.1
   */
  version = '';

  // 类实例属性 End

  /**
   * 构造函数，用于初始化工作
   *
   * @param opt JSON配置对象，可选<br />
   * {<br />
   * isSupportBrowser: 布尔值，如果要将CT工具用于浏览器环境，那么传true可以自动初始化浏览器环境的各种功能；<br />
   * 如果不是用于浏览器环境(如：用于NodeJS)，那么传false就不会初始化跟浏览器相关的操作功能。<br />
   * 可选，默认值true。<br /><br />
   */
  constructor( {
    isSupportBrowser = true,
  } = {} ){
    if( isSupportBrowser ){
      /**
       * 查找所有节点，处理所有节点，有返回值(存放在数组里)
       *
       * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
       * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
       *
       * @param fun 需要执行的函数，会传入一个Element参数，必需
       *
       * @returns {Array} 数组[*]
       */
      this.allElemHan = IsHandle10.bind( this );

      /**
       * 停止所有类型的传播(捕获和冒泡)，禁止默认事件
       *
       * @param event 事件对象，必需
       *
       * @returns {Element} Element节点
       */
      this.allEStop = AllEStop.bind( this );

      /**
       * 查找节点，但只处理第一个节点，有返回值(任何类型数据)
       *
       * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
       * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需，但只处理第一个节点
       *
       * @param fun 需要执行的函数，会传入一个Element参数，必需
       *
       * @returns {*} 任何类型数据
       */
      this.firstElemHan = IsHandle13.bind( this );

      /**
       * 操作localStorage的工具<br />
       * 使用方法：<br />
       * new CT().ls.aD()<br />
       * {aD, dD, uD, qD, cD, isKN, storageCE等7个方法}
       */
      this.ls = IsHandle14.call( this, localStorage );

      /**
       * ready加强版
       *
       * @returns {Function} 函数，有一个f参数(所要执行的函数)，必需
       */
      this.readyS = ( () => {
        let funcs = [],
          ready = false,
          handler = e => {
            if( ready ){
              return;
            }
            if( e.type === 'onreadystatechange' && document.readyState !== 'complete' ){
              return;
            }
            for(
              let i = 0;
              i < funcs.length;
              i++
            ){
              funcs[ i ].call( document );
            }
            ready = true;
            funcs = null;
          };
        if( globalThis[ 'isOpenReadyS' ] !== true ){
          if( document.addEventListener ){
            document.addEventListener( 'DOMContentLoaded', handler, false );
            document.addEventListener( 'readystatechange', handler, false );
            globalThis.addEventListener( 'load', handler, false );
          }
          else if( document.attachEvent ){
            document.attachEvent( 'onreadystatechange', handler );
            globalThis.attachEvent( 'onload', handler );
          }
          globalThis[ 'isOpenReadyS' ] = true;
        }
        return ( f = ( () => {
        } ) ) => void ( ready
                        ? ( f.call( document ) )
                        : ( funcs.push( f ) ) );
      } )();

      /**
       * 操作sessionStorage的工具<br />
       * 使用方法：<br />
       * new CT().ss.aD()<br />
       * {aD, dD, uD, qD, cD, isKN, storageCE等7个方法}
       */
      this.ss = IsHandle14.call( this, sessionStorage );
    }

    /**
     * 自定义抛出错误、异常信息
     *
     * @param info_str 字符串，错误、异常信息，默认值'默认错误信息！'，必须！
     */
    this.gError = GetError;

    this.name = 'CT';

    this.version = '2024.01.01.1';

    Init( this, isSupportBrowser );
  }

  /**
   * 获取各个工具类
   *
   * @returns {Object} 对象(里头是各个工具类)，这个对象的每一个键名是具体的工具类名，键值是具体的工具类。
   */
  getClass(){
    return toolsClass_objC;
  }

  // Blob、dataURL、Canvas、Image的相互转换 Start

  /**
   * Blob对象转canvas对象，canvas对象会在回调函数的第一个参数里
   *
   * @param blob Blob对象，必须
   *
   * @param callback 回调函数，会有3个参数canvas节点对象(HTMLCanvasElement)、image节点对象(HTMLImageElement)、context，必须
   */
  blobToCanvas( blob, callback ){
    this.fileOrBlobToDataURL( blob, ( dataURL, event, fileReader ) => void ( this.dataURLOrImgSrcToCanvas( dataURL, callback ) ) );
  }

  /**
   * Blob对象转Image对象，Image对象会在回调函数的第一个参数里
   *
   * @param blobObj Blob对象，必须
   *
   * @param callback 回调函数，有4个参数，image, dataURL(image.src), event(Image的onload的事件函数), fileReader，必须
   */
  blobToImg( blobObj, callback ){
    this.fileOrBlobToDataURL( blobObj, ( dataURL, event, fileReader ) => {
      let image = new Image();
      image.onload = event => void ( callback && callback( image, dataURL, event, fileReader ) );
      image.src = dataURL;
    } );
  }

  /**
   * canvas对象转Blob对象
   *
   * @param canvas canvas对象，必须
   *
   * @param format 字符串，目标图片格式(image/png)，必须
   *
   * @param quality number，图像品质，0.0(低)到1.0(高)，必须
   *
   * @returns {Blob} Blob对象
   */
  canvasToBlob( canvas, format, quality ){
    'use strict';

    return this.dataURLToBlob( this.canvasToDataURL( canvas, format, quality ) );
  }

  /**
   * canvas转dataURL，canvas可以被当作图片来处理
   *
   * @param canvas canvas节点对象(HTMLCanvasElement)，必须
   *
   * @param format 字符串，目标图片格式(image/png)，必须
   *
   * @param quality number，图像品质，0.0(低)到1.0(高)，默认1.0，必须
   *
   * @returns {String} string(dataURL)
   */
  canvasToDataURL( canvas, format, quality ){
    'use strict';

    return canvas.toDataURL( format, quality );
  }

  /**
   * canvas对象转image对象<br />
   * PS：<br />
   * 返回值会传给callback回调函数的第二个参数
   *
   * @param canvas canvas节点对象(HTMLCanvasElement)，必须
   *
   * @param format 字符串，目标图片格式，默认，image/png，必须
   *
   * @param quality number，图像品质，0.0(低)到1.0(高)，默认1.0，必须
   *
   * @param callback 回调函数，会有两个参数canvas节点对象(HTMLCanvasElement)、image节点对象(HTMLImageElement)，必须
   */
  canvasToImg( canvas, format = 'image/png', quality = 1.0, callback = ( canvas, image ) => {
  } ){
    let image = new Image();
    image.onload = event => void ( callback( canvas, image ) );
    image.src = canvas.toDataURL( format, quality );
  }

  /**
   * dataURL转canvas、imageSrc(图片地址)转canvas<br />
   * PS：<br />
   * HTMLCanvasElement，canvas节点对象会传给callback回调函数的第一个参数
   *
   * @param dataURL 字符串，dataURL、imageSrc(图片地址)，或者一个HTMLImageElement也行，必须
   *
   * @param callback 回调函数，会有3个参数canvas节点对象(HTMLCanvasElement)、image节点对象(HTMLImageElement)、context对象，必须
   */
  dataURLOrImgSrcToCanvas( dataURL, callback = ( canvas, image, context ) => {
  } ){
    let canvas = document.createElement( 'canvas' ),
      context = canvas.getContext( '2d', { alpha: true } ),
      image = new Image();
    image.onload = event => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage( image, 0, 0 );
      callback( canvas, image, context );
    };
    image.src = IsHandle1.call( this, dataURL, 'HTMLImageElement' )
                ? dataURL.src
                : dataURL;
  }

  /**
   * dataURL转Blob对象
   *
   * @param dataURL 字符串，dataURL，必须
   *
   * @returns {Blob} Blob对象
   */
  dataURLToBlob( dataURL ){
    let arr = dataURL.split( ',' ),
      mime = arr[ 0 ].match( /:(.*?);/ )[ 1 ],
      bstr = atob( arr[ 1 ] ),
      n = bstr.length,
      u8arr = new Uint8Array( n );
    while( n-- ){
      u8arr[ n ] = bstr.charCodeAt( n );
    }
    return new Blob( [ u8arr ], { type: mime } );
  }

  /**
   * dataURL转Image对象
   *
   * @param dataURL 字符串，必须
   *
   * @returns {HTMLImageElement} HTMLImageElement，图片对象
   */
  dataURLToImg( dataURL ){
    let image = new Image();
    image.src = dataURL;
    return image;
  }

  /**
   * File、Blob对象转dataURL<br />
   * PS：<br />
   * dataURL会传给callback回调函数的第一个参数
   *
   * @param obj File、Blob对象，必须
   *
   * @param callback 回调函数，会有3个参数dataURL, event(Image的onload的事件函数), fileReader，必须
   */
  fileOrBlobToDataURL( obj, callback = ( dataURL, event, fileReader ) => {
  } ){
    let fileReader = new FileReader();
    fileReader.readAsDataURL( obj );
    fileReader.onload = event => void ( callback( event.target[ 'result' ], event, fileReader ) );
  }

  /**
   * imageSrc或者HTMLImageElement转Blob，Blob对象会在回调函数的第一个参数里
   *
   * @param imgSrc imageSrc(字符串)或者图片节点(HTMLImageElement)，必须
   *
   * @param format 字符串，目标图片格式(image/png)，必须
   *
   * @param quality number，图像品质，0.0(低)到1.0(高)，必须
   *
   * @param callback 回调函数，有两个参数BlobObj、canvas，必须
   */
  imgSrcToBlob( imgSrc, format, quality, callback ){
    this.dataURLOrImgSrcToCanvas( imgSrc, ( canvas, image, context ) => void ( callback( this.dataURLToBlob( this.canvasToDataURL( canvas, format, quality ) ), canvas ) ) );
  }

  /**
   * Image对象转dataURL，dataURL会在回调函数的第一个参数里
   *
   * @param imgSrc imageSrc(字符串)或者图片节点(HTMLImageElement)，必须
   *
   * @param format 字符串，目标图片格式(image/png)，必须
   *
   * @param quality number，图像品质，0.0(低)到1.0(高)，必须
   *
   * @param callback 回调函数，有3个参数dataURL, canvas, image，必须
   */
  imgToDataURL( imgSrc, format, quality, callback ){
    this.dataURLOrImgSrcToCanvas( imgSrc, ( canvas, image, context ) => void ( callback( this.canvasToDataURL( canvas, format, quality ), canvas, image ) ) );
  }

  // Blob、dataURL、Canvas、Image的相互转换 End

  // 复制、剪切等操作的API方法，加入了“Clipboard API” Start

  /**
   * 复制文本的方法，默认不传值的话是复制当前的URL。<br />
   * 返回“true”，表示复制成功！反之，失败！<br /><br />
   *
   * PS：<br />
   * 复制文本的方法在“长按”的操作中竟然无法复制成功！！！<br />
   * 但是，一般的“tap”点击却可以成功！！！<br />
   * 奇怪！！！奇怪！！！奇怪！！！
   *
   * @param txt_str 字符串String，默认值是当前的URL，可选
   *
   * @returns {boolean} boolean，true表示复制成功！反之，失败！
   */
  copyTxt( txt_str = globalThis.location.href ){
    let inputElem = document.createElement( 'input' ),
      result_boo = false;

    document.body.appendChild( inputElem );
    inputElem.setAttribute( 'type', 'text' );
    inputElem.value = txt_str;
    inputElem.focus();
    inputElem.select();
    inputElem.setSelectionRange( 0, txt_str.length, 'backward' );
    result_boo = document.execCommand( 'copy' );
    document.body.removeChild( inputElem );

    return result_boo;
  }

  /**
   * 使用“Clipboard API”的readText方法读取系统剪切板上第一个文本类型的内容<br />
   * PS：<br />
   * 如果剪贴板为空、不包含文本或在表示剪贴板内容的数据传输对象中不包含文本表示，则返回空字符串。
   *
   * @param fun 函数，有一个参数(text)，可选<br />
   * PS：<br />
   * 如果剪贴板为空、不包含文本或在表示剪贴板内容的数据传输对象中不包含文本表示，则返回空字符串。
   *
   * @param events JSON对象，里头都是各个事件，可选<br />
   * {<br />
   * denied: 函数，当权限状态为“拒绝授权”时执行，可选<br /><br />
   *
   * stateChange: 函数，当权限状态改变时执行，会有一个参数(permissionStatus对象)，可选<br /><br />
   *
   * error: 函数，报错时执行的函数，会有一个参数(error)，可选<br />
   */
  readText4Clip( fun = text => {
  }, events = {} ){
    const clip_objC = navigator.clipboard;

    if( this.isUndefined( clip_objC ) ){
      GetError( '不支持“navigator.clipboard”！' );
    }
    else if( this.isUndefined( clip_objC.readText ) ){
      GetError( '不支持“navigator.clipboard.readText”！' );
    }
    else{
      const readText = () => clip_objC.readText()
        .then( text => void ( fun( text ) ) );

      this.permissionsQuery( {
        name: 'clipboard-read',
      }, Object.assign( {}, {
        denied(){
          GetError( '拒绝授权' );
        },
        stateChange( _this ){
        },
        error( e ){
          GetError( e.message );
        },
      }, events, {
        prompt(){
          readText();
        },
        granted(){
          readText();
        },
      } ) );
    }
  }

  /**
   * 使用“Clipboard API”的read方法读取系统剪切板上第一个内容<br />
   * PS：<br />
   * 1、<br />
   * 当系统剪切板无值或为空时，会报错误：DOMException: No valid data on clipboard.<br />
   *
   * @param fun 函数，有两个参数( data4Blob, type(如：image/png、text/plain一类的字符串) )，可选<br />
   * PS：<br />
   * 1、允许从系统剪切板读取的数据类型如下：<br />
   * text/plain、text/uri-list、text/csv、text/css、text/html、application/xhtml+xml、image/png、image/jpg、image/jpeg、<br />
   * image/gif、image/svg+xml、application/xml、text/xml、application/javascript、application/json、<br />
   * application/octet-stream<br />
   * 2、data4Blob使用说明(Blob有以下4个方法)：<br />
   * Blob slice( start: Number, end: Number, contentType: String )<br />
   * Readable stream()<br />
   * Promise<String> text()<br />
   * Promise<ArrayBuffer> arrayBuffer()<br />
   *
   * @param events JSON对象，里头都是各个事件，可选<br />
   * {<br />
   * denied: 函数，当权限状态为“拒绝授权”时执行，可选<br /><br />
   *
   * stateChange: 函数，当权限状态改变时执行，会有一个参数(permissionStatus对象)，可选<br /><br />
   *
   * error: 函数，报错时执行的函数，会有一个参数(error)，可选<br />
   */
  read4Clip( fun = ( data4Blob, type ) => {
  }, events = {} ){
    const clip_objC = navigator.clipboard;

    if( this.isUndefined( clip_objC ) ){
      GetError( '不支持“navigator.clipboard”！' );
    }
    else if( this.isUndefined( clip_objC.read ) ){
      GetError( '不支持“navigator.clipboard.read”！' );
    }
    else{
      const events_objC = Object.assign( {}, {
          denied(){
            GetError( '拒绝授权' );
          },
          stateChange( _this ){
          },
          error( e ){
            GetError( e.message );
          },
        }, events, {
          prompt(){
            read();
          },
          granted(){
            read();
          },
        } ),
        read = () => clip_objC.read()
          .then( data => void ( data.forEach( c => void ( c.getType( c.types[ 0 ] )
            .then( data4Blob => void ( fun( data4Blob, c.types[ 0 ] ) ) )
            .catch( events_objC.error ) ) ) ) )
          .catch( events_objC.error );

      this.permissionsQuery( {
        name: 'clipboard-read',
      }, events_objC );
    }
  }

  /**
   * 使用“Clipboard API”的writeText方法将一个字符串写入系统剪切板<br />
   * PS：<br />
   * 1、奇怪！！！浏览器竟然对写入系统剪切板的权限没有提示！！！不管其权限是何种状态！！！而且能成功！！！<br />
   *
   * @param str 字符串，写入系统剪切板的一个字符串内容，默认值空字符串，可选
   *
   * @param events JSON对象，里头都是各个事件，可选<br />
   * {<br />
   * success: 函数，将一个字符串成功写入系统剪切板时执行，可选<br /><br />
   *
   * fail: 函数，将一个字符串写入系统剪切板失败时执行，可选<br /><br />
   *
   * denied: 函数，当权限状态为“拒绝授权”时执行，可选<br /><br />
   *
   * stateChange: 函数，当权限状态改变时执行，会有一个参数(permissionStatus对象)，可选<br /><br />
   *
   * error: 函数，报错时执行的函数，会有一个参数(error)，可选<br />
   */
  writeText4Clip( str = '', events = {} ){
    const clip_objC = navigator.clipboard;

    if( this.isUndefined( clip_objC ) ){
      GetError( '不支持“navigator.clipboard”！' );
    }
    else if( this.isUndefined( clip_objC.writeText ) ){
      GetError( '不支持“navigator.clipboard.writeText”！' );
    }
    else{
      const events_objC = Object.assign( {}, {
          success(){
          },
          fail(){
            GetError( '写入失败' );
          },
          denied(){
            GetError( '拒绝授权' );
          },
          stateChange( _this ){
          },
          error( e ){
            GetError( e.message );
          },
        }, events, {
          prompt(){
            writeText();
          },
          granted(){
            writeText();
          },
        } ),
        writeText = () => clip_objC.writeText( str )
          .then( events_objC.success, events_objC.fail );

      this.permissionsQuery( {
        name: 'clipboard-write',
      }, events_objC );
    }
  }

  /**
   * 使用“Clipboard API”的write方法将一个内容写入系统剪切板<br />
   * PS：<br />
   * 1、奇怪！！！浏览器竟然对写入系统剪切板的权限没有提示！！！不管其权限是何种状态！！！而且不能成功写入！！！<br />
   *
   * @param data Blob、DataTransfer，一个写入系统剪切板的数据，必须<br />
   * PS：<br />
   * 1、允许写入系统剪切板的数据类型如下：<br />
   * text/plain、text/uri-list、text/csv、text/html、image/svg+xml、application/xml、text/xml、application/json<br />
   * 2、警告！为了安全起见，不受信任的脚本允许写入剪贴板的数据类型受到限制。<br />
   * 不受信任的脚本可以尝试利用本地软件中的安全漏洞，方法是将已知触发这些漏洞的数据放在剪贴板上。<br />
   *
   * @param events JSON对象，里头都是各个事件，可选<br />
   * {<br />
   * success: 函数，将一个内容成功写入系统剪切板时执行，可选<br /><br />
   *
   * fail: 函数，将一个内容写入系统剪切板失败时执行，可选<br /><br />
   *
   * denied: 函数，当权限状态为“拒绝授权”时执行，可选<br /><br />
   *
   * stateChange: 函数，当权限状态改变时执行，会有一个参数(permissionStatus对象)，可选<br /><br />
   *
   * error: 函数，报错时执行的函数，会有一个参数(error)，可选<br />
   */
  write4Clip( data, events = {} ){
    const clip_objC = navigator.clipboard;

    if( this.isUndefined( clip_objC ) ){
      GetError( '不支持“navigator.clipboard”！' );
    }
    else if( this.isUndefined( clip_objC.write ) ){
      GetError( '不支持“navigator.clipboard.write”！' );
    }
    else{
      const events_objC = Object.assign( {}, {
          success(){
          },
          fail(){
            GetError( '写入失败' );
          },
          denied(){
            GetError( '拒绝授权' );
          },
          stateChange( _this ){
          },
          error( e ){
            GetError( e.message );
          },
        }, events, {
          prompt(){
            write();
          },
          granted(){
            write();
          },
        } ),
        write = () => clip_objC.write( data )
          .then( events_objC.success, events_objC.fail );

      this.permissionsQuery( {
        name: 'clipboard-write',
      }, events_objC );
    }
  }

  // 复制、剪切等操作的API方法，加入了“Clipboard API” End

  // 加密算法Crypto API Start

  /**
   * 使用指定的哈希算法计算Blob类型数据的Hex(base16)编码的哈希值
   *
   * @param dataBlob Blob，需要计算的Blob数据，必须
   *
   * @param algorithm String，可选值有：'SHA-1'、'SHA-256'、'SHA-384'、'SHA-512'，默认值：‘SHA-512'，可选<br />
   * PS：<br />
   * 1、'SHA-1'已经跟'MD5'一样，不再安全了，强烈建议不用！<br />
   *
   * @returns {Promise<String>} Promise<String>
   */
  async getDigest2Hex4Blob( dataBlob, algorithm = 'SHA-512' ){
    if( !this.isBlob( dataBlob ) ){
      GetError( 'dataBlob的数据类型必须是Blob类型！' );
    }

    let hashHex;

    if( 'arrayBuffer' in new Blob() ){
      let arr_AB = await dataBlob.arrayBuffer();
      hashHex = await this.getDigest2Hex4Uint8Array( new Uint8Array( arr_AB ), algorithm );

      return hashHex;
    }
    else{
      hashHex = await new Promise( resolve => {
        let reader = new FileReader();
        reader.onload = async event => {
          let result = await this.getDigest2Hex4Uint8Array( new Uint8Array( event.target.result ), algorithm );

          resolve( result );
        };
        reader.readAsArrayBuffer( dataBlob );
      } );

      return hashHex;
    }
  }

  /**
   * 使用指定的哈希算法计算File类型数据的Hex(base16)编码的哈希值
   *
   * @param dataFile File，需要计算的File数据，必须
   *
   * @param algorithm String，可选值有：'SHA-1'、'SHA-256'、'SHA-384'、'SHA-512'，默认值：‘SHA-512'，可选<br />
   * PS：<br />
   * 1、'SHA-1'已经跟'MD5'一样，不再安全了，强烈建议不用！<br />
   *
   * @returns {Promise<String>} Promise<String>
   */
  async getDigest2Hex4File( dataFile, algorithm = 'SHA-512' ){
    if( !this.isFile( dataFile ) ){
      GetError( 'dataFile的数据类型必须是File类型！' );
    }

    let hashHex;

    if( 'arrayBuffer' in new Blob() ){
      let arr_AB = await dataFile.arrayBuffer();
      hashHex = await this.getDigest2Hex4Uint8Array( new Uint8Array( arr_AB ), algorithm );

      return hashHex;
    }
    else{
      hashHex = await new Promise( resolve => {
        let reader = new FileReader();
        reader.onload = async event => {
          let result = await this.getDigest2Hex4Uint8Array( new Uint8Array( event.target.result ), algorithm );

          resolve( result );
        };
        reader.readAsArrayBuffer( dataFile );
      } );

      return hashHex;
    }
  }

  /**
   * 使用指定的哈希算法计算字符串的Hex(base16)编码的哈希值
   *
   * @param dataStr String，需要计算的字符串数据，必须
   *
   * @param algorithm String，可选值有：'SHA-1'、'SHA-256'、'SHA-384'、'SHA-512'，默认值：‘SHA-512'，可选<br />
   * PS：<br />
   * 1、'SHA-1'已经跟'MD5'一样，不再安全了，强烈建议不用！<br />
   *
   * @returns {Promise<String>} Promise<String>
   */
  async getDigest2Hex4String( dataStr = '', algorithm = 'SHA-512' ){
    const hashHex = await this.getDigest2Hex4Uint8Array( new TextEncoder().encode( String( dataStr ) ), algorithm );

    return hashHex;
  }

  /**
   * 使用指定的哈希算法计算Uint8Array类型数据的Hex(base16)编码的哈希值<br />
   * PS：<br />
   * 1、ArrayBufferView：<br />
   * Int8Array、Uint8Array、Uint8ClampedArray、Int16Array、Uint16Array、<br />
   * Int32Array、Uint32Array、Float32Array、Float64Array、BigInt64Array、<br />
   * BigUint64Array、DataView。<br />
   * 2、只要是能成功的转换成有效(有效：转换过程中没出现精度取舍、丢失等一类的操作)的Uint8Array类型的数据，都可以作为参数使用，<br />
   * 但是需要先自行转换成Uint8Array类型。<br />
   *
   * @param dataUint8Array Uint8Array，需要计算的Uint8Array类型数据，必须
   *
   * @param algorithm String，可选值有：'SHA-1'、'SHA-256'、'SHA-384'、'SHA-512'，默认值：‘SHA-512'，可选<br />
   * PS：<br />
   * 1、'SHA-1'已经跟'MD5'一样，不再安全了，强烈建议不用！<br />
   *
   * @returns {Promise<String>} Promise<String>
   */
  async getDigest2Hex4Uint8Array( dataUint8Array, algorithm = 'SHA-512' ){
    if( !this.isUint8Array( dataUint8Array ) ){
      GetError( 'dataUint8Array的数据类型必须是Uint8Array类型！' );
    }

    // hash the dataUint8Array for ArrayBuffer
    const hashArrayBuffer = await globalThis.crypto.subtle.digest( algorithm, dataUint8Array ),
      // convert hashArrayBuffer to byte array
      hashArray = Array.from( new Uint8Array( hashArrayBuffer ) ),
      // convert hashArray to hex string
      hashHex = hashArray.map( b => b.toString( 16 )
        .padStart( 2, '0' ) )
        .join( '' );

    return hashHex;
  }

  // 加密算法Crypto API End

  // 判断常用信息的格式 Start

  /**
   * 验证邮箱格式
   *
   * @param email 邮箱，字符串，有且只有一个参数，必需
   *
   * @returns {Boolean} boolean，格式正确的邮箱返回true，否则false
   */
  isEmail( email ){
    'use strict';

    return IsHandle3.call( this, email, /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ );
  }

  /**
   * 验证身份证号码格式
   *
   * @param id 身份证号码，字符串或数字串，有且只有一个参数，必需
   *
   * @returns {Boolean} boolean，格式正确的身份证号码返回true，否则false
   */
  isID( id ){
    'use strict';

    return IsHandle3.call( this, id, /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ );
  }

  /**
   * 验证密码强度格式，最少6位，包括至少1个大写字母、1个小写字母、1个数字、1个特殊字符(!@#$%^&*?包括空格)，头尾不能有空格
   *
   * @param passW 密码，字符串，有且只有一个参数，头尾不能有空格，必需
   *
   * @returns {Boolean} boolean，密码强度符合要求则返回true，否则false
   */
  isPassS( passW ){
    'use strict';

    return IsHandle3.call( this, passW, /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/ );
  }

  /**
   * 验证车牌号格式
   *
   * @param plateNum 车牌号，字符串，有且只有一个参数，必需
   *
   * @returns {Boolean} boolean，格式正确的车牌号返回true，否则false
   */
  isPlateNum( plateNum ){
    'use strict';

    return IsHandle3.call( this, plateNum, /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/ );
  }

  /**
   * 验证邮政编码格式
   *
   * @param postCode 邮政编码，字符串或数字串，有且只有一个参数，必需
   *
   * @returns {Boolean} boolean，格式正确的邮政编码返回true，否则false
   */
  isPostC( postCode ){
    'use strict';

    return IsHandle3.call( this, postCode, /^[1-9][0-9]{5}$/ );
  }

  /**
   * 验证QQ号格式
   *
   * @param qqNum QQ号，字符串或数字串，有且只有一个参数，必需
   *
   * @returns {Boolean} boolean，格式正确的QQ号返回true，否则false
   */
  isQQNum( qqNum ){
    'use strict';

    return IsHandle3.call( this, qqNum, /^[1-9][0-9]{4,10}$/ );
  }

  /**
   * 验证手机号格式
   *
   * @param tel 手机号，字符串或数字串，有且只有一个参数，必需
   *
   * @returns {Boolean} boolean，格式正确的手机返回true，否则false
   */
  isTel( tel ){
    'use strict';

    return IsHandle3.call( this, tel, /^1[3456789]\d{9}$/ );
  }

  /**
   * 验证微信号格式
   *
   * @param WXNum 微信号，字符串，有且只有一个参数，必需
   *
   * @returns {Boolean} boolean，格式正确的微信号返回true，否则false
   */
  isWXNum( WXNum ){
    'use strict';

    return IsHandle3.call( this, WXNum, /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/ );
  }

  // 判断常用信息的格式 End

  // 操作内置元素的对应class、自定义元素的对应class Start

  /**
   * 根据内置元素名、自定义元素名(有效的自定义元素名的格式必须是：小写字母开头，并且一定得有连字符，然后可以由小写字母、数字、下划线、连字符组成)获取内置元素的对应class、自定义元素的对应class。<br />
   * PS:<br />
   * 1、内置元素返回内置元素的对应类、自定义元素返回其对应类。<br />
   * 2、如：内置元素'div'，对应的class是HTMLDivElement。<br />
   * 3、如果参数不是内置元素名或自定义元素名的格式不符合规定，那总是返回HTMLUnknownElement。<br />
   * 4、如果，一个自定义元素还未被成功的注册到文档中，那么返回的是HTMLElement。<br />
   * 5、如果，一个自定义元素被成功的注册到文档中，那么返回的是其对应类。<br />
   * 6、如果，TagName是内置元素名，is是一个还未被成功的注册到文档中的自定义元素名，那么返回的会是TagName这个内置元素名的对应类。<br />
   * 7、如果，TagName是内置元素名，is是一个被成功的注册到文档中的自定义元素名，那么返回的会是这个自定义元素的对应类。<br />
   *
   * @param TagName String，内置元素名、自定义元素名(有效的自定义元素名的格式必须是：小写字母开头，并且一定得有连字符，然后可以由小写字母、数字、下划线、连字符组成)，如：'div'、'cue-div'，必须。
   *
   * @param is String，使用customElements.define()定义的自定义元素的标签名称(有效的自定义元素名的格式必须是：小写字母开头，并且一定得有连字符，然后可以由小写字母、数字、下划线、连字符组成)，默认值是null(表示不传)，可选。
   *
   * @returns {HTMLElement} 内置元素返回内置元素的对应class、自定义元素返回其对应类。
   */
  getClass4Tag( TagName = '', is = null ){
    return this.isNull( is )
           ? ( document.createElement( TagName ).constructor )
           : ( document.createElement( TagName, { is } ).constructor );
  }

  /**
   * 根据内置元素对象、自定义元素对象获取内置元素对象的对应class、自定义元素对象的对应class。<br />
   * PS:<br />
   * 1、内置元素对象返回内置元素对象的对应class、自定义元素对象返回其对应的类。<br />
   * 2、如：内置元素对象document.querySelector( 'div' )，对应的class是HTMLDivElement。<br />
   * 3、如果，返回的是HTMLElement，那说明这是一个还未被成功注册到文档的自定义元素对象。<br />
   *
   * @param elemObj Element，具体的元素对象，必须。
   *
   * @returns {HTMLElement} 内置元素对象返回内置元素对象的对应class、自定义元素对象返回其对应的类。
   */
  getClass4Elem( elemObj ){
    return elemObj.constructor;
  }

  // 操作内置元素的对应class、自定义元素的对应class End

  // 查找节点 Start

  /**
   * 根据class(类名字符串)查找节点，返回实时集合(HTMLCollection)。如果找不到匹配项，则返回undefined。<br />
   * 注1：getElementsByClassName可以在任何元素上调用，不仅仅是document。 调用这个方法的元素将作为本次查找的根元素。
   *
   *
   * @param classN 单个class(类名字符串)，也可以是数组，以便批量处理，必需<br />
   * class(类名字符串)格式'.qq'、'.qq.ss'，请将'.q.www,.xx.cc'改写成['.q.www','.xx.cc']，不能是空字符串、空数组
   *
   * @param rootE 指定哪个Element对象(单个)作为本次查找的根元素，默认是document对象，可选<br />
   * 也可以是本次查找的根元素的选择器(单个字符串),如果查找到的是节点List，则会选取第一个Element对象作为本次查找的根元素<br />
   * 如果传入的是节点List、jQuery节点对象，则会选取第一个Element对象作为本次查找的根元素
   *
   * @returns {HTMLCollection|Array} HTMLCollection|[HTMLCollection]
   */
  gByClass( classN, rootE ){
    'use strict';

    return IsHandle8.call( this, [
      classN,
      rootE || document,
    ], ( classS, rootO ) => {
      let [ selector, elemList ] = [
        this.trim( classS ),
        undefined
      ];
      if( /^\.[a-zA-Z_]{1,}[\w-]{0,}(\.[a-zA-Z_]{1,}[\w-]{0,}){0,}[\w-]{0,}$/gi.test( selector ) ){
        elemList = rootO.getElementsByClassName( this.strRep( selector.slice( 1 ), '[\.]', '\\s' ) );
        if( elemList.length !== 0 ){
          return elemList;
        }
      }
    }, classN, rootE || document );
  }

  /**
   * 根据ID选择器查找节点。如果找不到匹配项，则返回undefined。
   *
   * @param arg 可以是单个ID选择器字符串(以#开头的，后面跟着至少一个字符，字符只能是0-9a-zA-Z以及_，然后再允许-，<br />
   * 如：#testId这类格式的字符串)，也可以是数组，以便批量处理，有且只有一个参数，必需<br />
   * 请将'#qw,#as'改写成['#qw','#as']
   *
   * @returns {Element|Array} Element|[Element]
   */
  gById( arg ){
    'use strict';

    return IsHandle9.call( this, arg, str => {
      let [ selector, elem ] = [
        this.trim( str ),
        undefined
      ];
      if( /^#[a-zA-Z_]{1,}[\w-]{0,}$/gi.test( selector ) ){
        elem = document.getElementById( selector.slice( 1 ) );
        if( !this.isNull( elem ) ){
          return elem;
        }
      }
    } );
  }

  /**
   * 根据元素的name属性值查找节点，一个实时更新的NodeList集合(IE、旧版的Edge返回的是实时更新的HTMLCollection)<br />
   * 如果找不到匹配项，则返回undefined。<br />
   * 注1：甚至那些不支持name属性但是添加了name自定义属性的元素也包含其中。<br />
   * 注2：最好不要为元素的name和id赋予相同的值。<br />
   * 注3：IE、Edge返回的是HTMLCollection
   *
   * @param arg 单个元素的name属性值(字符串)，也可以是数组，以便批量处理，有且只有一个参数，必需
   *
   * @returns {NodeList|HTMLCollection|Array} 单个NodeList或单个HTMLCollection或者数组(里头是NodeList或HTMLCollection)
   */
  gByName( arg ){
    'use strict';

    return IsHandle9.call( this, arg, str => {
      const elemList = document.getElementsByName( this.trim( str ) );
      if( elemList.length !== 0 ){
        return elemList;
      }
    } );
  }

  /**
   * 根据选择器或选择器组查找节点。如果找不到匹配项，则返回undefined。<br />
   * 注1：querySelector可以在任何元素上调用，不仅仅是document。 调用这个方法的元素将作为本次查找的根元素。
   *
   * @param seN 单个选择器或选择器组(包含一个或多个要匹配的选择器的DOMString)，也可以是数组，以便批量处理，不能是空字符串、空数组，必需
   *
   * @param rootE 指定哪个Element对象(单个)作为本次查找的根元素，默认是document对象，可选<br />
   * 也可以是本次查找的根元素的选择器(单个字符串),如果查找到的是节点List，则会选取第一个Element对象作为本次查找的根元素<br />
   * 如果传入的是节点List、jQuery节点对象，则会选取第一个Element对象作为本次查找的根元素
   *
   * @returns {Element|Array} Element|[Element]
   */
  gBySe( seN, rootE ){
    'use strict';

    return IsHandle8.call( this, [
      seN,
      rootE || document,
    ], ( seS, rootO ) => {
      const elemList = rootO.querySelector( this.trim( seS ) );
      if( !this.isNull( elemList ) ){
        return elemList;
      }
    }, seN, rootE || document );
  }

  /**
   * 根据选择器或选择器组查找节点。返回NodeList(静态的！)。如果找不到匹配项，则返回undefined。<br />
   * 注1：querySelectorAll可以在任何元素上调用，不仅仅是document。 调用这个方法的元素将作为本次查找的根元素。
   *
   * @param seN 单个选择器或选择器组(包含一个或多个要匹配的选择器的DOMString)，也可以是数组，以便批量处理，不能是空字符串、空数组，必需
   *
   * @param rootE 指定哪个Element对象(单个)作为本次查找的根元素，默认是document对象，可选<br />
   * 也可以是本次查找的根元素的选择器(单个字符串),如果查找到的是节点List，则会选取第一个Element对象作为本次查找的根元素<br />
   * 如果传入的是节点List、jQuery节点对象，则会选取第一个Element对象作为本次查找的根元素
   *
   * @returns {NodeList|Array} NodeList|[NodeList]
   */
  gBySeAll( seN, rootE ){
    'use strict';

    return IsHandle8.call( this, [
      seN,
      rootE || document,
    ], ( seS, rootO ) => {
      const elemList = rootO.querySelectorAll( this.trim( seS ) );
      if( elemList.length !== 0 ){
        return elemList;
      }
    }, seN, rootE || document );
  }

  /**
   * 根据标签名查找节点，返回实时集合(HTMLCollection)。如果找不到匹配项，则返回undefined。<br />
   * 注1：getElementsByTagName可以在任何元素上调用，不仅仅是document。 调用这个方法的元素将作为本次查找的根元素。
   *
   * @param tagN 单个标签名(字符串，支持“*”，表示查找页面中所有的标签)，也可以是数组，以便批量处理，必需<br />
   * 请将'div,h1'改写成['div','h1']，不能是空字符串、空数组
   *
   * @param rootE 指定哪个Element对象(单个)作为本次查找的根元素，默认是document对象，可选<br />
   * 也可以是本次查找的根元素的选择器(单个字符串),如果查找到的是节点List，则会选取第一个Element对象作为本次查找的根元素<br />
   * 如果传入的是节点List、jQuery节点对象，则会选取第一个Element对象作为本次查找的根元素
   *
   * @returns {HTMLCollection|Array} HTMLCollection|[HTMLCollection]
   */
  gByTag( tagN, rootE ){
    'use strict';

    return IsHandle8.call( this, [
      tagN,
      rootE || document,
    ], ( tagS, rootO ) => {
      let [ selector, elemList ] = [
        this.trim( tagS ),
        undefined
      ];
      if( /^([a-zA-Z])[\w-]{0,}$/gi.test( selector ) || selector === '*' ){
        elemList = rootO.getElementsByTagName( selector );
        if( elemList.length !== 0 ){
          return elemList;
        }
      }
    }, tagN, rootE || document );
  }

  // 查找节点 End

  // 关于ES6的操作 Start
  /**
   * 关于ES6的操作<br /><br />
   *
   * 类的实例.constructor === 类.prototype.constructor === 类<br />
   * 类的实例.__proto__ === 类.prototype<br /><br />
   *
   * 子类.__proto__ === 父类 === 父类.prototype.constructor(super作为对象时，在静态方法中，指向父类)<br />
   * 子类.prototype.__proto__ === 父类.prototype(super作为对象时，在普通方法中，指向父类的原型对象，也就是"父类.prototype")<br /><br />
   *
   * 子类实例.__proto__.__proto__ === 子类.prototype.__proto__ === 父类实例.__proto__ === 父类.prototype
   */

  /**
   * 将对象的属性名和属性值转换为[ { key, value, index } ]
   *
   * @param obj 对象，默认值是对象{}，而且数据类型只能是对象，必须
   *
   * @returns {Array} [ { key, value, index } ]
   */
  entries4Obj( obj = {} ){
    let arr4Obj = [];
    !this.isObject( obj ) && GetError( '参数的数据类型必须是Object' );
    Object.entries( obj )
      .forEach( ( c, i, ) => void ( arr4Obj.push( {
        key: c[ 0 ],
        value: c[ 1 ],
        index: i,
      } ) ) );
    return arr4Obj;
  }

  /**
   * mixin指的是多个对象合成一个新的对象，新对象具有各个组成成员的接口。<br />
   * 将多个类的接口“混入”（mix in）另一个类。<br />
   * 使用的时候，只要继承这个类即可。<br />
   * 使用如：class DistributedEdit extends mixin( [ Loggable, Serializable, ... ] ) {}
   *
   * @param mixin_classArr 数组，每一个参数都是class类
   *
   * @returns {class} 返回class
   */
  mixin( mixin_classArr ){
    'use strict';

    return MixinHandle( ...mixin_classArr );
  }

  /**
   * 为类的实例添加属性或者方法的修饰器函数
   *
   * @param arg_objArr rest参数，每一个参数都是对象{}
   *
   * @returns {Function}
   */
  mixin2Proto( ...arg_objArr ){
    return target => void ( Object.assign( target.prototype, ...arg_objArr ) );
  }

  /**
   * 为类添加静态属性或者静态方法的修饰器函数
   *
   * @param arg_objArr rest参数，每一个参数都是对象{}
   *
   * @returns {Function}
   */
  mixin2Static( ...arg_objArr ){
    return target => void ( Object.assign( target, ...arg_objArr ) );
  }

  // 关于ES6的操作 End

  // 函数处理 Start

  /**
   * 防抖函数(每次触发的时间间隔都小于规定时间，那么相应的方法不会执行，否则，执行触发的是最后一次的状态)<br />
   * PS:<br />
   * 1、比如，百度的搜索输入框，当我们输入每个字符时，都会触发搜索提示。<br />
   *
   * @param fun 函数，建议用“非箭头函数”，可选
   *
   * @param wait Number，连续调用的暂停时间，单位毫秒(ms)，默认值250，可选
   *
   * @param immediate boolean，为true时，则回调func是在连续调用开始时就被调用，默认值false，可选
   *
   * @returns {function} function
   */
  debounceFun( fun = function (){
  }, wait = 250, immediate = false ){
    let preTime = 0,
      clearTime;
    return function ( ...rest ){
      let nowTime = Date.now(),
        timeOut = nowTime - preTime > wait;
      preTime = nowTime;
      clearTime !== null && clearTime !== undefined && !timeOut && clearTimeout( clearTime );
      immediate && !clearTime && timeOut && fun.apply( this, rest );
      !immediate && ( clearTime = setTimeout( () => void ( clearTime = null, !immediate && ( fun.apply( this, rest ) ) ), wait ) );
    };
  }

  /**
   * 原生JS的异步微任务执行函数
   *
   * @param callback 函数，异步微任务执行的函数，可选。<br /><br />
   *
   * 支持：<br />
   * PC：<br />
   * Chrome 71<br />
   * Firefox 69<br />
   * Opera 58<br />
   * Safari 12.1<br /><br />
   *
   * Mobile：<br />
   * Android webview 71<br />
   * Chrome for Android 71<br />
   * Opera for Android 50<br />
   * Safari on iOS 12.2
   */
  minTask( callback = () => {
  } ){
    if( typeof globalThis.queueMicrotask !== 'function' ){
      Promise.resolve()
        .then( callback )
        .catch( e => {
          setTimeout( () => {
            throw new Error( e );
          } );
        } );
    }
    else{
      queueMicrotask( callback );
    }
  }

  /**
   * 只执行一次的函数
   *
   * @param fun 函数，只执行一次的函数，可选
   *
   * @param _this fun参数的上下文环境，可选
   *
   * @returns {function} function
   */
  onceFun( fun = () => {
  }, _this = null ){
    let result;

    return function ( ...rest ){
      if( fun ){
        result = fun.apply( _this || this, rest );

        fun = null;
      }

      return result;
    };
  }

  /**
   * 轮训函数<br />
   *
   * 例子：<br />
   * pollFun( () => true, 20000, 1000 )
   * .then( data => {
   * // 完成轮训，处理返回的数据
   * } )
   * .catch( err => {
   * // 超时出错，处理错误
   * } );
   *
   * @param fun 函数，建议是一个有明确返回值的函数，可选
   *
   * @param timeout Number，超时的时间数，单位毫秒(ms)，默认值5000，可选
   *
   * @param interval Number，轮询的时间间隔数，单位毫秒(ms)，默认值1000，可选
   *
   * @returns {Promise} Promise
   */
  pollFun( fun = () => {
  }, timeout = 5000, interval = 1000 ){
    let endTime = Number( new Date() ) + timeout,
      checkCondition = ( resolve = () => {
      }, reject = () => {
      } ) => {
        let result = fun();

        // 如果条件满足，就返回结果
        if( result ){
          resolve( result );
        }
        // 如果条件不满足，但是没有超时，就等待“interval”毫秒后再继续检查一遍
        else if( Number( new Date() ) <= endTime ){
          setTimeout( checkCondition, interval, resolve, reject );
        }
        // 如果条件不满足，且超时
        else{
          reject( 'timed out for call function!!!' );
        }
      };

    return new Promise( checkCondition );
  }

  /**
   * 定时器，每“time”秒执行一次指定的函数<br /><br />
   *
   * 注：<br />
   * 如果直接设置howClear为true，则这个定时器永远不会执行；<br />
   * 如果直接设置howClear为false并且直接设置howStart为true,则定时器会永远执行下去<br />
   * 如果直接设置howClear为false并且直接设置howStart为false,则定时器会永远执行otherFun下去<br /><br />
   *
   * 注：funDataObj(存储由fun函数设置的数据), clearDataObj(存储由howClear函数设置的数据), startDataObj(存储由howStart函数设置的数据), otherDataObj(存储由otherFun函数设置的数据)<br />
   * 这4个对象按以上顺序用作howClear、howStart、fun、otherFun这四个函数的参数，<br />
   * 用于存储数据，只能把数据添加到对象里，不能把对象修改成其他数据类型<br />
   * 利用引用数据类型达到传递数据的目的<br />
   * 第一次调用setInterval都是空对象的
   *
   * @param argObj JSON对象{}，配置对象，必须<br />
   * {<br />
   * fun: function，所要执行的函数(有4个参数funDataObj, clearDataObj, startDataObj, otherDataObj)，必须<br /><br />
   *
   * howClear: boolean|function，boolean或一个返回值是boolean类型的函数(有4个参数funDataObj, clearDataObj, startDataObj, otherDataObj)，<br />
   * 什么时候取消并清除掉定时器，默认是一个返回false的函数，可选<br />
   * 注：如果不需要取消并清除掉定时器，就传false<br /><br />
   *
   * howStart: boolean|function，boolean或一个返回值是boolean类型的函数(有4个参数funDataObj, clearDataObj, startDataObj, otherDataObj)，<br />
   * 什么时候执行指定的函数，默认是一个返回true的函数，可选<br />
   * 注：如果任何时候都要执行指定的函数，直到取消并清除掉定时器，那就传true<br /><br />
   *
   * otherFun: function，当不需要执行fun函数但又不需要取消并清除掉定时器时，执行的备选函数(有4个参数funDataObj, clearDataObj, startDataObj, otherDataObj)，可选
   *
   * @param time number，每次执行指定函数的时间间隔，默认1ms，单位ms，可选
   */
  setInterval( argObj, time = 1 ){
    let funDataObj = {},
      clearDataObj = {},
      startDataObj = {},
      otherDataObj = {};
    let str1 = 'setInterval函数--->',
      str2 = '必须是布尔类型或是函数类型的数据！',
      paraObj = Object.assign( {
        fun: ( funDataObj, clearDataObj, startDataObj, otherDataObj ) => {
        },
        howClear: ( funDataObj, clearDataObj, startDataObj, otherDataObj ) => false,
        howStart: ( funDataObj, clearDataObj, startDataObj, otherDataObj ) => true,
        otherFun: ( funDataObj, clearDataObj, startDataObj, otherDataObj ) => {
        }
      }, argObj ),
      howClear = ( funDataObj, clearDataObj, startDataObj, otherDataObj ) => {
      },
      howStart = ( funDataObj, clearDataObj, startDataObj, otherDataObj ) => {
      };
    if( !( this.isBoolean( paraObj.howClear ) | this.isFunction( paraObj.howClear ) ) ){
      GetError( str1 + 'howClear' + str2 );
      return;
    }
    else if( !( this.isBoolean( paraObj.howStart ) | this.isFunction( paraObj.howStart ) ) ){
      GetError( str1 + 'howStart' + str2 );
      return;
    }
    this.isBoolean( paraObj.howClear ) && ( howClear = () => paraObj.howClear );
    this.isBoolean( paraObj.howStart ) && ( howStart = () => paraObj.howStart );
    this.isFunction( paraObj.howClear ) && ( howClear = paraObj.howClear );
    this.isFunction( paraObj.howStart ) && ( howStart = paraObj.howStart );
    let timer = setInterval( () => {
      if( howClear( funDataObj, clearDataObj, startDataObj, otherDataObj ) ){
        // 什么时候取消并清除掉定时器
        clearInterval( timer );
      }
      else if( howStart( funDataObj, clearDataObj, startDataObj, otherDataObj ) ){
        // 什么时候执行指定的函数
        paraObj.fun( funDataObj, clearDataObj, startDataObj, otherDataObj );
      }
      else{
        // 当不需要执行fun函数但又不需要取消并清除掉定时器时，执行的备选函数
        paraObj.otherFun( funDataObj, clearDataObj, startDataObj, otherDataObj );
      }
    }, time );
  }

  /**
   * 节流函数(规定的时间间隔内只触发一次相应的方法，且执行的是第一次的触发状态)<br />
   * PS:<br />
   * 1、比如，500毫秒内疯狂多次点击按钮，但只触发第一次的点击，就如，射击类游戏的场景，疯狂点击按钮射出子弹。<br />
   *
   * @param fun 函数，建议用“非箭头函数”，可选
   *
   * @param wait Number，规定的时间间隔，单位毫秒(ms)，默认值250，可选
   *
   * @param immediate boolean，为true时，则回调func是在连续调用开始时就被调用，默认值true，可选
   *
   * @returns {function} function
   */
  throttleFun( fun = function (){
  }, wait = 250, immediate = true ){
    let preTime = 0,
      clearTime;
    return function ( ...rest ){
      let nowTime = Date.now(),
        timeOut = nowTime - preTime > wait;
      preTime = nowTime;
      clearTime !== null && clearTime !== undefined && timeOut && clearTimeout( clearTime );
      immediate && timeOut && fun.apply( this, rest );
      !immediate && timeOut && ( clearTime = setTimeout( () => void ( fun.apply( this, rest ) ), 0 ) );
    };
  }

  // 函数处理 End

  // 输入事件的监听 Start

  /**
   * 监听'Enter键'
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(节点选择器、节点选择器组)，以便批量处理，必需
   *
   * @param f 事件处理函数，有一个event参数，它也是解除“keydown”事件的函数，而且它的配置选项是false，必需
   *
   * @returns {Array} [Element]
   */
  enterE( elem, f ){
    'use strict';

    return IsHandle12.call( this, elem, e => void ( ( e.which === 13 || e.keyCode === 13 ) && f( e ) ), 'addEventListener', 'keydown' );
  }

  /**
   * 只允许输入框输入A到Z
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(节点选择器、节点选择器组)，以便批量处理，必需
   *
   * @param lenI 最大长度，number类型，可选
   *
   * @returns {Array} [function] 它里头存着解除“input”事件的函数，而且它的配置选项是false
   */
  inputCL( elem, lenI ){
    'use strict';

    return IsHandle11.call( this, elem, lenI, 'onlyCL' );
  }

  /**
   * 绑定'input'输入事件
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(节点选择器、节点选择器组)，以便批量处理，必需
   *
   * @param f 事件处理函数，有一个event参数，它也是解除“input”事件的函数，而且它的配置选项是false，必需
   *
   * @returns {Array} [Element]
   */
  inputE( elem, f ){
    'use strict';

    return IsHandle12.call( this, elem, f, 'addEventListener', 'input' );
  }

  /**
   * 只允许输入框输入a到z
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(节点选择器、节点选择器组)，以便批量处理，必需
   *
   * @param lenI 最大长度，number类型，可选
   *
   * @returns {Array} [function] 它里头存着解除“input”事件的函数，而且它的配置选项是false
   */
  inputLL( elem, lenI ){
    'use strict';

    return IsHandle11.call( this, elem, lenI, 'onlyLL' );
  }

  /**
   * 只允许输入框输入A到Z和a到z
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(节点选择器、节点选择器组)，以便批量处理，必需
   *
   * @param lenI 最大长度，number类型，可选
   *
   * @returns {Array} [function] 它里头存着解除“input”事件的函数，而且它的配置选项是false
   */
  inputLLCL( elem, lenI ){
    'use strict';

    return IsHandle11.call( this, elem, lenI, 'onlyLLCL' );
  }

  /**
   * 只允许输入框输入数字
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(节点选择器、节点选择器组)，以便批量处理，必需
   *
   * @param lenI 最大长度，number类型，可选
   *
   * @returns {Array} [function] 它里头存着解除“input”事件的函数，而且它的配置选项是false
   */
  inputN( elem, lenI ){
    'use strict';

    return IsHandle11.call( this, elem, lenI, 'onlyN' );
  }

  /**
   * 只允许输入框输入A到Z和0到9
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(节点选择器、节点选择器组)，以便批量处理，必需
   *
   * @param lenI 最大长度，number类型，可选
   *
   * @returns {Array} [function] 它里头存着解除“input”事件的函数，而且它的配置选项是false
   */
  inputNCL( elem, lenI ){
    'use strict';

    return IsHandle11.call( this, elem, lenI, 'onlyNCL' );
  }

  /**
   * 只允许输入框输入a到z和0到9
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(节点选择器、节点选择器组)，以便批量处理，必需
   *
   * @param lenI 最大长度，number类型，可选
   *
   * @returns {Array} [function] 它里头存着解除“input”事件的函数，而且它的配置选项是false
   */
  inputNLL( elem, lenI ){
    'use strict';

    return IsHandle11.call( this, elem, lenI, 'onlyNLL' );
  }

  /**
   * 只允许输入框输入A到Z和a到z和0到9
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(节点选择器、节点选择器组)，以便批量处理，必需
   *
   * @param lenI 最大长度，number类型，可选
   *
   * @returns {Array} [function] 它里头存着解除“input”事件的函数，而且它的配置选项是false
   */
  inputNLLCL( elem, lenI ){
    'use strict';

    return IsHandle11.call( this, elem, lenI, 'onlyNLLCL' );
  }

  /**
   * 只允许输入匹配指定的正则表达式的字符串
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(节点选择器、节点选择器组)，以便批量处理，必需
   *
   * @param patS 匹配规则(字符串形式的)，如：[^0-9]，0到9以外的全部去掉，必需
   *
   * @param lenI 最大长度，number类型，可选
   *
   * @returns {Array} [function] 它里头存着解除“input”事件的函数，而且它的配置选项是false
   */
  inputOfPat( elem, patS, lenI ){
    let fun = e => {
      let _elem = e.currentTarget,
        val = this.remOfPat( _elem.value, patS );
      _elem.value = this.isUndefined( lenI )
                    ? val
                    : val.slice( 0, lenI );
    };

    this.inputE( elem, fun );

    return fun;
  }

  /**
   * 解绑'input'输入事件
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(节点选择器、节点选择器组)，以便批量处理，必需
   *
   * @param f 事件处理函数(只能是跟绑定时的那个函数一模一样，并且是属于'==='的)，有一个event参数，必需
   *
   * @returns {Array} [Element]
   */
  inputRE( elem, f ){
    'use strict';

    return IsHandle12.call( this, elem, f, 'removeEventListener', 'input' );
  }

  // 输入事件的监听 End

  // 判断数据类型 Start

  /**
   * 获取数据类型<br />
   * PS:<br />
   * 1、如果传入的是被Proxy代理过的对象，会报错！！！<br />
   * 2、<br />
   * '[object HTMLDocument]'.slice( 8, -1 ); // HTMLDocument<br />
   * '[object HTMLDocument XXX]'.slice( 8, -1 ); // HTMLDocument XXX<br />
   *
   * @param arg 任何类型的数据，参数个数为1，必需
   *
   * @returns {String} string，数据类型的字符串，如'[object HTMLDocument]'
   */
  dataT( arg ){
    'use strict';

    return Object.prototype.toString.call( arg );
  }

  /**
   * 判断数据是否为Arguments类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isArguments( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Arguments' );
  }

  /**
   * 判断数据是否为Array类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isArray( arg ){
    'use strict';

    return Array.isArray( arg );
  }

  /**
   * 判断数据是否为ArrayBuffer类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isArrayBuffer( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'ArrayBuffer' );
  }

  /**
   * 判断数据是否为Array Iterator类型<br />
   * PS：如下都是这个数据类型<br />
   * 1、[ "a", "b", "c", ].keys()<br />
   * 2、[ "a", "b", "c", ].values()<br />
   * 3、[ "a", "b", "c", ].entries()<br />
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isArrayIterator( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Array Iterator' );
  }

  /**
   * 判断数据是否为async...await的异步函数类型(包括异步的Generator函数)
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isAsyncFun( arg ){
    return IsHandle1.call( this, arg, 'AsyncFunction' ) || IsHandle1.call( this, arg, 'AsyncGeneratorFunction' );
  }

  /**
   * 判断数据是否为async...await的Generator函数执行后生成的Generator遍历器类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isAsyncGenerator( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'AsyncGenerator' );
  }

  /**
   * 判断数据是否为async...await的Generator Function类型，也就是Generator函数
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isAsyncGeneratorFun( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'AsyncGeneratorFunction' );
  }

  /**
   * 判断数据是否为BigInt类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isBigInt( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'BigInt' );
  }

  /**
   * 判断数据是否为BigInt64Array类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isBigInt64Array( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'BigInt64Array' );
  }

  /**
   * 判断数据是否为BigUint64Array类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isBigUint64Array( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'BigUint64Array' );
  }

  /**
   * 判断数据是否为Blob类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isBlob( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Blob' );
  }

  /**
   * 判断数据是否为Boolean类型(布尔对象、实例会返回false)
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isBoolean( arg ){
    return IsHandle1.call( this, arg, 'Boolean' ) && typeof arg === 'boolean';
  }

  /**
   * 判断数据是否为DataView类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isDataView( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'DataView' );
  }

  /**
   * 判断数据是否为Date类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isDate( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Date' );
  }

  /**
   * 判断数据是否是Document对象，也就是document
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isDocument( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'HTMLDocument' );
  }

  /**
   * 判断数据是否为一个DOM元素List，如：NodeList、HTMLCollection、jQuery ElementList
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isElemList( arg ){
    return IsHandle1.call( this, arg, 'NodeList' ) || IsHandle1.call( this, arg, 'HTMLCollection' ) || this.isJQList( arg );
  }

  /**
   * 判断数据是否为一个DOM元素或window对象或Document对象
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isElement( arg ){
    return IsHandle1.call( this, arg, 'Element' ) || this.isDocument( arg ) || this.isWindow( arg );
  }

  /**
   * 判断原数据是否为空数据，如果是空的字符串('')、空的数组([])、空的对象({})、空的FormData，则为true，否则为false
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，如果是空的字符串('')、空的数组([])、空的对象({})、空的FormData，则为true，否则为false
   */
  isEmpty( arg ){
    if( this.isString( arg ) || this.isArray( arg ) ){
      return arg.length === 0;
    }
    else if( this.isObject( arg ) ){
      return Object.keys( arg ).length === 0;
    }
    else if( this.isFormData( arg ) ){
      return Array.from( arg.keys() ).length === 0;
    }
    else{
      return false;
    }
  }

  /**
   * 判断原数据是否为全空的真空对象(Object.create( null )、{ __proto__: null, }、Object.setPrototypeOf( {}, null ))，是则为true，否则为false
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，如果是全空的真空对象(Object.create( null )、{ __proto__: null, }、Object.setPrototypeOf( {}, null ))，是则为true，否则为false
   */
  isEmptyObject( arg ){
    if( this.isObject( arg ) && this.isNull( Object.getPrototypeOf( arg ) ) ){
      return true;
    }
    else{
      return false;
    }
  }

  /**
   * 判断数据是否为Error类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isError( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Error' );
  }

  /**
   * 判断数据是否为File类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isFile( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'File' );
  }

  /**
   * 判断数据是否为FileReader类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isFileReader( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'FileReader' );
  }

  /**
   * 判断数据是否为一个有穷数，不转换参数，new Number(Infinity)为false，new Number(Infinity).valueOf()为false，<br />
   * new Number(1)为false，new Number(1).valueOf()为true<br />
   * 注意：如果参数类型不是数值，Number.isFinite一律返回false。
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isFinite( arg ){
    'use strict';

    return Number.isFinite( arg );
  }

  /**
   * 判断数据是否为Float32Array类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isFloat32Array( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Float32Array' );
  }

  /**
   * 判断数据是否为Float64Array类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isFloat64Array( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Float64Array' );
  }

  /**
   * 判断数据是否为FormData类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isFormData( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'FormData' );
  }

  /**
   * 判断数据是否为Function类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isFunction( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Function' );
  }

  /**
   * 判断数据是否为Generator函数执行后生成的Generator遍历器类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isGenerator( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Generator' );
  }

  /**
   * 判断数据是否为Generator Function类型，也就是Generator函数
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isGeneratorFun( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'GeneratorFunction' );
  }

  /**
   * 判断数据是否为Int8Array类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isInt8Array( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Int8Array' );
  }

  /**
   * 判断数据是否为Int16Array类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isInt16Array( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Int16Array' );
  }

  /**
   * 判断数据是否为Int32Array类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isInt32Array( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Int32Array' );
  }

  /**
   * 判断数据是否为整数，不转换参数。new Number(1)为false，new Number(1).valueOf()为true<br />
   * 注：<br />
   * JavaScript 内部，整数和浮点数采用的是同样的储存方法，所以 25 和 25.0 被视为同一个值。<br />
   * 如果参数不是数值，Number.isInteger返回false。
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isInteger( arg ){
    'use strict';

    return Number.isInteger( arg );
  }

  /**
   * 判断数据是否为一个jQuery ElementList
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isJQList( arg ){
    return this.isObject( arg ) && ( 'jquery' in arg );
  }

  /**
   * 判断数据是否为Map类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isMap( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Map' );
  }

  /**
   * 判断数据是否为NaN值，不转换参数。new Number(NaN)为false，new Number(NaN).valueOf()为true<br />
   * 注意：如果参数类型不是NaN，Number.isNaN一律返回false。
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isNaN( arg ){
    'use strict';

    return Number.isNaN( arg );
  }

  /**
   * 判断数据是否为null值
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isNull( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Null' );
  }

  /**
   * 判断数据是否为Number类型，包括NaN值(但是Number对象、实例会返回false)
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isNumber( arg ){
    return ( IsHandle1.call( this, arg, 'Number' ) ) && ( typeof arg === 'number' );
  }

  /**
   * 判断数据是否为Object类型<br />
   * PS:<br />
   * 1、包括'[object Module]'。
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isObject( arg ){
    return IsHandle1.call( this, arg, 'Object' ) || IsHandle1.call( this, arg, 'Module' );
  }

  /**
   * 判断数据是否为Promise类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isPromise( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Promise' );
  }

  /**
   * 判断数据是否为RegExp类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isRegExp( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'RegExp' );
  }

  /**
   * 判断数据是否为一个“安全整数”。new Number(1)为false，new Number(1).valueOf()为true<br />
   * 安全整数范围为 -(2^53 - 1)到 2^53 - 1 之间的整数，包含 -(2^53 - 1)和 2^53 - 1。
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isSafeInteger( arg ){
    'use strict';

    return Number.isSafeInteger( arg );
  }

  /**
   * 判断数据是否为Set类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isSet( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Set' );
  }

  /**
   * 判断数据是否为SharedArrayBuffer类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isSharedArrayBuffer( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'SharedArrayBuffer' );
  }

  /**
   * 判断数据是否为SharedWorker类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isSharedWorker( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'SharedWorker' );
  }

  /**
   * 判断数据是否为String类型(String对象、实例会返回false)
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isString( arg ){
    return ( IsHandle1.call( this, arg, 'String' ) ) && ( typeof arg === 'string' );
  }

  /**
   * 判断数据是否为Symbol类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isSymbol( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Symbol' );
  }

  /**
   * 判断数据是否为Uint8Array类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isUint8Array( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Uint8Array' );
  }

  /**
   * 判断数据是否为Uint8ClampedArray类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isUint8ClampedArray( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Uint8ClampedArray' );
  }

  /**
   * 判断数据是否为Uint16Array类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isUint16Array( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Uint16Array' );
  }

  /**
   * 判断数据是否为Uint32Array类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isUint32Array( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Uint32Array' );
  }

  /**
   * 判断数据是否为undefined值
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isUndefined( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Undefined' );
  }

  /**
   * 判断数据是否是WeakMap类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isWeakMap( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'WeakMap' );
  }

  /**
   * 判断数据是否是WeakSet类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isWeakSet( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'WeakSet' );
  }

  /**
   * 判断数据是否是Window对象
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isWindow( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Window' );
  }

  /**
   * 判断数据是否是Worker类型
   *
   * @param arg 数据，参数个数为1，必需
   *
   * @returns {Boolean} boolean，是true，否false
   */
  isWorker( arg ){
    'use strict';

    return IsHandle1.call( this, arg, 'Worker' );
  }

  // 判断数据类型 End

  // 原生JS代替jQuery的Ajax操作，还支持fetch方法 Start
  /**
   * 原生JS代替jQuery的Ajax操作，还支持fetch方法
   *
   * post请求content-type,即数据请求的格式主要设置方式：
   * 1、application/x-www-form-urlencoded（大多数请求可用：eg：'name=Denzel&age=18'）
   * 2、multipart/form-data
   * 3、application/json（json格式对象，eg：{'name':'Denzel','age':'18'}）
   * 4、text/xml(现在用的很少了，发送xml格式文件或流,webservice请求用的较多)
   *
   * 当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！
   *
   * 而且使用jQuery中的Ajax时，还需要：
   * contentType: false,
   * processData: false,
   */

  /**
   * Ajax请求<br /><br />
   * PS:<br />
   * 1、跨域情况下，会先发出OPTIONS请求，其响应成功后才会去请求真正的post、delete、put请求。
   * 2、GET请求body传参，只要多包一层data属性就行了，例如：{ headers: { 'Content-Type': 'application/json', }, data: { data: JSON.stringify( { age: 11, } ) } }
   *
   * post请求content-type,即数据请求的格式主要设置方式：<br />
   * 1、application/x-www-form-urlencoded（大多数请求可用：eg：'name=Denzel&age=18'）<br />
   * 2、multipart/form-data<br />
   * 3、application/json（json格式对象，eg：{'name':'Denzel','age':'18'}）<br />
   * 4、text/xml(现在用的很少了，发送xml格式文件或流,webservice请求用的较多)<br /><br />
   *
   * 当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br /><br />
   *
   * 而且使用jQuery中的Ajax时，还需要：<br />
   * contentType: false,<br />
   * processData: false,<br /><br />
   *
   * @param url 字符串，请求地址(url)，必须
   *
   * @param paraObj 配置对象{}，可选<br />
   * {<br />
   *  sendData: 发送给后台服务器的数据，默认值null<br />
   *  注：<br />
   *  1、POST方法传数据给后台，则需要给请求头加："Content-type": "application/x-www-form-urlencoded;charset=UTF-8"等等一类的请求头<br />
   *  2、GET方法就算是设置了这个属性值，服务器也不会收到。<br />
   *  3、当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br /><br />
   *
   *  method: string，请求类型，如：'GET'、'POST'、'PUT'、'DELETE'，默认'GET'<br /><br />
   *
   *  async: boolean，true异步请求，false同步请求，默认true<br /><br />
   *
   *  user: string，用户名，默认null<br /><br />
   *
   *  password: string，用户密码，默认null<br /><br />
   *
   *  overrideMimeType: string，MIME Type，用途与responseType同类，早期的，建议用responseType代替它，默认值null，表示不传<br />
   *  如：'text/xml'、'text/plain'、'text/plain; charset=x-user-defined'(以二进制字符串形式检索未处理的数据)<br /><br />
   *
   *  responseType: string，MIME Type，设置响应的数据类型，会影响响应的数据的数据类型，默认值null，表示不传<br />
   *  如：'json'，响应的response的数据类型是JSON对象不会是JSON字符串了(IE被自定义处理过了，也会返回JSON对象)<br />
   *  有如下值：'arraybuffer'、'blob'、'document'、'json'、'text'<br /><br />
   *
   *  setTimeOut: number，设置请求超时时间，单位是ms，默认0，表示不超时，如：1000ms，表示1000ms后会触发超时事件<br /><br />
   *
   *  requestHeader: {}，JSON对象，设置请求头，keyName是请求头名，keyValue是请求头值。<br />
   *  注：<br />
   *  post方法传数据给后台，则需要加："Content-type":"application/x-www-form-urlencoded;charset=UTF-8"等等一类的请求头<br />
   *  当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br /><br />
   *
   *  withCredentials: boolean，指示Access-Control是否应使用cookie授权标头或TLS客户端证书等凭据进行跨站点请求。<br />
   *  来自不同域的cookie不能设置为XMLHttpRequest自己的域cookie值，除非在发出请求之前设置withCredentials为true。<br />
   *  通过设置withCredentials为true获得的第三方cookie，但仍将遵循同源策略，因此请求脚本无法通过document.cookie或响应头来访问它们。<br />
   *  此外，此标志还用于指示何时在响应中忽略cookie。默认true。<br />
   *  注：<br />
   *  为true时，哪怕服务器的响应头设置为{'Access-Control-Allow-Origin': '*'}，也会被同源策略限制。<br />
   *  为false时，只要服务器的响应头设置为{'Access-Control-Allow-Origin': '*'}，就能跨域访问了<br />
   *  所以，默认为true，也就是不允许跨域<br /><br />
   *
   *  关于跨域请求头。<br />
   *   1)当Access-Control-Allow-Origin:*时，不允许使用凭证（即不能设置诸如withCredentials:true、credentials:"include"之类），即不能携带上诸如Cookie之类的凭证。<br />
   *   2)当Access-Control-Allow-Origin:*时，只需确保客户端在发出CORS请求时凭据标志的值为false就可以了：<br />
   *     如果请求使用XMLHttpRequest发出，请确保withCredentials为false。<br />
   *     如果使用服务器发送事件，确保EventSource.withCredentials是false（这是默认值）。<br />
   *     如果使用Fetch API，请确保Request.credentials是"omit"，"omit"表示忽略诸如Cookie之类的凭证。<br />
   *   3)要想客户端既能发起跨域请求，又想将客户端携带的凭证（诸如Cookie之类的凭证）附加到跨域请求上传给服务端，<br />
   *     那么服务端的响应头得如下设置：<br />
   *     'Access-Control-Allow-Credentials': true、<br />
   *     'Access-Control-Allow-Origin': '允许发起跨域请求的客户端的Origin（如：https://localhost:8100），就是不可以是通配符“*”'、<br />
   *     'Vary': 'Origin' <br />
   *     客户端也得如下设置：<br />
   *     确保客户端在发出CORS请求时凭据标志的值为true就可以了：<br />
   *     如果请求使用XMLHttpRequest发出，请确保withCredentials为true。<br />
   *     如果使用服务器发送事件，确保EventSource.withCredentials是true。<br />
   *     如果使用Fetch API，请确保Request.credentials是"include"。<br />
   *
   *  // 在加载资源的进度开始时会触发该事件<br />
   *  loadStart: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 当readyState文档的属性发生更改时会触发该事件<br />
   *  readyStateChange: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 操作、下载资源正在进行中。progress事件在使用file:协议的情况下是无效的。<br />
   *  progress: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 由于预设时间到期，Progression终止时会触发该事件<br />
   *  timeout: ( event, xhr ) => {},<br /><br />
   *
   *  // 资源及其相关资源完成加载时会触发该事件<br />
   *  load: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 请求发生错误时会触发该事件<br />
   *  error: ( event, xhr ) => {},<br /><br />
   *
   *  // 中止加载资源时会触发该事件，调用XHR.abort()后，会触发这个事件<br />
   *  abort: ( event, xhr ) => {},<br /><br />
   *
   *  // 当在加载资源时停止进度时（例如，在发送“错误”，“中止”或“加载”之后），将触发该事件<br />
   *  loadEnd: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 当responseType是'json'时，IE浏览器会被自定义处理，第三个参数response也会是JSON对象，但第二个参数xhr的response属性还是JSON字符串<br />
   *  success: ( event, xhr, response ) => {},<br /><br />
   *
   *  // 上传资源事件对象<br />
   *  uploadEvent: {<br />
   *      // 上传已经开始<br />
   *      loadStart: (event, xhr)=>{},<br /><br />
   *
   *      // 目前为止上传的进展<br />
   *      progress: (event, xhr)=>{},<br /><br />
   *
   *      // 上传超时<br />
   *      timeout: (event, xhr)=>{},<br /><br />
   *
   *      // 上传成功完成<br />
   *      load: (event, xhr)=>{},<br /><br />
   *
   *      // 由于错误导致上传失败<br />
   *      error: (event, xhr)=>{},<br /><br />
   *
   *      // 上传操作已中止<br />
   *      abort: (event, xhr)=>{},<br /><br />
   *
   *      // 上传完成，此事件不区分成功或失败。load、error、abort、timeout都会触发它<br />
   *      loadEnd: (event, xhr)=>{},<br /><br />
   *
   *  注：<br />
   *  1、GET请求中，sendData的值的数据类型可以是JSON对象(不需要字符串化)或是FormData，且不是特别指定，可以不需要设置请求头('Content-Type':'application/json')这一类的。<br /><br />
   */
  ajax( url, paraObj = {} ){
    let opt_obj = Object.assign( {
        sendData: null,
        method: 'GET',
        async: true,
        user: null,
        password: null,
        overrideMimeType: null,
        responseType: null,
        setTimeOut: 0,
        requestHeader: {},
        withCredentials: true,
        loadStart: ( event, xhr, response, status ) => {
        },
        readyStateChange: ( event, xhr, response, status ) => {
        },
        progress: ( event, xhr, response, status ) => {
        },
        timeout: ( event, xhr ) => {
        },
        load: ( event, xhr, response, status ) => {
        },
        error: ( event, xhr ) => GetError( xhr ),
        abort: ( event, xhr ) => {
        },
        loadEnd: ( event, xhr, response, status ) => {
        },
        success: ( event, xhr, response ) => {
        },
        uploadEvent: {
          loadStart: ( event, xhr ) => {
          },
          progress: ( event, xhr ) => {
          },
          timeout: ( event, xhr ) => {
          },
          load: ( event, xhr ) => {
          },
          error: ( event, xhr ) => GetError( xhr ),
          abort: ( event, xhr ) => {
          },
          loadEnd: ( event, xhr ) => {
          }
        }
      }, paraObj ),
      XHR = new XMLHttpRequest();

    XHR.onloadstart = event => void ( opt_obj.loadStart( event, event.currentTarget, event.currentTarget[ 'response' ], event.currentTarget[ 'status' ] ) );
    XHR.onreadystatechange = event => void ( opt_obj.readyStateChange( event, event.currentTarget, event.currentTarget[ 'response' ], event.currentTarget[ 'status' ] ) );
    XHR.onprogress = event => void ( opt_obj.progress( event, event.currentTarget, event.currentTarget[ 'response' ], event.currentTarget[ 'status' ] ) );
    XHR.ontimeout = event => void ( opt_obj.timeout( event, event.currentTarget ) );
    XHR.onload = event => {
      if( event.currentTarget[ 'status' ] >= 200 && event.currentTarget[ 'status' ] < 400 ){
        let deviceInfo = this.deviceInfo(),
          res = event.currentTarget[ 'response' ],
          isJSON = opt_obj.responseType === 'json';
        ( deviceInfo.is_PC && deviceInfo.is_PCWin && deviceInfo.is_IE && isJSON ) && ( res = JSON.parse( event.currentTarget[ 'response' ] ) );
        opt_obj.success( event, event.currentTarget, res );
      }
      opt_obj.load( event, event.currentTarget, event.currentTarget[ 'response' ], event.currentTarget[ 'status' ] );
    };
    XHR.onerror = event => void ( opt_obj.error( event, event.currentTarget ) );
    XHR.onabort = event => void ( opt_obj.abort( event, event.currentTarget ) );
    XHR.onloadend = event => void ( opt_obj.loadEnd( event, event.currentTarget, event.currentTarget[ 'response' ], event.currentTarget[ 'status' ] ) );
    XHR.upload.onloadstart = event => void ( opt_obj.uploadEvent.loadStart( event, event.currentTarget ) );
    XHR.upload.onprogress = event => void ( opt_obj.uploadEvent.progress( event, event.currentTarget ) );
    XHR.upload.ontimeout = event => void ( opt_obj.uploadEvent.timeout( event, event.currentTarget ) );
    XHR.upload.onload = event => void ( opt_obj.uploadEvent.load( event, event.currentTarget ) );
    XHR.upload.onerror = event => void ( opt_obj.uploadEvent.error( event, event.currentTarget ) );
    XHR.upload.onabort = event => void ( opt_obj.uploadEvent.abort( event, event.currentTarget ) );
    XHR.upload.onloadend = event => void ( opt_obj.uploadEvent.loadEnd( event, event.currentTarget ) );

    if( opt_obj.method === 'GET' && ( ( this.isObject( opt_obj.sendData ) && !this.isEmpty( opt_obj.sendData ) ) || ( this.isFormData( opt_obj.sendData ) && !this.isEmpty( opt_obj.sendData ) ) ) ){
      let searchStr = '',
        newUrl = url,
        urlSea2Obj = {},
        sendData = {};

      if( url.includes( '?' ) ){
        newUrl = url.split( '?' )[ 0 ];
        urlSea2Obj = this.urlSea2Obj( '?' + url.split( '?' )[ 1 ] );
      }

      if( this.isFormData( opt_obj.sendData ) ){
        Array.from( opt_obj.sendData.entries() )
          .forEach( ( [ key, value ] ) => void ( sendData[ key ] = value ) );
      }
      else{
        sendData = opt_obj.sendData;
      }

      Object.entries( Object.assign( urlSea2Obj, sendData ) )
        .forEach( ( [ keyName, keyValue ] ) => void ( searchStr += `${ keyName }=${ keyValue }&` ) );

      XHR.open( opt_obj.method, `${ newUrl }?${ searchStr.trim()
        .slice( 0, -1 ) }`, opt_obj.async, opt_obj.user, opt_obj.password );
    }
    else{
      XHR.open( opt_obj.method, url, opt_obj.async, opt_obj.user, opt_obj.password );
    }

    opt_obj.overrideMimeType
    ? ( XHR.overrideMimeType( opt_obj.overrideMimeType ) )
    : ( '' );
    opt_obj.responseType
    ? ( XHR.responseType = opt_obj.responseType )
    : ( '' );
    XHR.timeout = opt_obj.setTimeOut;
    XHR.withCredentials = opt_obj.withCredentials;
    for( const keyName in
      opt_obj.requestHeader ){
      XHR.setRequestHeader( keyName, opt_obj.requestHeader[ keyName ] );
    }

    XHR.send( opt_obj.method === 'GET'
              ? null
              : opt_obj.sendData );
  }

  /**
   * XML对象、HTML对象的字符串序列化
   *
   * @param domObj DOM Object，XML对象、HTML对象，必须
   *
   * @returns {String} string
   */
  domToStr( domObj ){
    'use strict';

    return new XMLSerializer().serializeToString( domObj );
  }

  /**
   * fetch，封装了fetch()API工具。<br /><br />
   * PS:<br />
   * 1、跨域情况下，会先发出OPTIONS请求，其响应成功后才会去请求真正的post、delete、put请求。
   * 2、GET请求body传参，只要多包一层data属性就行了，例如：{ headers: { 'Content-Type': 'application/json', }, data: { data: JSON.stringify( { age: 11, } ) } }
   *
   * post请求content-type,即数据请求的格式主要设置方式：<br />
   * 1、application/x-www-form-urlencoded（大多数请求可用：eg：'name=Denzel&age=18'）<br />
   * 2、multipart/form-data<br />
   * 3、application/json（json格式对象，eg：{'name':'Denzel','age':'18'}）<br />
   * 4、text/xml(现在用的很少了，发送xml格式文件或流,webservice请求用的较多)<br /><br />
   *
   * 当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br /><br />
   *
   * 而且使用jQuery中的Ajax时，还需要：<br />
   * contentType: false,<br />
   * processData: false,<br /><br />
   *
   * fetch规范与jQuery.ajax()有两种主要区别：<br />
   * 1、<br />
   * 当接收到一个代表错误的HTTP状态码时，从fetch()返回的Promise不会被标记为reject，即使该HTTP响应的状态码是404或500。<br />
   * 相反，它会将Promise状态标记为resolve（但是会将resolve的返回值的ok属性设置为false），仅当网络故障时或请求被阻止时，才会标记为reject。<br />
   * 2、<br />
   * 默认情况下，fetch不会从服务端发送或接收任何cookies，如果站点依赖于用户session，则会导致未经认证的请求（要发送cookies，必须设置credentials选项）。<br />
   * 自2017年8月25日起。规范将凭据（“credentials”）的默认值更改为“same-origin”同一源。火狐从61.0B13年开始改变。<br /><br />
   *
   * 注：<br />
   * response.statusText === 'OK'，不一定都是字符串“OK”，其值由后端编码控制！！！
   *
   * @param input 字符串|Request对象，字符串的时候就是指：包含要获取资源的URL，一些浏览器会接受blob:和data:作为schemes，必须。<br />
   * 一个Request对象也行(new Request()，参数与下面的一样)。<br />
   * 建议用“字符串”(包含要获取资源的URL)!!!<br />
   *
   * @param arg_obj JSON配置对象(里头都是事件)，可选。<br />
   * {<br />
   *   resolved: ( response, status_num ) => {}, // 请求响应时触发(无论请求的响应码是哪种)，第一个参数是response(Response对象)，第二个参数是数值类型的响应状态码。<br /><br />
   *
   *   rejected: error => {}, // 仅当网络故障时或请求被阻止时，才会触发rejected函数，有一个error函数参数。<br /><br />
   *
   *   success: ( data4ResponseType, response ) => {} // 请求真正成功时触发的，第一个参数是data4ResponseType参数，第二个参数是response参数。<br />
   *   注：<br />
   *   data4ResponseType是根据opt_obj的responseType属性的属性值来提前处理的响应数据，responseType属性值只能是规定的5中，<br />
   *   当没传responseType或其值是undefined时，data4ResponseType跟第二个参数response参数一样，由开发者自己处理响应数据。<br /><br />
   *
   *   error: ( status_num, response ) => {} // 当响应状态码不是200时，触发的函数，第一个参数是响应状态码，第二个参数是response参数。
   *
   * @param opt_obj JSON配置对象，可选，不传的属性就不要写到这个配置对象里头！<br />
   * {<br />
   *   responseType: undefined, // 字符串，响应的数据类型，默认值undefined(表示开发者自己处理响应数据，不用CT做数据处理)，可选。<br />
   *   会根据这个参数，提前处理响应的数据！<br />
   *   有如下值：'arrayBuffer'、'blob'、'formData'、'json'、'text'<br />
   *   注：暂时不支持'json5'<br /><br />
   *
   *   method: 'GET', // 字符串，请求使用的方法，如'GET'、'POST'。默认值'GET'。<br /><br />
   *
   *   headers: null, // JSON对象|ByteString，请求的头信息，形式为Headers的对象或包含ByteString值的对象字面量。<br />
   *   // post方法传数据给后台，则需要给请求头加："Content-type": "application/x-www-form-urlencoded;charset=UTF-8"等等这样一类的请求头<br />
   *   // 当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br />
   *   // 例如：<br />
   *   // 第一种：<br />
   *   // let myHeaders = new Headers();<br />
   *   // myHeaders.append('Content-Type', 'image/jpeg');<br />
   *   // headers: myHeaders<br />
   *   // 第二种：<br />
   *   // headers: new Headers( { 'Content-Type': 'application/json' } )<br />
   *   // 不传该属性就不要写到这个配置对象里头！<br /><br />
   *
   *   body: null, // 后面描述的数据类型，比如用于POST请求，存放传给服务器的数据，请求的body信息：可能是一个Blob、BufferSource、FormData、URLSearchParams或者USVString对象。<br />
   *   // 注意GET或HEAD方法的请求不能包含body信息。<br />
   *   // post方法传数据给后台，则需要给请求头加："Content-type": "application/x-www-form-urlencoded;charset=UTF-8"等等这样一类的请求头<br />
   *   // 当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br />
   *   // 不传该属性就不要写到这个配置对象里头！<br /><br />
   *
   *   mode: 'same-origin', // 字符串，请求的模式，如'cors'、'no-cors'或者'same-origin'。默认值'same-origin'。<br />
   *   注：<br />
   *   fetch的mode配置项有3个值，如下：<br />
   *   same-origin：该模式是不允许跨域的，它需要遵守同源策略，否则浏览器会返回一个error告知不能跨域；其对应的response type为basic。<br />
   *   cors: 该模式支持跨域请求，顾名思义它是以CORS的形式跨域；当然该模式也可以同域请求不需要后端额外的CORS支持；其对应的response<br />
   *   type为cors。当 Access-Control-Allow-Origin:* 时，mode是"cors"才行，不然还是没法跨域。<br />
   *   no-cors: 该模式用于跨域请求但是服务器不带CORS响应头，也就是服务端不支持CORS；这也是fetch的特殊跨域请求方式；其对应的response<br />
   *   type为opaque。而且浏览器不回去请求这个跨域的资源，也不会报错！<br />
   *   针对跨域请求，cors模式是常见跨域请求实现，但是fetch自带的no-cors跨域请求模式则较为陌生，该模式有一个比较明显的特点：<br />
   *   该模式允许浏览器发送本次跨域请求，但是不能访问响应返回的内容，这也是其response type为opaque透明的原因。<br />
   *   注意： cors 支持 三种content-type 不支持 application/json<br />
   *   application/x-www-form-urlencoded<br />
   *   multipart/form-data<br />
   *   text/plain<br /><br />
   *
   *   credentials: 'same-origin', // 字符串，请求的credentials(证书、凭据)，如'omit'(不需要凭据)、'same-origin'或者'include'(跨域源)。默认'same-origin'。<br />
   *   // 为了在当前域名内自动发送cookie，必须提供这个选项，从Chrome50开始，这个属性也可以接受FederatedCredential实例或是一个PasswordCredential实例。<br />
   *   // 当 Access-Control-Allow-Origin:* 时，credentials是"omit"才行，不然还是没法跨域。<br /><br />
   *   关于跨域请求头。<br />
   *   1)当Access-Control-Allow-Origin:*时，不允许使用凭证（即不能设置诸如withCredentials:true、credentials:"include"之类），即不能携带上诸如Cookie之类的凭证。<br />
   *   2)当Access-Control-Allow-Origin:*时，只需确保客户端在发出CORS请求时凭据标志的值为false就可以了：<br />
   *     如果请求使用XMLHttpRequest发出，请确保withCredentials为false。<br />
   *     如果使用服务器发送事件，确保EventSource.withCredentials是false（这是默认值）。<br />
   *     如果使用Fetch API，请确保Request.credentials是"omit"，"omit"表示忽略诸如Cookie之类的凭证。<br />
   *   3)要想客户端既能发起跨域请求，又想将客户端携带的凭证（诸如Cookie之类的凭证）附加到跨域请求上传给服务端，<br />
   *     那么服务端的响应头得如下设置：<br />
   *     'Access-Control-Allow-Credentials': true、<br />
   *     'Access-Control-Allow-Origin': '允许发起跨域请求的客户端的Origin（如：https://localhost:8100），就是不可以是通配符“*”'、<br />
   *     'Vary': 'Origin' <br />
   *     客户端也得如下设置：<br />
   *     确保客户端在发出CORS请求时凭据标志的值为true就可以了：<br />
   *     如果请求使用XMLHttpRequest发出，请确保withCredentials为true。<br />
   *     如果使用服务器发送事件，确保EventSource.withCredentials是true。<br />
   *     如果使用Fetch API，请确保Request.credentials是"include"。<br />
   *
   *   cache: 'default', // 字符串，请求的cache模式：'default'、'no-store'、'reload'、'no-cache'、'force-cache'或者'only-if-cached'。默认值'default'。<br /><br />
   *
   *   redirect: 'follow', // 字符串，可用的redirect(重定向)模式：'follow'(自动重定向)、'error'(如果产生重定向将自动终止并且抛出一个错误)或者'manual'(手动处理重定向)。<br />
   *   // 在Chrome中，Chrome47之前的默认值是'manual'，从Chrome47开始默认值是'follow'。默认是'follow'。<br /><br />
   *
   *   referrer: 'client', // 字符串，请求引用，一个USVString可以是'no-referrer'、'client'或一个URL。默认是'client'。<br /><br />
   *
   *   referrerPolicy: 'no-referrer', // 字符串，请求引用策略，指定引用HTTP头的值。可能是'no-referrer'、'no-referrer-when-downgrade'、'origin'、'origin-when-cross-origin'、'unsafe-url'。<br />
   *   // 默认值'no-referrer'。<br /><br />
   *
   *   integrity: null, // 字符串，包括请求的subresource integrity值(例如：sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=)。<br />
   *   // 不传该属性就不要写到这个配置对象里头！<br /><br />
   *
   *   keepalive: null, // keepalive选项可用于允许请求比页面寿命长。带keepalive标志的fetch替代了Navigator.sendBeacon()API。<br />
   *   // 不传该属性就不要写到这个配置对象里头！<br /><br />
   *
   *   signal: null, // 请求信号，一个AbortSignal对象实例，允许您与fetch request通信，并在需要时通过AbortController中止该请求。<br />
   *   // 不传该属性就不要写到这个配置对象里头！<br />
   *
   * @returns {Promise} Promise对象，resolved会有一个Response类型的参数“response”。
   *
   *  注：<br />
   *  1、GET请求中，sendData的值的数据类型可以是JSON对象(不需要字符串化)或是FormData，且不是特别指定，可以不需要设置请求头('Content-Type':'application/json')这一类的。<br /><br />
   */
  fetch( input, arg_obj = {}, opt_obj = {} ){
    let pra1_obj = Object.assign( {
        resolved: ( response, status_num ) => {
        },
        rejected: event => void ( GetError( event.message ) ),
        success: ( data4ResponseType, response ) => {
        },
        error: ( status_num, response ) => void ( GetError( response ) ),
      }, arg_obj ),
      pra2_obj = Object.assign( {
        method: 'GET',
        mode: 'same-origin',
        credentials: 'same-origin',
        cache: 'default',
        redirect: 'follow',
        referrer: 'client',
        referrerPolicy: 'no-referrer'
      }, opt_obj ),
      responseType_str = pra2_obj.responseType,
      newInput = input;

    delete pra2_obj.responseType;

    if( pra2_obj.method === 'GET' && ( ( this.isObject( pra2_obj.body ) && !this.isEmpty( pra2_obj.body ) ) || ( this.isFormData( pra2_obj.body ) && !this.isEmpty( pra2_obj.body ) ) ) ){
      let searchStr = '',
        urlSea2Obj = {},
        body = {};

      if( input.includes( '?' ) ){
        newInput = input.split( '?' )[ 0 ];
        urlSea2Obj = this.urlSea2Obj( '?' + input.split( '?' )[ 1 ] );
      }

      if( this.isFormData( pra2_obj.body ) ){
        Array.from( pra2_obj.body.entries() )
          .forEach( ( [ key, value ] ) => void ( body[ key ] = value ) );
      }
      else{
        body = pra2_obj.body;
      }

      Object.entries( Object.assign( urlSea2Obj, body ) )
        .forEach( ( [ keyName, keyValue ] ) => void ( searchStr += `${ keyName }=${ keyValue }&` ) );

      newInput = `${ newInput }?${ searchStr.trim()
        .slice( 0, -1 ) }`;
    }

    pra2_obj.method === 'GET' && ( delete pra2_obj.body );

    return fetch( newInput, pra2_obj )
      .then( response => {
        pra1_obj.resolved( response.clone(), response.status );
        let isSuccess = response && response.ok && response.status === 200;
        if( isSuccess && responseType_str === 'arrayBuffer' ){
          // arrayBuffer() ArrayBuffer
          response.clone()
            .arrayBuffer()
            .then( arrayBuffer => pra1_obj.success( arrayBuffer, response.clone() ) )
            .catch( pra1_obj.rejected );
        }
        else if( isSuccess && responseType_str === 'blob' ){
          // blob() // Blob
          response.clone()
            .blob()
            .then( blob => pra1_obj.success( blob, response.clone() ) )
            .catch( pra1_obj.rejected );
        }
        else if( isSuccess && responseType_str === 'formData' ){
          // formData() // FormData
          response.clone()
            .formData()
            .then( formData => pra1_obj.success( formData, response.clone() ) )
            .catch( pra1_obj.rejected );
        }
        else if( isSuccess && responseType_str === 'json' ){
          // json() // JSON
          response.clone()
            .json()
            .then( json => pra1_obj.success( json, response.clone() ) )
            .catch( pra1_obj.rejected );
        }
        else if( isSuccess && responseType_str === 'text' ){
          // text() // string
          response.clone()
            .text()
            .then( text => pra1_obj.success( text, response.clone() ) )
            .catch( pra1_obj.rejected );
        }
        else if( isSuccess && !responseType_str ){
          let responseClone = response.clone();
          pra1_obj.success( responseClone, responseClone );
        }
        else if( !isSuccess ){
          pra1_obj.error( response.status, response.clone() );
        }
        return response.clone();
      } )
      .catch( pra1_obj.rejected );
  }

  /**
   * 传入XMLHttpRequest对象，返回一个JSON对象，里头是所有的响应头，keyName是响应头名，keyValue是响应头值<br />
   * 注：如果未收到响应则返回null。如果发生网络错误，则返回空字符串''。
   *
   * @param xhr XMLHttpRequest对象，必须
   *
   * @returns {Object} {}，object
   */
  getAllResponseHeaders( xhr ){
    let allRH = xhr.getAllResponseHeaders();
    if( !this.isNull( allRH ) || ( this.isString( allRH ) && allRH.length !== 0 ) ){
      let allRHArr = allRH.split( '\r\n' ),
        allRHO = {},
        arr;
      allRHArr.slice( 0, allRHArr.length - 1 )
        .forEach( value => {
          arr = value.split( ': ' );
          allRHO[ arr[ 0 ] ] = arr[ 1 ];
        } );
      return allRHO;
    }
    else{
      return null;
    }
  }

  /**
   * 获取后台的JSON类型的数据<br /><br />
   *
   * post请求content-type,即数据请求的格式主要设置方式：<br />
   * 1、application/x-www-form-urlencoded（大多数请求可用：eg：'name=Denzel&age=18'）<br />
   * 2、multipart/form-data<br />
   * 3、application/json（json格式对象，eg：{'name':'Denzel','age':'18'}）<br />
   * 4、text/xml(现在用的很少了，发送xml格式文件或流,webservice请求用的较多)<br /><br />
   *
   * 当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br /><br />
   *
   * 而且使用jQuery中的Ajax时，还需要：<br />
   * contentType: false,<br />
   * processData: false,<br /><br />
   *
   * @param url 字符串，请求地址(url)，必须
   *
   * @param paraObj 配置对象{}，可选<br />
   * {<br />
   *  sendData: 发送给后台服务器的数据，默认值null<br />
   *  注：<br />
   *  1、POST方法传数据给后台，则需要给请求头加："Content-type": "application/x-www-form-urlencoded;charset=UTF-8"等等一类的请求头<br />
   *  2、GET方法就算是设置了这个属性值，服务器也不会收到。<br />
   *  3、当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br /><br />
   *
   *  async: boolean，true异步请求，false同步请求，默认true<br /><br />
   *
   *  user: string，用户名，默认null<br /><br />
   *
   *  password: string，用户密码，默认null<br /><br />
   *
   *  setTimeOut: number，设置请求超时时间，单位是ms，默认0，表示不超时，如：1000ms，表示1000ms后会触发超时事件<br /><br />
   *
   *  requestHeader: {}，JSON对象，设置请求头，keyName是请求头名，keyValue是请求头值。<br />
   *  注：<br />
   *  post方法传数据给后台，则需要加："Content-type":"application/x-www-form-urlencoded;charset=UTF-8"等等一类的请求头<br />
   *  当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br /><br />
   *
   *  withCredentials: boolean，指示Access-Control是否应使用cookie授权标头或TLS客户端证书等凭据进行跨站点请求。<br />
   *  来自不同域的cookie不能设置为XMLHttpRequest自己的域cookie值，除非在发出请求之前设置withCredentials为true。<br />
   *  通过设置withCredentials为true获得的第三方cookie，但仍将遵循同源策略，因此请求脚本无法通过document.cookie或响应头来访问它们。<br />
   *  此外，此标志还用于指示何时在响应中忽略cookie。默认true。<br />
   *  注：<br />
   *  为true时，哪怕服务器的响应头设置为{'Access-Control-Allow-Origin': '*'}，也会被同源策略限制。<br />
   *  为false时，只要服务器的响应头设置为{'Access-Control-Allow-Origin': '*'}，就能跨域访问了<br />
   *  所以，默认为true，也就是不允许跨域<br /><br />
   *
   *  关于跨域请求头。<br />
   *   1)当Access-Control-Allow-Origin:*时，不允许使用凭证（即不能设置诸如withCredentials:true、credentials:"include"之类），即不能携带上诸如Cookie之类的凭证。<br />
   *   2)当Access-Control-Allow-Origin:*时，只需确保客户端在发出CORS请求时凭据标志的值为false就可以了：<br />
   *     如果请求使用XMLHttpRequest发出，请确保withCredentials为false。<br />
   *     如果使用服务器发送事件，确保EventSource.withCredentials是false（这是默认值）。<br />
   *     如果使用Fetch API，请确保Request.credentials是"omit"，"omit"表示忽略诸如Cookie之类的凭证。<br />
   *   3)要想客户端既能发起跨域请求，又想将客户端携带的凭证（诸如Cookie之类的凭证）附加到跨域请求上传给服务端，<br />
   *     那么服务端的响应头得如下设置：<br />
   *     'Access-Control-Allow-Credentials': true、<br />
   *     'Access-Control-Allow-Origin': '允许发起跨域请求的客户端的Origin（如：https://localhost:8100），就是不可以是通配符“*”'、<br />
   *     'Vary': 'Origin' <br />
   *     客户端也得如下设置：<br />
   *     确保客户端在发出CORS请求时凭据标志的值为true就可以了：<br />
   *     如果请求使用XMLHttpRequest发出，请确保withCredentials为true。<br />
   *     如果使用服务器发送事件，确保EventSource.withCredentials是true。<br />
   *     如果使用Fetch API，请确保Request.credentials是"include"。<br />
   *
   *  // 在加载资源的进度开始时会触发该事件<br />
   *  loadStart: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 当readyState文档的属性发生更改时会触发该事件<br />
   *  readyStateChange: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 操作、下载资源正在进行中<br />
   *  progress: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 由于预设时间到期，Progression终止时会触发该事件<br />
   *  timeout: ( event, xhr ) => {},<br /><br />
   *
   *  // 资源及其相关资源完成加载时会触发该事件<br />
   *  load: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 请求发生错误时会触发该事件<br />
   *  error: ( event, xhr ) => {},<br /><br />
   *
   *  // 中止加载资源时会触发该事件，调用XHR.abort()后，会触发这个事件<br />
   *  abort: ( event, xhr ) => {},<br /><br />
   *
   *  // 当在加载资源时停止进度时（例如，在发送“错误”，“中止”或“加载”之后），将触发该事件<br />
   *  loadEnd: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 当responseType是'json'时，IE浏览器会被自定义处理，第三个参数response也会是JSON对象，但第二个参数xhr的response属性还是JSON字符串<br />
   *  success: ( event, xhr, response ) => {},<br /><br />
   *
   *  // 上传资源事件对象<br />
   *  uploadEvent: {<br />
   *      // 上传已经开始<br />
   *      loadStart: (event, xhr)=>{},<br /><br />
   *
   *      // 目前为止上传的进展<br />
   *      progress: (event, xhr)=>{},<br /><br />
   *
   *      // 上传超时<br />
   *      timeout: (event, xhr)=>{},<br /><br />
   *
   *      // 上传成功完成<br />
   *      load: (event, xhr)=>{},<br /><br />
   *
   *      // 由于错误导致上传失败<br />
   *      error: (event, xhr)=>{},<br /><br />
   *
   *      // 上传操作已中止<br />
   *      abort: (event, xhr)=>{},<br /><br />
   *
   *      // 上传完成，此事件不区分成功或失败。load、error、abort、timeout都会触发它<br />
   *      loadEnd: (event, xhr)=>{},<br /><br />
   *
   *  注：<br />
   *  1、GET请求中，sendData的值的数据类型可以是JSON对象(不需要字符串化)或是FormData，且不是特别指定，可以不需要设置请求头('Content-Type':'application/json')这一类的。<br /><br />
   */
  getJSONAjax( url, paraObj = {} ){
    paraObj[ 'method' ] = 'GET';
    paraObj[ 'responseType' ] = 'json';
    this.ajax( url, paraObj );
  }

  /**
   * 把字符串化的DOM对象解析为DOM对象
   *
   * @param data string，字符串化的DOM对象，必须
   *
   * @param type string，要解析成的DOM对象类型，必须，有：'application/xml'、'text/html'、'image/svg+xml'
   *
   * @returns {Document} XML对象、HTML对象、SVG对象
   */
  strToDOM( data, type ){
    'use strict';

    return new DOMParser().parseFromString( data, type );
  }

  /**
   * Ajax的POST请求<br /><br />
   * PS:<br />
   * 1、跨域情况下，会先发出OPTIONS请求，其响应成功后才会去请求真正的post请求。
   *
   * post请求content-type,即数据请求的格式主要设置方式：<br />
   * 1、application/x-www-form-urlencoded（大多数请求可用：eg：'name=Denzel&age=18'）<br />
   * 2、multipart/form-data<br />
   * 3、application/json（json格式对象，eg：{'name':'Denzel','age':'18'}）<br />
   * 4、text/xml(现在用的很少了，发送xml格式文件或流,webservice请求用的较多)<br /><br />
   *
   * 当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br /><br />
   *
   * 而且使用jQuery中的Ajax时，还需要：<br />
   * contentType: false,<br />
   * processData: false,<br /><br />
   *
   * @param url 字符串，请求地址(url)，必须
   *
   * @param paraObj 配置对象{}，可选<br />
   * {<br />
   *  sendData: 发送给后台服务器的数据，默认值null<br />
   *  注：<br />
   *  1、POST方法传数据给后台，则需要给请求头加："Content-type": "application/x-www-form-urlencoded;charset=UTF-8"等等一类的请求头<br />
   *  2、GET方法就算是设置了这个属性值，服务器也不会收到。<br />
   *  3、当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br /><br />
   *
   *  async: boolean，true异步请求，false同步请求，默认true<br /><br />
   *
   *  user: string，用户名，默认null<br /><br />
   *
   *  password: string，用户密码，默认null<br /><br />
   *
   *  overrideMimeType: string，MIME Type，用途与responseType同类，早期的，建议用responseType代替它，默认值null，表示不传<br /><br />
   *
   *  responseType: string，MIME Type，设置响应的数据类型，会影响响应的数据的数据类型，默认值null，表示不传<br />
   *  如：'json'，响应的response的数据类型是JSON对象不会是JSON字符串了(IE被自定义处理过了，也会返回JSON对象)<br />
   *  有如下值：'arraybuffer'、'blob'、'document'、'json'、'text'<br /><br />
   *
   *  setTimeOut: number，设置请求超时时间，单位是ms，默认0，表示不超时，如：1000ms，表示1000ms后会触发超时事件<br /><br />
   *
   *  requestHeader: {}，JSON对象，设置请求头，keyName是请求头名，keyValue是请求头值。<br />
   *  注：<br />
   *  post方法传数据给后台，则需要加："Content-type":"application/x-www-form-urlencoded;charset=UTF-8"等等一类的请求头<br />
   *  当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br /><br />
   *
   *  withCredentials: boolean，指示Access-Control是否应使用cookie授权标头或TLS客户端证书等凭据进行跨站点请求。<br />
   *  来自不同域的cookie不能设置为XMLHttpRequest自己的域cookie值，除非在发出请求之前设置withCredentials为true。<br />
   *  通过设置withCredentials为true获得的第三方cookie，但仍将遵循同源策略，因此请求脚本无法通过document.cookie或响应头来访问它们。<br />
   *  此外，此标志还用于指示何时在响应中忽略cookie。默认true。<br />
   *  注：<br />
   *  为true时，哪怕服务器的响应头设置为{'Access-Control-Allow-Origin': '*'}，也会被同源策略限制。<br />
   *  为false时，只要服务器的响应头设置为{'Access-Control-Allow-Origin': '*'}，就能跨域访问了<br />
   *  所以，默认为true，也就是不允许跨域<br /><br />
   *
   *  关于跨域请求头。<br />
   *   1)当Access-Control-Allow-Origin:*时，不允许使用凭证（即不能设置诸如withCredentials:true、credentials:"include"之类），即不能携带上诸如Cookie之类的凭证。<br />
   *   2)当Access-Control-Allow-Origin:*时，只需确保客户端在发出CORS请求时凭据标志的值为false就可以了：<br />
   *     如果请求使用XMLHttpRequest发出，请确保withCredentials为false。<br />
   *     如果使用服务器发送事件，确保EventSource.withCredentials是false（这是默认值）。<br />
   *     如果使用Fetch API，请确保Request.credentials是"omit"，"omit"表示忽略诸如Cookie之类的凭证。<br />
   *   3)要想客户端既能发起跨域请求，又想将客户端携带的凭证（诸如Cookie之类的凭证）附加到跨域请求上传给服务端，<br />
   *     那么服务端的响应头得如下设置：<br />
   *     'Access-Control-Allow-Credentials': true、<br />
   *     'Access-Control-Allow-Origin': '允许发起跨域请求的客户端的Origin（如：https://localhost:8100），就是不可以是通配符“*”'、<br />
   *     'Vary': 'Origin' <br />
   *     客户端也得如下设置：<br />
   *     确保客户端在发出CORS请求时凭据标志的值为true就可以了：<br />
   *     如果请求使用XMLHttpRequest发出，请确保withCredentials为true。<br />
   *     如果使用服务器发送事件，确保EventSource.withCredentials是true。<br />
   *     如果使用Fetch API，请确保Request.credentials是"include"。<br />
   *
   *  // 在加载资源的进度开始时会触发该事件<br />
   *  loadStart: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 当readyState文档的属性发生更改时会触发该事件<br />
   *  readyStateChange: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 操作、下载资源正在进行中<br />
   *  progress: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 由于预设时间到期，Progression终止时会触发该事件<br />
   *  timeout: ( event, xhr ) => {},<br /><br />
   *
   *  // 资源及其相关资源完成加载时会触发该事件<br />
   *  load: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 请求发生错误时会触发该事件<br />
   *  error: ( event, xhr ) => {},<br /><br />
   *
   *  // 中止加载资源时会触发该事件，调用XHR.abort()后，会触发这个事件<br />
   *  abort: ( event, xhr ) => {},<br /><br />
   *
   *  // 当在加载资源时停止进度时（例如，在发送“错误”，“中止”或“加载”之后），将触发该事件<br />
   *  loadEnd: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 当responseType是'json'时，IE浏览器会被自定义处理，第三个参数response也会是JSON对象，但第二个参数xhr的response属性还是JSON字符串<br />
   *  success: ( event, xhr, response ) => {},<br /><br />
   *
   *  // 上传资源事件对象<br />
   *  uploadEvent: {<br />
   *      // 上传已经开始<br />
   *      loadStart: (event, xhr)=>{},<br /><br />
   *
   *      // 目前为止上传的进展<br />
   *      progress: (event, xhr)=>{},<br /><br />
   *
   *      // 上传超时<br />
   *      timeout: (event, xhr)=>{},<br /><br />
   *
   *      // 上传成功完成<br />
   *      load: (event, xhr)=>{},<br /><br />
   *
   *      // 由于错误导致上传失败<br />
   *      error: (event, xhr)=>{},<br /><br />
   *
   *      // 上传操作已中止<br />
   *      abort: (event, xhr)=>{},<br /><br />
   *
   *      // 上传完成，此事件不区分成功或失败。load、error、abort、timeout都会触发它<br />
   *      loadEnd: (event, xhr)=>{},<br /><br />
   *
   *  注：<br />
   *  1、GET请求中，sendData的值的数据类型可以是JSON对象(不需要字符串化)或是FormData，且不是特别指定，可以不需要设置请求头('Content-Type':'application/json')这一类的。<br /><br />
   */
  postAjax( url, paraObj = {} ){
    paraObj[ 'method' ] = 'POST';
    this.ajax( url, paraObj );
  }

  /**
   * Ajax的DELETE请求<br /><br />
   * PS:<br />
   * 1、跨域情况下，会先发出OPTIONS请求，其响应成功后才会去请求真正的delete请求。
   *
   * post请求content-type,即数据请求的格式主要设置方式：<br />
   * 1、application/x-www-form-urlencoded（大多数请求可用：eg：'name=Denzel&age=18'）<br />
   * 2、multipart/form-data<br />
   * 3、application/json（json格式对象，eg：{'name':'Denzel','age':'18'}）<br />
   * 4、text/xml(现在用的很少了，发送xml格式文件或流,webservice请求用的较多)<br /><br />
   *
   * 当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br /><br />
   *
   * 而且使用jQuery中的Ajax时，还需要：<br />
   * contentType: false,<br />
   * processData: false,<br /><br />
   *
   * @param url 字符串，请求地址(url)，必须
   *
   * @param paraObj 配置对象{}，可选<br />
   * {<br />
   *  sendData: 发送给后台服务器的数据，默认值null<br />
   *  注：<br />
   *  1、POST方法传数据给后台，则需要给请求头加："Content-type": "application/x-www-form-urlencoded;charset=UTF-8"等等一类的请求头<br />
   *  2、GET方法就算是设置了这个属性值，服务器也不会收到。<br />
   *  3、当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br /><br />
   *
   *  async: boolean，true异步请求，false同步请求，默认true<br /><br />
   *
   *  user: string，用户名，默认null<br /><br />
   *
   *  password: string，用户密码，默认null<br /><br />
   *
   *  overrideMimeType: string，MIME Type，用途与responseType同类，早期的，建议用responseType代替它，默认值null，表示不传<br />
   *  如：'text/xml'、'text/plain'<br /><br />
   *
   *  responseType: string，MIME Type，设置响应的数据类型，会影响响应的数据的数据类型，默认值null，表示不传<br />
   *  如：'json'，响应的response的数据类型是JSON对象不会是JSON字符串了(IE被自定义处理过了，也会返回JSON对象)<br />
   *  有如下值：'arraybuffer'、'blob'、'document'、'json'、'text'<br /><br />
   *
   *  setTimeOut: number，设置请求超时时间，单位是ms，默认0，表示不超时，如：1000ms，表示1000ms后会触发超时事件<br /><br />
   *
   *  requestHeader: {}，JSON对象，设置请求头，keyName是请求头名，keyValue是请求头值。<br />
   *  注：<br />
   *  post方法传数据给后台，则需要加："Content-type":"application/x-www-form-urlencoded;charset=UTF-8"等等一类的请求头<br />
   *  当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br /><br />
   *
   *  withCredentials: boolean，指示Access-Control是否应使用cookie授权标头或TLS客户端证书等凭据进行跨站点请求。<br />
   *  来自不同域的cookie不能设置为XMLHttpRequest自己的域cookie值，除非在发出请求之前设置withCredentials为true。<br />
   *  通过设置withCredentials为true获得的第三方cookie，但仍将遵循同源策略，因此请求脚本无法通过document.cookie或响应头来访问它们。<br />
   *  此外，此标志还用于指示何时在响应中忽略cookie。默认true。<br />
   *  注：<br />
   *  为true时，哪怕服务器的响应头设置为{'Access-Control-Allow-Origin': '*'}，也会被同源策略限制。<br />
   *  为false时，只要服务器的响应头设置为{'Access-Control-Allow-Origin': '*'}，就能跨域访问了<br />
   *  所以，默认为true，也就是不允许跨域<br /><br />
   *
   *  关于跨域请求头。<br />
   *   1)当Access-Control-Allow-Origin:*时，不允许使用凭证（即不能设置诸如withCredentials:true、credentials:"include"之类），即不能携带上诸如Cookie之类的凭证。<br />
   *   2)当Access-Control-Allow-Origin:*时，只需确保客户端在发出CORS请求时凭据标志的值为false就可以了：<br />
   *     如果请求使用XMLHttpRequest发出，请确保withCredentials为false。<br />
   *     如果使用服务器发送事件，确保EventSource.withCredentials是false（这是默认值）。<br />
   *     如果使用Fetch API，请确保Request.credentials是"omit"，"omit"表示忽略诸如Cookie之类的凭证。<br />
   *   3)要想客户端既能发起跨域请求，又想将客户端携带的凭证（诸如Cookie之类的凭证）附加到跨域请求上传给服务端，<br />
   *     那么服务端的响应头得如下设置：<br />
   *     'Access-Control-Allow-Credentials': true、<br />
   *     'Access-Control-Allow-Origin': '允许发起跨域请求的客户端的Origin（如：https://localhost:8100），就是不可以是通配符“*”'、<br />
   *     'Vary': 'Origin' <br />
   *     客户端也得如下设置：<br />
   *     确保客户端在发出CORS请求时凭据标志的值为true就可以了：<br />
   *     如果请求使用XMLHttpRequest发出，请确保withCredentials为true。<br />
   *     如果使用服务器发送事件，确保EventSource.withCredentials是true。<br />
   *     如果使用Fetch API，请确保Request.credentials是"include"。<br />
   *
   *  // 在加载资源的进度开始时会触发该事件<br />
   *  loadStart: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 当readyState文档的属性发生更改时会触发该事件<br />
   *  readyStateChange: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 操作、下载资源正在进行中<br />
   *  progress: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 由于预设时间到期，Progression终止时会触发该事件<br />
   *  timeout: ( event, xhr ) => {},<br /><br />
   *
   *  // 资源及其相关资源完成加载时会触发该事件<br />
   *  load: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 请求发生错误时会触发该事件<br />
   *  error: ( event, xhr ) => {},<br /><br />
   *
   *  // 中止加载资源时会触发该事件，调用XHR.abort()后，会触发这个事件<br />
   *  abort: ( event, xhr ) => {},<br /><br />
   *
   *  // 当在加载资源时停止进度时（例如，在发送“错误”，“中止”或“加载”之后），将触发该事件<br />
   *  loadEnd: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 当responseType是'json'时，IE浏览器会被自定义处理，第三个参数response也会是JSON对象，但第二个参数xhr的response属性还是JSON字符串<br />
   *  success: ( event, xhr, response ) => {},<br /><br />
   *
   *  // 上传资源事件对象<br />
   *  uploadEvent: {<br />
   *      // 上传已经开始<br />
   *      loadStart: (event, xhr)=>{},<br /><br />
   *
   *      // 目前为止上传的进展<br />
   *      progress: (event, xhr)=>{},<br /><br />
   *
   *      // 上传超时<br />
   *      timeout: (event, xhr)=>{},<br /><br />
   *
   *      // 上传成功完成<br />
   *      load: (event, xhr)=>{},<br /><br />
   *
   *      // 由于错误导致上传失败<br />
   *      error: (event, xhr)=>{},<br /><br />
   *
   *      // 上传操作已中止<br />
   *      abort: (event, xhr)=>{},<br /><br />
   *
   *      // 上传完成，此事件不区分成功或失败。load、error、abort、timeout都会触发它<br />
   *      loadEnd: (event, xhr)=>{},<br /><br />
   *
   *  注：<br />
   *  1、GET请求中，sendData的值的数据类型可以是JSON对象(不需要字符串化)或是FormData，且不是特别指定，可以不需要设置请求头('Content-Type':'application/json')这一类的。<br /><br />
   */
  deleteAjax( url, paraObj = {} ){
    paraObj[ 'method' ] = 'DELETE';
    this.ajax( url, paraObj );
  }

  /**
   * Ajax的PUT请求<br /><br />
   * PS:<br />
   * 1、跨域情况下，会先发出OPTIONS请求，其响应成功后才会去请求真正的put请求。
   *
   * post请求content-type,即数据请求的格式主要设置方式：<br />
   * 1、application/x-www-form-urlencoded（大多数请求可用：eg：'name=Denzel&age=18'）<br />
   * 2、multipart/form-data<br />
   * 3、application/json（json格式对象，eg：{'name':'Denzel','age':'18'}）<br />
   * 4、text/xml(现在用的很少了，发送xml格式文件或流,webservice请求用的较多)<br /><br />
   *
   * 当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br /><br />
   *
   * 而且使用jQuery中的Ajax时，还需要：<br />
   * contentType: false,<br />
   * processData: false,<br /><br />
   *
   * @param url 字符串，请求地址(url)，必须
   *
   * @param paraObj 配置对象{}，可选<br />
   * {<br />
   *  sendData: 发送给后台服务器的数据，默认值null<br />
   *  注：<br />
   *  1、POST方法传数据给后台，则需要给请求头加："Content-type": "application/x-www-form-urlencoded;charset=UTF-8"等等一类的请求头<br />
   *  2、GET方法就算是设置了这个属性值，服务器也不会收到。<br />
   *  3、当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br /><br />
   *
   *  async: boolean，true异步请求，false同步请求，默认true<br /><br />
   *
   *  user: string，用户名，默认null<br /><br />
   *
   *  password: string，用户密码，默认null<br /><br />
   *
   *  overrideMimeType: string，MIME Type，用途与responseType同类，早期的，建议用responseType代替它，默认值null，表示不传<br />
   *  如：'text/xml'、'text/plain'<br /><br />
   *
   *  responseType: string，MIME Type，设置响应的数据类型，会影响响应的数据的数据类型，默认值null，表示不传<br />
   *  如：'json'，响应的response的数据类型是JSON对象不会是JSON字符串了(IE被自定义处理过了，也会返回JSON对象)<br />
   *  有如下值：'arraybuffer'、'blob'、'document'、'json'、'text'<br /><br />
   *
   *  setTimeOut: number，设置请求超时时间，单位是ms，默认0，表示不超时，如：1000ms，表示1000ms后会触发超时事件<br /><br />
   *
   *  requestHeader: {}，JSON对象，设置请求头，keyName是请求头名，keyValue是请求头值。<br />
   *  注：<br />
   *  post方法传数据给后台，则需要加："Content-type":"application/x-www-form-urlencoded;charset=UTF-8"等等一类的请求头<br />
   *  当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br /><br />
   *
   *  withCredentials: boolean，指示Access-Control是否应使用cookie授权标头或TLS客户端证书等凭据进行跨站点请求。<br />
   *  来自不同域的cookie不能设置为XMLHttpRequest自己的域cookie值，除非在发出请求之前设置withCredentials为true。<br />
   *  通过设置withCredentials为true获得的第三方cookie，但仍将遵循同源策略，因此请求脚本无法通过document.cookie或响应头来访问它们。<br />
   *  此外，此标志还用于指示何时在响应中忽略cookie。默认true。<br />
   *  注：<br />
   *  为true时，哪怕服务器的响应头设置为{'Access-Control-Allow-Origin': '*'}，也会被同源策略限制。<br />
   *  为false时，只要服务器的响应头设置为{'Access-Control-Allow-Origin': '*'}，就能跨域访问了<br />
   *  所以，默认为true，也就是不允许跨域<br /><br />
   *
   *  关于跨域请求头。<br />
   *   1)当Access-Control-Allow-Origin:*时，不允许使用凭证（即不能设置诸如withCredentials:true、credentials:"include"之类），即不能携带上诸如Cookie之类的凭证。<br />
   *   2)当Access-Control-Allow-Origin:*时，只需确保客户端在发出CORS请求时凭据标志的值为false就可以了：<br />
   *     如果请求使用XMLHttpRequest发出，请确保withCredentials为false。<br />
   *     如果使用服务器发送事件，确保EventSource.withCredentials是false（这是默认值）。<br />
   *     如果使用Fetch API，请确保Request.credentials是"omit"，"omit"表示忽略诸如Cookie之类的凭证。<br />
   *   3)要想客户端既能发起跨域请求，又想将客户端携带的凭证（诸如Cookie之类的凭证）附加到跨域请求上传给服务端，<br />
   *     那么服务端的响应头得如下设置：<br />
   *     'Access-Control-Allow-Credentials': true、<br />
   *     'Access-Control-Allow-Origin': '允许发起跨域请求的客户端的Origin（如：https://localhost:8100），就是不可以是通配符“*”'、<br />
   *     'Vary': 'Origin' <br />
   *     客户端也得如下设置：<br />
   *     确保客户端在发出CORS请求时凭据标志的值为true就可以了：<br />
   *     如果请求使用XMLHttpRequest发出，请确保withCredentials为true。<br />
   *     如果使用服务器发送事件，确保EventSource.withCredentials是true。<br />
   *     如果使用Fetch API，请确保Request.credentials是"include"。<br />
   *
   *  // 在加载资源的进度开始时会触发该事件<br />
   *  loadStart: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 当readyState文档的属性发生更改时会触发该事件<br />
   *  readyStateChange: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 操作、下载资源正在进行中<br />
   *  progress: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 由于预设时间到期，Progression终止时会触发该事件<br />
   *  timeout: ( event, xhr ) => {},<br /><br />
   *
   *  // 资源及其相关资源完成加载时会触发该事件<br />
   *  load: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 请求发生错误时会触发该事件<br />
   *  error: ( event, xhr ) => {},<br /><br />
   *
   *  // 中止加载资源时会触发该事件，调用XHR.abort()后，会触发这个事件<br />
   *  abort: ( event, xhr ) => {},<br /><br />
   *
   *  // 当在加载资源时停止进度时（例如，在发送“错误”，“中止”或“加载”之后），将触发该事件<br />
   *  loadEnd: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 当responseType是'json'时，IE浏览器会被自定义处理，第三个参数response也会是JSON对象，但第二个参数xhr的response属性还是JSON字符串<br />
   *  success: ( event, xhr, response ) => {},<br /><br />
   *
   *  // 上传资源事件对象<br />
   *  uploadEvent: {<br />
   *      // 上传已经开始<br />
   *      loadStart: (event, xhr)=>{},<br /><br />
   *
   *      // 目前为止上传的进展<br />
   *      progress: (event, xhr)=>{},<br /><br />
   *
   *      // 上传超时<br />
   *      timeout: (event, xhr)=>{},<br /><br />
   *
   *      // 上传成功完成<br />
   *      load: (event, xhr)=>{},<br /><br />
   *
   *      // 由于错误导致上传失败<br />
   *      error: (event, xhr)=>{},<br /><br />
   *
   *      // 上传操作已中止<br />
   *      abort: (event, xhr)=>{},<br /><br />
   *
   *      // 上传完成，此事件不区分成功或失败。load、error、abort、timeout都会触发它<br />
   *      loadEnd: (event, xhr)=>{},<br /><br />
   *
   *  注：<br />
   *  1、GET请求中，sendData的值的数据类型可以是JSON对象(不需要字符串化)或是FormData，且不是特别指定，可以不需要设置请求头('Content-Type':'application/json')这一类的。<br /><br />
   */
  putAjax( url, paraObj = {} ){
    paraObj[ 'method' ] = 'PUT';
    this.ajax( url, paraObj );
  }

  /**
   * Ajax的GET请求<br /><br />
   * 注意：GET请求body传参，只要多包一层data属性就行了，例如：{ headers: { 'Content-Type': 'application/json', }, data: { data:
   * JSON.stringify( { age: 11, } ) } }
   *
   * post请求content-type,即数据请求的格式主要设置方式：<br />
   * 1、application/x-www-form-urlencoded（大多数请求可用：eg：'name=Denzel&age=18'）<br />
   * 2、multipart/form-data<br />
   * 3、application/json（json格式对象，eg：{'name':'Denzel','age':'18'}）<br />
   * 4、text/xml(现在用的很少了，发送xml格式文件或流,webservice请求用的较多)<br /><br />
   *
   * 当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br /><br />
   *
   * 而且使用jQuery中的Ajax时，还需要：<br />
   * contentType: false,<br />
   * processData: false,<br /><br />
   *
   * @param url 字符串，请求地址(url)，必须
   *
   * @param paraObj 配置对象{}，可选<br />
   * {<br />
   *  sendData: 发送给后台服务器的数据，默认值null<br />
   *  注：<br />
   *  1、POST方法传数据给后台，则需要给请求头加："Content-type": "application/x-www-form-urlencoded;charset=UTF-8"等等一类的请求头<br />
   *  2、GET方法就算是设置了这个属性值，服务器也不会收到。<br />
   *  3、当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br /><br />
   *
   *  async: boolean，true异步请求，false同步请求，默认true<br /><br />
   *
   *  user: string，用户名，默认null<br /><br />
   *
   *  password: string，用户密码，默认null<br /><br />
   *
   *  overrideMimeType: string，MIME Type，用途与responseType同类，早期的，建议用responseType代替它，默认值null，表示不传<br />
   *  如：'text/xml'、'text/plain'<br /><br />
   *
   *  responseType: string，MIME Type，设置响应的数据类型，会影响响应的数据的数据类型，默认值null，表示不传<br />
   *  如：'json'，响应的response的数据类型是JSON对象不会是JSON字符串了(IE被自定义处理过了，也会返回JSON对象)<br />
   *  有如下值：'arraybuffer'、'blob'、'document'、'json'、'text'<br /><br />
   *
   *  setTimeOut: number，设置请求超时时间，单位是ms，默认0，表示不超时，如：1000ms，表示1000ms后会触发超时事件<br /><br />
   *
   *  requestHeader: {}，JSON对象，设置请求头，keyName是请求头名，keyValue是请求头值。<br />
   *  注：<br />
   *  post方法传数据给后台，则需要加："Content-type":"application/x-www-form-urlencoded;charset=UTF-8"等等一类的请求头<br />
   *  当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br /><br />
   *
   *  withCredentials: boolean，指示Access-Control是否应使用cookie授权标头或TLS客户端证书等凭据进行跨站点请求。<br />
   *  来自不同域的cookie不能设置为XMLHttpRequest自己的域cookie值，除非在发出请求之前设置withCredentials为true。<br />
   *  通过设置withCredentials为true获得的第三方cookie，但仍将遵循同源策略，因此请求脚本无法通过document.cookie或响应头来访问它们。<br />
   *  此外，此标志还用于指示何时在响应中忽略cookie。默认true。<br />
   *  注：<br />
   *  为true时，哪怕服务器的响应头设置为{'Access-Control-Allow-Origin': '*'}，也会被同源策略限制。<br />
   *  为false时，只要服务器的响应头设置为{'Access-Control-Allow-Origin': '*'}，就能跨域访问了<br />
   *  所以，默认为true，也就是不允许跨域<br /><br />
   *
   *  关于跨域请求头。<br />
   *   1)当Access-Control-Allow-Origin:*时，不允许使用凭证（即不能设置诸如withCredentials:true、credentials:"include"之类），即不能携带上诸如Cookie之类的凭证。<br />
   *   2)当Access-Control-Allow-Origin:*时，只需确保客户端在发出CORS请求时凭据标志的值为false就可以了：<br />
   *     如果请求使用XMLHttpRequest发出，请确保withCredentials为false。<br />
   *     如果使用服务器发送事件，确保EventSource.withCredentials是false（这是默认值）。<br />
   *     如果使用Fetch API，请确保Request.credentials是"omit"，"omit"表示忽略诸如Cookie之类的凭证。<br />
   *   3)要想客户端既能发起跨域请求，又想将客户端携带的凭证（诸如Cookie之类的凭证）附加到跨域请求上传给服务端，<br />
   *     那么服务端的响应头得如下设置：<br />
   *     'Access-Control-Allow-Credentials': true、<br />
   *     'Access-Control-Allow-Origin': '允许发起跨域请求的客户端的Origin（如：https://localhost:8100），就是不可以是通配符“*”'、<br />
   *     'Vary': 'Origin' <br />
   *     客户端也得如下设置：<br />
   *     确保客户端在发出CORS请求时凭据标志的值为true就可以了：<br />
   *     如果请求使用XMLHttpRequest发出，请确保withCredentials为true。<br />
   *     如果使用服务器发送事件，确保EventSource.withCredentials是true。<br />
   *     如果使用Fetch API，请确保Request.credentials是"include"。<br />
   *
   *  // 在加载资源的进度开始时会触发该事件<br />
   *  loadStart: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 当readyState文档的属性发生更改时会触发该事件<br />
   *  readyStateChange: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 操作、下载资源正在进行中<br />
   *  progress: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 由于预设时间到期，Progression终止时会触发该事件<br />
   *  timeout: ( event, xhr ) => {},<br /><br />
   *
   *  // 资源及其相关资源完成加载时会触发该事件<br />
   *  load: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 请求发生错误时会触发该事件<br />
   *  error: ( event, xhr ) => {},<br /><br />
   *
   *  // 中止加载资源时会触发该事件，调用XHR.abort()后，会触发这个事件<br />
   *  abort: ( event, xhr ) => {},<br /><br />
   *
   *  // 当在加载资源时停止进度时（例如，在发送“错误”，“中止”或“加载”之后），将触发该事件<br />
   *  loadEnd: ( event, xhr, response, status ) => {},<br /><br />
   *
   *  // 当responseType是'json'时，IE浏览器会被自定义处理，第三个参数response也会是JSON对象，但第二个参数xhr的response属性还是JSON字符串<br />
   *  success: ( event, xhr, response ) => {},<br /><br />
   *
   *  // 上传资源事件对象<br />
   *  uploadEvent: {<br />
   *      // 上传已经开始<br />
   *      loadStart: (event, xhr)=>{},<br /><br />
   *
   *      // 目前为止上传的进展<br />
   *      progress: (event, xhr)=>{},<br /><br />
   *
   *      // 上传超时<br />
   *      timeout: (event, xhr)=>{},<br /><br />
   *
   *      // 上传成功完成<br />
   *      load: (event, xhr)=>{},<br /><br />
   *
   *      // 由于错误导致上传失败<br />
   *      error: (event, xhr)=>{},<br /><br />
   *
   *      // 上传操作已中止<br />
   *      abort: (event, xhr)=>{},<br /><br />
   *
   *      // 上传完成，此事件不区分成功或失败。load、error、abort、timeout都会触发它<br />
   *      loadEnd: (event, xhr)=>{},<br /><br />
   *
   *  注：<br />
   *  1、GET请求中，sendData的值的数据类型可以是JSON对象(不需要字符串化)或是FormData，且不是特别指定，可以不需要设置请求头('Content-Type':'application/json')这一类的。<br /><br />
   */
  getAjax( url, paraObj = {} ){
    paraObj[ 'method' ] = 'GET';
    this.ajax( url, paraObj );
  }

  // 原生JS代替jQuery的Ajax操作，还支持fetch方法 End

  // 原生JS代替jQuery的部分节点操作 Start

  /**
   * 绑定click点击事件，当支持触屏事件时，会自动切换到tap事件，否则继续是click事件
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param f 点击事件所要执行的函数，会传入event，它也是解除绑定事件的函数，而且它的配置选项默认是false，必需
   *
   * @param options 有两种数据类型，options参数的默认值是false，可选<br />
   * 第一种是布尔值，true表示捕获，false表示不捕获<br />
   * 第二种是JSON对象，里头有capture、once、passive、mozSystemGroup等这几个属性，<br />
   * capture布尔值，是否捕获，默认为false，不捕获<br />
   * once布尔值，表示事件执行函数在添加之后最多只调用一次。如果是 true，事件执行函数会在其被调用之后自动移除。默认false<br />
   * passive布尔值，表示事件执行函数永远不会调用preventDefault()。如果事件执行函数仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。<br />
   * mozSystemGroup只能在 XBL 或者是 Firefox' chrome 使用，这是个 Boolean，表示 listener 被添加到 system group。
   *
   * @returns {Array} [Element]
   */
  aCE( elem, f, options ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      this.isTouch()
      ? ( this.tap( elemO, f, options || false ) )
      : ( elemO.addEventListener( 'click', f, options || false ) );
      return elemO;
    } );
  }

  /**
   * 给节点增加类名<br />
   * 注：<br />
   * 1、“document”、“window”会被先转换为“document.documentElement”处理
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param classN 单个类名('t1')或类名组('t1,t2,t3')，都是字符串类型的数据，不能是''、' ',必需<br />
   * DOMTokenList.length 数组长度<br />
   * DOMTokenList.value 一个类名集合的字符串，如：'a b c d'
   *
   * @returns {Array} [DOMTokenList]，DOMTokenList.length(数组长度)，DOMTokenList.value(一个类名集合的字符串，如：'a b c d')
   */
  aClassN( elem, classN ){
    'use strict';

    return IsHandle6.call( this, elem, classN, 'add' );
  }

  /**
   * 原生JS封装jQuery的animate()，效果一模一样！
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param initialProps 样式对象({})，key是样式名(不能用驼峰命名法)，必需
   *
   * @param initialParams 动画效果的配置对象，可选<br />
   * 如：<br />
   * {<br />
   *   duration: 300, // 表示动画要多久执行完，单位是ms，默认300ms<br /><br />
   *
   *   easing: 'linear', // 动画缓动，默认为'linear'线性匀速，也可以是'swing'(摇摆)，支持函数，会传入一个number类型的参数progress，但需要返回一个number数值<br /><br />
   *
   *   begin: elements => {}, // 动画开始时执行的函数，会有一个'elements'参数，节点数组([Element])<br /><br />
   *
   *   complete: elements => {}, // 动画完成时执行的函数，会有一个'elements'参数，节点数组([Element])<br /><br />
   *
   *   // 动画正在进行中执行的函数，会有四个函数参数<br />
   *   // elements(节点数组[Element])<br />
   *   // complete(number，当前动画完成的百分比，作为小数值，范围是'0'到'1'，'0'表示动画刚开始，'1'表示动画刚执行结束)<br />
   *   // remaining(number，动画还有多少时间结束，以'ms'为单位，'0'表示动画刚执行结束)<br />
   *   // start(number，回调函数开始执行的绝对时间，以'ms'为单位，如：1538238132659这样的时间戳)<br />
   *   progress: (elements, complete, remaining, start) => {}<br /><br />
   *
   * 注：complete处理函数在多个节点('#div_p > p, input')时无法触发！可以嵌套处理！得到每一个元素后再把该元素进行animate处理<br />
   * 节点的顺序是根据文档中节点位置而定的前后！最前的先执行
   */
  animate( elem, initialProps, initialParams ){
    let _this = this;
    IsHandle10.call( _this, elem, elementO => {
      const els = [];
      ( _this.isDocument( elementO ) || _this.isWindow( elementO ) )
      ? ( els.push( document.documentElement ) )
      : ( els.push( elementO ) );
      const a = {
        props: Object.assign( {}, initialProps ),
        params: Object.assign( {
          duration: 300,
          easing: 'linear',
        }, initialParams ),
        elements: els,
        animating: false,
        que: [],
        easingProgress( easing, progress ){
          if( easing === 'swing' ){
            return 0.5 - ( Math.cos( progress * Math.PI ) / 2 );
          }
          if( typeof easing === 'function' ){
            return easing( progress );
          }
          return progress;
        },
        stop(){
          ( a.frameId ) && ( CAnimationFFun.call( _this, a.frameId ) );
          a.animating = false;
          a.elements.forEach( el => {
            const element = el;
            delete element.ctoAnimateInstance;
          } );
          a.que = [];
        },
        done( complete ){
          a.animating = false;
          a.elements.forEach( el => {
            const element = el;
            delete element.ctoAnimateInstance;
          } );
          complete && ( complete( els ) );
          if( a.que.length > 0 ){
            const que = a.que.shift();
            a.animate( que[ 0 ], que[ 1 ] );
          }
        },
        animate( props, params ){
          if( a.animating ){
            a.que.push( [
              props,
              params
            ] );
            return a;
          }
          const elements = [];
          a.elements.forEach( ( el, index, ) => {
            let initialFullValue,
              initialValue,
              unit,
              finalValue,
              finalFullValue;
            ( !el.ctoAnimateInstance ) && ( a.elements[ index ].ctoAnimateInstance = a );
            elements[ index ] = {
              container: el,
            };
            Object.keys( props )
              .forEach( prop => {
                initialFullValue = globalThis.getComputedStyle( el, null )
                  .getPropertyValue( prop )
                  .replace( ',', '.' );
                initialValue = parseFloat( initialFullValue );
                unit = initialFullValue.replace( initialValue, '' );
                finalValue = parseFloat( props[ prop ] );
                finalFullValue = props[ prop ] + unit;
                elements[ index ][ prop ] = {
                  initialFullValue,
                  initialValue,
                  unit,
                  finalValue,
                  finalFullValue,
                  currentValue: initialValue,
                };
              } );
          } );
          let startTime = null,
            time,
            elementsDone = 0,
            propsDone = 0,
            done,
            began = false;
          a.animating = true;
          let render = () => {
            time = new Date().getTime();
            let progress,
              easeProgress;
            !began && ( began = true, ( params.begin ) && ( params.begin( els ) ) );
            ( startTime === null ) && ( startTime = time );
            ( params.progress ) && ( params.progress( els, Math.max( Math.min( ( time - startTime ) / params.duration, 1 ), 0 ), ( ( startTime + params.duration ) - time < 0
                                                                                                                                   ? 0
                                                                                                                                   : ( startTime + params.duration ) - time ), startTime ) );
            elements.forEach( element => {
              const el = element;
              if( done || el.done ){
                return;
              }
              Object.keys( props )
                .forEach( prop => {
                  if( done || el.done ){
                    return;
                  }
                  progress = Math.max( Math.min( ( time - startTime ) / params.duration, 1 ), 0 );
                  easeProgress = a.easingProgress( params.easing, progress );
                  const {
                    initialValue,
                    finalValue,
                    unit
                  } = el[ prop ];
                  el[ prop ].currentValue = initialValue + ( easeProgress * ( finalValue - initialValue ) );
                  const currentValue = el[ prop ].currentValue;
                  if( ( finalValue > initialValue && currentValue >= finalValue ) || ( finalValue < initialValue && currentValue <= finalValue ) ){
                    el.container.style[ prop ] = finalValue + unit;
                    ++propsDone;
                    ( propsDone === Object.keys( props ).length ) && ( el.done = true, ++elementsDone );
                    ( elementsDone === elements.length ) && ( done = true );
                  }
                  if( done ){
                    a.done( params.complete );
                    return;
                  }
                  el.container.style[ prop ] = currentValue + unit;
                } );
            } );
            if( done ){
              return;
            }
            a.frameId = RAnimationFFun.call( _this, render );
          };
          a.frameId = RAnimationFFun.call( _this, render );
          return a;
        },
      };
      if( a.elements.length === 0 ){
        return els;
      }
      let animateInstance;
      for(
        let i = 0;
        i < a.elements.length;
        ++i
      ){
        a.elements[ i ].ctoAnimateInstance
        ? ( animateInstance = a.elements[ i ].ctoAnimateInstance )
        : ( a.elements[ i ].ctoAnimateInstance = a );
      }
      ( !animateInstance ) && ( animateInstance = a );
      initialProps === 'stop'
      ? ( animateInstance.stop() )
      : ( animateInstance.animate( a.props, a.params ) );
    } );
  }

  /**
   * 动画被取消、中断时触发<br />
   * 注：<br />
   * 1、只有火狐浏览器(PC、Android、iOS、iOS的Safari浏览器(而且不是从主屏幕启动的))支持，其他浏览器不支持<br />
   * 2、动画被任何操作中断(不包括动画的暂停(animation-play-state: paused)和继续(animation-play-state: running)这两个操作)<br />
   * 3、触发的情况：<br />
   * 任何时候它停止运行而不发送animationend事件时发送此事件<br />
   * 例如当animation-name更改、移除动画、动画节点被隐藏(display:none)
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param fun 事件所要执行的函数，会传入event，它也是解除"animationcancel"事件的函数，而且它的配置选项默认是false，必需
   *
   * @param options 有两种数据类型，options参数的默认值是false，可选<br />
   * 第一种是布尔值，true表示捕获，false表示不捕获<br />
   * 第二种是JSON对象，里头有capture、once、passive、mozSystemGroup等这几个属性，<br />
   * capture布尔值，是否捕获，默认为false，不捕获<br />
   * once布尔值，表示事件执行函数在添加之后最多只调用一次。如果是 true，事件执行函数会在其被调用之后自动移除。默认false<br />
   * passive布尔值，表示事件执行函数永远不会调用preventDefault()。如果事件执行函数仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。<br />
   * mozSystemGroup只能在 XBL 或者是 Firefox' chrome 使用，这是个 Boolean，表示 listener 被添加到 system group。
   *
   * @returns {Array} [Element]
   */
  animateCancel( elem, fun, options ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      this.on( elemO, 'animationcancel', fun, options || false );
      return elemO;
    } );
  }

  /**
   * 动画完成后触发<br />
   * 前提是动画没被任何操作中断，正常完成动画
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param fun 事件所要执行的函数，会传入event，它也是解除"animationend"事件的函数，而且它的配置选项默认是false，必需
   *
   * @param options 有两种数据类型，options参数的默认值是false，可选<br />
   * 第一种是布尔值，true表示捕获，false表示不捕获<br />
   * 第二种是JSON对象，里头有capture、once、passive、mozSystemGroup等这几个属性，<br />
   * capture布尔值，是否捕获，默认为false，不捕获<br />
   * once布尔值，表示事件执行函数在添加之后最多只调用一次。如果是 true，事件执行函数会在其被调用之后自动移除。默认false<br />
   * passive布尔值，表示事件执行函数永远不会调用preventDefault()。如果事件执行函数仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。<br />
   * mozSystemGroup只能在 XBL 或者是 Firefox' chrome 使用，这是个 Boolean，表示 listener 被添加到 system group。
   *
   * @returns {Array} [Element]
   */
  animateEnd( elem, fun, options ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      this.on( elemO, 'animationend', fun, options || false );
      return elemO;
    } );
  }

  /**
   * 动画迭代事件<br />
   * 如果只有一次那就不会触发，每一次迭代重复完成后触发，(animation-iteration-count: 3)，会触发(3 - 1)次
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param fun 事件所要执行的函数，会传入event，它也是解除"animationiteration"事件的函数，而且它的配置选项默认是false，必需
   *
   * @param options 有两种数据类型，options参数的默认值是false，可选<br />
   * 第一种是布尔值，true表示捕获，false表示不捕获<br />
   * 第二种是JSON对象，里头有capture、once、passive、mozSystemGroup等这几个属性，<br />
   * capture布尔值，是否捕获，默认为false，不捕获<br />
   * once布尔值，表示事件执行函数在添加之后最多只调用一次。如果是 true，事件执行函数会在其被调用之后自动移除。默认false<br />
   * passive布尔值，表示事件执行函数永远不会调用preventDefault()。如果事件执行函数仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。<br />
   * mozSystemGroup只能在 XBL 或者是 Firefox' chrome 使用，这是个 Boolean，表示 listener 被添加到 system group。
   *
   * @returns {Array} [Element]
   */
  animateIteration( elem, fun, options ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      this.on( elemO, 'animationiteration', fun, options || false );
      return elemO;
    } );
  }

  /**
   * 绑定动画的开始事件<br />
   * 在动画延迟(如果有的话)完成之后触发
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param fun 事件所要执行的函数，会传入event，它也是解除"animationstart"事件的函数，而且它的配置选项默认是false，必需
   *
   * @param options 有两种数据类型，options参数的默认值是false，可选<br />
   * 第一种是布尔值，true表示捕获，false表示不捕获<br />
   * 第二种是JSON对象，里头有capture、once、passive、mozSystemGroup等这几个属性，<br />
   * capture布尔值，是否捕获，默认为false，不捕获<br />
   * once布尔值，表示事件执行函数在添加之后最多只调用一次。如果是 true，事件执行函数会在其被调用之后自动移除。默认false<br />
   * passive布尔值，表示事件执行函数永远不会调用preventDefault()。如果事件执行函数仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。<br />
   * mozSystemGroup只能在 XBL 或者是 Firefox' chrome 使用，这是个 Boolean，表示 listener 被添加到 system group。
   *
   * @returns {Array} [Element]
   */
  animateStart( elem, fun, options ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      this.on( elemO, 'animationstart', fun, options || false );
      return elemO;
    } );
  }

  /**
   * 创建非文本节点
   *
   * @param arg_obj  JSON对象，配置对象，tagName属性必须！<br />
   * {<br />
   * tagName: 单个标签名、数组[单个标签名]，必需<br /><br />
   *
   * data: 单个节点、单个节点List、单个文本字符串、单个数组(节点、节点List、文本字符串)，可选，默认''<br /><br />
   *
   * fun: 处理节点的函数，会把新建的节点作为参数传入，用于节点的各种操作，可选<br /><br />
   *
   * isText: 布尔值，true表示'文本字符串'类型的数据以纯文本方式(传什么就是什么)添加，false表示'文本字符串'类型的数据以HTML片段方式添加，<br />
   * 默认false，可选<br /><br />
   *
   * is: 字符串，使用customElements.define()定义的自定义元素的标签名称(有效的自定义元素名的格式必须是：小写字母开头，并且一定得有连字符，然后可以由小写字母、数字、下划线、连字符组成)，默认值是null(表示不传)，可选<br /><br />
   *
   * @returns {Element|Array} Element(非文本节点)|[Element(非文本节点)]
   */
  cElem( arg_obj = {} ){
    let pra_obj = Object.assign( {
      data: '',
      fun: elemO => {
      },
      isText: false,
      is: null,
    }, arg_obj );

    const isNull_booC = this.isNull( pra_obj.is );

    return ( ( tagName, data = '', f = ( elemO => {
    } ), text = false ) => {
      let result = [];
      if( this.isArray( tagName ) ){
        let e;
        tagName.forEach( currentValue => {
          isNull_booC
          ? ( e = this.iInsertB( document.createElement( currentValue ), data, text )[ 0 ] )
          : ( e = this.iInsertB( document.createElement( currentValue, { is: pra_obj.is } ), data, text )[ 0 ] );
          f( e );
          result.push( e );
        } );
      }
      else{
        isNull_booC
        ? ( result = this.iInsertB( document.createElement( tagName ), data, text )[ 0 ] )
        : ( result = this.iInsertB( document.createElement( tagName, { is: pra_obj.is } ), data, text )[ 0 ] );
        f( result );
      }
      return result;
    } )( pra_obj.tagName, pra_obj.data, pra_obj.fun, pra_obj.isText );
  }

  /**
   * 创建文本节点
   *
   * @param text 单个文本内容、数组[文本内容]，必需
   *
   * @returns {TextNode|Array} TextNode|[TextNode]
   */
  cTextN( text ){
    let result = [];
    if( this.isArray( text ) ){
      text.forEach( currentValue => void ( result.push( document.createTextNode( currentValue ) ) ) );
    }
    else{
      result = document.createTextNode( text );
    }
    return result;
  }

  /**
   * 元素的change事件，当元素失去焦点时并且值发生变化时触发
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param fun 事件所要执行的函数，会传入event，它也是解除"change"事件的函数，而且它的配置选项默认是false，必需
   *
   * @param options 有两种数据类型，options参数的默认值是false，可选<br />
   * 第一种是布尔值，true表示捕获，false表示不捕获<br />
   * 第二种是JSON对象，里头有capture、once、passive、mozSystemGroup等这几个属性，<br />
   * capture布尔值，是否捕获，默认为false，不捕获<br />
   * once布尔值，表示事件执行函数在添加之后最多只调用一次。如果是 true，事件执行函数会在其被调用之后自动移除。默认false<br />
   * passive布尔值，表示事件执行函数永远不会调用preventDefault()。如果事件执行函数仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。<br />
   * mozSystemGroup只能在 XBL 或者是 Firefox' chrome 使用，这是个 Boolean，表示 listener 被添加到 system group。
   *
   * @returns {Array} [Element]
   */
  change( elem, fun, options ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      elemO.addEventListener( 'change', fun, options || false );
      return elemO;
    } );
  }

  /**
   * 在节点上读写data的方法，模拟jQuery的data()<br />
   * 注意：<br />
   * 如果要把undefined、null设置成数据，请把这两个以字符串形式设置，就是：'undefined'、'null'<br />
   * ctoElemDataStoragew未定义！返回undefined<br />
   * 属性名不在ctoElemDataStoragew中定义！返回null
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param dataO 字符串的时候表示get(只能是单个data属性名)，JSON对象时表示set(key是属性名，value是属性值，任何数据类型的属性值都行)，必需
   *
   * @returns {Array} [get时是各种数据|set时是执行操作的Element]
   */
  data( elem, dataO ){
    'use strict';

    if( this.isString( dataO ) ){
      return IsHandle10.call( this, elem, elemO => {
        let storage = elemO.ctoElemDataStorage;
        if( !( 'ctoElemDataStorage' in elemO ) ){
          console.warn( 'data函数--->ctoElemDataStoragew未定义' );
          return undefined;
        }
        else if( this.remSpace( dataO ) in storage ){
          return storage[ this.remSpace( dataO ) ];
        }
        else if( !( this.remSpace( dataO ) in storage ) ){
          console.warn( 'data函数--->' + this.remSpace( dataO ) + '不在ctoElemDataStoragew中定义！' );
          return null;
        }
      } );
    }
    else if( this.isObject( dataO ) ){
      return IsHandle10.call( this, elem, elemO => {
        !( 'ctoElemDataStorage' in elemO ) && ( elemO[ 'ctoElemDataStorage' ] = {} );
        for( let key in
          dataO ){
          elemO[ 'ctoElemDataStorage' ][ this.remSpace( key ) ] = dataO[ key ];
        }
        return elemO;
      } );
    }
  }

  /**
   * 清空节点内的所有<br />
   * 注：<br />
   * 1、“document”、“window”会被先转换为“document.documentElement”处理
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @returns {Array} [Element]
   */
  empty( elem ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
        document.documentElement.innerHTML = '';
        return elemO;
      }
      elemO.innerHTML = '';
      return elemO;
    } );
  }

  /**
   * 元素淡出隐藏动画(专一性！)
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param para 配置对象，{}，可选<br />
   * {<br />
   *   time: 300, number，多久完成，单位ms，默认300，可选<br /><br />
   *
   *   easing: 'linear', 动画缓动，默认为'linear'线性匀速，也可以是'swing'(摇摆)，支持函数，会传入一个number类型的参数progress，但需要返回一个number数值，可选<br /><br />
   *
   *   fun: element => {}, 动画结束后执行的函数，会有一个elemO节点对象的参数，可选
   */
  fadeHide( elem, para = {} ){
    let argObj = Object.assign( {
      opacity: 0,
      time: 300,
      easing: 'linear',
      fun: element => {
      }
    }, para );
    ( this.isDocument( elem ) || this.isWindow( elem ) ) && ( elem = document.documentElement );
    IsHandle10.call( this, elem, elemO => {
      if( this.gStyle( elemO, 'display' ) !== 'none' ){
        IsHandle19( this, elemO );
        this.animate( elemO, {
          opacity: argObj.opacity,
        }, {
          duration: argObj.time,
          easing: argObj.easing,
          complete: elementArr => {
            this.sAttr( elementArr[ 0 ], {
              style: 'display:none;',
              fadeHide: 'fadeHide',
            } );
            this.rAttr( elementArr[ 0 ], [
              'fadeShow',
              'fadeTo',
              'fadeToggle',
              'hide',
              'show',
              'toggle',
              'slideHide',
              'slideShow',
              'slideToggle',
            ] );
            argObj.fun( elementArr[ 0 ] );
          },
        } );
      }
    } );
  }

  /**
   * 元素淡入显示动画(专一性！)
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param para 配置对象，{}，可选<br />
   * {<br />
   *   time: 300, number，多久完成，单位ms，默认300，可选<br /><br />
   *
   *   easing: 'linear', 动画缓动，默认为'linear'线性匀速，也可以是'swing'(摇摆)，支持函数，会传入一个number类型的参数progress，但需要返回一个number数值，可选<br /><br />
   *
   *   fun: element => {}, 动画结束后执行的函数，会有一个elemO节点对象的参数，可选
   */
  fadeShow( elem, para = {} ){
    let argObj = Object.assign( {
      opacity: 1,
      time: 300,
      easing: 'linear',
      fun: element => {
      },
    }, para );
    ( this.isDocument( elem ) || this.isWindow( elem ) ) && ( elem = document.documentElement );
    IsHandle10.call( this, elem, elemO => {
      if( this.gStyle( elemO, 'display' ) === 'none' ){
        this.sAttr( elemO, {
          style: 'opacity:0;',
        } );
        this.animate( elemO, {
          opacity: argObj.opacity,
        }, {
          duration: argObj.time,
          easing: argObj.easing,
          complete: elementArr => {
            this.sAttr( elemO, {
              style: '',
              fadeShow: 'fadeShow',
            } );
            this.rAttr( elementArr[ 0 ], [
              'fadeHide',
              'fadeTo',
              'fadeToggle',
              'hide',
              'show',
              'toggle',
              'slideHide',
              'slideShow',
              'slideToggle',
            ] );
            argObj.fun( elementArr[ 0 ] );
          },
        } );
      }
      else if( this.gStyle( elemO, 'display' ) !== 'none' && this.gAttr( elemO, 'fadeTo' )[ 0 ] === 'fadeTo' && this.pFloat( this.gAttr( elemO, 'data-opacity' )[ 0 ] ) !== 1 ){
        this.animate( elemO, {
          opacity: argObj.opacity,
        }, {
          duration: argObj.time,
          easing: argObj.easing,
          complete: elementArr => {
            this.sAttr( elemO, {
              style: '',
              fadeShow: 'fadeShow',
            } );
            this.rAttr( elementArr[ 0 ], [
              'fadeHide',
              'fadeTo',
              'fadeToggle',
              'hide',
              'show',
              'toggle',
              'slideHide',
              'slideShow',
              'slideToggle',
            ] );
            argObj.fun( elementArr[ 0 ] );
          },
        } );
      }
    } );
  }

  /**
   * 元素淡入到指定的opacity值的动画(专一性！)
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param para 配置对象，{}，可选<br />
   * {<br />
   *   opacity: 0.5, number，0(包括0)到1(包括1)的透明度，默认0.5，可选<br /><br />
   *
   *   time: 300, number，多久完成，单位ms，默认300，可选<br /><br />
   *
   *   easing: 'linear', 动画缓动，默认为'linear'线性匀速，也可以是'swing'(摇摆)，支持函数，会传入一个number类型的参数progress，但需要返回一个number数值，可选<br /><br />
   *
   *   fun: element => {}, 动画结束后执行的函数，会有一个elemO节点对象的参数，可选
   */
  fadeTo( elem, para = {} ){
    let argObj = Object.assign( {
      opacity: 0.5,
      time: 300,
      easing: 'linear',
      fun: element => {
      },
    }, para );
    ( this.isDocument( elem ) || this.isWindow( elem ) ) && ( elem = document.documentElement );
    IsHandle10.call( this, elem, elemO => {
      if( this.gStyle( elemO, 'display' ) === 'none' ){
        this.sAttr( elemO, {
          style: 'opacity:0;',
        } );
        this.animate( elemO, {
          opacity: argObj.opacity,
        }, {
          duration: argObj.time,
          easing: argObj.easing,
          complete: elementArr => {
            this.sAttr( elemO, {
              fadeTo: 'fadeTo',
            } );
            this.rAttr( elementArr[ 0 ], [
              'fadeHide',
              'fadeShow',
              'fadeToggle',
              'hide',
              'show',
              'toggle',
              'slideHide',
              'slideShow',
              'slideToggle',
            ] );
            argObj.fun( elementArr[ 0 ] );
          },
        } );
      }
      else if( this.gStyle( elemO, 'display' ) !== 'none' ){
        IsHandle19( this, elemO );
        this.animate( elemO, {
          opacity: argObj.opacity,
        }, {
          duration: argObj.time,
          easing: argObj.easing,
          complete: elementArr => {
            this.sAttr( elemO, {
              'data-opacity': argObj.opacity,
              fadeTo: 'fadeTo',
            } );
            this.rAttr( elementArr[ 0 ], [
              'fadeHide',
              'fadeShow',
              'fadeToggle',
              'hide',
              'show',
              'toggle',
              'slideHide',
              'slideShow',
              'slideToggle',
            ] );
            argObj.fun( elementArr[ 0 ] );
          },
        } );
      }
    } );
  }

  /**
   * 元素fadeToggle动画(fadeHide和fadeShow之间切换)(专一性！)
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param para 配置对象，{}，可选<br />
   * {<br />
   *   time: 300, number，多久完成，单位ms，默认300，可选<br /><br />
   *
   *   easing: 'linear', 动画缓动，默认为'linear'线性匀速，也可以是'swing'(摇摆)，支持函数，会传入一个number类型的参数progress，但需要返回一个number数值，可选<br /><br />
   *
   *   fun: element => {}, 动画结束后执行的函数，会有一个elemO节点对象的参数，可选
   */
  fadeToggle( elem, para = {} ){
    let argObj = Object.assign( {
      time: 300,
      easing: 'linear',
      fun: element => {
      },
    }, para );
    ( this.isDocument( elem ) || this.isWindow( elem ) ) && ( elem = document.documentElement );
    IsHandle10.call( this, elem, elemO => {
      if( this.gStyle( elemO, 'display' ) === 'none' ){
        this.fadeShow( elemO, argObj );
      }
      else if( this.gStyle( elemO, 'display' ) !== 'none' ){
        this.fadeHide( elemO, argObj );
      }
    } );
  }

  /**
   * 元素的focus事件，当元素获取到焦点时触发
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param fun 事件所要执行的函数，会传入event，它也是解除"focus"事件的函数，而且它的配置选项默认是false，必需
   *
   * @param options 有两种数据类型，options参数的默认值是false，可选<br />
   * 第一种是布尔值，true表示捕获，false表示不捕获<br />
   * 第二种是JSON对象，里头有capture、once、passive、mozSystemGroup等这几个属性，<br />
   * capture布尔值，是否捕获，默认为false，不捕获<br />
   * once布尔值，表示事件执行函数在添加之后最多只调用一次。如果是 true，事件执行函数会在其被调用之后自动移除。默认false<br />
   * passive布尔值，表示事件执行函数永远不会调用preventDefault()。如果事件执行函数仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。<br />
   * mozSystemGroup只能在 XBL 或者是 Firefox' chrome 使用，这是个 Boolean，表示 listener 被添加到 system group。
   *
   * @returns {Array} [Element]
   */
  focus( elem, fun, options ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      elemO.addEventListener( 'focus', fun, options || false );
      return elemO;
    } );
  }

  /**
   * 获取单个属性值
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param attrN 单个属性名,字符串，必需
   *
   * @returns {Array} [属性值]
   */
  gAttr( elem, attrN ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
        return document.documentElement.getAttribute( this.remSpace( attrN ) );
      }
      return elemO.getAttribute( this.remSpace( attrN ) );
    } );
  }

  /**
   * 获取节点所有的属性名和属性值，以JSON对象表示法返回，key是属性名，value是属性值
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @returns {Array} [JSON Object({})]
   */
  gAttrAll( elem ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      let attrs = {},
        result = {};
      ( this.isDocument( elemO ) || this.isWindow( elemO ) )
      ? ( attrs = document.documentElement.attributes )
      : ( attrs = elemO.attributes );
      result[ 'length' ] = attrs.length;
      Array.from( attrs )
        .forEach( currentValue => void ( result[ currentValue[ 'name' ] ] = currentValue[ 'value' ] ) );
      return result;
    } );
  }

  /**
   * 返回全部的直接子节点(HTMLCollection实时的节点集合)，没有文本节点<br />
   * 注：<br />
   * 1、“window”会被先转换为“document”处理
   *
   * @param elem elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param selector 单个节点选择器(字符串)、单个节点选择器组(字符串)，用于过滤结果节点，满足这个选择器的节点将被采用返回，可选
   *
   * @returns {Array} [HTMLCollection(实时的节点集合)]
   */
  gChildren( elem, selector ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isWindow( elemO ) && this.isUndefined( selector ) ){
        return document.children;
      }
      else if( this.isWindow( elemO ) && !this.isUndefined( selector ) ){
        return IsHandle17.call( this, Array.from( document.children ), document.querySelectorAll( selector ) );
      }
      if( this.isUndefined( selector ) ){
        return elemO.children;
      }
      return IsHandle17.call( this, Array.from( elemO.children ), elemO.querySelectorAll( selector ) );
    } );
  }

  /**
   * 获取所有子节点(实时节点集合HTMLCollection)，没有文本节点<br />
   * 注：<br />
   * 1、“window”会被先转换为“document”处理
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param selector 单个节点选择器(字符串)、单个节点选择器组(字符串)，用于过滤结果节点，满足这个选择器的节点将被采用返回，可选
   *
   * @returns {Array} [HTMLCollection(实时的节点集合)]
   */
  gChildrenAll( elem, selector ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isWindow( elemO ) && this.isUndefined( selector ) ){
        return document.getElementsByTagName( '*' );
      }
      else if( this.isWindow( elemO ) && !this.isUndefined( selector ) ){
        return IsHandle17.call( this, Array.from( document.getElementsByTagName( '*' ) ), document.querySelectorAll( selector ) );
      }
      if( this.isUndefined( selector ) ){
        return elemO.getElementsByTagName( '*' );
      }
      return IsHandle17.call( this, Array.from( elemO.getElementsByTagName( '*' ) ), elemO.querySelectorAll( selector ) );
    } );
  }

  /**
   * 返回全部的直接子节点的个数，没有文本节点
   *
   * @param elem elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @returns {Array} [number]
   */
  gChildrenL( elem ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isWindow( elemO ) ){
        return document.childElementCount;
      }
      return elemO.childElementCount;
    } );
  }

  /**
   * 返回节点的所有类名<br />
   * 注：<br />
   * 1、“document”、“window”会被先转换为“document.documentElement”处理
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需<br />
   * DOMTokenList.length 数组长度<br />
   * DOMTokenList.value 一个类名集合的字符串，如：'a b c d'
   *
   * @returns {Array} [DOMTokenList]，DOMTokenList.length(数组长度)，DOMTokenList.value(一个类名集合的字符串，如：'a b c d')
   */
  gClassN( elem ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
        return document.documentElement.classList;
      }
      return elemO.classList;
    } );
  }

  /**
   * 获取节点的CSS，如：“style.getPropertyValue( cssNameString )”<br />
   * 注：<br />
   * 1、如果未设置，则返回值中的value是空字符串。<br />
   * 2、返回值中的priority是一个DOMString代表优先级（例如  "important"）（如果存在）的。如果不存在，则返回空字符串。
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param attrN 单个CSS属性名(如：'border-width')，字符串，必需
   *
   * @returns {Array} [ { value: '', priority: '' } ]，如：[ { value: '10px', priority: 'important' } ]
   */
  gCSSPro( elem, attrN ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
        return {
          value: document.documentElement.style.getPropertyValue( this.remSpace( attrN ) )
            .trim(),
          priority: document.documentElement.style.getPropertyPriority( this.remSpace( attrN ) )
            .trim(),
        };
      }
      return {
        value: elemO.style.getPropertyValue( this.remSpace( attrN ) )
          .trim(),
        priority: elemO.style.getPropertyPriority( this.remSpace( attrN ) )
          .trim(),
      };
    } );
  }

  /**
   * 获取节点的直接第一个子节点，不包括文本节点
   *
   * @param elem elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @returns {Array} [Element]，如果没有会返回[null]，也就是数组里头会有null的子元素存在
   */
  gFEChild( elem ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isWindow( elemO ) ){
        return document.firstElementChild;
      }
      return elemO.firstElementChild;
    } );
  }

  /**
   * 获取节点的直接最后一个子节点，不包括文本节点
   *
   * @param elem elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @returns {Array} [Element]，如果没有会返回[null]，也就是数组里头会有null的子元素存在
   */
  gLEChild( elem ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isWindow( elemO ) ){
        return document.lastElementChild;
      }
      return elemO.lastElementChild;
    } );
  }

  /**
   * 向下查找所有的同胞节点(不包括文本节点)，没有的话，返回null<br />
   * 注：<br />
   * 1、当elem是“document”、“window”、第一个结果就是null、所有结果节点都不满足“selector”的会直接返回null
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param selector 单个节点选择器(字符串)、单个节点选择器组(字符串)，用于过滤结果节点，满足这个选择器的节点将被采用返回，可选
   *
   * @returns {Array} [[Element]]|[null]，一个二维数组，第一维的数据类型是数组，第二维的数据类型是Element
   */
  gNextAll( elem, selector ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
        return null;
      }
      let handle = elemO => elemO.nextElementSibling,
        arr = [],
        start = handle( elemO );
      if( this.isNull( start ) ){
        return null;
      }
      do{
        arr.push( start );
        start = handle( start );
      }
      while( start );
      if( this.isUndefined( selector ) ){
        return arr;
      }
      return IsHandle17.call( this, arr, this.gPElem( elemO )[ 0 ].querySelectorAll( selector ) );
    } );
  }

  /**
   * 查找下一个同胞节点(不包括文本节点)，没有的话，返回null<br />
   * 注：<br />
   * 1、当elem是“document”、“window”、结果是null的会直接返回null
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @returns {Array} [Element]|[null]
   */
  gNextOne( elem ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
        return null;
      }
      return elemO.nextElementSibling;
    } );
  }

  /**
   * 获取直接的父亲节点，只有一个<br />
   * 注：<br />
   * 1、当elem是“document”、“window”的会直接返回null
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @returns {Array} [Element]|[null]
   */
  gPElem( elem ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
        return null;
      }
      return elemO.parentNode;
    } );
  }

  /**
   * 获取所有的父亲节点<br />
   * 注：<br />
   * 1、当elem是“document”、“window”、“HTML”、所有结果节点都不满足“selector”的会直接返回null
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param selector 单个节点选择器(字符串)、单个节点选择器组(字符串)，用于过滤结果节点，满足这个选择器的节点将被采用返回，可选
   *
   * @returns {Array} [[Element]]|[null]，一个二维数组，第一维的数据类型是数组，第二维的数据类型是Element
   */
  gPElemAll( elem, selector ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
        return null;
      }
      let handle = elemO => elemO.parentNode,
        arr = [],
        start = handle( elemO );
      if( start.nodeName === '#document' ){
        return null;
      }
      do{
        arr.push( start );
        start = handle( start );
      }
      while( start.nodeName !== '#document' );
      if( this.isUndefined( selector ) ){
        return arr;
      }
      return IsHandle17.call( this, arr, document.querySelectorAll( selector ) );
    } );
  }

  /**
   * 向上查找所有的同胞节点(不包括文本节点)，没有的话，返回null<br />
   * 注：<br />
   * 1、当elem是“document”、“window”、第一个结果就是null、所有结果节点都不满足“selector”的会直接返回null
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param selector 单个节点选择器(字符串)、单个节点选择器组(字符串)，用于过滤结果节点，满足这个选择器的节点将被采用返回，可选
   *
   * @returns {Array} [[Element]]|[null]，一个二维数组，第一维的数据类型是数组，第二维的数据类型是Element
   */
  gPrevAll( elem, selector ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
        return null;
      }
      let handle = elemO => elemO.previousElementSibling,
        arr = [],
        start = handle( elemO );
      if( this.isNull( start ) ){
        return null;
      }
      do{
        arr.push( start );
        start = handle( start );
      }
      while( start );
      if( this.isUndefined( selector ) ){
        return arr;
      }
      return IsHandle17.call( this, arr, this.gPElem( elemO )[ 0 ].querySelectorAll( selector ) );
    } );
  }

  /**
   * 查找上一个同胞节点(不包括文本节点)，没有的话，返回null<br />
   * 注：<br />
   * 1、当elem是“document”、“window”、结果是null的会直接返回null
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @returns {Array} [Element]|[null]
   */
  gPrevOne( elem ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
        return null;
      }
      return elemO.previousElementSibling;
    } );
  }

  /**
   * 返回上下文对象的根，该根对象可选地包括"shadow root"(如果有的话)。<br />
   * PS:<br />
   * 1、在标准网页内的某个元素上调用它会返回一个HTMLDocument代表整个页面的对象。<br />
   * 2、在影子DOM内的元素上调用它会返回关联的ShadowRoot对象。<br />
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需，但只处理第一个节点。
   *
   * @param composed Boolean，默认值是false，可选。<br />
   * PS:<br />
   * 1、true：卷影根以外的根节点(HTMLDocument代表整个页面的对象)。<br />
   * 1、false：返回卷影根(关联的ShadowRoot对象)。<br />
   *
   * @returns {*|Node} 返回上下文对象的根，该根对象可选地包括"shadow root"(如果有的话)。
   */
  gRootN( elem, composed ){
    'use strict';

    return IsHandle13.call( this, elem, element => element.getRootNode( { composed: composed ?? false, } ) );
  }

  /**
   * 获取节点的所有同胞节点(不包括文本节点)<br />
   * 注：<br />
   * 1、当elem是“document”、“window”、“HTML”、所有结果节点都不满足“selector”的会直接返回null
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param selector 单个节点选择器(字符串)、单个节点选择器组(字符串)，用于过滤结果节点，满足这个选择器的节点将被采用返回，可选
   *
   * @returns {Array} [[Element]]|[null]，一个二维数组，第一维的数据类型是数组，第二维的数据类型是Element
   */
  gSibElem( elem, selector ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isDocument( elemO ) || this.isWindow( elemO ) || IsHandle1.call( this, elemO, 'HTMLHtmlElement' ) ){
        return null;
      }
      if( this.isUndefined( selector ) ){
        return Array.prototype.filter.call( elemO.parentNode.children, child => child !== elemO );
      }
      return IsHandle17.call( this, Array.prototype.filter.call( elemO.parentNode.children, child => child !== elemO ), this.gPElem( elemO )[ 0 ].querySelectorAll( selector ) );
    } );
  }

  /**
   * 根据元素样式名获取元素样式值<br /><br />
   * 注：<br />
   * 1、“document”、“window”会被先转换为“document.documentElement”处理
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，但只处理第一个节点，必需
   *
   * @param styleN 一个样式名(字符串)或者数组(里头是样式名(字符串))，驼峰命名法，必需
   *
   * @param pseudoElt 字符串，获取伪元素的样式，默认null，可选
   *
   * @returns {String|Array} string|[string]
   */
  gStyle( elem, styleN, pseudoElt = null ){
    if( this.isArray( styleN ) && styleN.length !== 0 ){
      let result = [];
      styleN.forEach( currentValue => void ( result.push( IsHandle13.call( this, elem, elemO => {
        if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
          return document.defaultView.getComputedStyle( document.documentElement, pseudoElt )[ this.trim( currentValue ) ];
        }
        return document.defaultView.getComputedStyle( elemO, pseudoElt )[ this.trim( currentValue ) ];
      } ) ) ) );
      return result;
    }
    else if( this.isString( styleN ) && this.trim( styleN ).length !== 0 ){
      return IsHandle13.call( this, elem, elemO => {
        if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
          return document.defaultView.getComputedStyle( document.documentElement, pseudoElt )[ this.trim( styleN ) ];
        }
        return document.defaultView.getComputedStyle( elemO, pseudoElt )[ this.trim( styleN ) ];
      } );
    }
  }

  /**
   * 判断是否有指定的属性
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param attrN 单个字符串属性名，必需
   *
   * @returns {Array} [布尔值]
   */
  hasAttr( elem, attrN ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
        return document.documentElement.hasAttribute( this.remSpace( attrN ) );
      }
      return elemO.hasAttribute( this.remSpace( attrN ) );
    } );
  }

  /**
   * 节点是否存在指点的类名<br />
   * 注：<br />
   * 1、“document”、“window”会被先转换为“document.documentElement”处理
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param classN 单个字符串单个类名，必需
   *
   * @returns {Array} [boolean]
   */
  hasClass( elem, classN ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
        return document.documentElement.classList.contains( this.remSpace( classN ) );
      }
      return elemO.classList.contains( this.remSpace( classN ) );
    } );
  }

  /**
   * 判断节点上是否有指定的data键名，模拟jQuery的hasData()<br />
   * 注意：<br />
   * ctoElemDataStoragew未定义！返回undefined
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param dataName 单个字符串data键名，必需
   *
   * @returns {Array} [boolean]，存在true，不存在false
   */
  hasData( elem, dataName ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      let storage = elemO.ctoElemDataStorage;
      if( !( 'ctoElemDataStorage' in elemO ) ){
        console.warn( 'hasData函数--->ctoElemDataStoragew未定义！' );
        return undefined;
      }
      else if( this.remSpace( dataName ) in storage ){
        return true;
      }
      else if( !( this.remSpace( dataName ) in storage ) ){
        return false;
      }
    } );
  }

  /**
   * 获取节点的渲染高度<br />
   * PS:<br />
   * 如果值不能有效的转换成数字，那么会返回原本的字符串值。
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @returns {Array} [Float|String]
   */
  height( elem ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isWindow( elemO ) ){
        return elemO.innerHeight;
      }
      else if( this.isDocument( elemO ) ){
        let result1 = this.gStyle( elemO.documentElement, 'height' ),
          result2 = parseFloat( result1 );

        return this.isNaN( result2 )
               ? result1
               : result2;
      }
      else if( this.isElement( elemO ) ){
        let result1 = this.gStyle( elemO, 'height' ),
          result2 = parseFloat( result1 );

        return this.isNaN( result2 )
               ? result1
               : result2;
      }
    } );
  }

  /**
   * 元素隐藏动画(专一性！)
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param para 配置对象，{}，可选<br />
   * {<br />
   *   time: 0, number，多久完成，单位ms，默认0，可选<br /><br />
   *
   *   easing: 'linear', 动画缓动，默认为'linear'线性匀速，也可以是'swing'(摇摆)，支持函数，会传入一个number类型的参数progress，但需要返回一个number数值，可选<br /><br />
   *
   *   fun: element => {}, 动画结束后执行的函数，会有一个elemO节点对象的参数，可选
   */
  hide( elem, para = {} ){
    let argObj = Object.assign( {
      time: 0,
      easing: 'linear',
      fun: element => {
      },
    }, para );
    ( this.isDocument( elem ) || this.isWindow( elem ) ) && ( elem = document.documentElement );
    IsHandle10.call( this, elem, elemO => {
      if( this.gStyle( elemO, 'display' ) !== 'none' ){
        IsHandle19( this, elemO );
        this.sStyle( elemO, {
          overflow: 'hidden',
        } );
        this.animate( elemO, {
          opacity: 0,
          // 'font-size': 0,
          width: 0,
          height: 0,
          padding: 0,
          'border-width': 0,
          margin: 0,
          'outline-width': 0,
        }, {
          duration: argObj.time,
          easing: argObj.easing,
          complete: elementArr => {
            this.sAttr( elementArr[ 0 ], {
              style: 'display:none;',
              hide: 'hide',
            } );
            this.rAttr( elementArr[ 0 ], [
              'fadeHide',
              'fadeShow',
              'fadeTo',
              'fadeToggle',
              'show',
              'toggle',
              'slideHide',
              'slideShow',
              'slideToggle',
            ] );
            argObj.fun( elementArr[ 0 ] );
          },
        } );
      }
    } );
  }

  /**
   * 原生JS代替jQuery的html()方法<br />
   * 注：<br />
   * 1、“document”、“window”会被先转换为“document.documentElement”处理
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param htmlS 有它的时候是设置(HTML片段、字符串)，没有的时候是返回(HTML片段、字符串)，可选
   *
   * @returns {Array} [Element|HTML片段]
   */
  html( elem, htmlS ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isUndefined( htmlS ) ){
        if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
          return document.documentElement.innerHTML;
        }
        return elemO.innerHTML;
      }
      else{
        if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
          document.documentElement.innerHTML = htmlS;
          return elemO;
        }
        elemO.innerHTML = htmlS;
        return elemO;
      }
    } );
  }

  /**
   * 在节点内部，把参数添加成最后一个直接子元素
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param data 单个节点、单个节点List、单个数组(节点、节点List、文本字符串)、单个文本字符串，必需
   *
   * @param isText 布尔值，true表示'文本字符串'类型的数据以纯文本方式(传什么就是什么)添加，false表示'文本字符串'类型的数据以HTML片段方式添加，<br />
   * 默认false，可选
   *
   * @returns {Array} [Element]
   */
  iInsertA( elem, data, isText ){
    'use strict';

    return IsHandle16.call( this, elem, data, 'append', isText || false );
  }

  /**
   * 在节点内部，把参数添加成第一个直接子元素
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param data 单个节点、单个节点List、单个数组(节点、节点List、文本字符串)、单个文本字符串，必需
   *
   * @param isText 布尔值，true表示'文本字符串'类型的数据以纯文本方式(传什么就是什么)添加，false表示'文本字符串'类型的数据以HTML片段方式添加，<br />
   * 默认false，可选
   *
   * @returns {Array} [Element]
   */
  iInsertB( elem, data, isText ){
    'use strict';

    return IsHandle16.call( this, elem, data, 'prepend', isText || false );
  }

  /**
   * 往一个样式表里或页面的一个style标签里添加一个样式规则(如：#xxx{color:white;})，也可以是@keyframes规则<br />
   * 注：<br />
   * 1、默认往第一个CSSStyleSheet(document.styleSheets[0])里添加样式规则，如果没有的话(document.styleSheets.length=0)，<br />
   * 会往页面的head标签内部的最后面新增一个style标签，然后把样式规则添加到这个新增的style标签里<br />
   * 2、火狐浏览器有点特殊“BUG”！<br />
   * InvalidAccessError: A parameter or an operation is not supported by the underlying object<br />
   * InvalidAccessError：基础对象不支持参数或操作<br />
   * let index = document.styleSheets.length - 1;<br />
   * document.styleSheets.item( index ).cssRules;会报错！<br />
   * 但document.styleSheets.item( 0 ).cssRules就不会报错！
   *
   * @param cssRuleO JSON对象，键名是样式规则名(字符串)，如：'#blanc'，键值是样式规则(字符串)，如：'#blanc { color: white '，必须
   *
   * @param para JSON对象，配置参数，可选<br />
   * {<br />
   *  cssStyleSheet：数据类型是CSSStyleSheet，一个CSSStyleSheet或页面的一个style标签，默认是null<br /><br />
   *
   *  index：数据类型是number，插入的位置，默认是null，添加在最后，范围：0(包括)到CSSStyleSheet.cssRules.length(包括)<br /><br />
   *
   *  isR：数据类型是布尔值，是否替换已有的同名的样式规则，默认是false不替换<br /><br />
   */
  insertRule( cssRuleO, para = {} ){
    for( let keyName in
      cssRuleO ){
      let ruleN = keyName,
        dataStr = cssRuleO[ keyName ],
        paraInitInit = Object.assign( {
          cssStyleSheet: null,
          index: null,
          isR: false,
        }, para ),
        len = document.styleSheets.length,
        is1 = this.isNull( paraInitInit.cssStyleSheet ) || this.isUndefined( paraInitInit.cssStyleSheet ),
        handle = cssStyleSheet => {
          let len = cssStyleSheet.cssRules.length,
            in1 = !this.isNull( paraInitInit.index )
                  ? paraInitInit.index
                  : len;
          if( paraInitInit.isR && len === 0 ){
            cssStyleSheet.insertRule( dataStr, 0 );
          }
          else if( paraInitInit.isR && len !== 0 ){
            Array.from( cssStyleSheet.cssRules )
              .forEach( ( v, i, ) => {
                if( name in v
                    ? v.name === this.trim( ruleN )
                    : v.selectorText === this.trim( ruleN ) ){
                  cssStyleSheet.deleteRule( i );
                }
              } );
            cssStyleSheet.insertRule( dataStr, in1 );
          }
          else{
            cssStyleSheet.insertRule( dataStr, in1 );
          }
        };
      if( is1 && len === 0 ){
        this.iInsertA( document.head, this.cElem( {
          tagName: 'style',
          data: dataStr,
          isText: true,
        } ) );
      }
      else if( is1 && len !== 0 ){
        handle( document.styleSheets[ 0 ] );
      }
      else{
        handle( paraInitInit.cssStyleSheet );
      }
    }
  }

  /**
   * 判断是否包含指定的节点(文本不能算节点)<br />
   * 注：<br />
   * 1、“window”会被先转换为“document”处理
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param childE 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象(文本不能算节点)、单个节点List、单个jQuery节点对象，只取第一个，必需
   *
   * @returns {Array} [boolean]，包含true，否则false
   */
  isContains( elem, childE ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      let cE = IsHandle13.call( this, childE, elemO => elemO );
      if( this.isWindow( elemO ) ){
        return document !== cE && document.contains( cE );
      }
      return elemO !== cE && elemO.contains( cE );
    } );
  }

  /**
   * 判断节点是否存在子元素(文本、空格也算子元素)<br />
   * 注：<br />
   * 1、“window”会被先转换为“document”处理
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @returns {Array} [boolean]，没有子元素(文本、空格也算子元素)返回true，有子节点返回false
   */
  isNoChild( elem ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isWindow( elemO ) ){
        return !document.hasChildNodes();
      }
      return !elemO.hasChildNodes();
    } );
  }

  /**
   * 判断节点是否存在子节点(文本、空格不算子节点)<br />
   * 注：<br />
   * 1、“window”会被先转换为“document”处理
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @returns {Array} [boolean]，没有子节点(文本、空格不算子节点)返回true，有子节点返回false
   */
  isNoEChild( elem ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isWindow( elemO ) ){
        return document.firstElementChild === null;
      }
      return elemO.firstElementChild === null;
    } );
  }

  /**
   * 判断是否滚动到了底部
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需，但只会取第一个元素
   *
   * @returns {Boolean} boolean，是返回true，否则false
   */
  isScrollBottom( elem ){
    'use strict';

    return IsHandle13.call( this, elem, elemO => elemO.scrollHeight - elemO.scrollTop === elemO.clientHeight );
  }

  /**
   * 把这个节点以HTML字符串输出，有第二个参数的时候，表示用参数替换这个节点<br />
   * 注：<br />
   * 1、“document”、“window”会被先转换为“document.documentElement”处理
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param htmlS 有它的时候是设置(HTML片段、字符串)，没有的时候是返回(HTML片段、字符串)，可选
   *
   * @returns {Array} [Element|HTML片段]
   */
  oHTML( elem, htmlS ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isUndefined( htmlS ) ){
        if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
          return document.documentElement.outerHTML;
        }
        return elemO.outerHTML;
      }
      else{
        if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
          document.documentElement.outerHTML = htmlS;
          return elemO;
        }
        elemO.outerHTML = htmlS;
        return elemO;
      }
    } );
  }

  /**
   * 在节点外部，把参数添加到这个节点之后(直接、紧邻)
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param data 单个节点、单个节点List、单个数组(节点、节点List、文本字符串)、单个文本字符串，必需
   *
   * @param isText 布尔值，true表示'文本字符串'类型的数据以纯文本方式(传什么就是什么)添加，false表示'文本字符串'类型的数据以HTML片段方式添加，<br />
   * 默认false，可选
   *
   * @returns {Array} [Element]
   */
  oInsertA( elem, data, isText ){
    'use strict';

    return IsHandle16.call( this, elem, data, 'after', isText || false );
  }

  /**
   * 在节点外部，把参数添加到这个节点之前(直接、紧邻)
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param data 单个节点、单个节点List、单个数组(节点、节点List、文本字符串)、单个文本字符串，必需
   *
   * @param isText 布尔值，true表示'文本字符串'类型的数据以纯文本方式(传什么就是什么)添加，false表示'文本字符串'类型的数据以HTML片段方式添加，<br />
   * 默认false，可选
   *
   * @returns {Array} [Element]
   */
  oInsertB( elem, data, isText ){
    'use strict';

    return IsHandle16.call( this, elem, data, 'before', isText || false );
  }

  /**
   * 移除属性
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param attrN 单个字符串属性名、数组[单个字符串属性名]，必需
   *
   * @returns {Array} [Element]
   */
  rAttr( elem, attrN ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isArray( attrN ) ){
        attrN.forEach( currentValue => {
          if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
            document.documentElement.removeAttribute( this.remSpace( currentValue ) );
          }
          else{
            elemO.removeAttribute( this.remSpace( currentValue ) );
          }
        } );
      }
      else if( !this.isArray( attrN ) && ( this.isDocument( elemO ) || this.isWindow( elemO ) ) ){
        document.documentElement.removeAttribute( this.remSpace( attrN ) );
      }
      else if( !this.isArray( attrN ) && !( this.isDocument( elemO ) || this.isWindow( elemO ) ) ){
        elemO.removeAttribute( this.remSpace( attrN ) );
      }
      return elemO;
    } );
  }

  /**
   * 解除click点击事件，当支持触屏事件时，会自动切换到tap事件，否则继续是click事件
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param f 函数，会传入event，必须跟绑定click点击事件时所要执行的函数一模一样，即同一个函数变量，必需
   *
   * @param options 布尔值，true表示捕获，false表示不捕获，可选<br />
   * 如果同一个监听事件分别为“事件捕获”和“事件冒泡”注册了一次，一共两次，这两次事件需要分别移除。两者不会互相干扰。
   *
   * @returns {Array} [Element]
   */
  rCE( elem, f, options ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      this.isTouch()
      ? ( elemO.removeEventListener( 'tap', f, options || false ) )
      : ( elemO.removeEventListener( 'click', f, options || false ) );
      return elemO;
    } );
  }

  /**
   * 给节点删除类名<br />
   * 注：<br />
   * 1、“document”、“window”会被先转换为“document.documentElement”处理
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param classN 单个类名('t1')或类名组('t1,t2,t3')，都是字符串类型的数据，不能是''、' ',必需<br />
   * DOMTokenList.length 数组长度<br />
   * DOMTokenList.value 一个类名集合的字符串，如：'a b c d'
   *
   * @returns {Array} [DOMTokenList]，DOMTokenList.length(数组长度)，DOMTokenList.value(一个类名集合的字符串，如：'a b c d')
   */
  rClassN( elem, classN ){
    'use strict';

    return IsHandle6.call( this, elem, classN, 'remove' );
  }

  /**
   * 移除节点的CSS，如：“style.removeProperty( cssNameString )”<br />
   * 注：<br />
   * 1、请注意，多字属性名称是带连字符的，而不是驼峰式的。<br />
   * 2、返回值是DOMString等于CSS属性的值被移除之前。但是自己封装的这个方法不做该值的返回
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param attrN 单个字符串CSS样式名(如：'border-width')、数组[单个字符串CSS样式名]，必需
   *
   * @returns {Array} [Element]
   */
  rCSSPro( elem, attrN ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isArray( attrN ) ){
        attrN.forEach( currentValue => {
          if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
            document.documentElement.style.removeProperty( this.remSpace( currentValue ) );
          }
          else{
            elemO.style.removeProperty( this.remSpace( currentValue ) );
          }
        } );
      }
      else if( !this.isArray( attrN ) && ( this.isDocument( elemO ) || this.isWindow( elemO ) ) ){
        document.documentElement.style.removeProperty( this.remSpace( attrN ) );
      }
      else if( !this.isArray( attrN ) && !( this.isDocument( elemO ) || this.isWindow( elemO ) ) ){
        elemO.style.removeProperty( this.remSpace( attrN ) );
      }
      return elemO;
    } );
  }

  /**
   * 移除节点<br />
   * 注：<br />
   * 1、当elem是“document”、“window”的会被转换为document.documentElement处理
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @returns {Array} [Element]
   */
  rElem( elem ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
        document.documentElement.remove();
        return elemO;
      }
      elemO.remove();
      return elemO;
    } );
  }

  /**
   * ready方法，当文档加载完就会执行，不需要等待图片等网络资源加载完<br />
   * 注意：文档加载完时，意味着<img>等标签也加载完了！但并不意味着<img>等代表的网络资源也加载完了！
   *
   * @param fn 所要执行的函数，必需
   */
  ready( fn = () => {
  } ){
    if( document.addEventListener ){
      document.addEventListener( 'DOMContentLoaded', function this_Fn1( event ){
        document.removeEventListener( 'DOMContentLoaded', this_Fn1, false );
        fn();
      }, false );
    }
    else if( document.attachEvent ){
      document.attachEvent( 'onreadystatechange', function this_Fn2( event ){
        document.readyState === 'complete' && ( document.detachEvent( 'onreadystatechange', this_Fn2 ), fn() );
      } );
    }
  }

  /**
   * 移除节点上指定的data键名，模拟jQuery的removeData()<br />
   * 注意：<br />
   * ctoElemDataStoragew未定义！返回undefined
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param dataName 单个字符串data键名，必需
   *
   * @returns {Array} [Element]
   */
  removeData( elem, dataName ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      let storage = elemO.ctoElemDataStorage;
      if( !( 'ctoElemDataStorage' in elemO ) ){
        console.warn( 'removeData函数--->ctoElemDataStoragew未定义！' );
        return undefined;
      }
      else if( this.remSpace( dataName ) in storage ){
        delete storage[ this.remSpace( dataName ) ];
        return elemO;
      }
      else if( !( this.remSpace( dataName ) in storage ) ){
        return elemO;
      }
    } );
  }

  /**
   * 节点替换操作<br />
   * 注：<br />
   * 1、“document”、“window”会被先转换为“document.documentElement”处理
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param data data就是用A替换B中的A，单个节点、单个文本，必需
   *
   * @returns {Array} [Element(被替换掉的节点)]
   */
  replaceWith( elem, data ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
        document.documentElement.replaceWith( data );
        return elemO;
      }
      elemO.replaceWith( data );
      return elemO;
    } );
  }

  /**
   * 根据属性名设置属性值
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param attrO JSON对象，key是属性名，value是属性值，必需
   *
   * @returns {Array} [Element]
   */
  sAttr( elem, attrO ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      for( let key in
        attrO ){
        if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
          document.documentElement.setAttribute( this.remSpace( key ), attrO[ key ] );
        }
        else{
          elemO.setAttribute( this.remSpace( key ), attrO[ key ] );
        }
      }
      return elemO;
    } );
  }

  /**
   * 设置节点的CSS，如：“style.setProperty( cssNameString, cssValueString, priority )”<br />
   * 注：<br />
   * 1、cssNameString是一个DOMString代表要修改的CSS属性名称（连字符）。<br />
   * 2、cssValueString可选的是DOMString包含新属性值的。如果未指定，则视为空字符串。不得包含"!important"，如果要包含"!important"应该使用priority参数设置。<br />
   * 3、priority可选的是DOMString允许设置"important"CSS优先级。如果未指定，则视为空字符串。接受以下值：<br />
   * 字符串值: "important"<br />
   * 关键词: undefined<br />
   * 字符串空值: ""
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param attrO JSON对象，key是样式名(如：'border-width')，value是样式值配置对象，必需<br />
   * 格式如：<br />
   * {<br />
   * 'border-width': {<br />
   * value: '10px'<br />
   * priority: 'important'
   *
   * @returns {Array} [Element]
   */
  sCSSPro( elem, attrO ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      for( let key in
        attrO ){
        if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
          document.documentElement.style.setProperty( this.remSpace( key ), attrO[ key ].value, 'priority' in attrO[ key ]
                                                                                                ? attrO[ key ].priority
                                                                                                : '' );
        }
        else{
          elemO.style.setProperty( this.remSpace( key ), attrO[ key ].value, 'priority' in attrO[ key ]
                                                                             ? attrO[ key ].priority
                                                                             : '' );
        }
      }
      return elemO;
    } );
  }

  /**
   * 设置样式 样式名用驼峰命名法(如：fontSize)<br />
   * 注：<br />
   * 1、“document”、“window”会被先转换为“document.documentElement”处理
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param StyleO JSON对象，key是样式名，用驼峰命名法(fontSize)，value是样式值，如：{ fontSize: '16px' ，必需
   *
   * @returns {Array} [Element]
   */
  sStyle( elem, StyleO ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      for( let key in
        StyleO ){
        if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
          document.documentElement.style[ this.remSpace( key ) ] = StyleO[ key ];
        }
        else{
          elemO.style[ this.remSpace( key ) ] = StyleO[ key ];
        }
      }
      return elemO;
    } );
  }

  /**
   * 监听滚动事件
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需，但只会取第一个元素
   *
   * @param f 处理函数 事件所要执行的函数，会传入两个参数，event和Element(具体的执行的元素对象)，必需
   *
   * @param num 数字 当scrollTop的值大于等于这个值的时候，执行f，否则执行h，可选
   *
   * @param h 处理函数2 事件所要执行的函数，会传入两个参数，event和Element(具体的执行的元素对象)，可选
   *
   * @returns {function} function 它是解除"scroll"事件的函数，而且它的配置选项默认是false
   */
  scrollE( elem, f, num, h ){
    'use strict';

    return IsHandle13.call( this, elem, elemO => {
      let fun = e => {
        IsHandle15.call( this, () => {
          this.isUndefined( num )
          ? ( f( e, elemO ) )
          : ( elemO.scrollTop >= num
              ? ( f( e, elemO ) )
              : ( h && h( e, elemO ) ) );
        } );
        AllEStop.call( this, e );
      };

      elemO.addEventListener( 'scroll', fun, false );

      return fun;
    } );
  }

  /**
   * 滚到顶部(强烈建议将全局滚动伪装为局部滚动，就是不把滚动条挂在body或html上)<br />
   * 注：Edge、2345、搜狗、百度、猎豹、UC、微信内置等不支持HTML元素滚到顶部，也不支持body元素滚到顶部(不支持全局滚动)！<br />
   * 但jQuery可以通过$('html,body').animate({scrollTop:'100'},1000)来操作滚动;
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需，但只会取第一个元素
   *
   * @param fun 回调函数，当滚到顶部后要执行的函数，有一个Element参数，可选！
   *
   * @returns {Element} Element
   */
  scrollTop( elem, fun ){
    'use strict';

    return IsHandle13.call( this, elem, elemO => {
      IsHandle15.call( this, () => {
        let d = ( elemO.scrollTop ) / 100,
          timer = setInterval( () => void ( elemO.scrollTop > 0
                                            ? ( elemO.scrollTop -= d )
                                            : ( clearInterval( timer ), fun && fun( elemO ) ) ), 1 );
      } );
      return elemO;
    } );
  }

  /**
   * 代替jQuery的serialize方法<br />
   * 如下标签要是没有name属性，就不会被处理！<br /><br />
   *
   * 注：<br />
   * 只处理如下标签<br />
   * select标签<br />
   * textarea标签<br />
   * input标签的如下type类型<br />
   * checkbox<br />
   * color<br />
   * date<br />
   * datetime-local<br />
   * email<br />
   * hidden<br />
   * month<br />
   * number<br />
   * password<br />
   * radio<br />
   * range<br />
   * search<br />
   * tel<br />
   * text<br />
   * time<br />
   * url<br />
   * week<br />
   * datetime(已经被标准删除了，过时，不建议用！)<br />
   * input标签的type类型以下5种不被处理！<br />
   * file<br />
   * submit<br />
   * button<br />
   * image<br />
   * reset<br /><br />
   *
   * 不支持的input标签的type类型：<br />
   * iOS 12.2 移动端不支持<br />
   * week<br /><br />
   *
   * 火狐PC不支持<br />
   * datetime-local<br />
   * month<br />
   * week
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，但只处理第一个节点，必需
   *
   * @returns {String} 节点的name属性的属性值(被encodeURIComponent处理过了)
   */
  serialize( elem ){
    let result_str = '';
    this.serializeArray( elem )
      .forEach( c => void ( result_str += `${ encodeURIComponent( c.name ) }=${ encodeURIComponent( c.value ) }&` ) );
    return result_str.slice( 0, -1 );
  }

  /**
   * 代替jQuery的serializeArray方法<br />
   * 如下标签要是没有name属性，就不会被处理！<br /><br />
   *
   * 注：<br />
   * 只处理如下标签<br />
   * select标签<br />
   * textarea标签<br />
   * input标签的如下type类型<br />
   * checkbox<br />
   * color<br />
   * date<br />
   * datetime-local<br />
   * email<br />
   * hidden<br />
   * month<br />
   * number<br />
   * password<br />
   * radio<br />
   * range<br />
   * search<br />
   * tel<br />
   * text<br />
   * time<br />
   * url<br />
   * week<br />
   * datetime(已经被标准删除了，过时，不建议用！)<br />
   * input标签的type类型以下5种不被处理！<br />
   * file<br />
   * submit<br />
   * button<br />
   * image<br />
   * reset<br /><br />
   *
   * 不支持的input标签的type类型：<br />
   * iOS 12.2 移动端不支持<br />
   * week<br /><br />
   *
   * 火狐PC不支持<br />
   * datetime-local<br />
   * month<br />
   * week
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，但只处理第一个节点，必需
   *
   * @returns {Array} [ { name: '节点的name属性的属性值', value: '节点的value属性的属性值' } ]
   */
  serializeArray( elem ){
    let result_arr = [],
      fun1 = ( elemTag, tagType_str ) => elemTag.tagName.toLocaleLowerCase() === tagType_str && this.trim( elemTag.name ).length !== 0;
    IsHandle13.call( this, elem, elem_obj => {
      if( elem_obj.tagName.toLocaleLowerCase() === 'form' ){
        // elem_arrC的数据类型是HTMLFormControlsCollection，类数组
        const elem_arrC = elem_obj.elements;
        Array.from( elem_arrC )
          .forEach( c => {
            if( fun1( c, 'select' ) ){
              Array.from( c.selectedOptions )
                .forEach( c1 => {
                  result_arr.push( {
                    name: this.trim( c.name ),
                    value: c1.value || c1.text
                  } );
                } );
            }
            else if( fun1( c, 'textarea' ) ){
              result_arr.push( {
                name: this.trim( c.name ),
                value: c.value.replace( /\r?\n/g, '\r\n' )
              } );
            }
            else if( fun1( c, 'input' ) && !c.disabled && c.type !== 'file' && c.type !== 'submit' && c.type !== 'button' && c.type !== 'image' && c.type !== 'reset' ){
              if( c.type === 'radio' && c.checked ){
                result_arr.push( {
                  name: this.trim( c.name ),
                  value: c.value
                } );
              }
              if( c.type === 'checkbox' && c.checked ){
                result_arr.push( {
                  name: this.trim( c.name ),
                  value: c.value
                } );
              }
              if( c.type !== 'radio' && c.type !== 'checkbox' ){
                result_arr.push( {
                  name: this.trim( c.name ),
                  value: c.value
                } );
              }
            }
          } );
      }
    } );
    return result_arr;
  }

  /**
   * 元素显示动画(专一性！)
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param para 配置对象，{}，可选<br />
   * {<br />
   *   time: 0, number，多久完成，单位ms，默认0，可选<br /><br />
   *
   *   easing: 'linear', 动画缓动，默认为'linear'线性匀速，也可以是'swing'(摇摆)，支持函数，会传入一个number类型的参数progress，但需要返回一个number数值，可选<br /><br />
   *
   *   fun: element => {}, 动画结束后执行的函数，会有一个elemO节点对象的参数，可选
   */
  show( elem, para = {} ){
    let argObj = Object.assign( {
      time: 0,
      easing: 'linear',
      fun: element => {
      },
    }, para );
    ( this.isDocument( elem ) || this.isWindow( elem ) ) && ( elem = document.documentElement );
    IsHandle10.call( this, elem, elemO => {
      let styleObj = this.data( elemO, 'style3Obj' )[ 0 ];
      if( this.gStyle( elemO, 'display' ) === 'none' && styleObj !== undefined && styleObj !== null ){
        this.sAttr( elemO, {
          // font-size:0;
          style: 'overflow:hidden;opacity:0;width:0;height:0;padding:0;border-width:0;margin:0;outline-width:0;',
        } );
        this.animate( elemO, styleObj, {
          duration: argObj.time,
          easing: argObj.easing,
          complete: elementArr => {
            this.sAttr( elemO, {
              style: '',
              show: 'show',
            } );
            this.rAttr( elementArr[ 0 ], [
              'fadeHide',
              'fadeShow',
              'fadeTo',
              'fadeToggle',
              'hide',
              'toggle',
              'slideHide',
              'slideShow',
              'slideToggle',
            ] );
            argObj.fun( elementArr[ 0 ] );
          },
        } );
      }
    } );
  }

  /**
   * 元素向上滑动隐藏动画(专一性！)
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param para 配置对象，{}，可选<br />
   * {<br />
   *   time: 300, number，多久完成，单位ms，默认300，可选<br /><br />
   *
   *   easing: 'linear', 动画缓动，默认为'linear'线性匀速，也可以是'swing'(摇摆)，支持函数，会传入一个number类型的参数progress，但需要返回一个number数值，可选<br /><br />
   *
   *   fun: element => {}, 动画结束后执行的函数，会有一个elemO节点对象的参数，可选
   */
  slideHide( elem, para = {} ){
    let argObj = Object.assign( {
      time: 300,
      easing: 'linear',
      fun: element => {
      },
    }, para );
    ( this.isDocument( elem ) || this.isWindow( elem ) ) && ( elem = document.documentElement );
    IsHandle10.call( this, elem, elemO => {
      if( this.gStyle( elemO, 'display' ) !== 'none' ){
        IsHandle19( this, elemO );
        this.sStyle( elemO, {
          overflow: 'hidden',
        } );
        this.animate( elemO, {
          height: 0,
          'padding-top': 0,
          'padding-bottom': 0,
          'margin-top': 0,
          'margin-bottom': 0,
        }, {
          duration: argObj.time,
          easing: argObj.easing,
          complete: elementArr => {
            this.sAttr( elementArr[ 0 ], {
              style: 'display:none;',
              slideHide: 'slideHide',
            } );
            this.rAttr( elementArr[ 0 ], [
              'fadeHide',
              'fadeShow',
              'fadeTo',
              'fadeToggle',
              'hide',
              'show',
              'toggle',
              'slideShow',
              'slideToggle',
            ] );
            argObj.fun( elementArr[ 0 ] );
          },
        } );
      }
    } );
  }

  /**
   * 元素向下滑动显示动画(专一性！)
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param para 配置对象，{}，可选<br />
   * {<br />
   *   time: 300, number，多久完成，单位ms，默认300，可选<br /><br />
   *
   *   easing: 'linear', 动画缓动，默认为'linear'线性匀速，也可以是'swing'(摇摆)，支持函数，会传入一个number类型的参数progress，但需要返回一个number数值，可选<br /><br />
   *
   *   fun: element => {}, 动画结束后执行的函数，会有一个elemO节点对象的参数，可选
   */
  slideShow( elem, para = {} ){
    let argObj = Object.assign( {
      time: 300,
      easing: 'linear',
      fun: element => {
      },
    }, para );
    ( this.isDocument( elem ) || this.isWindow( elem ) ) && ( elem = document.documentElement );
    IsHandle10.call( this, elem, elemO => {
      let styleObj = this.data( elemO, 'style3Obj' )[ 0 ];
      if( this.gStyle( elemO, 'display' ) === 'none' && styleObj !== undefined && styleObj !== null ){
        let styleBObj = {
          height: styleObj[ 'height' ],
          'padding-top': styleObj[ 'padding-top' ],
          'padding-bottom': styleObj[ 'padding-bottom' ],
          'margin-top': styleObj[ 'margin-top' ],
          'margin-bottom': styleObj[ 'margin-bottom' ],
        };
        this.sAttr( elemO, {
          style: 'overflow:hidden;height:0;padding-top:0;padding-bottom:0;margin-top:0;margin-bottom:0;',
        } );
        this.animate( elemO, styleBObj, {
          duration: argObj.time,
          easing: argObj.easing,
          complete: elementArr => {
            this.sAttr( elemO, {
              style: '',
              slideShow: 'slideShow',
            } );
            this.rAttr( elementArr[ 0 ], [
              'fadeHide',
              'fadeShow',
              'fadeTo',
              'fadeToggle',
              'hide',
              'show',
              'toggle',
              'slideHide',
              'slideToggle',
            ] );
            argObj.fun( elementArr[ 0 ] );
          },
        } );
      }
    } );
  }

  /**
   * 元素slideToggle动画(slideHide和slideShow之间切换)(专一性！)
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param para 配置对象，{}，可选<br />
   * {<br />
   *   time: 300, number，多久完成，单位ms，默认300，可选<br /><br />
   *
   *   easing: 'linear', 动画缓动，默认为'linear'线性匀速，也可以是'swing'(摇摆)，支持函数，会传入一个number类型的参数progress，但需要返回一个number数值，可选<br /><br />
   *
   *   fun: element => {}, 动画结束后执行的函数，会有一个elemO节点对象的参数，可选
   */
  slideToggle( elem, para = {} ){
    let argObj = Object.assign( {
      time: 300,
      easing: 'linear',
      fun: element => {
      },
    }, para );
    ( this.isDocument( elem ) || this.isWindow( elem ) ) && ( elem = document.documentElement );
    IsHandle10.call( this, elem, elemO => {
      if( this.gStyle( elemO, 'display' ) !== 'none' ){
        this.slideHide( elemO, argObj );
      }
      else if( this.gStyle( elemO, 'display' ) === 'none' ){
        this.slideShow( elemO, argObj );
      }
    } );
  }

  /**
   * 给节点增加或删除类名，存在这个类名，就会删除这个类名；不存在，就会添加这个类名<br />
   * 注：<br />
   * 1、“document”、“window”会被先转换为“document.documentElement”处理
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param classN 单个类名('t1')或类名组('t1,t2,t3')，都是字符串类型的数据，不能是''、' ',必需<br />
   * DOMTokenList.length 数组长度<br />
   * DOMTokenList.value 一个类名集合的字符串，如：'a b c d'
   *
   * @returns {Array} [DOMTokenList]，DOMTokenList.length(数组长度)，DOMTokenList.value(一个类名集合的字符串，如：'a b c d')
   */
  tClassN( elem, classN ){
    'use strict';

    return IsHandle6.call( this, elem, classN, 'toggle' );
  }

  /**
   * 原生JS代替jQuery的text()方法，返回值都是去除标签了的纯本文<br />
   * 注：<br />
   * 1、“document”、“window”会被先转换为“document.documentElement”处理
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param textC 文本字符串，有它的时候，是设置(以纯文本设置)，没有的时候是返回，可选
   *
   * @returns {Array} [Element|文本字符串]
   */
  text( elem, textC ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isUndefined( textC ) ){
        if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
          return document.documentElement.textContent;
        }
        return elemO.textContent;
      }
      else{
        if( this.isDocument( elemO ) || this.isWindow( elemO ) ){
          document.documentElement.textContent = textC;
          return elemO;
        }
        elemO.textContent = textC;
        return elemO;
      }
    } );
  }

  /**
   * 元素toggle动画(hide和show之间切换)(专一性！)
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param para 配置对象，{}，可选<br />
   * {<br />
   *   time: 0, number，多久完成，单位ms，默认0，可选<br /><br />
   *
   *   easing: 'linear', 动画缓动，默认为'linear'线性匀速，也可以是'swing'(摇摆)，支持函数，会传入一个number类型的参数progress，但需要返回一个number数值，可选<br /><br />
   *
   *   fun: element => {}, 动画结束后执行的函数，会有一个elemO节点对象的参数，可选
   */
  toggle( elem, para = {} ){
    let argObj = Object.assign( {
      time: 0,
      easing: 'linear',
      fun: element => {
      },
    }, para );
    ( this.isDocument( elem ) || this.isWindow( elem ) ) && ( elem = document.documentElement );
    IsHandle10.call( this, elem, elemO => {
      if( this.gStyle( elemO, 'display' ) !== 'none' ){
        this.hide( elemO, argObj );
      }
      else if( this.gStyle( elemO, 'display' ) === 'none' ){
        this.show( elemO, argObj );
      }
    } );
  }

  /**
   * 原生JS代替jQuery的trigger()方法
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param eventName 事件名，单个字符串、数组[字符串]，必需
   *
   * @returns {Array} [Element]
   */
  triggerE( elem, eventName ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      let handle = ( elemO, eventName ) => {
        let event = document.createEvent( 'HTMLEvents' );
        event.initEvent( this.remSpace( eventName ), true, false );
        elemO.dispatchEvent( event );
      };
      if( this.isArray( eventName ) ){
        eventName.forEach( currentValue => void ( handle( elemO, currentValue ) ) );
      }
      else{
        handle( elemO, eventName );
      }
      return elemO;
    } );
  }

  /**
   * 获取节点的渲染宽度<br />
   * PS:<br />
   * 如果值不能有效的转换成数字，那么会返回原本的字符串值。
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @returns {Array} [Float|String]
   */
  width( elem ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      if( this.isWindow( elemO ) ){
        return elemO.innerWidth;
      }
      else if( this.isDocument( elemO ) ){
        let result1 = this.gStyle( elemO.documentElement, 'width' ),
          result2 = parseFloat( result1 );

        return this.isNaN( result2 )
               ? result1
               : result2;
      }
      else if( this.isElement( elemO ) ){
        let result1 = this.gStyle( elemO, 'width' ),
          result2 = parseFloat( result1 );

        return this.isNaN( result2 )
               ? result1
               : result2;
      }
    } );
  }

  /**
   * 绑定事件
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param eType 事件名的字符串，多个可以用一个空格隔开，必需
   *
   * @param f 事件所要执行的函数，会传入event，它也是解除绑定事件的函数，而且它的配置选项默认是false，必需
   *
   * @param options 有两种数据类型，options参数的默认值是false，可选<br />
   * 第一种是布尔值，true表示捕获，false表示不捕获<br />
   * 第二种是JSON对象，里头有capture、once、passive、mozSystemGroup等这几个属性，<br />
   * capture布尔值，是否捕获，默认为false，不捕获<br />
   * once布尔值，表示事件执行函数在添加之后最多只调用一次。如果是 true，事件执行函数会在其被调用之后自动移除。默认false<br />
   * passive布尔值，表示事件执行函数永远不会调用preventDefault()。如果事件执行函数仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。<br />
   * mozSystemGroup只能在 XBL 或者是 Firefox' chrome 使用，这是个 Boolean，表示 listener 被添加到 system group。
   *
   * @returns {Array} [Element]
   */
  on( elem, eType, f, options ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      this.trim( eType )
        .split( /\s/g )
        .forEach( currentValue => void ( elemO.addEventListener( currentValue, f, options || false ) ) );
      return elemO;
    } );
  }

  /**
   * 解除事件
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param eType 事件名的字符串，多个可以用一个空格隔开，必需
   *
   * @param f 函数，会传入event，必须跟绑定事件时所要执行的函数一模一样，即同一个函数变量，必需
   *
   * @param options 布尔值，true表示捕获，false表示不捕获，可选<br />
   * 如果同一个监听事件分别为“事件捕获”和“事件冒泡”注册了一次，一共两次，这两次事件需要分别移除。两者不会互相干扰。
   *
   * @returns {Array} [Element]
   */
  off( elem, eType, f, options ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      this.trim( eType )
        .split( /\s/g )
        .forEach( currentValue => void ( elemO.removeEventListener( currentValue, f, options || false ) ) );
      return elemO;
    } );
  }

  // 原生JS代替jQuery的部分节点操作 End

  // 对象、数组处理 Start

  /**
   * 完整复制对象所有自身属性(非继承属性)的描述对象，然后合并到目标对象<br />
   * 例子：<br />
   * // let obj = { foo: 1, get bar(){ return 2; } };<br />
   * // let copy = completeAssign( {}, obj );<br />
   * // console.dir( copy );<br />
   * // { foo: 1, get bar() { return 2; } }<br />
   * PS：<br />
   * this.isObject( target )为true才会执行操作！！！
   *
   * @param target 对象，默认空对象，必须
   *
   * @param sources 含有描述符(如：getter、setter等)的对象，支持多个，必须
   *
   * @returns {object} target对象
   */
  completeAssign( target = {}, ...sources ){
    if( this.isObject( target ) ){
      sources.forEach( source => void ( Object.defineProperties( target, Reflect.ownKeys( source )
        .reduce( ( descriptors, key ) => {
          descriptors[ key ] = Object.getOwnPropertyDescriptor( source, key );
          return descriptors;
        }, {} ) ) ) );
      return target;
    }
  }

  /**
   * 数组、字符串、数字串去重<br />
   * 注1：数组(如果里头的子数据是数组、对象这类的对象类型数据，则无法去重)<br />
   * 注2：数字串(会被先转换成字符串)
   *
   * @param arg 数组、字符串、数字串，有且仅有一个参数，必需
   *
   * @returns {Array|String|Number} [string]|[number]|string|number
   */
  dataRemRe( ...arg ){
    let handle = ( arg1, f, arg2 ) => {
        if( arg1.length > 1 ){
          let [ result, set1 ] = [
            '',
            new Set( Array.from( arg1 ) )
          ];
          set1.forEach( value => void ( result += value ) );
          return f( result );
        }
        else{
          return arg2;
        }
      },
      isA = this.isArray( arg[ 0 ] ) && arg[ 0 ].length !== 0;
    if( this.isString( arg[ 0 ] ) && this.remSpace( arg[ 0 ] ).length !== 0 ){
      return handle( this.remSpace( arg[ 0 ] ), a => a, this.remSpace( arg[ 0 ] ) );
    }
    else if( isA && arg[ 0 ].length >= 1 ){
      let [ result, set1 ] = [
        [],
        new Set( arg[ 0 ] )
      ];
      set1.forEach( value => void ( result.push( value ) ) );
      return result;
    }
    else if( this.isNumber( arg[ 0 ] ) && !this.isNaN( arg[ 0 ] ) && this.isFinite( arg[ 0 ] ) ){
      return handle( String( arg[ 0 ] ), a => Number( a ), arg[ 0 ] );
    }
  }

  /**
   * 完整的对象、数组深度拷贝(包括Symbol、get、set、原型)<br />
   * PS: <br />
   * 1、处理被Vue处理过的对象、数组时，会报错！！！<br />
   * 2、this.isObject( obj ) || this.isArray( obj )为true才会执行！！！其他都会被原样返回！！！
   *
   * @param obj 对象、数组，必需
   *
   * @returns {Object|Array} 对象、数组，{}|[]
   */
  deepCopy( obj ){
    if( this.isArray( obj ) ){
      let newArr = [];

      obj.forEach( c => void ( newArr.push( typeof c !== 'object'
                                            ? c
                                            : this.deepCopy( c ) ) ) );

      return newArr;
    }
    else if( this.isObject( obj ) ){
      let val,
        newObj = 'constructor' in obj
                 ? new obj.constructor()
                 : {};

      for( let tmp of
        Reflect.ownKeys( obj ) ){
        val = obj[ tmp ];

        if( typeof val !== 'object' ){
          Object.defineProperty( newObj, tmp, Object.getOwnPropertyDescriptor( obj, tmp ) );
        }
        else{
          newObj[ tmp ] = this.deepCopy( val );
        }
      }

      let objPrototype = this.deppCopyPrototype( obj );

      !this.isNull( objPrototype ) && ( Object.setPrototypeOf( newObj, objPrototype ) );

      return newObj;
    }
    else{
      return obj;
    }
  }

  /**
   * 深度拷贝一个对象的原型(包括原型的原型...N...)，返回的是一个对象(已经深度拷贝的原型链)<br />
   * PS：<br />
   * 拿到这个方法的返回值后，直接使用Object.setPrototypeOf设置到目标对象就行！
   *
   * @param source 对象(具有原型的对象)，必须
   *
   * @returns {null|Object} null|Objec
   */
  deppCopyPrototype( source ){
    let arr1 = [],
      sourcePrototype = Object.getPrototypeOf( source );

    while( sourcePrototype !== null ){
      arr1.push( this.deepCopy( sourcePrototype ) );
      sourcePrototype = Object.getPrototypeOf( sourcePrototype );
    }

    arr1.reverse();

    if( arr1.length === 0 ){
      return null;
    }
    else{
      for(
        let i = 0;
        i < arr1.length - 1;
        ++i
      ){
        Object.setPrototypeOf( arr1[ i + 1 ], arr1[ i ] );
      }

      return arr1[ arr1.length - 1 ];
    }
  }

  /**
   * 深度让一个对象变的不可扩展，也就是永远不能再添加新的属性，数组也被允许
   *
   * @param obj 对象、数组，必需，有且只有一个参数
   *
   * @returns {Object} Object，如果传入的是一个数组，则返回的也会是一个数组，被深度不可扩展的对象
   */
  deepExten( obj ){
    'use strict';

    return IsHandle5.call( this, obj, 'preventExtensions', this.deepExten );
  }

  /**
   * 深度冻结对象，数组也被允许
   *
   * @param obj 对象、数组，必需，有且只有一个参数
   *
   * @returns {Object} Object，如果传入的是一个数组，则返回的也会是一个数组，被深度冻结的对象
   */
  deepFreeze( obj ){
    'use strict';

    return IsHandle5.call( this, obj, 'freeze', this.deepFreeze );
  }

  /**
   * 深度密封对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要可写就可以改变。数组也被允许
   *
   * @param obj 对象、数组，必需，有且只有一个参数
   *
   * @returns {Object} Object，如果传入的是一个数组，则返回的也会是一个数组，被深度密封的对象，
   */
  deepSeal( obj ){
    'use strict';

    return IsHandle5.call( this, obj, 'seal', this.deepSeal );
  }

  /**
   * 深度遍历数组，把所有数据(多层嵌套数组)提取出来放到一个一维数组里，里头的数据类型保持原样<br />
   * 注：ES2019有新的类似的数组方法可以达到同样的效果<br />
   * [ 1, [ 2, [ 3 ] ] ].flat( 2 )返回[ 1, 2, 3 ]，2表示需要被处理的数组是有两成嵌套的，但是需要知道数组的内部嵌套数
   *
   * @param initA 数组，默认是一个空数组，也必须是一个空数组，必需
   *
   * @param arg 支持rest参数，允许多个参数(数据类型是非空数组，也支持ElementList类型的这个类数组)，至少一个，必需
   *
   * @returns {Array} [任何数据类型]，一维数组，里头的数据类型保持原样
   */
  deepTraArr( initA = [], ...arg ){
    arg.forEach( currentValue => {
      if( this.isArray( currentValue ) && currentValue.length !== 0 ){
        this.deepTraArr( initA, ...currentValue );
      }
      else if( this.isElemList( currentValue ) && currentValue.length !== 0 ){
        this.deepTraArr( initA, ...Array.from( currentValue ) );
      }
      else{
        initA.push( currentValue );
      }
    } );
    return initA;
  }

  /**
   * 判断一个对象是否是可扩展的（是否可以在它上面添加新的属性），数组也被允许
   *
   * @param obj 对象、数组，必需，有且只有一个参数
   *
   * @returns {Boolean} boolean， 可扩展为true，否则false
   */
  isExten( obj ){
    'use strict';

    return IsHandle4.call( this, obj, o => Object.isExtensible( o ) );
  }

  /**
   * 判断一个对象是否被冻结了，数组也被允许
   *
   * @param obj 对象、数组，必需，有且只有一个参数
   *
   * @returns {Boolean} boolean，冻结为true，否则false
   */
  isFro( obj ){
    'use strict';

    return IsHandle4.call( this, obj, o => Object.isFrozen( o ) );
  }

  /**
   * 判断一个对象是否被密封，数组也被允许
   *
   * @param obj 对象、数组，必需，有且只有一个参数
   *
   * @returns {Boolean} boolean， 被密封为true，否则false
   */
  isSea( obj ){
    'use strict';

    return IsHandle4.call( this, obj, o => Object.isSealed( o ) );
  }

  /**
   * 基于“Reflect”、“Proxy”实现的观察者模式<br />
   * PS:<br />
   * 1、第一个参数之后是一个对象参数，里头有三个属性(isDeep、handle4Get、handle4Set)。
   *
   * @param observeTarget 观察目标，必须。<br />
   *
   * @param isDeep Boolean，是否深度观察，默认值：false，可选
   *
   * @param handle4Get 函数，有一个对象参数，其中有四个属性：target, key, value, receiver，可选<br />
   * PS:<br />
   * 1、如果返回值不是null、undefined，那么返回值会被作为get函数的返回值。
   *
   * @param handle4Set 函数，有一个对象参数，其中有五个属性：target, key, newValue, oldValue, receiver，可选<br />
   * PS:<br />
   * 1、如果返回值不是null、undefined，那么返回值会被作为set函数的返回值。<br />
   * 2、严格模式下，set代理如果没有返回true，就会报错。返回false或者undefined，都会报错。
   *
   * @returns {Proxy} Proxy
   */
  observe2Obj( observeTarget, {
    isDeep = false,
    handle4Get = () => {
    },
    handle4Set = () => {
    },
  } = {
    isDeep: false,
    handle4Get: () => {
    },
    handle4Set: () => {
    },
  } ){
    let _this = this,
      result,
      oldValue,
      setResult;

    const handle_fun = obj => new Proxy( obj, {
      get( target, propKey, receiver ){
        result = Reflect.get( target, propKey, receiver );

        isDeep && ( _this.isObject( result ) || _this.isArray( result ) ) && ( result = handle_fun( result ) );

        return ( handle4Get( {
          target,
          key: propKey,
          value: result,
          receiver,
        } ) ?? result );
      },

      set( target, propKey, value, receiver ){
        oldValue = Reflect.get( target, propKey, receiver );
        setResult = Reflect.set( target, propKey, value, receiver );

        return ( handle4Set( {
          target,
          key: propKey,
          newValue: value,
          oldValue,
          receiver,
        } ) ?? setResult );
      },
    } );

    return handle_fun( observeTarget );
  }

  /**
   * 随机打乱数组的洗牌算法<br />
   * PS：<br />
   * 时间复杂度为O( n-1 )，忽略低项式、常数项，就是O( n )，n表示数组的长度；<br />
   * 空间复杂度为O( 1 ),只占用了4个变量，且不随输入参数数量而增长；
   *
   * @param arr 数组[]，必须
   *
   * @returns {Array} 数组[]
   */
  shuffleArr( arr = [] ){
    if( arr.length >= 2 ){
      let len = arr.length - 1,
        index,
        temp;

      for(
        let i = 0;
        i < len;
        ++i
      ){
        index = parseInt( String( Math.random() * len ) ),
          temp = arr[ index ];
        arr.splice( index, 1, arr[ len - i ] );
        arr.splice( len - i, 1, temp );
      }
    }

    return arr;
  }

  // 对象、数组处理 End

  // Permissions API Start

  /**
   * Permissions接口的Permissions.query()方法返回全局范围内用户权限的状态。
   *
   * @param options JSON对象，必须，用于设置查询操作的选项：<br />
   * {<br />
   * name: 字符串，要查询其权限的API的名称，必须。<br />
   * 例如，<br />
   * Firefox目前支持“geolocation地理定位”、“notifications通知”、“push推送”和“persistent-storage持久存储”<br />
   * 在规范中的“PermissionName enum”下可以找到最新的权限名称列表，但请记住，浏览器支持的实际权限目前远小于此值。<br />
   * PermissionName权限名称列表(并非所有的API权限状态都可以使用Permissions API查询，随着时间的推移，更多的API将获得Permissions API支持。)：<br />
   * geolocation、notifications、push、midi、camera、microphone、speaker、device-info、background-fetch、background-sync、<br />
   * bluetooth、persistent-storage、ambient-light-sensor、accelerometer、gyroscope、magnetometer、clipboard、<br />
   * display-capture、nfc。<br />
   * 最新谷歌浏览器(80.0.3987.149)测试的各个权限名称的情况(不同于上头提到的"PermissionName权限名称列表“)：<br />
   * accelerometer、accessibility events permisson(报错，识别不到)、<br />
   * ambient-light-sensor(GenericSensorExtraClasses的标识要打开，否则会报错，识别不到)、<br />
   * camera、clipboard-read、clipboard-write、geolocation、<br />
   * background-sync(如果用户主动设置了浏览器禁止后台同步，那么授权状态就是拒绝的)、magnetometer、microphone、midi、notifications、<br />
   * payment-handler、persistent-storage、push(必须userVisibleOnly: true，否则会报错，识别不到)<br /><br />
   *
   * userVisibleOnly: boolean，仅限push推送，指示您是要为每条消息显示通知还是能够发送静默推送通知。默认值为false。<br />
   * PS：<br />
   * 最新谷歌浏览器测试中发现，其值必须为true，否则会报错，且“push”权限会识别不到。<br /><br />
   *
   * sysex: boolean，（“仅限Midi”）指示您是否需要或接收系统独占消息。默认值为false。<br /><br />
   *
   * @param events JSON对象，里头都是各个事件，可选<br />
   * {<br />
   * prompt: 函数，当权限状态为“提示授权”时执行，可选<br /><br />
   *
   * granted: 函数，当权限状态为“已经授予”时执行，可选<br /><br />
   *
   * denied: 函数，当权限状态为“拒绝授权”时执行，可选<br /><br />
   *
   * stateChange: 函数，当权限状态改变时执行，会有一个参数(permissionStatus对象)，可选<br /><br />
   *
   * error: 函数，报错时执行的函数，会有一个参数(error)，可选<br />
   *
   * @returns {Promise<permissionStatus>} Promise<permissionStatus>
   */
  permissionsQuery( options = {}, events = {} ){
    const permissions_objC = navigator.permissions;

    if( this.isUndefined( permissions_objC ) ){
      GetError( '不支持“navigator.permissions”！' );
    }
    else if( this.isUndefined( permissions_objC.query ) ){
      GetError( '不支持“navigator.permissions.query”！' );
    }
    else{
      const events_objC = Object.assign( {
        prompt(){
        },
        granted(){
        },
        denied(){
          GetError( '拒绝授权' );
        },
        stateChange( _this ){
        },
        error( e ){
          GetError( e.message );
        },
      }, events );

      try{
        return permissions_objC.query( options )
          .then( permissionStatus => {
            const state_strC = permissionStatus.state;

            // 提示授权
            if( state_strC === 'prompt' ){
              events_objC.prompt();
            }
            // 已经授予
            else if( state_strC === 'granted' ){
              events_objC.granted();
            }
            // 拒绝授权
            else if( state_strC === 'denied' ){
              events_objC.denied();
            }

            permissionStatus.onchange = function (){
              events_objC.stateChange( this );
            };

            return permissionStatus;
          } )
          .catch( events_objC.error );
      }
      catch( e ){
        events_objC.error( e );
      }
    }
  }

  // Permissions API End

  // 正则表达式处理 Start

  /**
   * 移除A到Z以外的
   *
   * @param arg 单个数据，支持传入一个数组，以便批量处理，有且只有一个参数，不能为空数组，必需
   *
   * @returns {String|Array} string或[string]
   */
  onlyCL( arg ){
    'use strict';

    return IsHandle2.call( this, arg, '[^A-Z]' );
  }

  /**
   * 移除a到z以外的
   *
   * @param arg 单个数据，支持传入一个数组，以便批量处理，有且只有一个参数，不能为空数组，必需
   *
   * @returns {String|Array} string或[string]
   */
  onlyLL( arg ){
    'use strict';

    return IsHandle2.call( this, arg, '[^a-z]' );
  }

  /**
   * 移除A到Z和a到z以外的
   *
   * @param arg 单个数据，支持传入一个数组，以便批量处理，有且只有一个参数，不能为空数组，必需
   *
   * @returns {String|Array} string或[string]
   */
  onlyLLCL( arg ){
    'use strict';

    return IsHandle2.call( this, arg, '[^a-zA-Z]' );
  }

  /**
   * 移除0到9以外的
   *
   * @param arg 单个数据，支持传入一个数组，以便批量处理，有且只有一个参数，不能为空数组，必需
   *
   * @returns {String|Array} string或[string]
   */
  onlyN( arg ){
    'use strict';

    return IsHandle2.call( this, arg, '[^0-9]' );
  }

  /**
   * 移除0-9和A到Z以外的
   *
   * @param arg 单个数据，支持传入一个数组，以便批量处理，有且只有一个参数，不能为空数组，必需
   *
   * @returns {String|Array} string或[string]
   */
  onlyNCL( arg ){
    'use strict';

    return IsHandle2.call( this, arg, '[^A-Z0-9]' );
  }

  /**
   * 移除0-9和a到z以外的
   *
   * @param arg 单个数据，支持传入一个数组，以便批量处理，有且只有一个参数，不能为空数组，必需
   *
   * @returns {String|Array} string或[string]
   */
  onlyNLL( arg ){
    'use strict';

    return IsHandle2.call( this, arg, '[^a-z0-9]' );
  }

  /**
   * 移除A到Z、0-9和a到z以外的
   *
   * @param arg 单个数据，支持传入一个数组，以便批量处理，有且只有一个参数，不能为空数组，必需
   *
   * @returns {String|Array} string或[string]
   */
  onlyNLLCL( arg ){
    'use strict';

    return IsHandle2.call( this, arg, '[^a-zA-Z0-9]' );
  }

  /**
   * 根据匹配模式移除字符串，如：移除ab、或移除ab以外的
   *
   * @param arg 单个数据，会被转换成字符串，注意：允许为数组，以便批量处理，不能为空数组，必需
   *
   * @param patS 匹配规则(字符串形式的)，如：[^0-9]，0到9以外的全部去掉，必需
   *
   * @returns {String|Array} string或[string]
   */
  remOfPat( arg, patS ){
    'use strict';

    return IsHandle7.call( this, arg, a => this.strRep( a, patS, '' ), this.strRep( arg, patS, '' ) );
  }

  /**
   * 移除所有的空格
   *
   * @param arg 单个数据，支持传入一个数组，以便批量处理，有且只有一个参数，不能为空数组，必需
   *
   * @returns {String|Array} string或[string]
   */
  remSpace( arg ){
    'use strict';

    return IsHandle2.call( this, arg, '[ ]' );
  }

  /**
   * 字符串全局替换，传入的数据会被转换成字符串
   *
   * @param data 单个原始数据，也可以是一个数组，以便批量处理，不能为空数组，必需
   *
   * @param reg 正则表达式的匹配模式(字符串形式的)，如：[^0-9]，0到9以外的，B就是符合这个规则的字符串，必需
   *
   * @param repStr 所要替换成的字符串，用A替换B，repStr指的就是A，必需
   *
   * @returns {String|Array} string或[string]
   */
  strRep( data, reg, repStr ){
    'use strict';

    return IsHandle7.call( this, data, a => String( a )
      .replace( new RegExp( reg, 'g' ), repStr ), String( data )
      .replace( new RegExp( reg, 'g' ), repStr ) );
  }

  /**
   * 从一个字符串的两端删除空白字符，传入的任何数据都会被转为字符串
   *
   * @param arg 单个任何数据，也可以是一个数组，用于批量处理，参数个数有且只有1个，不能为空数组，必需
   *
   * @returns {String|Array} string或[string]
   */
  trim( arg ){
    'use strict';

    return IsHandle7.call( this, arg, a => ( String( a )
      .trim() ), String( arg )
      .trim() );
  }

  // 正则表达式处理 End

  // 字符串处理 Start

  /**
   * Base64编码转字符串（解码）<br />
   * 注：<br />
   * 配合着“strToBase64”方法（编码）使用
   *
   * @param str_base64 Base64编码转字符串，必须。
   *
   * @returns {string} 字符串
   */
  base64ToStr( str_base64 ){
    'use strict';

    return decodeURIComponent( atob( str_base64 ) );
  }

  /**
   * 将一个字符串类型的数值转换为number类型的Float数值
   *
   * @param str string，一个字符串类型的数值，必须
   *
   * @returns {number} number，Float数值(十进制)
   */
  pFloat( str ){
    'use strict';

    return Number.parseFloat( str );
  }

  /**
   * 将一个字符串类型的数值转换为number类型的整数数值(十进制)
   *
   * @param str string，一个字符串类型的数值(2进制到36进制)，必须
   *
   * @param radix number，说明第一个参数str的进制类型，默认是十进制10，可选
   *
   * @returns {number} number，整数数值(十进制)
   */
  pInt( str, radix ){
    'use strict';

    return Number.parseInt( str, radix || 10 );
  }

  /**
   * 将字符串的首字母(第一个字母)小写
   *
   * @param str 字符串，必须
   *
   * @returns {string} 字符串，返回全新的一个字符串，不是原来的！
   */
  strFL( str ){
    return str.slice( 0, 1 )
      .toLocaleLowerCase() + str.slice( 1 );
  }

  /**
   * 将字符串的首字母(第一个字母)大写
   *
   * @param str 字符串，必须
   *
   * @returns {string} 字符串，返回全新的一个字符串，不是原来的！
   */
  strFU( str ){
    return str.slice( 0, 1 )
      .toLocaleUpperCase() + str.slice( 1 );
  }

  /**
   * 正确返回字符串长度
   *
   * @param str 一个字面量的字符串或一个字符串实例，必须
   *
   * @returns {null|number} null|number，正确返回字符串长度。
   */
  strLength( str ){
    if( IsHandle1.call( this, str, 'String' ) ){
      // 如果未找到匹配项，则为null。
      const result = str.match( /[\s\S]/gu );

      return !this.isNull( result )
             ? result.length
             : str.length;
    }
    else{
      return null;
    }
  }

  /**
   * 字符串转Base64编码（编码）<br />
   * 注：<br />
   * 配合着“base64ToStr”方法（解码）使用
   *
   * @param str 字符串，必须。
   *
   * @returns {string} Base64编码的字符串
   */
  strToBase64( str ){
    'use strict';

    return btoa( encodeURIComponent( str ) );
  }

  /**
   * 字符串转Unicode表示(编码)，原始数据会被转换成字符串再被处理<br />
   * 注1：以Unicode表示的数据(字符串形式)，数据被编码过，需要解码(uCodeToStr)才能还原。
   *
   * @param arg 字符串(单个)，支持一个数组(不能传[''])，用于批量处理，有且只有一个参数，必需
   *
   * @returns {String|Array} string|[string]
   */
  strToUCode( ...arg ){
    let handle = str => {
        let [ result, index1, index2 ] = [
          '',
          0,
          0
        ];
        for( let c of
          str ){
          ++index1;
        }
        for( let ch of
          str ){
          ++index2;
          result += ( ch.codePointAt( 0 ) + 520 ).toString( 8 );
          index2 !== index1 && ( result += '8' );
        }
        return result;
      },
      s = String( arg[ 0 ] ),
      isA = this.isArray( arg[ 0 ] );
    if( isA && arg[ 0 ].length !== 0 ){
      let result = [];
      arg[ 0 ].forEach( currentValue => {
        if( this.isString( currentValue ) && currentValue.length !== 0 ){
          result.push( handle( currentValue ) );
        }
        else if( this.isArray( currentValue ) || this.isObject( currentValue ) ){
          result.push( handle( JSON.stringify( currentValue ) ) );
        }
        else if( this.isNumber( currentValue ) || this.isBoolean( currentValue ) || this.isNull( currentValue ) || this.isUndefined( currentValue ) ){
          result.push( handle( String( currentValue ) ) );
        }
      } );
      if( result.length !== 0 ){
        return result;
      }
    }
    else if( s.length !== 0 ){
      return handle( s );
    }
  }

  /**
   * Unicode表示转字符串(解码)，strToUCode参数必须是调用strToUCode()之后的返回值，因为格式是固定的
   *
   * @param arg 已被编码的字符串(单个，不能是空字符串)，支持一个数组(不能传空数组，子元素不能是空字符串)，用于批量处理，有且只有一个参数，必需
   *
   * @returns {String|Array} string|[string]
   */
  uCodeToStr( ...arg ){
    let handle = str => {
      const isS = this.isString( str );
      if( isS && this.trim( str ).length !== 0 ){
        let [ arr, arr1 ] = [
          this.trim( str )
            .split( '8' ),
          []
        ];
        arr.forEach( currentValue => void ( arr1.push( parseInt( '0' + currentValue, 8 ) - 520 ) ) );
        return String.fromCodePoint( ...arr1 );
      }
    };
    if( this.isArray( arg[ 0 ] ) && arg[ 0 ].length !== 0 ){
      let result = [];
      arg[ 0 ].forEach( currentValue => void ( result.push( handle( currentValue ) ) ) );
      return result;
    }
    else if( this.isString( arg[ 0 ] ) ){
      return handle( arg[ 0 ] );
    }
  }

  // 字符串处理 End

  // 自定义的各种Touch事件 Start

  /**
   * 判断是否是触摸屏<br />
   * 注：Edge可以通过设置，默认打开触屏事件！受用户的浏览器设置控制！
   *
   * @returns {Boolean} boolean
   */
  isTouch(){
    let deviceInfo = this.deviceInfo();
    // Edge可以通过设置，默认打开触屏事件！受用户的浏览器控制
    if( deviceInfo.is_PC && deviceInfo.is_PCWin && deviceInfo.is_Edge ){
      return false;
    }
    return 'ontouchend' in document;
  }

  /**
   * 自定义模拟触摸屏的tap事件，效果没touch的好、全！<br />
   * 但是一个简版的tap事件，可以满足日常使用<br />
   * 因为内部做了判断，所以，不管调用tapSim()多少次，都只会执行一次触摸事件初始化！避免了重复注册触摸事件！
   */
  tapSim(){
    if( globalThis[ 'isOpenTouch4CT' ] !== true ){
      document.addEventListener( 'touchstart', event => {
        !this.hasData( event.target, 'disable' )[ 0 ] && this.data( event.target, {
          isMoved: 0
        } );
      }, { passive: false } );
      document.addEventListener( 'touchmove', event => {
        !this.hasData( event.target, 'disable' )[ 0 ] && this.data( event.target, {
          isMoved: 1
        } );
      }, { passive: false } );
      document.addEventListener( 'touchend', event => {
        if( !this.hasData( event.target, 'disable' )[ 0 ] && this.data( event.target, 'isMoved' )[ 0 ] === 0 ){
          this.triggerE( event.target, 'tap' );
        }
      }, { passive: false } );
      globalThis[ 'isOpenTouch4CT' ] = true;
    }
  }

  /**
   * swipe、swipeLeft、swipeRight、swipeUp、swipeDown、doubleTap、tap、singleTap、longTap等九个触摸事件<br />
   * 注：<br />
   * 一、建议Android中longTap事件加一个200ms的振动效果，iOS不支持振动API<br />
   * 二、iOS兼容的很好，大部分浏览器都能用，极少浏览器中的doubleTap事件无法触发，其他事件也有出现不合适的触发，但主流浏览器和自带的浏览器完美支持全部事件<br />
   * 三、Android的swipe(其中的向上滑、向下滑)、swipeUp、swipeDown不是所有情况都能触发！其他事件也因浏览器而异出现不是很合适的触发，<br />
   * 但主流浏览器和自带的浏览器完美支持全部事件，如果页面不需要滚动，那么设置样式 body,main{touch-action: none;}<br />
   * 可以完美触发swipe(其中的向上滑、向下滑)、swipeUp、swipeDown等事件<br />
   * 四、从chrome56开始，在window、document、body上注册的touchstart和touchmove事件处理函数，会默认为是“passive:true”。<br />
   * 浏览器忽略preventDefault()就可以第一时间滚动了。如果在以上这3个元素的touchstart和touchmove事件处理函数中调用e.preventDefault()，<br />
   * 会被浏览器忽略掉，并不会阻止默认行为。所以要设置{ passive: false }<br />
   * CT会自动初始化touch<br />
   * 因为内部做了判断，所以，不管调用touch()多少次，都只会执行一次触摸事件初始化！避免了重复注册触摸事件！
   */
  touch(){
    if( globalThis[ 'isOpenTouch4CT' ] !== true ){
      let touch = {},
        touchTimeout,
        tapTimeout,
        swipeTimeout,
        longTapTimeout,
        // 750
        longTapDelay = 500,
        gesture,
        swipeDirection = ( x1, x2, y1, y2 ) => ( Math.abs( x1 - x2 ) >= Math.abs( y1 - y2 ) )
                                               ? ( x1 - x2 > 0
                                                   ? 'Left'
                                                   : 'Right' )
                                               : ( y1 - y2 > 0
                                                   ? 'Up'
                                                   : 'Down' ),
        longTap = () => void ( longTapTimeout = null, touch.last && ( touch.el && this.triggerE( touch.el, 'longTap' ), touch = {} ) ),
        cancelLongTap = () => void ( longTapTimeout && clearTimeout( longTapTimeout ), longTapTimeout = null ),
        cancelAll = () => {
          touchTimeout && clearTimeout( touchTimeout );
          tapTimeout && clearTimeout( tapTimeout );
          swipeTimeout && clearTimeout( swipeTimeout );
          longTapTimeout && clearTimeout( longTapTimeout );
          touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
          touch = {};
        },
        isPrimaryTouch = event => ( ( event.pointerType === 'touch' || event.pointerType === event.MSPOINTER_TYPE_TOUCH ) && event.isPrimary ),
        isPointerEventType = ( e, type ) => ( e.type === 'pointer' + type || e.type.toLocaleLowerCase() === 'mspointer' + type );
      this.ready( () => {
        let now,
          delta,
          deltaX = 0,
          deltaY = 0,
          firstTouch,
          _isPointerType;
        'MSGesture' in globalThis && ( gesture = new MSGesture(), gesture.target = document.body );
        let doc = this.on( document, 'MSGestureEnd', e => {
            let swipeDirectionFromVelocity = e.velocityX > 1
                                             ? 'Right'
                                             : e.velocityX < -1
                                               ? 'Left'
                                               : e.velocityY > 1
                                                 ? 'Down'
                                                 : e.velocityY < -1
                                                   ? 'Up'
                                                   : null;
            if( swipeDirectionFromVelocity ){
              touch.el && this.triggerE( touch.el, 'swipe' );
              touch.el && this.triggerE( touch.el, 'swipe' + swipeDirectionFromVelocity );
            }
          } )[ 0 ],
          onEle1 = this.on( doc, 'touchstart MSPointerDown pointerdown', e => {
            if( ( _isPointerType = isPointerEventType( e, 'down' ) ) && !isPrimaryTouch( e ) ){
              return;
            }
            firstTouch = _isPointerType
                         ? e
                         : e.touches[ 0 ];
            ( e.touches && e.touches.length === 1 && touch.x2 ) && ( touch.x2 = undefined, touch.y2 = undefined );
            now = Date.now();
            delta = now - ( touch.last || now );
            touch.el = 'tagName' in firstTouch.target
                       ? firstTouch.target
                       : firstTouch.target.parentNode;
            touchTimeout && clearTimeout( touchTimeout );
            touch.x1 = firstTouch.pageX;
            touch.y1 = firstTouch.pageY;
            ( delta > 0 && delta <= 250 ) && ( touch.isDoubleTap = true );
            touch.last = now;
            longTapTimeout = setTimeout( longTap, longTapDelay );
            ( gesture && _isPointerType ) && gesture.addPointer( e.pointerId );
          }, { passive: false } )[ 0 ],
          onEle2 = this.on( onEle1, 'touchmove MSPointerMove pointermove', e => {
            if( ( _isPointerType = isPointerEventType( e, 'move' ) ) && !isPrimaryTouch( e ) ){
              return;
            }
            firstTouch = _isPointerType
                         ? e
                         : e.touches[ 0 ];
            cancelLongTap();
            touch.x2 = firstTouch.pageX;
            touch.y2 = firstTouch.pageY;
            deltaX += Math.abs( touch.x1 - touch.x2 );
            deltaY += Math.abs( touch.y1 - touch.y2 );
            // 修复Android上swipe事件(向上滑、向下滑、向左滑、向右滑)无效的情况，还要添加{ passive: false }
            ( navigator.userAgent.includes( 'Android' ) && touch.x2 && Math.abs( touch.x1 - touch.x2 ) > 10 ) && e.preventDefault();
          }, { passive: false } )[ 0 ],
          onEle3 = this.on( onEle2, 'touchend MSPointerUp', e => {
            if( ( _isPointerType = isPointerEventType( e, 'up' ) ) && !isPrimaryTouch( e ) ){
              return;
            }
            cancelLongTap();
            if( ( touch.x2 && Math.abs( touch.x1 - touch.x2 ) > 30 ) || ( touch.y2 && Math.abs( touch.y1 - touch.y2 ) > 30 ) ){
              swipeTimeout = setTimeout( () => {
                touch.el && this.triggerE( touch.el, 'swipe' );
                touch.el && this.triggerE( touch.el, 'swipe' + ( swipeDirection( touch.x1, touch.x2, touch.y1, touch.y2 ) ) );
                touch = {};
              }, 0 );
            }
            else if( 'last' in touch && ( deltaX < 30 && deltaY < 30 ) ){
              tapTimeout = setTimeout( () => {
                let event = document.createEvent( 'HTMLEvents' );
                event.initEvent( 'tap', true, false );
                event.cancelTouch = cancelAll;
                touch.el && touch.el.dispatchEvent( event );
                if( touch.isDoubleTap ){
                  touch.el && this.triggerE( touch.el, 'doubleTap' );
                  touch = {};
                }
                else{
                  touchTimeout = setTimeout( () => {
                    touchTimeout = null;
                    touch.el && this.triggerE( touch.el, 'singleTap' );
                    touch = {};
                  }, 250 );
                }
              }, 0 );
            }
            else if( 'last' in touch && !( deltaX < 30 && deltaY < 30 ) ){
              touch = {};
            }
            deltaX = deltaY = 0;
          }, { passive: false } )[ 0 ],
          onEle4 = this.on( onEle3, 'touchcancel MSPointerCancel pointercancel', cancelAll, { passive: false } )[ 0 ];
        this.scrollE( globalThis, cancelAll );
      } );
      globalThis[ 'isOpenTouch4CT' ] = true;
    }
    [
      'swipe',
      'swipeUp',
      'swipeDown',
      'swipeLeft',
      'swipeRight',
      'longTap',
      'doubleTap',
      'singleTap',
      'tap'
    ].forEach( eventName => void ( this[ eventName ] = ( elem, f, options = false ) => void ( this.on( elem, eventName, f, options ) ) ) );
  }

  // 自定义的各种Touch事件 End

  // url、history的操作 Start

  /*
   IE9(window.location)
   hash       ""
   host       "localhost:8090"
   hostname       "localhost"
   href       "http://localhost:8090/web-hansheng-IoT-project/apps/localServer/pages/index.html"
   pathname       "/web-hansheng-IoT-project/apps/localServer/pages/index.html"
   port       "8090"
   protocol       "http:"
   search       ""

   PS：
   IE9没有“window.location.origin”！！！所以只能通过字符串拼接：`${ window.location.protocol }//${ window.location.host }`
   */

  /**
   * 禁止返回键<br />
   * 注：<br />
   * 这个方法跟popStateChange方法都是注册了同一个事件，都执行的时候会冲突到！
   *
   * @param toDo_fun 当按返回键后，执行的函数，会传入一个event，可选
   */
  cReturn( toDo_fun = ( event => {
  } ) ){
    let pushHistory = () => void ( globalThis.history.pushState( {
        title: 'title',
        url: '#'
      }, 'title', '#' ) ),
      bool = false;
    pushHistory();
    setTimeout( () => void ( bool = true ), 1 );
    this.on( globalThis, 'popstate', event => void ( bool && toDo_fun( event ), pushHistory() ) );
  }

  /**
   * 根据输入的“url字符串片段”获得当前拼接后的“绝对URL”<br />
   *
   * 例子：<br />
   * 当前的URL：http://localhost:8090/web-hansheng-IoT-project/dist/dev_server/pages/Index.html<br /><br />
   *
   * 'something1?pageNumber=1': http://localhost:8090/web-hansheng-IoT-project/dist/dev_server/pages/something1?pageNumber=1<br />
   * '/something2?pageNumber=2': http://localhost:8090/something2?pageNumber=2<br />
   * '../something3?pageNumber=3': http://localhost:8090/web-hansheng-IoT-project/dist/dev_server/something3?pageNumber=3
   *
   * @param url String，url字符串片段，可选
   *
   * @returns {string} URL字符串
   */
  getAbs4URL( url = '' ){
    let result = null,
      a4Elem = document.createElement( 'a' );

    a4Elem.href = url;

    result = a4Elem.href;

    // a4Elem.remove();

    return result;
  };

  /**
   * 锚点发生改变时，会触发的事件<br />
   * 该事件仅由执行浏览器操作！<br />
   * 如单击后退按钮(history.back()、history.go(-1))、前进按钮(history.forward()、history.go(1))，触发
   *
   * @param fun 函数，有两个参数onhashchange事件的event和history.state的值(没有值的话会是null)，可选
   */
  hashChange( fun = ( ( event, historyState, newURL, oldURL ) => {
  } ) ){
    globalThis.onhashchange = event => void ( fun( event, globalThis.history.state, event.newURL, event.oldURL ) );
  }

  /**
   * 反序列化URL查询参数，将JSON对象转换成字符串形式的URL查询参数<br />
   * 键值会被strToUCode()方法处理，这样才不会导致中文乱码！<br />
   * 读取键值时要用uCodeToStr()方法解码！
   *
   * @param searchObj 对象 将JSON对象转换成字符串形式的URL查询参数
   *
   * @returns {string} 将JSON对象转换成字符串形式的URL查询参数
   */
  obj2URLSea( searchObj = {} ){
    let searchStr = '';

    Object.entries( searchObj )
      .forEach( ( [ keyName, keyValue ] ) => void ( searchStr += `${ keyName }=${ this.strToUCode( keyValue ) }&` ) );

    return searchStr.slice( 0, -1 );
  }

  /**
   * url改变时触发，包括锚点改变时也会触发，查询字符串改变时也会触发<br />
   * 该事件仅由执行浏览器操作！<br />
   * 如单击后退按钮(history.back()、history.go(-1))、前进按钮(history.forward()、history.go(1))，触发<br />
   * 注：<br />
   * 这个方法跟cReturn方法都是注册了同一个事件，都执行的时候会冲突到！
   *
   * @param fun 函数，有两个参数onhashchange事件的event和history.state的值(没有值的话会是null)，可选
   */
  popStateChange( fun = ( ( event, historyState ) => {
  } ) ){
    globalThis.onpopstate = event => void ( fun( event, event.state ) );
  }

  /**
   * 跟浏览器的后退按钮一样的功能，向左的箭头按钮<br />
   * 注：<br />
   * 0，表示刷新页面<br />
   * 数值不在history的条数之内时，不执行
   *
   * @param delta number，默认值是-1，可选
   */
  urlBack( delta = -1 ){
    globalThis.history.go( delta );
  }

  /**
   * 跟浏览器的前进按钮一样的功能，向右的箭头按钮<br />
   * 注：<br />
   * 0，表示刷新页面<br />
   * 数值不在history的条数之内时，不执行
   *
   * @param delta number，默认值是1，可选
   */
  urlForward( delta = 1 ){
    globalThis.history.go( delta );
  }

  /**
   * 不刷新页面更改URL(会产生url历史记录，会有前进后退)
   *
   * @param arg_obj JSON对象，配置对象，必须<br />
   * {<br />
   * newURLStr 字符串(新的同源的URL，完整的URL)，默认值是如下格式的当前URL，必须！<br />
   * 格式是：http://localhost:8090/web-hansheng-IoT-project/app/devServer/pages/webProTpl.html<br /><br />
   *
   * searchObj JSON对象(键名是url中的参数名，键值是参数对应的值，值是字符串；可选！<br />
   * 存在的键名便会更新其值，不存在的键名会添加到url中；也可以是有且仅有一个是键名为“#”，键值是锚点值，字符串的)，默认值是空JSON对象<br />
   * 就是问号后面的参数：?q=1&a=2，如果键值是没有的那就传空字符串<br />
   * 注：锚点放在最后！<br />
   * {<br />
   *   a: 1,<br />
   *   b: 'qwe',<br />
   *   #: 'asd'<br /><br />
   *
   * stateData 数据类型可以是任何类型，但建议是JSON对象，用于存储数据(640KB字符的大小限制)，默认值是null；可选！<br /><br />
   *
   * history.state将获取到设置的stateData数据！
   *
   * @returns {String} string 新的URL
   */
  urlPush( arg_obj = {} ){
    let pra_obj = Object.assign( {
      newURLStr: globalThis.location.origin + globalThis.location.pathname,
      searchObj: {},
      stateData: null
    }, arg_obj );
    return IsHandle18( pra_obj.newURLStr, pra_obj.searchObj, pra_obj.stateData, 'pushState' );
  }

  /**
   * 不刷新页面更改URL(不会产生url历史记录，不会有前进后退)
   *
   * @param arg_obj JSON对象，配置对象，必须<br />
   * {<br />
   * newURLStr 字符串(新的同源的URL，完整的URL)，默认值是如下格式的当前URL，必须！<br />
   * 格式是：http://localhost:8090/web-hansheng-IoT-project/app/devServer/pages/webProTpl.html<br /><br />
   *
   * searchObj JSON对象(键名是url中的参数名，键值是参数对应的值，值是字符串；可选！<br />
   * 存在的键名便会更新其值，不存在的键名会添加到url中；也可以是有且仅有一个是键名为“#”，键值是锚点值，字符串的)，默认值是空JSON对象<br />
   * 就是问号后面的参数：?q=1&a=2，如果键值是没有的那就传空字符串<br />
   * 注：锚点放在最后！<br />
   * {<br />
   *   a: 1,<br />
   *   b: 'qwe',<br />
   *   #: 'asd'<br /><br />
   *
   * stateData 数据类型可以是任何类型，但建议是JSON对象，用于存储数据(640KB字符的大小限制)，默认值是null；可选！<br /><br />
   *
   * history.state将获取到设置的stateData数据！
   *
   * @returns {String} string 新的URL
   */
  urlReplace( arg_obj = {} ){
    let pra_obj = Object.assign( {
      newURLStr: globalThis.location.origin + globalThis.location.pathname,
      searchObj: {},
      stateData: null
    }, arg_obj );
    return IsHandle18( pra_obj.newURLStr, pra_obj.searchObj, pra_obj.stateData, 'replaceState' );
  }

  /**
   * 序列化URL的查询参数，将字符串形式的URL查询参数转换成JSON对象
   *
   * @param searchStr 字符串 网址的查询参数，默认值是当前网址的查询参数
   *
   * @returns {{}} JSON对象形式的URL查询参数
   */
  urlSea2Obj( searchStr = globalThis.location.search ){
    let searchObj = {},
      arr1;
    ( searchStr.length !== 0 && searchStr[ 0 ] === '?' ) && ( searchStr = searchStr.slice( 1, searchStr.length ) );
    searchStr.split( '#' )[ 0 ].split( '&' )
      .filter( item => item.length !== 0 )
      .filter( item => {
        arr1 = item.split( '=' )
          .filter( item => item.length !== 0 );
        if( arr1.length === 1 ){
          searchObj[ arr1[ 0 ] ] = '';
        }
        else if( arr1.length === 2 ){
          searchObj[ arr1[ 0 ] ] = arr1[ 1 ];
        }
      } );
    return searchObj;
  }

  // url、history的操作 End

  // WASM工具 Start

  /**
   * 加载.wasm的函数方法(用“fetch”加载的)<br />
   * PS:<br />
   * 一般使用，传“url”、“importObject”这两个参数就行。<br />
   *
   * @param url 字符串，“.wasm”的网络URL地址，必须
   *
   * @param options JSON配置对象，可选，不传的属性就不要写到这个配置对象里头！<br />
   * {<br />
   *   method: 'GET', // 字符串，请求使用的方法，如'GET'、'POST'。默认值'GET'。<br /><br />
   *
   *   headers: null, // JSON对象|ByteString，请求的头信息，形式为Headers的对象或包含ByteString值的对象字面量。<br />
   *   // post方法传数据给后台，则需要给请求头加："Content-type": "application/x-www-form-urlencoded;charset=UTF-8"等等这样一类的请求头<br />
   *   // 当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br />
   *   // 例如：<br />
   *   // 第一种：<br />
   *   // let myHeaders = new Headers();<br />
   *   // myHeaders.append('Content-Type', 'image/jpeg');<br />
   *   // headers: myHeaders<br />
   *   // 第二种：<br />
   *   // headers: new Headers( { 'Content-Type': 'application/json' } )<br />
   *   // 不传该属性就不要写到这个配置对象里头！<br /><br />
   *
   *   body: null, // 后面描述的数据类型，比如用于POST请求，存放传给服务器的数据，请求的body信息：可能是一个Blob、BufferSource、FormData、URLSearchParams或者USVString对象。<br />
   *   // 注意GET或HEAD方法的请求不能包含body信息。<br />
   *   // post方法传数据给后台，则需要给请求头加："Content-type": "application/x-www-form-urlencoded;charset=UTF-8"等等这样一类的请求头<br />
   *   // 当用“POST”请求将“FormData”类型的数据传给服务器时，千万别设置请求头"Content-type": "multipart/form-data"，不然会报错！<br />
   *   // 不传该属性就不要写到这个配置对象里头！<br /><br />
   *
   *   mode: 'same-origin', // 字符串，请求的模式，如'cors'、'no-cors'或者'same-origin'。默认值'same-origin'。<br />
   *   注：<br />
   *   fetch的mode配置项有3个值，如下：<br />
   *   same-origin：该模式是不允许跨域的，它需要遵守同源策略，否则浏览器会返回一个error告知不能跨域；其对应的response type为basic。<br />
   *   cors: 该模式支持跨域请求，顾名思义它是以CORS的形式跨域；当然该模式也可以同域请求不需要后端额外的CORS支持；其对应的response<br />
   *   type为cors。当 Access-Control-Allow-Origin:* 时，mode是"cors"才行，不然还是没法跨域。<br />
   *   no-cors: 该模式用于跨域请求但是服务器不带CORS响应头，也就是服务端不支持CORS；这也是fetch的特殊跨域请求方式；其对应的response<br />
   *   type为opaque。而且浏览器不回去请求这个跨域的资源，也不会报错！<br />
   *   针对跨域请求，cors模式是常见跨域请求实现，但是fetch自带的no-cors跨域请求模式则较为陌生，该模式有一个比较明显的特点：<br />
   *   该模式允许浏览器发送本次跨域请求，但是不能访问响应返回的内容，这也是其response type为opaque透明的原因。<br />
   *   注意： cors 支持 三种content-type 不支持 application/json<br />
   *   application/x-www-form-urlencoded<br />
   *   multipart/form-data<br />
   *   text/plain<br /><br />
   *
   *   credentials: 'same-origin', // 字符串，请求的credentials(证书、凭据)，如'omit'(不需要凭据)、'same-origin'或者'include'(跨域源)。默认'same-origin'。<br />
   *   // 为了在当前域名内自动发送cookie，必须提供这个选项，从Chrome50开始，这个属性也可以接受FederatedCredential实例或是一个PasswordCredential实例。<br />
   *   // 当 Access-Control-Allow-Origin:* 时，credentials是"omit"才行，不然还是没法跨域。<br /><br />
   *   关于跨域请求头。<br />
   *   1)当Access-Control-Allow-Origin:*时，不允许使用凭证（即不能设置诸如withCredentials:true、credentials:"include"之类），即不能携带上诸如Cookie之类的凭证。<br />
   *   2)当Access-Control-Allow-Origin:*时，只需确保客户端在发出CORS请求时凭据标志的值为false就可以了：<br />
   *     如果请求使用XMLHttpRequest发出，请确保withCredentials为false。<br />
   *     如果使用服务器发送事件，确保EventSource.withCredentials是false（这是默认值）。<br />
   *     如果使用Fetch API，请确保Request.credentials是"omit"，"omit"表示忽略诸如Cookie之类的凭证。<br />
   *   3)要想客户端既能发起跨域请求，又想将客户端携带的凭证（诸如Cookie之类的凭证）附加到跨域请求上传给服务端，<br />
   *     那么服务端的响应头得如下设置：<br />
   *     'Access-Control-Allow-Credentials': true、<br />
   *     'Access-Control-Allow-Origin': '允许发起跨域请求的客户端的Origin（如：https://localhost:8100），就是不可以是通配符“*”'、<br />
   *     'Vary': 'Origin' <br />
   *     客户端也得如下设置：<br />
   *     确保客户端在发出CORS请求时凭据标志的值为true就可以了：<br />
   *     如果请求使用XMLHttpRequest发出，请确保withCredentials为true。<br />
   *     如果使用服务器发送事件，确保EventSource.withCredentials是true。<br />
   *     如果使用Fetch API，请确保Request.credentials是"include"。<br />
   *
   *   cache: 'default', // 字符串，请求的cache模式：'default'、'no-store'、'reload'、'no-cache'、'force-cache'或者'only-if-cached'。默认值'default'。<br /><br />
   *
   *   redirect: 'follow', // 字符串，可用的redirect(重定向)模式：'follow'(自动重定向)、'error'(如果产生重定向将自动终止并且抛出一个错误)或者'manual'(手动处理重定向)。<br />
   *   // 在Chrome中，Chrome47之前的默认值是'manual'，从Chrome47开始默认值是'follow'。默认是'follow'。<br /><br />
   *
   *   referrer: 'client', // 字符串，请求引用，一个USVString可以是'no-referrer'、'client'或一个URL。默认是'client'。<br /><br />
   *
   *   referrerPolicy: 'no-referrer', // 字符串，请求引用策略，指定引用HTTP头的值。可能是'no-referrer'、'no-referrer-when-downgrade'、'origin'、'origin-when-cross-origin'、'unsafe-url'。<br />
   *   // 默认值'no-referrer'。<br /><br />
   *
   *   integrity: null, // 字符串，包括请求的subresource integrity值(例如：sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=)。<br />
   *   // 不传该属性就不要写到这个配置对象里头！<br /><br />
   *
   *   keepalive: null, // keepalive选项可用于允许请求比页面寿命长。带keepalive标志的fetch替代了Navigator.sendBeacon()API。<br />
   *   // 不传该属性就不要写到这个配置对象里头！<br /><br />
   *
   *   signal: null, // 请求信号，一个AbortSignal对象实例，允许您与fetch request通信，并在需要时通过AbortController中止该请求。<br />
   *   // 不传该属性就不要写到这个配置对象里头！<br />
   *
   * @param callBack JSON配置对象(里头都是事件)，可选。<br />
   * {<br />
   *   resolved: ( response, status_num ) => {}, // 请求响应时触发(无论请求的响应码是哪种)，第一个参数是response(Response对象)，第二个参数是数值类型的响应状态码。<br /><br />
   *
   *   rejected: error => {}, // 仅当网络故障时或请求被阻止时，才会触发rejected函数，有一个error函数参数。<br /><br />
   *
   *   success: ( data4ResponseType, response ) => {} // 请求真正成功时触发的，第一个参数是data4ResponseType参数，第二个参数是response参数。<br />
   *   注：<br />
   *   data4ResponseType是根据opt_obj的responseType属性的属性值来提前处理的响应数据，responseType属性值只能是规定的5中，<br />
   *   当没传responseType或其值是undefined时，data4ResponseType跟第二个参数response参数一样，由开发者自己处理响应数据。<br /><br />
   *
   *   error: ( status_num, response ) => {} // 当响应状态码不是200时，触发的函数，第一个参数是响应状态码，第二个参数是response参数。
   *
   * @param importObject JSON配置对象，是用在“WebAssembly.instantiate( bufferSource, importObject )”里的第二个参数，可选
   *
   * @returns {Promise<{instance: *, module: *}>} Promise<{instance: *, module: *}>
   */
  getWASM( {
    url,
    options = {},
    callBack = {},
    importObject = {},
  } = {} ){
    return this.fetch( url, callBack, Object.assign( options, { responseType: 'arrayBuffer', } ) )
      .then( response => response.clone()
        .arrayBuffer() )
      .then( bufferSource => WebAssembly.validate( bufferSource )
                             ? WebAssembly.instantiate( bufferSource, Object.assign( {
          global: {},
          env: {
            // 初始大小为100页（64 * 100 = 6400‬KiB、6.25MiB），最大大小为1024页（64 * 1024 = 65536‬‬‬KiB、64MiB）。
            memory: new WebAssembly.Memory( {
              // WebAssembly Memory的初始大小，以WebAssembly pages为单位。
              initial: 100,
              // WebAssembly Memory的最大尺寸允许以WebAssembly pages为单位生长。
              // 当存在时，最大参数充当引擎预留存储器的提示。
              // 但是，引擎可能会忽略或限制此预订请求。
              // 一般来说，大多数WebAssembly modules不需要设置最大值。
              // 一个WebAssembly page的大小恒定为65536字节，即64KiB。
              maximum: 1024,
            } ),
            table: new WebAssembly.Table( {
              // WebAssembly表的初始元素数。
              initial: 0,
              // 表示要存储在表中的值类型的字符串。目前，它只能有一个值“anyfunc”（函数）。
              element: 'anyfunc',
              // 允许WebAssembly Table增长的元素的最大数目。
              // maximum: 102400,
            } ),
          },
        }, importObject ) )
                             : undefined )
      .then( ( arg = null ) => {
        if( arg === null ){
          throw new Error( '这是一个无效的“wasm”模块！' );
        }

        return arg;
      } );
  }

  // WASM工具 End

  // 7788的工具函数 Start

  /**
   * 获取设备信息以及浏览器信息<br />
   * navigator.userAgent.match( new RegExp( 'Chrome/[\\d\\.]+', 'g' ) )[ 0 ].split( '/' )[1]<br />
   * 上头返回字符串'73.0.3683.86'
   *
   * @returns {Object} {pf: string, ua: string, dpr: number, is_PC: boolean, is_Mobile: boolean, is_PCMac: boolean, is_iPad: boolean, is_iPhone: boolean, is_PCWin: boolean, is_WP: boolean, is_BB: boolean, is_MeeGo: boolean, is_Android: boolean, is_WX: boolean, is_UC: boolean, is_BDB: boolean, is_2345: boolean, is_LB: boolean, is_SGB: boolean, is_AY: boolean, is_QQB: boolean, is_360: boolean, is_YB: boolean, is_OperaB: boolean, is_Edge: boolean, is_FF: boolean, is_QQAPP: boolean, is_MIB: boolean, is_SGAPP: boolean, is_QQ: boolean, is_WBAPP: boolean, is_TMAPP: boolean, is_AlipayC: boolean, is_IE: boolean, is_TaoB: boolean, is_iOSChrome: boolean, is_Safari: boolean, is_Chrome: boolean}
   */
  deviceInfo(){
    let pf_str = navigator.platform,
      ua_str = navigator.userAgent,
      dpr_num = globalThis.devicePixelRatio,
      is_PCMac = pf_str.includes( 'MacIntel' ) || ua_str.includes( 'Macintosh' ) || ua_str.includes( 'Intel Mac OS' ),
      is_PCWin = pf_str.includes( 'Win32' ) || pf_str.includes( 'Win64' ) || ua_str.includes( 'Windows NT' ) || ua_str.includes( 'WOW64' ),
      is_iPad = pf_str.includes( 'iPad' ) || ua_str.includes( 'iPad' ),
      is_iPhone = pf_str.includes( 'iPhone' ) || ua_str.includes( 'iPhone' ),
      is_WP = ua_str.includes( 'Windows Phone' ),
      is_BB = ua_str.includes( '(BB' ) || ua_str.includes( 'BB10' ) || ua_str.includes( 'RIM' ),
      is_MeeGo = ua_str.includes( 'MeeGo' ),
      is_Android = pf_str.includes( 'Linux' ) || ua_str.includes( 'Linux' ) || ua_str.includes( 'Android' ),
      is_PC = is_PCMac || is_PCWin,
      is_Mobile = ua_str.includes( 'Mobile' ) || is_iPad || is_iPhone || is_WP || is_BB || is_MeeGo || is_Android,
      is_WX = ua_str.includes( 'MicroMessenger' ) || ua_str.includes( 'WindowsWechat' ),
      is_UC = ( ua_str.includes( ' UBrowser' ) || ua_str.includes( 'UCBrowser' ) ) && !ua_str.includes( 'tmall' ),
      is_BDB = ua_str.includes( 'BIDUBrowser' ) || ua_str.includes( 'baidubrowser' ) || ua_str.includes( 'FlyFlow' ),
      is_2345 = ua_str.includes( '2345Explorer' ) || ua_str.includes( 'Mb2345Browser' ),
      is_LB = ua_str.includes( 'LBBROWSER' ) || ua_str.includes( 'LieBaoFast' ),
      is_SGB = ua_str.includes( 'SogouMSE' ) || ua_str.includes( 'SogouMobileBrowser' ) || ua_str.includes( 'MetaSr' ) || ua_str.includes( ' SE ' ),
      is_AY = ua_str.includes( 'Maxthon' ) || ua_str.includes( 'MXiOS' ) || ua_str.includes( 'MxBrowser' ),
      is_QQB = ( ua_str.includes( 'QQBrowser' ) || ua_str.includes( 'MQQBrowser' ) || ua_str.includes( 'QQBrowserLite' ) ) && !is_WX,
      is_360 = ua_str.includes( 'QHBrowser' ) || ua_str.includes( 'QihooBrowser' ),
      is_YB = ua_str.includes( 'YaBrowser' ) || ua_str.includes( 'Yowser' ),
      is_OperaB = ua_str.includes( 'OPR' ) || ua_str.includes( 'OPT' ),
      is_Edge = ua_str.includes( 'Edge/' ) || ua_str.includes( 'EdgA/' ) || ua_str.includes( 'EdgiOS/' ),
      is_FF = ua_str.includes( 'Firefox/' ) || ua_str.includes( 'FxiOS' ),
      is_QQAPP = ua_str.includes( 'baiduboxapp' ),
      is_MIB = ua_str.includes( 'MiuiBrowser' ),
      is_SGAPP = ua_str.includes( 'SogouSearch' ),
      is_QQ = ua_str.includes( 'QQ/' ),
      is_WBAPP = ua_str.includes( 'Weibo' ) || ua_str.includes( 'weibo' ),
      is_TMAPP = ua_str.includes( 'tmall' ) || ua_str.includes( 'TM/' ),
      is_AlipayC = ua_str.includes( 'AlipayClient' ),
      is_IE = ua_str.includes( 'Trident' ) || ua_str.includes( 'MSIE' ) || ua_str.includes( 'compatible' ),
      is_TaoB = ua_str.includes( 'TaoBrowser' ),
      is_iOSChrome = ua_str.includes( 'CriOS' ),
      b1_boo = is_WX || is_UC || is_BDB || is_2345 || is_LB || is_SGB || is_AY || is_QQB || is_360 || is_YB || is_OperaB || is_Edge || is_FF || is_QQAPP || is_MIB || is_SGAPP || is_QQ || is_WBAPP || is_TMAPP || is_AlipayC || is_IE || is_TaoB,
      is_Safari = ( is_PCMac || is_iPad || is_iPhone ) && ua_str.includes( 'Safari/' ) && !ua_str.includes( 'Chrome' ) && !( b1_boo || is_iOSChrome ),
      is_Chrome = is_iOSChrome || ( ua_str.includes( 'Chrome/' ) && ua_str.includes( 'Safari/' ) && !b1_boo ),
      deviceInfo_obj = {
        pf_str,
        ua_str,
        dpr_num,
        is_PC,
        is_Mobile,
        is_PCMac,
        is_iPad,
        is_iPhone,
        is_PCWin,
        is_WP,
        is_BB,
        is_MeeGo,
        is_Android,
        is_WX,
        is_UC,
        is_BDB,
        is_2345,
        is_LB,
        is_SGB,
        is_AY,
        is_QQB,
        is_360,
        is_YB,
        is_OperaB,
        is_Edge,
        is_FF,
        is_QQAPP,
        is_MIB,
        is_SGAPP,
        is_QQ,
        is_WBAPP,
        is_TMAPP,
        is_AlipayC,
        is_IE,
        is_TaoB,
        is_iOSChrome,
        is_Safari,
        is_Chrome,
      };
    if( is_PCMac || is_PCWin || is_iPad || is_iPhone || is_WP || is_BB || is_MeeGo || is_Android ){
      deviceInfo_obj.other = false;
    }
    else{
      deviceInfo_obj.other = true;
      deviceInfo_obj.is_Android = true;
      ( !is_PC && !is_Mobile )
      ? ( deviceInfo_obj.is_PC = true, deviceInfo_obj.is_Mobile = false )
      : ( '' );
    }
    return deviceInfo_obj;
  }

  /**
   * 以“Blob”的形式下载文件<br />
   * PS：<br />
   * Blob构造函数的第一个参数得是数组，里头成员的数据类型可以是：<br />
   * ArrayBuffer，ArrayBufferView，Blob，USVString(编码为UTF-8)。<br />
   * 第二个参数是一个对象(可选的)：<br />
   * {<br />
   * type: 将存储到Blob中的数据的MIME类型。默认值为空字符串（“”）。<br />
   * endings: 如果数据是文本，如何解释内容中的换行符（“\n”）。默认值“transparent”将换行符复制到blob中，而不更改它们。要将换行符转换为主机系统的本机约定，请指定“endings”。
   *
   * @param blob Blob实例(new Blob( [ ArrayBuffer ], { type: 'application/msword',  ))，必须
   *
   * @param fileName 字符串，文件名(最好包括文件的后缀名)，默认值是："这是一个默认文件名(允许修改文件名和后缀)"，可选
   */
  download4Blob( blob, fileName = '这是一个默认文件名(允许修改文件名和后缀)' ){
    let blobURL = globalThis.URL.createObjectURL( blob ),
      eleLink = document.createElement( 'a' );

    eleLink.download = fileName;
    eleLink.style.display = 'none';
    eleLink.href = blobURL;
    document.body.appendChild( eleLink );
    eleLink.click();
    document.body.removeChild( eleLink );
    globalThis.URL.revokeObjectURL( blobURL );
  }

  /**
   * 动态计算rem，建议尽量早的执行该代码，最好是在html标签加载完之后以及head标签加载之前就执行<br />
   * iPhone 5S/SE DPR为2 (css像素320*568) 4英寸 (设备实际像素640*1136)<br />
   * iPhone 6/6S/7/8 DPR为2 (css像素375*667) 4.7英寸 (设备实际像素750*1334)<br />
   * iPhone 6/6S/7/8 Plus DPR为3(其实为2.608695652173913更准确) (css像素414*736) 5.5英寸 (设备实际像素1080*1920)<br />
   * iPhone X DPR为3 (css像素375*812) 5.8英寸 (设备实际像素1125*2436)
   *
   * @param size_num number，默认是以iPhone 6的设计稿尺寸作为基准值(375)
   */
  dynamicREM( size_num = 375 ){
    let doc_elem = document.documentElement,
      rend_fun = event => void ( doc_elem.style.fontSize = 16 * ( doc_elem.clientWidth / size_num ) + 'px' );
    document.addEventListener( 'DOMContentLoaded', rend_fun, false );
    globalThis.addEventListener( 'resize', rend_fun, false );
  }

  /**
   * 部署“三种相等算法”中的第三种(-0全等+0，NaN全等NaN)<br />
   * PS：<br />
   * 1、第一种：===<br />
   * -0全等+0，NaN不全等NaN<br />
   * 2、第二种：Object.is<br />
   * -0不全等+0，NaN全等NaN<br />
   * 3、第三种：目前未部署具体API<br />
   * -0全等+0，NaN全等NaN<br />
   *
   * @param x any data，必须
   *
   * @param y any data，必须
   *
   * @returns {boolean} boolean，x、y如果全等则为true，否则为false，-0全等+0，NaN全等NaN。
   */
  equal( x, y ){
    if( Math.abs( x ) === 0 && Math.abs( y ) === 0 ){
      return true;
    }
    else{
      return Object.is( x, y );
    }
  }

  /**
   * 判断网页是否是从设备的桌面主屏幕打开的<br /><br />
   *
   * 注：<br />
   * 1、“window.navigator.standalone”貌似是iOS中的浏览器(如：Safari等浏览器)独有的！<br />
   * 2、用CSS3媒体查询检测(值有：fullscreen、standalone、minimal-ui、browser)<br />
   * @ media all and (display-mode: standalone) {}<br />
   * 3、用JS检测(值有：fullscreen、standalone、minimal-ui、browser)<br />
   * if (window.matchMedia('(display-mode: standalone)').matches) {}
   *
   * @returns {Boolean} true(是从设备的桌面主屏幕打开的)、false(不是从设备的桌面主屏幕打开的)
   */
  isStandalone(){
    return globalThis[ 'navigator' ][ 'standalone' ];
  }

  /**
   * 断网不在线时，会触发的事件，该事件最好挂载在body上
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param f 事件函数，有一个event参数，必需
   *
   * @returns {Array} [Element]
   */
  offLineE( elem, f ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      elemO.onoffline = f;
      return elemO;
    } );
  }

  /**
   * 联网在线时，会触发的事件，该事件最好挂载在body上
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(以上提到的任何数据类型)，以便批量处理，必需
   *
   * @param f 事件函数，有一个event参数，必需
   *
   * @returns {Array} [Element]
   */
  onLineE( elem, f ){
    'use strict';

    return IsHandle10.call( this, elem, elemO => {
      elemO.ononline = f;
      return elemO;
    } );
  }

  /**
   * 执行这个函数时，先给“window”注册“orientationchange”事件，<br />
   * 但触发该事件时，横屏执行横屏所要执行的函数，竖屏执行竖屏所要执行的函数<br />
   * 注：<br />
   * window.orientation和screen.orientation.angle都为undefined时，<br />
   * 会给“window”注册“resize”事件，触发该事件时，会根据设备的宽高来判断横竖屏
   *
   * @param sFun 切换到竖屏状态时执行的函数，会有一个事件对象event参数，可选
   *
   * @param hFun 切换到横屏状态时执行的函数，会有一个事件对象event参数，可选
   *
   * @returns {Function} Function 一个已经注册的“resize”或者“orientationchange”事件函数，可用于解除这个事件。
   */
  oriChange( sFun = ( event => {
  } ), hFun = ( event => {
  } ) ){
    let wOri = 'orientation' in globalThis
               ? Math.abs( globalThis[ 'orientation' ] )
               : undefined,
      sOri = 'orientation' in screen
             ? ( 'angle' in screen.orientation
                 ? Math.abs( screen.orientation.angle )
                 : undefined )
             : undefined,
      isWOriUn = wOri === undefined,
      isSOriUn = sOri === undefined,
      handle = event => {
        let wOri = 'orientation' in globalThis
                   ? Math.abs( globalThis[ 'orientation' ] )
                   : undefined,
          sOri = 'orientation' in screen
                 ? ( 'angle' in screen.orientation
                     ? Math.abs( screen.orientation.angle )
                     : undefined )
                 : undefined,
          isWOriUn = wOri === undefined,
          isSOriUn = sOri === undefined,
          sOri0 = sOri === 0 || sOri === 180,
          wOri0 = wOri === 0 || wOri === 180,
          sOri90 = sOri === 90 || sOri === 270,
          wOri90 = wOri === 90 || wOri === 270;
        if( ( isWOriUn && sOri0 ) || ( !isWOriUn && wOri0 ) ){
          sFun( event );
        }
        else if( ( isWOriUn && sOri90 ) || ( !isWOriUn && wOri90 ) ){
          hFun( event );
        }
      };
    if( isWOriUn && isSOriUn ){
      let f = event => {
        this.width( globalThis )[ 0 ] <= this.height( globalThis )[ 0 ]
        ? ( sFun( event ) )
        : ( hFun( event ) );
      };
      globalThis.onresize = f;
      return f;
    }
    else{
      // window.onorientationchange = handle;
      globalThis.addEventListener( 'orientationchange', handle, false );
      return handle;
    }
  }

  /**
   * 在预加载图片的时候做一些事情比如加载动画等等
   *
   * @param imgA 一个图片地址数组，必需
   *
   * @param f1 函数，会有一个progress参数表示当前加载了百分之几的一个浮点数，可选
   *
   * @param f2 函数，图片全部加载完后执行的函数，可选
   */
  preloadImg( imgA, f1 = ( progress => {
  } ), f2 = ( () => {
  } ) ){
    let _this = this,
      ImageLoad = function (){
        this.images = {};
        this.imageUrls = [];
        this.imagesLoaded = 0;
        this.imagesFailedToLoad = 0;
        this.imagesIndex = 0;
        this.imageLoadingProgress = 0;
      };
    ImageLoad.prototype = {
      getImage( a ){
        return this.images[ a ];
      },
      imageLoadedCallback(){
        this.imagesLoaded++;
      },
      imageLoadedErrorCallback(){
        this.imagesFailedToLoad++;
      },
      loadImage( a ){
        let e = new Image,
          i = this;
        e.src = a;
        e.addEventListener( 'load', a => void ( i.imageLoadedCallback( a ) ) );
        e.addEventListener( 'error', a => void ( i.imageLoadedErrorCallback( a ) ) );
        this.images[ a ] = e;
      },
      loadImages(){
        return this.imagesIndex < this.imageUrls.length && ( this.loadImage( this.imageUrls[ this.imagesIndex ] ), this.imagesIndex++ ), ( this.imagesLoaded + this.imagesFailedToLoad ) / this.imageUrls.length * 100;
      },
      queueImage( a ){
        let e = this;
        return _this.isArray( a )
               ? a.forEach( a => void ( e.imageUrls.push( a ) ) )
               : this.imageUrls.push( a ), this;
      },
      imageLoadingProgressCallback( a, e ){
        let i = this,
          s = setInterval( () => {
            i.imageLoadingProgress = _this.isNaN( i.loadImages() )
                                     ? 100
                                     : i.loadImages();
            100 === i.imageLoadingProgress && ( clearInterval( s ), setTimeout( () => void ( e.call( i ) ), 300 ) );
            a.call( i, i.imageLoadingProgress );
          }, 10 );
      }
    };
    let imageLoad = new ImageLoad;
    imageLoad.queueImage( imgA )
      .imageLoadingProgressCallback( f1, f2 );
  }

  /**
   * 预加载的脚本化
   *
   * @param arr 数组，成员是一个个JSON对象，必须<br />
   * 成员JSON对象的格式是<br />
   * {<br />
   *   href: 资源的url 字符串，必须<br /><br />
   *
   *   as： 'font' 字符串，可选<br /><br />
   *
   *   type: 'font/ttf' 字符串，可选<br /><br />
   *
   *   crossorigin: 'anonymous' 字符串，可选<br /><br />
   *
   *   isExecute: false 布尔值，是否立即执行.js脚本，默认false，不立即执行，true立即执行，可选<br /><br />
   *
   *   attrs: JSON对象{}，用于配置标签的属性，键名是属性名，键值是属性值，可选<br /><br />
   *
   *   onLoad: 节点的onload事件函数(会有一个event的事件参数)，当需要立即执行.js脚本时，<br />
   *   为了保证被立即执行的.js脚本代码确确实实全部下载完了，再执行后续的依赖其代码的操作时就用上了这个事件函数，可选<br/><br />
   *
   *   onError: 节点的onerror事件函数(会有一个event的事件参数)，当下载.js脚本失败时触发<br /><br />
   *
   *   onAbort: 节点的onabort事件函数(会有一个event的事件参数)，当下载.js脚本中止时触发<br /><br />
   *
   * as的值:<br />
   * 支持不填写“as”属性，那么链接地址就是资源任何地址<br />
   * audio(音频文件)、<br />
   * document(用于嵌入<frame>或中的HTML文档<iframe>)、<br />
   * embed(要嵌入<embed>元素内的资源)、<br />
   * fetch(要由fetch或XHR请求访问的资源，例如ArrayBuffer或JSON文件)、<br />
   * font(字体文件)、<br />
   * image(图像文件、SVG)、<br />
   * object(要嵌入<embed>元素内的资源)、<br />
   * script(JavaScript文件)、<br />
   * style(样式表)、<br />
   * track(WebVTT文件)、<br />
   * worker(Web Worker或Shared Worker)、<br />
   * video(视频文件)、<br />
   * report(不需要链接地址)、<br />
   * audioworklet、<br />
   * paintworklet、<br />
   * serviceworker、<br />
   * manifest、<br />
   * xslt<br /><br />
   *
   * type值:(链接查找)<br />
   * http://www.w3school.com.cn/media/media_mimeref.asp
   */
  preloadTools( arr = [] ){
    let preloadElem,
      preloadScriptElem;
    arr.forEach( c => {
      preloadElem = document.createElement( 'link' );
      preloadElem.rel = 'preload';
      preloadElem.href = c.href;
      ( 'as' in c ) && ( preloadElem.as = c.as );
      ( 'type' in c ) && ( preloadElem.type = c.type );
      ( 'crossorigin' in c ) && ( preloadElem.setAttribute( 'crossorigin', c.crossorigin ) );
      'attrs' in c && ( Object.keys( c.attrs )
        .forEach( c1 => void ( preloadElem.setAttribute( c1, c.attrs[ c1 ] ) ) ) );
      document.head.appendChild( preloadElem );
    } );
    arr.forEach( c => {
      if( c.href.includes( '.js' ) && 'isExecute' in c && c.isExecute ){
        preloadScriptElem = document.createElement( 'script' );
        this.isFunction( c.onLoad ) && ( preloadScriptElem.onload = c.onLoad );
        this.isFunction( c.onError ) && ( preloadScriptElem.onerror = c.onError );
        this.isFunction( c.onAbort ) && ( preloadScriptElem.onabort = c.onAbort );
        preloadScriptElem.src = c.href;
        'attrs' in c && ( Object.keys( c.attrs )
          .forEach( c1 => void ( preloadScriptElem.setAttribute( c1, c.attrs[ c1 ] ) ) ) );
        document.body.appendChild( preloadScriptElem );
      }
    } );
  }

  /**
   * 解决iOS上的滚动出界(尤其是在iOS上的微信内置浏览器上进行滚动操作)<br />
   * PS：<br />
   * 返回值是一个已经注册的“touchstart”事件函数，可用于解除这个事件。
   *
   * @param elem 单个节点选择器(字符串)、单个节点选择器组(字符串)、单个节点对象、单个节点List、单个jQuery节点对象，<br />
   * 支持一个数组(节点选择器、节点选择器组)，以便批量处理，但只处理第一个节点，(就是子元素内容超过父容器的那个父容器)，必需<br />
   * 注：建议将所有滚动都伪装成局部滚动，也就是滚动条不出现在body、html上，body、html全都禁止滚动。如：把滚动条挂在main标签上。
   *
   * @returns {Function} Function 一个已经注册的“touchstart”事件函数，可用于解除这个事件。
   */
  scrollFix( elem ){
    'use strict';

    return IsHandle13.call( this, elem, elemO => {
      let startTopScroll = 0,
        f = event => {
          startTopScroll = elemO.scrollTop;
          startTopScroll <= 0
          ? ( elemO.scrollTop = 1 )
          : '';
          ( startTopScroll + elemO.offsetHeight >= elemO.scrollHeight )
          ? ( elemO.scrollTop = elemO.scrollHeight - elemO.offsetHeight - 1 )
          : '';
        };
      elemO.addEventListener( 'touchstart', f, { passive: false } );
      return f;
    } );
  }

  /**
   * 从时间戳中提取年、月、日、时、分、秒、周，可以用变量的解构赋值来提取返回值
   *
   * @param t 时间戳的字符串表示、number 时间戳，必需
   *
   * @param m number 周的表示方式，0表示中文，1表示数字，默认1，可选
   *
   * @returns {Object} {y(年) : number, m(月) : number, d(日): number, h(时) : number, min(分) : number, s(秒) : number, day(周) : string|number}
   */
  timeF( t, m = 1 ){
    let [ wd, tI, obj ] = [
      ( m === 1 )
      ? [
          7,
          1,
          2,
          3,
          4,
          5,
          6
        ]
      : [
          '日',
          '一',
          '二',
          '三',
          '四',
          '五',
          '六'
        ],
      Number( t ),
      undefined
    ];
    if( !this.isNaN( tI ) ){
      obj = new Date( tI );
      if( !this.isNaN( obj.valueOf() ) ){
        return {
          y: obj.getFullYear(),
          m: obj.getMonth() + 1,
          d: obj.getDate(),
          h: obj.getHours(),
          min: obj.getMinutes(),
          s: obj.getSeconds(),
          day: wd[ obj.getDay() ]
        };
      }
    }
  }

  /**
   * 振动效果
   *
   * @param option 单个数字(如：100、200之类的，表示振动时间是100ms)，数组[单个数字(如：100、200之类的)]，默认100，可选<br />
   * 'SOS'：<br />
   * [100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100]<br />
   * 奇数位表示振动多久，偶数位表示暂停的时间间隔
   *
   * @param fun1 不支持该API时，执行的函数，会有一个event参数，可选
   *
   * @param fun2 无论何种情况都会执行的函数，可选
   */
  vibrate( option = 100, fun1 = ( event => {
  } ), fun2 = ( () => {
  } ) ){
    try{
      globalThis.navigator.vibrate = globalThis.navigator[ 'vibrate' ] || globalThis.navigator[ 'webkitVibrate' ] || globalThis.navigator[ 'mozVibrate' ] || globalThis.navigator[ 'msVibrate' ] || globalThis.navigator[ 'oVibrate' ] || globalThis.navigator[ 'khtmlVibrate' ];
      globalThis.navigator.vibrate( option );
    }
    catch( e ){
      fun1( e );
    }
    finally{
      fun2();
    }
  }

  // 7788的工具函数 End

}

export default {
  CT,
  CookieTool,
  SSE4Client,
  Upload4GraphQL,
  WebService4Proxy,
  WebSocket4Client,
};
