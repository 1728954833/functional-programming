// 函子是一个持有值的容器
// 不能使用箭头函数, 因为箭头函数不能new
export const Container = function (val) {
    this.val = val;
};

// 定义函子的时候不要用new要用of
Container.of = function (value) {
    return new Container(value);
};

// 函子是一个实现了map的契约对象
Container.prototype.map = function (fn) {
    return Container.of(fn(this.val));
};
