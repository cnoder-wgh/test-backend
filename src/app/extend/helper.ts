import * as bcrypt from 'bcryptjs';
import * as moment from 'moment';
import * as meeko from 'meeko';

moment.locale('zh-cn');

export = {
  /**
   * 密文转hash
   * @method Helper#bhash
   * @param {String} str 需要加密的内容
   * @returns {String} 密文
   */
  bhash(str: string) {
    return bcrypt.hashSync(str, 10);
  },
  /**
   * hash是否正确
   * @param {String} str 需要匹配的内容
   * @param {String} hash hash值
   * @returns {Boolean} 是否匹配
   */
  bcompare(str: string, hash: string) {
    return bcrypt.compareSync(str, hash);
  },

  /**
   * 对比两个数组差异
   * @method Helper#arrayDiff
   * @param {(string | number)[]} arrA 数组A
   * @param {(string | number)[]} arrB 数组B
   * @returns {[increase:  (string | number)[], decrease:  (string | number)[]]} [increase, decrease]
   */
  arrayDiff(arrA: (string | number)[], arrB: (string | number)[]) {
    const intersect = meeko.array.intersect(arrA, arrB);
    const increase = meeko.array.except(arrA, intersect);
    const decrease = meeko.array.except(arrB, intersect);
    return [increase, decrease];
  },
  /**
   * 处理成功响应
   * @method Helper#success
   * @param {any} result Return data, Default null
   * @param {String} message Error message, Default '请求成功'
   * @param {Number} status Status code, Default '200'
   *
   * @example
   * ```js
   * ctx.helper.success({}, null, 201);
   * ```
   */
  success(this: any, result = null, message = '请求成功', status = 200) {
    this.ctx.body = {
      code: status,
      message,
      data: result,
    };
    this.ctx.status = status;
  },

  /**
   * 处理失败响应
   * @param ctx
   * @param code
   * @param message
   */
  error(this: any, code: number, message: string) {
    this.ctx.body = {
      code,
      message,
      data: null,
    };
    this.ctx.status = 500;
  },
};
