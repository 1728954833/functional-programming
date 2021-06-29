import { forEach, sortBy, memoized } from "../lib/es6-functional";
let arr = [1, 2, 3];
forEach(arr, data => console.log(data));

const users = [
    {
        name: "meng",
        age: 18,
    },
    {
        name: "ming",
        age: 20,
    },
    {
        name: "hao",
        age: 16,
    },
];

console.log(
    users.filter(item => {
        console.log(item);
        return item.age !== 16;
    })
);

console.log(users.sort(sortBy("age")));

const f = memoized(function (num) {
    return num + 100;
});

f(1);

f(2);
// 当前看到96页
