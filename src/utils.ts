/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time: string | number | Date, cFormat?: string) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj: any = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str: string | number = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key: string) => {
    let value: any = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

/**
 * 脱敏身份证号
 * @param {(string|number)} idCard
 * @returns {string}
 */
export function idCardDesensitization(idCard: string | number): string {
  if (typeof idCard === 'number') {
    idCard = idCard.toString();
  }
  const len = idCard.length;
  if (len && len > 4) {
    const temp = idCard.substring(4, 15);
    return idCard.replace(temp, '***********');
  } else {
    return '';
  }
}

/**
 * 获取指定日期到今天的相差天数
 * @param {(string | number | Date)} targetDate
 * @returns {string | number}
 */
export function getDiffDate(targetDate: string | number | Date): string | number {
  let date1 = new Date(targetDate);
  let date2 = new Date();
  date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  const diff = date2.getTime() - date1.getTime();
  const diffDate = diff / (24 * 60 * 60 * 1000);
  return diffDate + 1;
}

/**去掉字符串前后所有空格*/
/**
 * 获取指定日期到今天的相差天数
 * @param {(string | number)} str
 * @returns {string}
 */
export function trim(str: string | number): string {
  if (typeof str === 'number') {
    str = str.toString();
  }
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

// 生产随机数
/**
 * 生产随机数
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function randomNum(len: number, radix: number) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [] as string[];
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (let i = 0; i < len; i++) {
      uuid[i] = chars[0 | (Math.random() * radix)];
    }
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (let i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('') + new Date().getTime();
}
