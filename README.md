## 前端工具库

基于 TypeScript、rollup实现

[更新日志](./CHANGELOG.md)


```javascript
/**
 * 日期格式转换
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export declare function parseTime(time: string | number | Date, cFormat?: string): string | null;
/**
 * 脱敏身份证号
 * @param {(string|number)} idCard
 * @returns {string}
 */
export declare function idCardDesensitization(idCard: string | number): string;
/**
 * 获取指定日期到今天的相差天数
 * @param {(string | number | Date)} targetDate
 * @returns {string | number}
 */
export declare function getDiffDate(targetDate: string | number | Date): string | number;
/**
 * 去掉字符串前后所有空格
 * @param {(string | number)} str
 * @returns {string}
 */
export declare function trim(str: string | number): string;
/**
 * 生产随机数
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export declare function randomNum(len: number, radix: number): string;
/**
 *
 * @desc   判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */
export declare function isPhoneNum(str: string): boolean;

```