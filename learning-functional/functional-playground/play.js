import { Container, MayBe, Either } from "../lib";
// 给我的感觉函子就是用来做错误处理的
console.log(Container.of(10).map(item => item + 10));
console.log(
    MayBe.of(10)
        .map(item => item + 10)
        .map(() => null)
        // 在这里当值为null会返回null
        // 算是一种防御式编程
        // 否则可能会因为空值而出错
        // 从逻辑上来讲是值不为空才执行
        .map(item => item * 10)
);

// 使用Some封装正确请求,Nothing封装错误请求
// 相比于MayBe你可以知道你错在那
let res;
try {
    res = Either.Some.of({
        data: [1, 2, 3],
    });
    throw "error";
} catch (err) {
    res = Either.Nothing.of({
        errMessage: err,
    });
}
console.log(res);

// Pointed函子是一个函子的子集具有实现了of的契约接口
// Array.of就是这样一个可以把数组变成Pointed函子的方法
// 个人认为这只是一个称谓吧
