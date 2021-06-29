export const MayBe = function (val) {
    this.val = val;
};

MayBe.of = function (val) {
    return new MayBe(val);
};

MayBe.prototype.isNothing = function () {
    return this.val === null || this.val === undefined;
};

MayBe.prototype.map = function (fn) {
    return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this.val));
};
