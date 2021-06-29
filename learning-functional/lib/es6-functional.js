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

// 可缓存didi
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
function _curry(fn, len, ...args) {
    return function (...params) {
        let _args = [...args, ...params];
        if (_args.length >= len) {
            return fn.apply(this, _args);
        } else {
            return _curry.call(this, fn, len, ..._args);
        }
    };
}
