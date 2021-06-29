export const Monad = function (val) {
    this.val = val;
};

Monad.of = function (val) {
    return new Monad(val);
};

Monad.prototype.isNothing = function () {
    return this.val === null || this.val === undefined;
};

Monad.prototype.map = function (fn) {
    return this.isNothing() ? Monad.of(null) : Monad.of(fn(this.val));
};

Monad.prototype.join = function () {
    return this.val;
};

Monad.prototype.chain = function (fn) {
    return this.map(fn).join();
};
