export const forEach = (array, fn) => {
    let i;
    for (let i = 0; i < array.length; i++) {
        fn(array[i]);
    }
};

// 若 a 小于 b，即 a - b 小于零，则返回一个小于零的值，数组将按照升序排列。
// 若 a 等于 b，则返回 0。
// 若 a 大于 b, 即 a - b 大于零，则返回一个大于零的值，数组将按照降序排列。
export const sortBy = prop => (a, b) => a[prop] - b[prop];

// 可缓存
export const tap = value => fn => fn(value);

// 只执行一次
export const once = fn => {
    let flag = true;
    return (...args) => {
        if (flag) {
            fn(args);
            flag = false;
        }
    };
};

// 可记忆化函数
export const memoized = fn => {
    const lookupTable = {};
    return arg => lookupTable[arg] || (lookupTable[arg] = fn(arg));
};

// map
export const map = (arr, fn) => {
    const result = [];
    for (const i in arr) {
        result.push(fn(arr[i], i));
    }
    return result;
};

// filter
export const filter = (arr, fn) => {
    const result = [];
    for (const i in arr) {
        fn(arr[i], i) ? result.push(item) : undefined;
    }
    return result;
};

// 科里化函数
// curry((a, b) => {
//     console.log(a, b);
// })(1)(2);
export function curry(fn, ...args) {
    return function (...params) {
        let _args = [...args, ...params];
        if (_args.length >= fn.length) {
            return fn.apply(this, _args);
        } else {
            return curry.call(this, fn, ..._args);
        }
    };
}

// 偏函数
// const t = partial((a, b, c) => console.log(a, b, c), "1", undefined, "3");
// t(10) => 1 10 3
// 当遇到 undefined 传入的时候会滞留这个地方为空让其调用时传入在这里使用
// Object.assign()拷贝 => 当对象中只有一级属性，没有二级属性的时候，此方法为深拷贝，但是对象中有对象的时候，此方法，在二级属性以后就是浅拷贝。
// 无论是使用扩展运算符(...)还是解构赋值，对于引用类型都是浅拷贝。所以在使用splice()、concat()、...对数组拷贝时，只有当数组内部属性值不是引用类型是，才能实现深拷贝。
export const partial = function (fn, ...partialArgs) {
    let args = partialArgs;
    return function (...fullArguments) {
        // 在这里不能使用JSON.stringify来深拷贝
        // undefined、任意的函数以及 symbol 值，在序列化过程中会被忽略 [☑️]
        // Date 日期调用了 toJSON() 将其转换为了 string 字符串（Date.toISOString()），因此会被当做字符串处理。
        // NaN 和 Infinity 格式的数值及 null 都会被当做 null。
        // 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。
        // 对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。

        let copyArgs = [...args];
        let arg = 0;
        for (
            let i = 0;
            i < copyArgs.length && arg < fullArguments.length;
            i++
        ) {
            if (copyArgs[i] === undefined) {
                copyArgs[i] = fullArguments[arg++];
            }
        }
        return fn.apply(null, copyArgs);
    };
};

// 函数组合
// 从右往左执行
export const compose =
    (...fns) =>
    value =>
        fns.reverse().reduce((acc, fn) => fn(acc), value);

// 管道
// 从左往右执行
export const pipe =
    (...fns) =>
    value =>
        fns.reduce((acc, fn) => fn(acc), value);

// 用于管道调试
export const identity = it => {
    console.log(it);
    return it;
};

// const add = compose(
//     i => i + 1,
//     identity,
//     i => i + 2
// );

// add(3);

// 一段时间只能出发一次
export const throttle = (fn, delay) => {
    let valid = true;
    return function () {
        if (!valid) {
            return false;
        }
        valid = false;
        setTimeout(() => {
            fn();
            valid = true;
        }, delay);
    };
};

// 触发事件会停止上一次的触发
export const debounce = (fn, delay) => {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
            timer = setTimeout(fn, delay);
        } else {
            timer = setTimeout(fn, delay);
        }
    };
};
