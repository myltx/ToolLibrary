import {func, parseTime, idCardDesensitization,getDiffDate, trim ,zip} from '../dist/index.esm.js'

console.log(func(1, 2));
console.log(parseTime(new Date()));
console.log(idCardDesensitization('330421193002031526'));
console.log(getDiffDate('2022-12-31'));
console.log(trim(123   ));
zip();