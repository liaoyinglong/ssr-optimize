// this file is not needed compile
// use cjs to exports members is easier

function f() {}
function fakerHooks() {
  return {};
}

function createFaker() {
  return new Proxy(f, {
    get(target, p, receiver) {
      // 当做 react hooks 使用，确保返回值不是空的
      if (typeof p === "string" && p.startsWith("use")) {
        return fakerHooks;
      }
      // 默认返回函数 1
      return createFaker();
    },
    apply(...args) {
      return createFaker();
    },
    construct(target, argArray, newTarget) {
      return createFaker();
    },
  });
}
exports = createFaker();

module.exports = exports;
