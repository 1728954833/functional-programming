// Nothing不管怎么样都只返回自身
const Nothing = function (val) {
    this.value = val;
};

Nothing.of = function (val) {
    return new Nothing(val);
};

Nothing.prototype.map = function (f) {
    return this;
};

// Some和普通函子一样
const Some = function (val) {
    this.value = val;
};

Some.of = function (val) {
    return new Some(val);
};

Some.prototype.map = function (fn) {
    return Some.of(fn(this.value));
};

export const Either = {
    Some,
    Nothing,
};
