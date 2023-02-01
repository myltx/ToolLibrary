import { parseTime, idCardDesensitization,getDiffDate, trim } from '../dist/index.esm.js'

console.log(parseTime(new Date()));
console.log(idCardDesensitization('330421193002031526'));
console.log(getDiffDate('2022-12-31'));
console.log(trim(123   ));