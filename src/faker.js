// this file is not needed compile
// use cjs to exports members is easier
function f() {}
function fakerHooks() {
  return {};
}

const faker = new Proxy(f, {
  get(target, p, receiver) {
    if (typeof p === "string") {
      // 当做 react hooks 使用，确保返回值不是空的
      if (p.startsWith("use")) {
        return fakerHooks;
      }
      if (p === "__esModule") {
        return false;
      }
    }
    // 默认返回自身，确保可以循环引用
    return faker;
  },
  construct(target, argArray, newTarget) {
    return faker;
  },
});

// 只会在 server 中被导入，使用 cjs 导出
// 并且 es module 不支持 动态导出，需要声明清楚需要导出的 member
// 这里用 cjs 能很好的完成 faker module 这个任务
exports = faker;
module.exports = exports;
