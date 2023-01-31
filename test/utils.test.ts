import { test, expect } from 'vitest';
import { parseTime, idCardDesensitization, getDiffDate, trim } from '../dist/index.esm.js';
// 时间格式化
test('Time formatting', () => {
  expect(parseTime(new Date('2022-12-12'), '{y}-{m}-{d}')).toBe('2022-12-12');
});
// 身份证脱敏
test('Return desensitized ID card', () => {
  expect(idCardDesensitization('330421193002031526')).toBe('3304***********526');
});
// 获取指定日期到今天的相差天数
test('Gets the number of days between the specified date and today', () => {
  expect(getDiffDate('2022-12-31')).toBe(32);
});
// 去掉字符串前后所有空格
test('Remove all Spaces before and after the string', () => {
  expect(trim('  去除空格  ')).toBe('去除空格');
});
